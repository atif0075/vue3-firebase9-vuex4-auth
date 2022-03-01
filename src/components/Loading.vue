<template>
  <section class :class="[h, ' w-full flex justify-center items-center']">
    <main class="h-7 w-7 bg-dark animate-spin"></main>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  h: String
})

</script>
