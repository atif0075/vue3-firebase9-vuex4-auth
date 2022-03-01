<template>
  <section class="bg-light py-12 lg:py-12 text-dark">
    <div class="container">
      <div class="flex flex-wrap">
        <div class="w-full px-4">
          <div
            class="max-w-[525px] px-4 mx-auto text-center bg-white rounded-lg overflow-hidden py-12 sm:px-12 md:px-[60px]"
          >
            <div class="mb-10 text-xl font-bold md:mb-16 text-center">Signin to continue</div>
            <form @submit.prevent="handleSubmit">
              <div class="mb-6">
                <input
                  v-model="email"
                  required
                  type="email"
                  placeholder="Email"
                  class="w-full rounded-md border border-mid-dark border-dashed py-3 px-5 bg-mid-light text-base text-dark placeholder-mid-dark outline-none"
                />
              </div>
              <div class="mb-6">
                <input
                  v-model="password"
                  required
                  type="password"
                  placeholder="Password"
                  class="w-full rounded-md border border-mid-dark border-dashed py-3 px-5 bg-mid-light text-base text-dark placeholder-mid-dark outline-none"
                />
              </div>
              <div class="mb-10">
                <div class="w-full flex justify-center items-center">
                  <img class="w-12 py-2" src="../assets/cir.svg" v-if="isLoading" />
                </div>
                <button
                  class="w-full rounded-md py-3 px-5 text-base text-light bg-dark cursor-pointer hover:bg-opacity-90 transition"
                >Sign in</button>
              </div>
            </form>
            <p class="text-base mb-6 text-mid-dark">Connect With</p>
            <ul class="flex justify-between -mx-2 mb-12">
              <li class="px-2 w-full">
                <button
                  @click="store.dispatch('googleSignIn')"
                  class="flex h-11 w-full items-center justify-center rounded-md bg-red hover:bg-opacity-90"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.8477 8.17132H9.29628V10.643H15.4342C15.1065 14.0743 12.2461 15.5574 9.47506 15.5574C5.95916 15.5574 2.8306 12.8821 2.8306 9.01461C2.8306 5.29251 5.81018 2.47185 9.47506 2.47185C12.2759 2.47185 13.9742 4.24567 13.9742 4.24567L15.7024 2.47185C15.7024 2.47185 13.3783 0.000145544 9.35587 0.000145544C4.05223 -0.0289334 0 4.30383 0 8.98553C0 13.5218 3.81386 18 9.44526 18C14.4212 18 17.9967 14.7141 17.9967 9.79974C18.0264 8.78198 17.8477 8.17132 17.8477 8.17132Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </li>
            </ul>

            <p class="text-base text-mid-dark">
              Not a member yet?
              <router-link to="/signup" class="underline">Sign up</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
</style>
<script setup lang="ts">
import { doc, getDoc } from 'firebase/firestore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { db } from '@/firebase/config';
let isLoading = ref(false);
let email = ref('');
let password = ref('');
let isError = ref(false)
let error = ref('');

let store = useStore();
let router = useRouter();



const fetchData = async () => {
  console.clear()
  let email = store.state.user.email
  console.log(email)
  try {

    let docRef: any = doc(db, "Users", email);
    let docSnap: any = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().score);
      store.state.score = docSnap.data().score

    }
    else {
      console.log("No such document!");
    }
  }


  catch (error) {
    console.log(error)
  }
}



const handleSubmit = async () => {
  isLoading.value = true;
  try {
    console.log("starts")
    await store.dispatch('signin', {
      email: email.value,
      password: password.value,
    });

    let docRef: any = doc(db, "Users", email.value);
    let docSnap: any = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().score);
      store.state.score = docSnap.data().score

    }
    else {
      console.log("No such document!");
    }
    isLoading.value = false;
    setTimeout(() => {
      router.push('/');
    }, 2000);
  } catch (err: any) {
    error.value = err.message;
    isLoading.value = false;
    if (isError.value = true) {
      if ((error.value = 'Firebase: Error (auth/wrong-password).')) {
        error.value = 'Email or Password is incorrent';
      }
    }
    else {
      isError.value = false
    }
    setTimeout(() => {
      isError.value = false
      error.value = '';
    }, 4000);
  }
};
function check() {
  if (store.state.user) {
    router.push('/')
  }

}
setTimeout(() => {
  check()
}, 2000);
</script>


