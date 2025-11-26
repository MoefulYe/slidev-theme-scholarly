<template>
  <div class="slidev-layout focus flex flex-col h-full">
    <div class="flex-grow flex items-center justify-center">
      <div class="focus-content" :class="[`focus-${color}`]">
        <div class="focus-icon" v-if="icon">{{ icon }}</div>
        <div class="focus-main" :style="computedStyles">
          <slot />
        </div>
      </div>
    </div>
    <ScholarlyFooter class="flex-shrink-0" />
  </div>
</template>

<script setup lang="ts">
import ScholarlyFooter from '../components/ScholarlyFooter.vue'
import { useFontSizeStyles } from '../utils/useFontSizeStyles'

defineProps<{
  /** Accent color: primary (default), blue, green, amber, red, purple */
  color?: 'primary' | 'blue' | 'green' | 'amber' | 'red' | 'purple'
  /** Optional emoji or icon to display above content */
  icon?: string
}>()

const computedStyles = useFontSizeStyles()
</script>

<style scoped>
.focus-content {
  text-align: center;
  max-width: 80%;
  padding: 3rem;
  border-radius: 1rem;
  position: relative;
}

.focus-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.focus-main :deep(h1) {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.focus-main :deep(p) {
  font-size: 1.5rem;
  opacity: 0.8;
  margin: 0;
}

/* Color variants with subtle backgrounds */
.focus-primary {
  background: linear-gradient(135deg, rgba(93, 131, 146, 0.1) 0%, rgba(93, 131, 146, 0.05) 100%);
  border-left: 4px solid #5d8392;
}

.focus-blue {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
  border-left: 4px solid #3b82f6;
}

.focus-green {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%);
  border-left: 4px solid #10b981;
}

.focus-amber {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%);
  border-left: 4px solid #f59e0b;
}

.focus-red {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
  border-left: 4px solid #ef4444;
}

.focus-purple {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
  border-left: 4px solid #8b5cf6;
}
</style>
