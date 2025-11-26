<template>
  <div class="slidev-layout fact flex flex-col h-full">
    <div class="flex-grow fact-container">
      <div class="fact-content" :class="[`fact-${color}`]">
        <div class="fact-number" :style="computedStyles">
          <slot />
        </div>
        <div class="fact-decoration"></div>
      </div>
    </div>
    <ScholarlyFooter class="flex-shrink-0" />
  </div>
</template>

<script setup lang="ts">
import ScholarlyFooter from '../components/ScholarlyFooter.vue'
import { useFontSizeStyles } from '../utils/useFontSizeStyles'

defineProps<{
  /** Accent color */
  color?: 'primary' | 'blue' | 'green' | 'amber' | 'red'
}>()

const computedStyles = useFontSizeStyles()
</script>

<style scoped>
.fact-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.fact-content {
  text-align: center;
  position: relative;
}

.fact-number :deep(h1) {
  font-size: 6rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--fact-color-start), var(--fact-color-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.fact-number :deep(p) {
  font-size: 1.5rem;
  color: #6b7280;
  margin: 0;
}

.fact-number :deep(h2) {
  font-size: 2rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.fact-decoration {
  position: absolute;
  bottom: -1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--fact-color-start), var(--fact-color-end));
}

/* Color variants */
.fact-primary {
  --fact-color-start: #5d8392;
  --fact-color-end: #4a6b7a;
}

.fact-blue {
  --fact-color-start: #3b82f6;
  --fact-color-end: #1d4ed8;
}

.fact-green {
  --fact-color-start: #10b981;
  --fact-color-end: #059669;
}

.fact-amber {
  --fact-color-start: #f59e0b;
  --fact-color-end: #d97706;
}

.fact-red {
  --fact-color-start: #ef4444;
  --fact-color-end: #dc2626;
}
</style>
