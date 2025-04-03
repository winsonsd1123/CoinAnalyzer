<template>
  <div class="prototype-container">
    <div v-if="mounted">
      <component :is="HomePageComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'

const mounted = ref(false)
const HomePageComponent = defineAsyncComponent(() => import('~/pages/home.vue'))

onMounted(() => {
  mounted.value = true
})
</script>

<style scoped>
.prototype-container {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
