<template>
  <div :class="['scholarly-cite', { 'cite-inline': inline }]">
    <span class="cite-marker">[{{ marker }}]</span>
    <span class="cite-content">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

interface Props {
  /** Citation number or key */
  id?: string | number
  /** Display inline (default) or as block */
  inline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  inline: true
})

const { $slidev } = useSlideContext()

// Auto-increment citation counter if no id provided
let assignedId = 0
if (typeof window !== 'undefined' && props.id === undefined) {
  const win = window as any
  if (!win.__citationCounter) {
    win.__citationCounter = 0
  }
  win.__citationCounter++
  assignedId = win.__citationCounter
}

const marker = computed(() => {
  if (props.id !== undefined) return props.id
  return assignedId
})
</script>

<style scoped>
.scholarly-cite {
  font-size: 0.85em;
  color: #64748b;
}

.scholarly-cite.cite-inline {
  display: inline;
}

.scholarly-cite:not(.cite-inline) {
  display: block;
  margin: 0.5rem 0;
  padding-left: 1.5em;
  text-indent: -1.5em;
}

.cite-marker {
  color: var(--slidev-theme-primary, #5d8392);
  font-weight: 500;
}

.cite-content {
  margin-left: 0.25em;
}

/* For reference lists at the end */
.scholarly-cite:not(.cite-inline) .cite-marker {
  display: inline-block;
  min-width: 2em;
  text-align: right;
  margin-right: 0.5em;
}
</style>
