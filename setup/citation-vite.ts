// Source of truth for Scholarly's citation markdown helper.
// Runtime JS/CJS and declaration outputs are generated from this file.
import citationPluginMod from '@jxpeng98/markdown-it-citation'

const SCHOLARLY_CITATIONS_RE = /<!--\s*scholarly-citations:\s*(\[.*?\])\s*-->/
const SCHOLARLY_CITATION_SETUP_FLAG = Symbol.for('scholarly.citation.setup')

export interface ScholarlyCitationMarkdownOptions {
  autoGenerate?: boolean
  bibFile?: string
  bibTitle?: string
  showNum?: boolean
  style?: string
}

type ScholarlyRuntimeConfig = ScholarlyCitationMarkdownOptions & {
  bibStyle?: string
}

type CitationMarkdownState = {
  env?: {
    frontmatter?: {
      citations?: string[]
    }
  }
  src: string
}

export interface CitationMarkdownInstance {
  core: {
    ruler: {
      before: (
        beforeName: string,
        ruleName: string,
        rule: (state: CitationMarkdownState) => void,
      ) => void
    }
  }
  use: (plugin: unknown, options?: unknown) => void
}

function resolvePlugin(mod: unknown): unknown {
  return (mod as { default?: unknown } | undefined)?.default ?? mod
}

function resolveCitationConfig(options: ScholarlyCitationMarkdownOptions = {}) {
  const config = (globalThis as typeof globalThis & { __scholarlyConfig?: ScholarlyRuntimeConfig }).__scholarlyConfig || {}

  return {
    bibFile: options.bibFile || config.bibFile || 'references.bib',
    style: options.style || config.bibStyle || 'apa',
    showNum: options.showNum ?? config.showNum ?? false,
    bibTitle: options.bibTitle ?? '',
    autoGenerate: options.autoGenerate ?? false,
  }
}

export function setupScholarlyCitationMarkdown(
  md: CitationMarkdownInstance,
  options: ScholarlyCitationMarkdownOptions = {},
): void {
  const flaggedMd = md as CitationMarkdownInstance & Record<PropertyKey, unknown>

  if (flaggedMd[SCHOLARLY_CITATION_SETUP_FLAG])
    return

  flaggedMd[SCHOLARLY_CITATION_SETUP_FLAG] = true

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
      const citations = JSON.parse(match[1]) as string[]
      state.env ||= {}
      state.env.frontmatter ||= {}
      state.env.frontmatter.citations = citations
    }
    catch (error) {
      console.error('[scholarly] Failed to parse citations comment:', error)
    }
  })
}
