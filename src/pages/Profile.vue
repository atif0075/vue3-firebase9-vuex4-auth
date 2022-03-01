<script setup lang="ts">

import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore()
if (!store.state.user) {
    useRouter().push('/')
}
</script>
<template>
    <section
        v-if="store.state.user"
        class="h-full w-full flex flex-col justify-center items-center"
    >
        <div>
            <img class="rounded-full border-4 w-28 shadow-lg" :src="store.state.photo" alt="Hello" />
        </div>
        <h1 h1 class="text-xl py-3 font-bold">{{ store.state.name }}</h1>
        <p>{{ store.state.user.email }}</p>
    </section>
</template>

