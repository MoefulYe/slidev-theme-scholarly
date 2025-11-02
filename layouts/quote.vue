<template>
  <div class="slidev-layout quote h-full flex flex-col">
    <ScholarlyHeader class="flex-shrink-0" />
    <div class="flex-grow flex flex-col justify-center items-center text-center quote-content" :style="computedStyles">
      <slot />
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
