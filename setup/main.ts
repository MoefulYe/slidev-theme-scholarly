import { defineAppSetup } from '@slidev/types'
import type { RouteLocationNormalized } from 'vue-router'
import Theorem from '../components/Theorem.vue'
import { resetTheoremCounters } from '../utils/theorem'

const DEFAULT_FONT_SIZE = '1rem'

const normalizeFontSize = (value: unknown): string | null => {
  if (value === null || value === undefined) return null

  if (typeof value === 'number' && Number.isFinite(value)) {
    return `${value}px`
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed)
      return null

    const numeric = Number(trimmed)
    if (!Number.isNaN(numeric)) {
      return `${numeric}px`
    }
    return trimmed
  }

  return null
}

const applyFontSize = (value: string | null) => {
  const root = document.documentElement
  if (!root) return

  if (value) {
    root.style.setProperty('--scholarly-font-size', value)
  } else {
    root.style.setProperty('--scholarly-font-size', DEFAULT_FONT_SIZE)
  }
}

export default defineAppSetup(({ app, router }) => {
  // Register Theorem component globally
  app.component('Theorem', Theorem)

  const updateFontSize = (route: RouteLocationNormalized | undefined) => {
    const frontmatter = route?.meta?.slide?.frontmatter ?? {}
    const size = normalizeFontSize(frontmatter?.fontsize)
    applyFontSize(size)
  }

  // Apply font size for the initial route
  updateFontSize(router.currentRoute.value)
  
  // Reset theorem counters and update font sizing when navigating
  router.afterEach((to) => {
    updateFontSize(to)
    if (to.path === '/1' || to.path === '/') {
      resetTheoremCounters()
    }
  })
})
