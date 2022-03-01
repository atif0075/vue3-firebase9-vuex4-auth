<template>
    <section
        v-if="store.state.user"
        class="w-full h-auto flex flex-col justify-center items-center container mx-auto"
    >
        <h1 class="head">Add a count</h1>
        <p v-if="store.state.user != null">{{ store.state.user.email }}</p>
        <button @click="fetchData">Click</button>
        <main class="flex flex-col justify-center items-center my-10">
            <h1
                v-if="view"
                class="text-6xl sm:text-7xl md:text-9xl font-bold text-dark"
            >{{ store.state.score }}</h1>
            <img v-else src="../assets/puff.svg" class="w-28" />
            <div class="flex justify-between items-center w-auto my-10">
                <button @click="store.commit('plus', 1)" class="butn mx-3">Increase</button>
                <button @click="store.commit('less', 1)" class="butn mx-3">Decrease</button>
                <button @click="store.commit('reset', 0)" class="butn mx-3">Reset</button>
            </div>
            <div>
                <button @click="store.dispatch('setScore')" class="butn bg-red">Upload score</button>
            </div>
        </main>
    </section>
</template>

<script setup lang='ts'>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';


const router = useRouter()
const store = useStore()
if (!store.state.user) {
    router.push('/signin')
}



let view = ref(false)



const loadData = () => {
    setTimeout(() => {
        fetchData()
    }, 2000);
}


if (store.state.user) {
    loadData()
}


const fetchData = async () => {
    console.clear()
    let email = store.state.user.email
    console.log(email)
    try {
        let docRef: any = doc(db, "Users", email);
        let docSnap: any = await getDoc(docRef);

        console.log(store.state.name);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data().score);
            store.state.score = docSnap.data().score
            view.value = true
        }
        else {
            console.log("No such document!");
            view.value = true
        }
    }
    catch (error) {
        console.log(error)
    }
}

</script>

