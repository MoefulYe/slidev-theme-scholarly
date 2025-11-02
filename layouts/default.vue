<template>
  <div class="slidev-layout default flex flex-col h-full">
    <ScholarlyHeader ref="headerRef" class="flex-shrink-0" />
    <div
      ref="contentWrapperRef"
      class="flex-grow overflow-auto content-wrapper"
      :class="{ 'no-header': !hasHeaderContent }"
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
import { ref, computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import ScholarlyHeader from '../components/ScholarlyHeader.vue'
import ScholarlyFooter from '../components/ScholarlyFooter.vue'
import { useAutoFontSize } from '../utils/useAutoFontSize'
import { useFontSizeStyles } from '../utils/useFontSizeStyles'

const { $slidev } = useSlideContext()
const headerRef = ref()
const contentWrapperRef = ref<HTMLElement>()
const contentInnerRef = ref<HTMLElement>()

const { fontSize: contentFontSize } = useAutoFontSize(contentWrapperRef, contentInnerRef)

const hasHeaderContent = computed(() => {
  const frontmatter = ($slidev?.nav?.currentSlideRoute?.meta?.slide as any)?.frontmatter
  return !!(frontmatter?.title || frontmatter?.subtitle)
})

const computedStyles = useFontSizeStyles(contentFontSize)
</script>

<style scoped>
.content-wrapper {
  padding-top: 50px; /* Space for fixed header when it has content */
  padding-bottom: 35px; /* Space for fixed footer */
  padding-left: 0;
  padding-right: 0;
  width: 100%;
  box-sizing: border-box;
}

.content-wrapper.no-header {
  padding-top: 0;
}

.content-wrapper :deep(h1),
.content-wrapper :deep(h2),
.content-wrapper :deep(h3),
.content-wrapper :deep(p),
.content-wrapper :deep(ul),
.content-wrapper :deep(ol) {
  text-align: left;
}

.content-wrapper :deep(.theorem-box) {
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}

.content-inner {
  width: 100%;
}

</style>
