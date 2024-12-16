import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '@/views/Login.vue'
import '../assets/main.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/sign',
      name: 'SignDocument',
      component: () => import('../views/SignDocument.vue'),
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: () => import('../views/UserProfile.vue'),
    },
  ],
})

export default router
