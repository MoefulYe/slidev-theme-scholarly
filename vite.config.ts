import { defineConfig } from 'vite'
import citationPluginMod from '@jxpeng98/markdown-it-citation'

function resolvePlugin(mod: unknown): (md: unknown, options: unknown) => void {
    // 兼容：ESM default / CJS interop / namespace import
    const plugin = (mod as { default?: unknown })?.default ?? mod
    return plugin as (md: unknown, options: unknown) => void
}

// Regex to match the scholarly-citations comment injected by preparser
const SCHOLARLY_CITATIONS_RE = /<!--\s*scholarly-citations:\s*(\[.*?\])\s*-->/

// Declare global config type
declare global {
    // eslint-disable-next-line no-var
    var __scholarlyConfig: {
        bibFile: string
        bibStyle: string
        showNum: boolean
    } | undefined
}

export default defineConfig({
    slidev: {
        markdown: {
            markdownItSetup(md) {
                const citationPlugin = resolvePlugin(citationPluginMod)

                if (typeof citationPlugin !== 'function') {
                    console.warn('[citation] resolved plugin is not a function:', citationPluginMod)
                    return
                }

                // Get configuration from global config (set by vite-plugins.ts) or use defaults
                const config = globalThis.__scholarlyConfig || {
                    bibFile: 'references.bib',
                    bibStyle: 'apa',
                    showNum: false,
                }

                // First, register the citation plugin
                // bibTitle is empty because the references layout already shows the title in header
                md.use(citationPlugin, {
                    bibFile: config.bibFile,
                    style: config.bibStyle,
                    showNum: config.showNum,
                    bibTitle: '',
                    autoGenerate: false,
                })

                // Now add a core rule BEFORE the citation_bibliography rule to parse 
                // the scholarly-citations comment and inject it into state.env.frontmatter
                // We need to move this rule before citation_bibliography in the ruler
                md.core.ruler.before('citation_bibliography', 'scholarly_citations_parser', (state: { src: string; env: { frontmatter?: { citations?: string[] } } }) => {
                    const match = state.src.match(SCHOLARLY_CITATIONS_RE)
                    if (match) {
                        try {
                            const citations = JSON.parse(match[1])
                            if (!state.env) state.env = {}
                            if (!state.env.frontmatter) state.env.frontmatter = {}
                            state.env.frontmatter.citations = citations
                        } catch (e) {
                            console.error('[scholarly] Failed to parse citations comment:', e)
                        }
                    }
                })
            },
        },
    },
})