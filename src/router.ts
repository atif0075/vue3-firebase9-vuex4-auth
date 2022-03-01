import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/signin',
    component: () => import('./pages/Signin.vue'),
    name: 'Signin',
    meta: {
      title: 'Signin'
    }
  },
  {
    path: '/signup',
    component: () => import('./pages/Signup.vue'),
    name: 'Signup',
    meta: {
      title: 'Signup'
    }
  },


  {
    path: '/profile',
    component: () => import('./pages/Profile.vue'),
    name: 'Profile',
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/global',
    component: () => import('./pages/Global.vue'),
    name: 'Global',
    meta: {
      title: 'Global'
    }
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('./pages/Error404.vue'),
    name: 'Error404',
    meta: {
      title: '404'
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'font-bold'
})
router.beforeEach((to, from, next) => {
  document.title = `To Vue - ${to.meta.title}`;
  next();
})
export default router
