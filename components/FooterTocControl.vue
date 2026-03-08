<template>
  <div
    v-if="tocEnabled"
    class="footer-toc-control"
  >
    <button
      type="button"
      class="beamer-nav-button beamer-nav-button-toc"
      :class="{ 'is-active': isOpen }"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="panelId"
      aria-haspopup="dialog"
      :aria-label="isOpen ? labels.close : labels.open"
      :title="isOpen ? labels.close : labels.open"
      @click="togglePanel"
    >
      <svg
        class="beamer-nav-toc-icon"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M3 3.5V12.5" />
        <path d="M5.5 4H13" />
        <path d="M5.5 8H13" />
        <path d="M5.5 12H10.5" />
      </svg>
    </button>

    <Transition name="footer-toc-backdrop">
      <button
        v-if="isOpen"
        type="button"
        class="footer-toc-backdrop"
        :aria-label="labels.close"
        @click="closePanel"
      />
    </Transition>

    <Transition name="footer-toc-panel">
      <div
        v-if="isOpen"
        :id="panelId"
        class="footer-toc-panel"
        :aria-label="labels.title"
        role="dialog"
        aria-modal="false"
      >
        <div class="footer-toc-panel-header">
          <div class="footer-toc-panel-heading">
            <div class="footer-toc-panel-title">{{ labels.title }}</div>
            <div class="footer-toc-panel-subtitle">{{ labels.subtitle }}</div>
          </div>
          <button
            type="button"
            class="footer-toc-panel-close"
            :aria-label="labels.close"
            @click="closePanel"
          >
            <svg
              class="footer-toc-panel-close-icon"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path d="M5 5L11 11" />
              <path d="M11 5L5 11" />
            </svg>
          </button>
        </div>

        <div class="footer-toc-panel-body">
          <p
            v-if="sectionGroups.length === 0"
            class="footer-toc-empty"
          >
            {{ labels.empty }}
          </p>

          <template v-else>
            <div
              v-for="section in sectionGroups"
              :key="`section-${section.no}-${section.title}`"
              class="footer-toc-section"
              :class="{ 'is-active': section.active }"
            >
              <button
                type="button"
                class="footer-toc-section-header"
                @click="navigateToSlide(section.no)"
              >
                <span class="footer-toc-section-index">{{ section.no }}</span>
                <span class="footer-toc-section-title">{{ section.title }}</span>
              </button>

              <div
                v-if="section.slides.length > 0"
                class="footer-toc-slides"
              >
                <button
                  v-for="slide in section.slides"
                  :key="`slide-${slide.no}`"
                  type="button"
                  class="footer-toc-slide"
                  :class="{ 'is-active': slide.active }"
                  @click="navigateToSlide(slide.no)"
                >
                  <span class="footer-toc-slide-index">{{ slide.no }}</span>
                  <span class="footer-toc-slide-title">{{ slide.title }}</span>
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSlideContext } from '@slidev/client'
import { isInteractiveSlideRoute } from '../utils/presentationMode'

interface TocSlideItem {
  no: number
  title: string
  active: boolean
}

interface TocSectionGroup {
  no: number
  title: string
  active: boolean
  slides: TocSlideItem[]
}

const panelOpen = ref<boolean | null>(null)

const { $slidev } = useSlideContext()
const slidevConfigs = computed(() => ($slidev.configs as any) || {})
const themeConfig = computed(() => slidevConfigs.value?.themeConfig || {})
const currentPage = computed(() => $slidev.nav.currentPage)
const allSlides = computed(() => (($slidev.nav as any).slides || []) as any[])

const tocEnabled = computed(() => {
  const enabled = themeConfig.value?.outlineToc ?? themeConfig.value?.outlineSidebar
  if (enabled !== true)
    return false

  return isInteractiveSlideRoute()
})

const initialOpen = computed(() => {
  return themeConfig.value?.outlineTocOpen === true || themeConfig.value?.outlineSidebarOpen === true
})

if (panelOpen.value === null)
  panelOpen.value = initialOpen.value

const isOpen = computed(() => panelOpen.value === true)
const panelId = 'scholarly-footer-toc-panel'

const isChinese = computed(() => `${slidevConfigs.value?.lang || ''}`.toLowerCase().startsWith('zh'))

