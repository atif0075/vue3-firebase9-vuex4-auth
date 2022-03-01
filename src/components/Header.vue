<template>
  <nav
    v-if="store.state.isReady"
    class="nav w-full flex flex-wrap items-center justify-between px-4"
  >
    <div class="flex flex-no-shrink items-center mr-6 py-3 text-grey-darkest">
      <span class="font-semibold text-xl tracking-tight">To Vue</span>
    </div>

    <input class="menu-btn hidden" type="checkbox" id="menu-btn" />
    <label
      class="menu-icon block cursor-pointer lg:hidden px-2 py-4 relative select-none"
      for="menu-btn"
    >
      <span id="bar" class="navicon bg-dark flex items-center relative"></span>
    </label>

    <ul
      class="menu border-b lg:border-none flex justify-end list-reset m-0 w-full lg:w-auto absolute z-50 left-0 lg:static top-14 bg-gray-100"
    >
      <li class="border-t lg:border-none">
        <router-link
          @click="hide"
          to="/"
          class="block lg:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"
        >Home</router-link>
      </li>
      <li class="border-t lg:border-none">
        <router-link
          @click="hide"
          to="/global"
          class="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"
        >Global</router-link>
      </li>
      <li class="border-t lg:border-none">
        <router-link
          @click="hide"
          to="/profile"
          class="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"
        >View Profile</router-link>
      </li>

      <li v-if="!store.state.user" class="border-t lg:border-none">
        <router-link
          @click="hide"
          to="/signin"
          class="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"
        >Sign in</router-link>
      </li>
      <li v-if="store.state.user" class="border-t lg:border-none">
        <button
          @click="handleClick"
          class="block md:inline-block w-full text-red font-semibold px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"
        >Sign out</button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">

import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";
let store = useStore();
let router = useRouter();
let error = ref(null);


let handleClick = () => {
  try {
    setTimeout(() => {
      router.push("/signin");
      store.dispatch("signOut");
    }, 700);
    hide()
  } catch (err: any) {
    error.value = err;
  }
};



function hide() {
  let element: HTMLElement = document.getElementById('bar') as HTMLElement;
  element.click();
}


</script>
<style>
@media (max-width: 1024px) {
  .navicon {
    width: 1.125em;
    height: 0.125em;
  }

  .navicon::before,
  .navicon::after {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.2s ease-out;
    content: "";
    background: #3d4852;
  }

  .navicon::before {
    top: 5px;
  }

  .navicon::after {
    top: -5px;
  }

  .menu-btn:not(:checked) ~ .menu {
    display: none;
  }

  .menu-btn:checked ~ .menu {
    display: block;
  }

  .menu-btn:checked ~ .menu-icon .navicon {
    background: transparent;
  }

  .menu-btn:checked ~ .menu-icon .navicon::before {
    transform: rotate(-45deg);
  }

  .menu-btn:checked ~ .menu-icon .navicon::after {
    transform: rotate(45deg);
  }

  .menu-btn:checked ~ .menu-icon .navicon::before,
  .menu-btn:checked ~ .menu-icon .navicon::after {
    top: 0;
  }
}
</style>