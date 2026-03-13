import citationPluginMod from '@jxpeng98/markdown-it-citation'

const SCHOLARLY_CITATIONS_RE = /<!--\s*scholarly-citations:\s*(\[.*?\])\s*-->/
const SCHOLARLY_CITATION_SETUP_FLAG = Symbol.for('scholarly.citation.setup')

function resolvePlugin(mod) {
  return mod?.default ?? mod
}

function resolveCitationConfig(options = {}) {
  const config = globalThis.__scholarlyConfig || {}

  return {
    bibFile: options.bibFile || config.bibFile || 'references.bib',
    style: options.style || config.bibStyle || 'apa',
    showNum: options.showNum ?? config.showNum ?? false,
    bibTitle: options.bibTitle ?? '',
    autoGenerate: options.autoGenerate ?? false,
  }
}

export function setupScholarlyCitationMarkdown(md, options = {}) {
  if (md[SCHOLARLY_CITATION_SETUP_FLAG])
    return

  md[SCHOLARLY_CITATION_SETUP_FLAG] = true

  const citationPlugin = resolvePlugin(citationPluginMod)

  if (typeof citationPlugin !== 'function') {
    console.warn('[citation] resolved plugin is not a function:', citationPluginMod)
    return
  }

  md.use(citationPlugin, resolveCitationConfig(options))

  md.core.ruler.before('citation_bibliography', 'scholarly_citations_parser', (state) => {
    const match = state.src.match(SCHOLARLY_CITATIONS_RE)
    if (!match)
      return

    try {
      const citations = JSON.parse(match[1])
      state.env ||= {}
      state.env.frontmatter ||= {}
      state.env.frontmatter.citations = citations
    }
    catch (error) {
      console.error('[scholarly] Failed to parse citations comment:', error)
    }
  })
}
