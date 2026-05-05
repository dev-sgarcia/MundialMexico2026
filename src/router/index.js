import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Acceso from '@/views/Acceso.vue'
import Reglas from '@/views/Reglas.vue'

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
  },
  {
    path: '/reglas',
    name: 'Reglas',
    component: Reglas
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router