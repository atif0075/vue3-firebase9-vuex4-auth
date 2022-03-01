<template>
  <section
    class="h-screen relative w-full flex justify-center items-center"
    v-if="!store.state.isReady"
  >
    <img src="./assets/Load.svg" class="w-36 md:w-72" />
  </section>
  <section class="min-h-screen bg-light">
    <Header />
    <router-view v-if="store.state.isReady"></router-view>
  </section>
</template>
<script lang="ts" setup>
import Header from './components/Header.vue';
import { useStore } from 'vuex';
const store = useStore()
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Alata&display=swap");
* {
  font-family: "Alata", sans-serif;
}
</style>