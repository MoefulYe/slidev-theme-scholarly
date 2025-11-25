import { defineAppSetup } from '@slidev/types'
import { watch } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import Theorem from '../components/Theorem.vue'
import Block from '../components/Block.vue'
import Columns from '../components/Columns.vue'
import Highlight from '../components/Highlight.vue'
import Cite from '../components/Cite.vue'
import { resetTheoremCounters, invalidateTheoremCounterBases } from '../utils/theorem'

const DEFAULT_FONT_SIZE = '1rem'
type FontsizeConfig =
  | string
  | number
  | {
      body?: string | number
      h1?: string | number
      h2?: string | number
      h3?: string | number
    }

type ThemeColorConfig = {
  primary?: string
  headerBg?: string
  footerLeftBg?: string
  footerCenterBg?: string
  footerRightBg?: string
}

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

const parseFontConfig = (value: FontsizeConfig | null | undefined) => {
  if (value === null || value === undefined) {
    return {}
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const body = normalizeFontSize(value)
    return body ? { body } : {}
  }

  const result: { body?: string; h1?: string; h2?: string; h3?: string } = {}
  const config = value as { body?: unknown; h1?: unknown; h2?: unknown; h3?: unknown }

  const body = normalizeFontSize(config.body)
  if (body) result.body = body

  const h1 = normalizeFontSize(config.h1)
  if (h1) result.h1 = h1

  const h2 = normalizeFontSize(config.h2)
  if (h2) result.h2 = h2

  const h3 = normalizeFontSize(config.h3)
  if (h3) result.h3 = h3

  return result
}

const applyFontSizes = (
  localConfig: FontsizeConfig | null | undefined,
  globalConfig: FontsizeConfig | null | undefined,
) => {
  if (typeof window === 'undefined') return
  const targets = [document.documentElement, document.body].filter(Boolean) as HTMLElement[]
  if (!targets.length) return

  const local = parseFontConfig(localConfig)
  const global = parseFontConfig(globalConfig)

  const bodySize = local.body ?? global.body
  const h1Size = local.h1 ?? global.h1
  const h2Size = local.h2 ?? global.h2
  const h3Size = local.h3 ?? global.h3

  for (const el of targets) {
    el.style.setProperty('--scholarly-font-size', bodySize ?? DEFAULT_FONT_SIZE)

    if (h1Size) el.style.setProperty('--scholarly-h1-size', h1Size)
    else el.style.removeProperty('--scholarly-h1-size')

    if (h2Size) el.style.setProperty('--scholarly-h2-size', h2Size)
    else el.style.removeProperty('--scholarly-h2-size')

    if (h3Size) el.style.setProperty('--scholarly-h3-size', h3Size)
    else el.style.removeProperty('--scholarly-h3-size')
  }
}

const applyThemeColors = (config: ThemeColorConfig | null | undefined) => {
  if (typeof window === 'undefined' || !config) return
  const root = document.documentElement
  
  if (config.primary) {
    root.style.setProperty('--slidev-theme-primary', config.primary)
  }
  if (config.headerBg) {
    root.style.setProperty('--scholarly-header-bg', config.headerBg)
  }
  if (config.footerLeftBg) {
    root.style.setProperty('--scholarly-footer-left-bg', config.footerLeftBg)
  }
  if (config.footerCenterBg) {
    root.style.setProperty('--scholarly-footer-center-bg', config.footerCenterBg)
  }
  if (config.footerRightBg) {
    root.style.setProperty('--scholarly-footer-right-bg', config.footerRightBg)
  }
}

export default defineAppSetup(({ app, router }) => {
  // Register components globally
  app.component('Theorem', Theorem)
  app.component('Block', Block)
  app.component('Columns', Columns)
  app.component('Highlight', Highlight)
  app.component('Cite', Cite)

  const getGlobalFontConfig = (): FontsizeConfig | undefined => {
    const slidevConfigs = (app.config.globalProperties?.$slidev?.configs ?? {}) as Record<string, unknown>
    return slidevConfigs?.fontsize as FontsizeConfig | undefined
  }

  const getThemeColorConfig = (): ThemeColorConfig | undefined => {
    const slidevConfigs = (app.config.globalProperties?.$slidev?.configs ?? {}) as Record<string, unknown>
    return slidevConfigs?.themeColors as ThemeColorConfig | undefined
  }

  const updateFontSize = (route: RouteLocationNormalized | undefined) => {
    const frontmatter = route?.meta?.slide?.frontmatter ?? {}
    applyFontSizes(frontmatter?.fontsize as FontsizeConfig | undefined, getGlobalFontConfig())
    if (typeof window !== 'undefined') {
      invalidateTheoremCounterBases(route?.path)
    }
  }

  // Apply font size for the initial route
  updateFontSize(router.currentRoute.value)

  // Apply theme colors
  applyThemeColors(getThemeColorConfig())

  watch(
    () => router.currentRoute.value?.meta?.slide?.frontmatter?.fontsize,
    () => updateFontSize(router.currentRoute.value),
    { deep: true }
  )

  watch(
    () => app.config.globalProperties?.$slidev?.configs?.fontsize as FontsizeConfig | undefined,
    () => updateFontSize(router.currentRoute.value),
    { deep: true }
  )

  watch(
    () => app.config.globalProperties?.$slidev?.configs?.themeColors as ThemeColorConfig | undefined,
    (newConfig) => applyThemeColors(newConfig),
    { deep: true }
  )
  
  // Reset theorem counters and update font sizing when navigating
  router.afterEach((to) => {
    updateFontSize(to)
    if (to.path === '/1' || to.path === '/') {
      resetTheoremCounters()
    }
  })
})
