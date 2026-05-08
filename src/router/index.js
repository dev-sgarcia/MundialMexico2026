import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Acceso from '@/views/Acceso.vue'
import Reglas from '@/views/Reglas.vue'
import Donacion from '@/views/Donacion.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/acceso',
    name: 'Acceso',
    component: () => import('@/views/Acceso.vue')
  },
  {
    path: '/reglas',
    name: 'Reglas',
    component: () => import('@/views/Reglas.vue')
  },
  {
  path: '/donacion',
  name: 'Donacion',
  component: () => import('@/views/Donacion.vue')
  },
  {
    path:'/juega',
    name:'Juega',
    component: () => import('@/views/Juega.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router