import { createRouter, createWebHistory } from 'vue-router'

import Home from '/src/views/Home.vue'
import Acceso from '/src/views/Acceso.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/acceso',
    name: 'Acceso',
    component: Acceso
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router