<template>
  <div :class="['scholarly-columns', `columns-${columnCount}`, { 'columns-balanced': balanced }]" :style="gridStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** Number of columns (2-4) */
  columns?: 2 | 3 | 4
  /** Column width ratio, e.g., "1:2" or "1:1:2" */
  ratio?: string
  /** Gap between columns */
  gap?: string
  /** Whether to balance content height across columns */
  balanced?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  columns: 2,
  ratio: undefined,
  gap: '1.5rem',
  balanced: false
})

const columnCount = computed(() => props.columns)

const gridStyle = computed(() => {
  let templateColumns: string
  
  if (props.ratio) {
    // Parse ratio like "1:2" or "1:1:2"
    const parts = props.ratio.split(':').map(Number)
    const total = parts.reduce((a: number, b: number) => a + b, 0)
    templateColumns = parts.map((p: number) => `${(p / total) * 100}%`).join(' ')
  } else {
    // Equal columns
    templateColumns = `repeat(${props.columns}, 1fr)`
  }
  
  return {
    display: 'grid',
    gridTemplateColumns: templateColumns,
    gap: props.gap,
    alignItems: props.balanced ? 'stretch' : 'start'
  }
})
</script>

<style scoped>
.scholarly-columns {
  width: 100%;
}

.scholarly-columns :deep(> *) {
  min-width: 0; /* Prevent overflow in grid children */
}

.scholarly-columns.columns-balanced :deep(> *) {
  display: flex;
  flex-direction: column;
}
</style>
