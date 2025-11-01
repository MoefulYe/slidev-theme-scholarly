<template>
  <CenteredLayout 
    layout-name="section" 
    max-width="full" 
    :show-header="false"
    custom-spacing="1rem"
  >
    <slot />
  </CenteredLayout>
</template>

<script setup lang="ts">
import CenteredLayout from '../components/CenteredLayout.vue'
</script>
