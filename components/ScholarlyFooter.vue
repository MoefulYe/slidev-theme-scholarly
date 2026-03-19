<template>
  <footer class="fixed bottom-0 left-0 right-0 z-50">
    <div class="beamer-footer">
      <div class="beamer-footer-left">{{ leftContent }}</div>
      <div class="beamer-footer-center">{{ middleContent }}</div>
      <div class="beamer-footer-right">
        <div
          v-if="showInteractiveControls"
          class="beamer-footer-toolbar"
        >
          <BeamerNavControls />
          <FooterTocControl />
          <span
            class="beamer-footer-page"
            :style="pageNumberStyle"
          >
            <span class="beamer-footer-page-slot beamer-footer-page-current">{{ $slidev.nav.currentPage }}</span>
            <span class="beamer-footer-page-separator">/</span>
            <span class="beamer-footer-page-slot beamer-footer-page-total">{{ $slidev.nav.total }}</span>
          </span>
        </div>
        <span
          v-else
          class="beamer-footer-page"
          :class="{ 'is-plain': showStaticPageNumber }"
          :style="pageNumberStyle"
        >
          <span class="beamer-footer-page-slot beamer-footer-page-current">{{ $slidev.nav.currentPage }}</span>
          <span class="beamer-footer-page-separator">/</span>
          <span class="beamer-footer-page-slot beamer-footer-page-total">{{ $slidev.nav.total }}</span>
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import BeamerNavControls from './BeamerNavControls.vue'
import FooterTocControl from './FooterTocControl.vue'
import { isInteractiveSlideRoute, isPrintExportRoute } from '../utils/presentationMode'

interface Author {
  name?: string
  institution?: string
  email?: string
}

const props = defineProps<{
  authors?: Author[]
  footerLeft?: string
  footerMiddle?: string
}>()

// Get configs from useSlideContext
const { $slidev } = useSlideContext()
const slidevConfigs = computed(() => ($slidev.configs as any) || {})
const showInteractiveControls = computed(() => isInteractiveSlideRoute())
const showStaticPageNumber = computed(() => isPrintExportRoute())
const pageNumberStyle = computed(() => {
  const totalDigits = Math.max(String($slidev.nav.total || 0).length, 1)
  return {
    '--scholarly-page-slot-width': `${totalDigits}ch`,
  }
})

// Parse authors from authors array (frontmatter)
const parsedAuthors = computed(() => {
  // Only read from global frontmatter config (first page)
  const globalAuthors = slidevConfigs.value?.authors
  if (globalAuthors && Array.isArray(globalAuthors) && globalAuthors.length > 0) {
    return globalAuthors as Author[]
  }
  
  return []
})

// Left content: custom or author(s)
const leftContent = computed(() => {
  // Only read from global frontmatter config (first page)
  const footerLeft = slidevConfigs.value?.footerLeft
  if (footerLeft) {
    return footerLeft
  }
  
  if (parsedAuthors.value.length > 0) {
    if (parsedAuthors.value.length === 1) {
      return parsedAuthors.value[0].name
    } else if (parsedAuthors.value.length === 2) {
      return parsedAuthors.value.map(a => a.name).join(' & ')
    } else if (parsedAuthors.value.length === 3) {
      return parsedAuthors.value.map(a => a.name).join(', ')
    } else {
      // More than 3 authors: show "First Author et al."
      return `${parsedAuthors.value[0].name} et al.`
    }
  }
  // Fallback to simple author field
  return slidevConfigs.value?.author || ''
})

// Middle content: custom or conference
const middleContent = computed(() => {
  // Only read from global frontmatter config (first page)
  const footerMiddle = slidevConfigs.value?.footerMiddle
  if (footerMiddle) {
    return footerMiddle
  }
  // Fallback to conference field for backward compatibility
  return slidevConfigs.value?.conference || ''
})
</script>
