import type { Plugin } from 'vite'
import { defineVitePluginsSetup } from '@slidev/types'
import citationPluginMod from '@jxpeng98/markdown-it-citation'

function resolvePlugin(mod: unknown): (md: unknown, options: unknown) => void {
  const plugin = (mod as { default?: unknown })?.default ?? mod
  return plugin as (md: unknown, options: unknown) => void
}

// Regex to match the scholarly-citations comment injected by preparser
const SCHOLARLY_CITATIONS_RE = /<!--\s*scholarly-citations:\s*(\[.*?\])\s*-->/

// Store citation config globally so it can be accessed by the markdown plugin
declare global {
  // eslint-disable-next-line no-var
  var __scholarlyConfig: {
    bibFile: string
    bibStyle: string
    showNum: boolean
  } | undefined
}

export default defineVitePluginsSetup((options) => {
  // Get configuration from headmatter (global frontmatter)
  const headmatter = options.data.headmatter || {}
  const bibFile = (headmatter.bibFile as string) || 'references.bib'
  const bibStyle = (headmatter.bibStyle as string) || 'apa'
  const showNum = (headmatter.bibShowNum as boolean) ?? false

  // Store config globally for the vite.config.ts to access
  globalThis.__scholarlyConfig = { bibFile, bibStyle, showNum }

  const citationPlugin = resolvePlugin(citationPluginMod)

  if (typeof citationPlugin !== 'function') {
    console.warn('[scholarly-citation] resolved plugin is not a function:', citationPluginMod)
    return []
  }

  // Create a plugin that hooks into markdown processing
  const scholarlyPlugin: Plugin = {
    name: 'slidev-theme-scholarly:citation',
    enforce: 'pre',
    
    // Use transform to process markdown files and inject citation handling
    transform(code, id) {
      // Only process markdown files that are being rendered as slides
      if (!id.includes('.md') || id.includes('node_modules')) {
        return null
      }
      return null
    },
  }

  return [scholarlyPlugin]
})