const labels = computed(() => {
  if (isChinese.value) {
    return {
      title: '演示目录',
      subtitle: '按 section 分组，点击即可跳转',
      open: '打开目录面板',
      close: '关闭目录面板',
      empty: '当前没有可显示的目录项。请使用 section 页，或为幻灯片添加标题。',
      ungrouped: '开场',
    }
  }

  return {
    title: 'Presentation Outline',
    subtitle: 'Grouped by section for quick jumps',
    open: 'Open outline panel',
    close: 'Close outline panel',
    empty: 'No outline items available. Add section slides or slide titles.',
    ungrouped: 'Opening',
  }
})

const getSlideTitle = (slide: any, fallback: string) => {
  const title = slide?.meta?.slide?.title
    || slide?.meta?.slide?.frontmatter?.title
    || slide?.frontmatter?.title

  if (typeof title === 'string' && title.trim())
    return title.trim()

  const rawContent = slide?.meta?.slide?.content || slide?.content || ''
  const h1Match = rawContent.match(/^#\s+(.+)$/m)
  if (h1Match?.[1]?.trim())
    return h1Match[1].trim()

  return fallback
}

const sectionGroups = computed<TocSectionGroup[]>(() => {
  const groups: TocSectionGroup[] = []
  let currentGroup: TocSectionGroup | null = null

  const ensureOpeningGroup = () => {
    if (!currentGroup) {
      currentGroup = {
        no: 1,
        title: labels.value.ungrouped,
        active: false,
        slides: [],
      }
      groups.push(currentGroup)
    }
    return currentGroup
  }

  for (let i = 0; i < allSlides.value.length; i++) {
    const slide = allSlides.value[i]
    const frontmatter = slide?.meta?.slide?.frontmatter || slide?.frontmatter || {}
    const layout = frontmatter.layout || (i === 0 ? 'cover' : 'default')
    const hideInToc = Boolean(frontmatter.hideInToc)
    const slideNo = i + 1

    if (layout === 'section') {
      if (hideInToc)
        continue

      currentGroup = {
        no: slideNo,
        title: getSlideTitle(slide, `Section ${groups.length + 1}`),
        active: false,
        slides: [],
      }
      groups.push(currentGroup)
      continue
    }

    if (hideInToc)
      continue

    const title = getSlideTitle(slide, '')
    if (!title)
      continue

    const targetGroup = currentGroup || ensureOpeningGroup()
    targetGroup.slides.push({
      no: slideNo,
      title,
      active: currentPage.value === slideNo,
    })
  }

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i]
    const nextGroup = groups[i + 1]
    const inCurrentRange = currentPage.value >= group.no && (!nextGroup || currentPage.value < nextGroup.no)
    group.active = inCurrentRange || group.slides.some(slide => slide.active)
  }

  return groups
})

const closePanel = () => {
  panelOpen.value = false
}

const togglePanel = () => {
  panelOpen.value = !isOpen.value
}

const navigateToSlide = async (slideNo: number) => {
  if (slideNo <= 0)
    return

  await $slidev.nav.go(slideNo)
  closePanel()
}
</script>

