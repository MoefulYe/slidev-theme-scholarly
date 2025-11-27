import { defineConfig } from 'vite'
import fs from 'fs'
// @ts-expect-error - js-yaml does not have type declarations in this project
import yaml from 'js-yaml'
import citationPluginMod from '@jxpeng98/markdown-it-citation'

function resolvePlugin(mod: unknown): (md: unknown, options: unknown) => void {
    // 兼容：ESM default / CJS interop / namespace import
    const plugin = (mod as { default?: unknown })?.default ?? mod
    return plugin as (md: unknown, options: unknown) => void
}

// Regex to match the scholarly-citations comment injected by preparser
const SCHOLARLY_CITATIONS_RE = /<!--\s*scholarly-citations:\s*(\[.*?\])\s*-->/

// Parse headmatter from the example.md file to get global configuration
function getHeadmatter(): Record<string, unknown> {
    try {
        // Try to read the entry file specified in package.json scripts or default to example.md
        const entryFile = process.argv.find(arg => arg.endsWith('.md')) || 'example.md'
        if (fs.existsSync(entryFile)) {
            const content = fs.readFileSync(entryFile, 'utf-8')
            const match = content.match(/^---\n([\s\S]*?)\n---/)
            if (match) {
                return yaml.load(match[1]) as Record<string, unknown> || {}
            }
        }
    } catch {
        // Ignore errors
    }
    return {}
}

const headmatter = getHeadmatter()

export default defineConfig({
    slidev: {
        markdown: {
            markdownItSetup(md) {
                const citationPlugin = resolvePlugin(citationPluginMod)

                if (typeof citationPlugin !== 'function') {
                    console.warn('[citation] resolved plugin is not a function:', citationPluginMod)
                    return
                }

                // Get configuration from headmatter (global frontmatter)
                const bibFile = (headmatter.bibFile as string) || 'public/references.bib'
                const bibStyle = (headmatter.bibStyle as string) || 'apa'
                const showNum = (headmatter.bibShowNum as boolean) ?? false
                const bibTitle = (headmatter.bibTitle as string) || 'References'

                // First, register the citation plugin
                md.use(citationPlugin, {
                    bibFile,
                    style: bibStyle,
                    showNum,
                    bibTitle,
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