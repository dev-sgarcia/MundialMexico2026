import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/supabaseClient";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    // Pública
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: true, requiresLiga: true }
  },
  {
    path: "/reglas",
    name: "Reglas",
    component: () => import("@/views/Reglas.vue"),
    // Pública
  },
  {
    path: "/donacion",
    name: "Donacion",
    component: () => import("@/views/Donacion.vue"),
    // Pública
  },
  {
    path: "/juega",
    name: "Juega",
    component: () => import("@/views/Juega.vue"),
    meta: { requiresAuth: true } // Requiere login, pero NO liga (aquí la eligen)
  },
  {
    path: "/predicciones",
    name: "Predicciones",
    component: () => import("@/views/Predicciones.vue"),
    meta: { requiresAuth: true, requiresLiga: true }
  },
  {
    path: "/resultados",
    name: "Resultados",
    component: () => import("@/views/Resultados.vue"),
    meta: { requiresAuth: true, requiresLiga: true }
  },
  {
    path: "/admin-panel",
    name: "AdminPanel",
    component: () => import("@/views/Administracion.vue"),
    meta: { requiresAuth: true } // Solo requiere login
  },
  {
    path: "/juega-nosotros",
    name: "JuegaInfo",
    component: () => import("@/views/JuegaInfo.vue"),
    // Pública
  },
  {
    path: "/posiciones",
    name: "Posiciones",
    component: () => import("@/views/Posiciones.vue"),
    meta: { requiresAuth: true, requiresLiga: true }
  },
  {
    path: "/quinielas",
    name: "Quinielas",
    component: () => import("@/views/Quinielas.vue"),
    meta: { requiresAuth: true, requiresLiga: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// --- EL GUARDIÁN DE RUTAS (El cadenero) ---
router.beforeEach(async (to, from) => {
  const { data: { session } } = await supabase.auth.getSession();

  if (to.meta.requiresAuth && !session) {
    return '/'; // Regresas la ruta en lugar de llamar next()
  }

  if (to.meta.requiresLiga) {
    const ligaId = to.query.ligaId || localStorage.getItem('ligaIdActiva');
    if (!ligaId || ligaId === 'null') {
      return '/juega'; // Regresas la ruta
    }
  }

  return true; // Si todo está bien, regresas true para continuar
});

export default router;