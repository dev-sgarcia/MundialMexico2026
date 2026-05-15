import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
  },
  {
    path: "/acceso",
    name: "Acceso",
    component: () => import("@/views/Acceso.vue"),
  },
  {
    path: "/reglas",
    name: "Reglas",
    component: () => import("@/views/Reglas.vue"),
  },
  {
    path: "/donacion",
    name: "Donacion",
    component: () => import("@/views/Donacion.vue"),
  },
  {
    path: "/juega",
    name: "Juega",
    component: () => import("@/views/Juega.vue"),
  },
  {
    path: "/predicciones",
    name: "Predicciones",
    component: () => import("@/views/Predicciones.vue"),
  },
  {
    path: "/resultados",
    name: "Resultados",
    component: () => import("@/views/Resultados.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
