import { defineConfig } from 'vite'
import { setupScholarlyCitationMarkdown } from 'slidev-theme-scholarly/citation-vite'

export default defineConfig({
  slidev: {
    markdown: {
      // Slidev has used both hook names across releases.
      markdownSetup(md) {
        setupScholarlyCitationMarkdown(md)
      },
      markdownItSetup(md) {
        setupScholarlyCitationMarkdown(md)
      },
    },
  },
})
