<template>
  <div class="slidev-layout two-cols grid grid-cols-2 gap-x-4 h-full" style="grid-template-rows: auto 1fr auto;">
    <ScholarlyHeader class="col-span-2" />
    <div class="col-left content-wrapper-left" :style="computedStyles">
      <slot name="left">
        <slot />
      </slot>
    </div>
    <div class="col-right content-wrapper-right" :style="computedStyles">
      <slot name="right" />
    </div>
    <ScholarlyFooter class="col-span-2" />
  </div>
</template>

<script setup lang="ts">
import ScholarlyHeader from '../components/ScholarlyHeader.vue'
import ScholarlyFooter from '../components/ScholarlyFooter.vue'
import { useFontSizeStyles } from '../utils/useFontSizeStyles'

const computedStyles = useFontSizeStyles()
</script>

<style scoped>
.content-wrapper-left,
.content-wrapper-right {
  padding-top: 60px; /* Space for fixed header */
  padding-bottom: 35px; /* Space for fixed footer */
  align-self: start;
}
</style>
