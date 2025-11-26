<template>
  <div class="slidev-layout references flex flex-col h-full">
    <ScholarlyHeader title="References" class="flex-shrink-0" />
    <div class="flex-grow references-container">
      <div class="references-content" :style="computedStyles">
        <slot />
      </div>
    </div>
    <ScholarlyFooter class="flex-shrink-0" />
  </div>
</template>

<script setup lang="ts">
import ScholarlyHeader from '../components/ScholarlyHeader.vue'
import ScholarlyFooter from '../components/ScholarlyFooter.vue'
import { useFontSizeStyles } from '../utils/useFontSizeStyles'

const computedStyles = useFontSizeStyles()
</script>

<style scoped>
.references-container {
  display: flex;
  flex-direction: column;
  padding: 55px 2.5rem 35px;
  overflow: auto;
}

.references-content {
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Style ordered lists as bibliography */
.references-content :deep(ol) {
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: ref;
}

.references-content :deep(ol > li) {
  position: relative;
  padding-left: 2.5rem;
  margin-bottom: 0.875rem;
  text-indent: -0.5rem;
  padding-right: 1rem;
  counter-increment: ref;
}

.references-content :deep(ol > li::before) {
  content: "[" counter(ref) "]";
  position: absolute;
  left: 0;
  color: var(--slidev-theme-primary, #5d8392);
  font-weight: 500;
  font-size: 0.9em;
}

/* Style unordered lists */
.references-content :deep(ul) {
  list-style: none;
  padding: 0;
  margin: 0;
}

.references-content :deep(ul > li) {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 0.875rem;
}

.references-content :deep(ul > li::before) {
  content: "•";
  position: absolute;
  left: 0.5rem;
  color: var(--slidev-theme-primary, #5d8392);
}

/* Author names */
.references-content :deep(strong) {
  font-weight: 600;
}

/* Paper titles */
.references-content :deep(em) {
  font-style: italic;
}

/* Links */
.references-content :deep(a) {
  color: var(--slidev-theme-primary, #5d8392);
  text-decoration: none;
}

.references-content :deep(a:hover) {
  text-decoration: underline;
}

/* Two column layout for many references */
.references-content.two-columns {
  column-count: 2;
  column-gap: 2rem;
}
</style>
