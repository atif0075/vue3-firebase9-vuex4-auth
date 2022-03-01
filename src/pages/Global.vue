<template>
    <section class="p-12">
        <div class="grid grid-cols-4 gap-6 place-items-center">
            <div
                v-for="items in store.state.scores"
                :key="items"
                class="py-6 border-dashed border border-mid-dark rounded-lg shadow-lg bg-white grid place-items-center px-20 max-w-sm"
            >
                <h5 class="text-dark text-xl leading-tight font-medium mb-2">{{ items.name }}</h5>
                <p class="text-dark mb-4 text-5xl font-semibold pt-3">{{ items.score }}</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useStore } from "vuex";

const store = useStore()

const load = async () => {

    store.state.scores = []
    const Data = collection(db, "Users");
    try {
        const querySnapshot = await getDocs(Data);
        querySnapshot.forEach((doc) => {

            let obj: any = {}
            obj['name'] = doc.data().name
            obj['score'] = doc.data().score
            store.state.scores.push(obj)
        })
    } catch (err) {
        console.log(err)
    }
}
load()
</script>

<style>
</style>