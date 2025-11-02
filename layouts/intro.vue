<template>
  <div class="slidev-layout intro h-full flex flex-col">
    <div
      ref="contentWrapperRef"
      class="flex-grow flex flex-col justify-center intro-content"
    >
      <div
        ref="contentInnerRef"
        class="content-inner"
        :style="computedStyles"
      >
        <slot />
      </div>
    </div>
    <ScholarlyFooter class="flex-shrink-0" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScholarlyFooter from '../components/ScholarlyFooter.vue'
import { useAutoFontSize } from '../utils/useAutoFontSize'
import { useFontSizeStyles } from '../utils/useFontSizeStyles'

const contentWrapperRef = ref<HTMLElement>()
const contentInnerRef = ref<HTMLElement>()
const { fontSize: contentFontSize } = useAutoFontSize(contentWrapperRef, contentInnerRef)
const computedStyles = useFontSizeStyles(contentFontSize)
</script>

<style scoped>
.slidev-layout.intro {
  @apply h-full grid;
}

.intro-content {
  padding-top: 0;
  padding-bottom: 35px; /* Space for fixed footer */
  padding-left: 2rem;
  padding-right: 2rem;
}

.intro-content :deep(h1),
.intro-content :deep(h2),
.intro-content :deep(h3),
.intro-content :deep(p),
.intro-content :deep(ul),
.intro-content :deep(ol) {
  text-align: left;
}

.content-inner {
  width: 100%;
}
</style>
