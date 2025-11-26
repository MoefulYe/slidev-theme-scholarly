<template>
  <div class="slidev-layout bullets flex flex-col h-full">
    <ScholarlyHeader v-if="hasHeader" class="flex-shrink-0" />
    <div class="flex-grow bullets-container" :class="{ 'has-header': hasHeader }">
      <div class="bullets-content" :style="computedStyles">
        <slot />
      </div>
    </div>
    <ScholarlyFooter class="flex-shrink-0" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import ScholarlyHeader from '../components/ScholarlyHeader.vue'
import ScholarlyFooter from '../components/ScholarlyFooter.vue'
import { useFontSizeStyles } from '../utils/useFontSizeStyles'

const { $frontmatter } = useSlideContext()

const hasHeader = computed(() => {
  return !!($frontmatter?.title || $frontmatter?.subtitle)
})

const computedStyles = useFontSizeStyles()
</script>

<style scoped>
.bullets-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 3rem 35px;
}

.bullets-container.has-header {
  padding-top: 60px;
}

.bullets-content {
  max-width: 90%;
}

/* Enhanced bullet styling */
.bullets-content :deep(h1),
.bullets-content :deep(h2) {
  margin-bottom: 1.5rem;
  color: var(--slidev-theme-primary, #5d8392);
}

.bullets-content :deep(ul) {
  list-style: none;
  padding: 0;
  margin: 0;
}

.bullets-content :deep(ul > li) {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  line-height: 1.6;
}

.bullets-content :deep(ul > li::before) {
  content: "▸";
  position: absolute;
  left: 0;
  color: var(--slidev-theme-primary, #5d8392);
  font-weight: bold;
}

/* Nested list styling */
.bullets-content :deep(ul ul) {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
}

.bullets-content :deep(ul ul > li) {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
}

.bullets-content :deep(ul ul > li::before) {
  content: "–";
  color: #9ca3af;
}

/* Ordered list styling */
.bullets-content :deep(ol) {
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: item;
}

.bullets-content :deep(ol > li) {
  position: relative;
  padding-left: 2.5rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  line-height: 1.6;
  counter-increment: item;
}

.bullets-content :deep(ol > li::before) {
  content: counter(item);
  position: absolute;
  left: 0;
  width: 1.75rem;
  height: 1.75rem;
  background: var(--slidev-theme-primary, #5d8392);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 600;
}

/* Strong text emphasis */
.bullets-content :deep(strong) {
  color: var(--slidev-theme-primary, #5d8392);
}
</style>
