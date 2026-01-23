import { defineAppSetup } from '@slidev/types'
import { configs } from '@slidev/client'
import { watch } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import Theorem from '../components/Theorem.vue'
import Block from '../components/Block.vue'
import Columns from '../components/Columns.vue'
import Highlight from '../components/Highlight.vue'
import Cite from '../components/Cite.vue'
import Steps from '../components/Steps.vue'
import Keywords from '../components/Keywords.vue'
import ThemePreview from '../components/ThemePreview.vue'
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
  primaryLight?: string
  accent?: string
  bgWarm?: string
  textPrimary?: string
  headerBg?: string
  footerLeftBg?: string
  footerCenterBg?: string
  footerRightBg?: string
}

type ThemeConfig = {
  colorTheme?: string
  fontTheme?: string
  colorMode?: 'light' | 'dark'
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
  if (typeof window === 'undefined') return
  const root = document.documentElement
  const setVar = (name: string, value: string | null | undefined) => {
    if (typeof value === 'string' && value.trim())
      root.style.setProperty(name, value)
    else
      root.style.removeProperty(name)
  }

  setVar('--slidev-theme-primary', config?.primary)
  setVar('--slidev-theme-primary-light', config?.primaryLight)
  setVar('--scholarly-accent', config?.accent)
  setVar('--scholarly-bg-warm', config?.bgWarm)
  setVar('--scholarly-text-primary', config?.textPrimary)
  setVar('--scholarly-header-bg', config?.headerBg)
  setVar('--scholarly-footer-left-bg', config?.footerLeftBg)
  setVar('--scholarly-footer-center-bg', config?.footerCenterBg)
  setVar('--scholarly-footer-right-bg', config?.footerRightBg)
}

const applyThemePresets = (config: ThemeConfig | null | undefined) => {
  if (typeof window === 'undefined') return
  const root = document.documentElement
  const setAttr = (name: string, value: string | null | undefined) => {
    if (typeof value === 'string' && value.trim())
      root.setAttribute(name, value)
    else
      root.removeAttribute(name)
  }

  setAttr('data-color-theme', config?.colorTheme)
  setAttr('data-font-theme', config?.fontTheme)

  // Only force color mode if explicitly configured
  // Otherwise, sync with Slidev's built-in dark mode toggle (html.dark class)
  if (config?.colorMode) {
    setAttr('data-color-mode', config.colorMode)
  } else {
    // Sync with Slidev's dark class
    syncColorModeWithDark()
  }
}

// Sync data-color-mode with html.dark class (Slidev's built-in toggle)
const syncColorModeWithDark = () => {
  if (typeof window === 'undefined') return
  const root = document.documentElement
  const isDark = root.classList.contains('dark')
  root.setAttribute('data-color-mode', isDark ? 'dark' : 'light')
}

// Watch for Slidev's dark mode toggle (class changes on html element)
let darkModeObserver: MutationObserver | null = null

const setupDarkModeSync = (config: ThemeConfig | null | undefined) => {
  if (typeof window === 'undefined') return

  // If colorMode is explicitly set, don't sync with Slidev's toggle
  if (config?.colorMode) return

  // Clean up existing observer
  if (darkModeObserver) {
    darkModeObserver.disconnect()
    darkModeObserver = null
  }

  // Initial sync
  syncColorModeWithDark()

  // Watch for class changes on html element
  darkModeObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        syncColorModeWithDark()
      }
    }
  })

  darkModeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
}

export default defineAppSetup(({ app, router }) => {
  // Register components globally
  app.component('Theorem', Theorem)
  app.component('Block', Block)
  app.component('Columns', Columns)
  app.component('Highlight', Highlight)
  app.component('Cite', Cite)
  app.component('Steps', Steps)
  app.component('Keywords', Keywords)
  app.component('ThemePreview', ThemePreview)

  const getGlobalFontConfig = (): FontsizeConfig | undefined => {
    return (configs as any)?.fontsize as FontsizeConfig | undefined
  }

  const getThemeColorConfig = (): ThemeColorConfig | undefined => {
    return (configs as any)?.themeColors as ThemeColorConfig | undefined
  }

  const getThemeConfig = (): ThemeConfig | undefined => {
    return (configs as any)?.themeConfig as ThemeConfig | undefined
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

  // Apply theme colors and theme presets
  applyThemeColors(getThemeColorConfig())
  applyThemePresets(getThemeConfig())
  setupDarkModeSync(getThemeConfig())

  watch(
    () => router.currentRoute.value?.meta?.slide?.frontmatter?.fontsize,
    () => updateFontSize(router.currentRoute.value),
    { deep: true }
  )

  watch(
    () => (configs as any)?.fontsize as FontsizeConfig | undefined,
    () => updateFontSize(router.currentRoute.value),
    { deep: true }
  )

  watch(
    () => (configs as any)?.themeColors as ThemeColorConfig | undefined,
    (newConfig) => applyThemeColors(newConfig),
    { deep: true, immediate: true }
  )

  watch(
    () => (configs as any)?.themeConfig as ThemeConfig | undefined,
    (newConfig) => {
      applyThemePresets(newConfig)
      setupDarkModeSync(newConfig)
    },
    { deep: true, immediate: true }
  )

  // Reset theorem counters and update font sizing when navigating
  router.afterEach((to) => {
    updateFontSize(to)
    if (to.path === '/1' || to.path === '/') {
      resetTheoremCounters()
    }
  })
})
