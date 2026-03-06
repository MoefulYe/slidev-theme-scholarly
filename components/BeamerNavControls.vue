<template>
  <div
    v-if="showNavControls"
    class="beamer-footer-nav"
    role="group"
    :aria-label="labels.group"
  >
    <button
      type="button"
      class="beamer-nav-button"
      :disabled="!$slidev.nav.hasPrev"
      :title="labels.first"
      :aria-label="labels.first"
      @click="$slidev.nav.goFirst()"
    >
      {{ '|<' }}
    </button>
    <button
      type="button"
      class="beamer-nav-button"
      :disabled="!$slidev.nav.hasPrev"
      :title="labels.previous"
      :aria-label="labels.previous"
      @click="$slidev.nav.prev()"
    >
      {{ '<' }}
    </button>
    <button
      type="button"
      class="beamer-nav-button"
      :disabled="!$slidev.nav.hasNext"
      :title="labels.next"
      :aria-label="labels.next"
      @click="$slidev.nav.next()"
    >
      {{ '>' }}
    </button>
    <button
      type="button"
      class="beamer-nav-button"
      :disabled="!$slidev.nav.hasNext"
      :title="labels.last"
      :aria-label="labels.last"
      @click="$slidev.nav.goLast()"
    >
      {{ '>|' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $slidev } = useSlideContext()
const slidevConfigs = computed(() => ($slidev.configs as any) || {})

const showNavControls = computed(() => {
  if (slidevConfigs.value?.themeConfig?.beamerNav === false)
    return false

  if (typeof window === 'undefined')
    return false

  const path = window.location.pathname
  const search = window.location.search
  const isEmbedded = search.includes('embedded')
  const isPrintMode = search.includes('print') || path.includes('/export') || path.includes('/print')
  const isPlayRoute = !path.includes('/overview')
    && !path.includes('/notes')
    && !path.includes('/entry')
    && !path.includes('/presenter')
    && !path.includes('/export')
    && !path.includes('/print')

  return isPlayRoute && !isEmbedded && !isPrintMode
})

const isChinese = computed(() => `${slidevConfigs.value?.lang || ''}`.toLowerCase().startsWith('zh'))

const labels = computed(() => {
  if (isChinese.value) {
    return {
      group: '幻灯片导航按钮',
      first: '跳到第一页',
      previous: '上一页',
      next: '下一页',
      last: '跳到最后一页',
    }
  }

  return {
    group: 'Slide navigation buttons',
    first: 'Go to the first slide',
    previous: 'Go to the previous slide',
    next: 'Go to the next slide',
    last: 'Go to the last slide',
  }
})
</script>