<style scoped>
.footer-toc-control {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.footer-toc-backdrop {
  position: fixed;
  inset: 0;
  z-index: 54;
  border: 0;
  background: transparent;
}

.footer-toc-panel {
  position: fixed;
  right: 0.9rem;
  bottom: calc(var(--scholarly-footer-height) + 0.4rem);
  z-index: 55;
  width: min(13.9rem, calc(100vw - 1.4rem));
  max-height: min(18.5rem, calc(100vh - var(--scholarly-header-height) - var(--scholarly-footer-height) - 1.05rem));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(30, 58, 95, 0.12);
  border-radius: 0.88rem;
  background: rgba(253, 251, 247, 0.98);
  background: color-mix(in srgb, var(--scholarly-bg-warm, #fdfbf7) 94%, white);
  color: var(--scholarly-text-primary, #2d3748);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.14), 0 4px 12px rgba(15, 23, 42, 0.07);
  backdrop-filter: blur(14px);
}

.footer-toc-panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.58rem 0.42rem;
  border-bottom: 1px solid rgba(30, 58, 95, 0.08);
}

.footer-toc-panel-heading {
  min-width: 0;
}

.footer-toc-panel-title {
  font-family: var(--scholarly-font-sans);
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.005em;
  color: var(--slidev-theme-primary, #1e3a5f);
}

.footer-toc-panel-subtitle {
  margin-top: 0.08rem;
  font-size: 0.58rem;
  line-height: 1.28;
  color: rgba(45, 55, 72, 0.72);
}

.footer-toc-panel-close {
  width: 1.24rem;
  height: 1.24rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(30, 58, 95, 0.1);
  border-radius: 999px;
  background: rgba(30, 58, 95, 0.08);
  color: var(--slidev-theme-primary, #1e3a5f);
  transition: background-color 140ms ease, border-color 140ms ease, transform 140ms ease;
}

.footer-toc-panel-close-icon {
  width: 0.6rem;
  height: 0.6rem;
  display: block;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.footer-toc-panel-body {
  flex: 1;
  overflow: auto;
  padding: 0.28rem 0.28rem 0.38rem;
  scrollbar-width: thin;
  scrollbar-gutter: stable;
}

.footer-toc-empty {
  margin: 0;
  padding: 0.42rem;
  font-size: 0.68rem;
  line-height: 1.38;
  color: rgba(45, 55, 72, 0.76);
}

.footer-toc-section + .footer-toc-section {
  margin-top: 0.24rem;
}

.footer-toc-section {
  padding: 0.14rem;
  border: 1px solid rgba(30, 58, 95, 0.08);
  border-radius: 0.68rem;
  background: rgba(255, 255, 255, 0.4);
}

.footer-toc-section.is-active {
  border-color: rgba(30, 58, 95, 0.16);
  background: rgba(255, 255, 255, 0.54);
}

.footer-toc-section-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.36rem;
  padding: 0.28rem 0.3rem;
  border: 0;
  border-radius: 0.52rem;
  background: transparent;
  color: inherit;
  text-align: left;
}

.footer-toc-section.is-active .footer-toc-section-header {
  background: rgba(30, 58, 95, 0.07);
}

.footer-toc-section-index,
.footer-toc-slide-index {
  min-width: 1.02rem;
  height: 1.02rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-family: var(--scholarly-font-sans);
  font-size: 0.52rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.footer-toc-section-index {
  background: var(--slidev-theme-primary, #1e3a5f);
  color: #fff;
}

.footer-toc-section-title {
  flex: 1;
  min-width: 0;
  font-family: var(--scholarly-font-sans);
  font-size: 0.66rem;
  font-weight: 700;
  line-height: 1.22;
  color: var(--slidev-theme-primary, #1e3a5f);
  overflow-wrap: anywhere;
}

.footer-toc-slides {
  margin-top: 0.04rem;
  padding-left: 0.1rem;
}

.footer-toc-slide {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 0.32rem;
  padding: 0.16rem 0.26rem;
  border: 0;
  border-radius: 0.46rem;
  background: transparent;
  color: inherit;
  text-align: left;
}

.footer-toc-slide:hover,
.footer-toc-slide:focus-visible,
.footer-toc-section-header:hover,
.footer-toc-section-header:focus-visible,
.footer-toc-panel-close:hover,
.footer-toc-panel-close:focus-visible {
  outline: none;
  background: rgba(30, 58, 95, 0.12);
}

.footer-toc-panel-close:hover,
.footer-toc-panel-close:focus-visible {
  border-color: rgba(30, 58, 95, 0.18);
  transform: translateY(-0.5px);
}

.footer-toc-slide-index {
  background: rgba(30, 58, 95, 0.08);
  color: var(--slidev-theme-primary, #1e3a5f);
}

.footer-toc-slide.is-active {
  background: rgba(30, 58, 95, 0.1);
}

.footer-toc-slide.is-active .footer-toc-slide-index {
  background: var(--slidev-theme-primary, #1e3a5f);
  color: #fff;
}

.footer-toc-slide-title {
  flex: 1;
  min-width: 0;
  font-size: 0.63rem;
  line-height: 1.24;
  overflow-wrap: anywhere;
}

.footer-toc-panel-enter-active,
.footer-toc-panel-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.footer-toc-panel-enter-from,
.footer-toc-panel-leave-to {
  opacity: 0;
  transform: translateY(0.35rem) scale(0.98);
}

.footer-toc-backdrop-enter-active,
.footer-toc-backdrop-leave-active {
  transition: opacity 160ms ease;
}

.footer-toc-backdrop-enter-from,
.footer-toc-backdrop-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .footer-toc-panel {
    right: 0.5rem;
    width: min(13rem, calc(100vw - 1rem));
  }
}

@media print {
  .footer-toc-control,
  .footer-toc-backdrop,
  .footer-toc-panel {
    display: none !important;
  }
}
</style>
