import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/supabaseClient"; // Asegúrate de que esta ruta a tu archivo de Supabase sea correcta

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
  // {
  //   path: "/acceso",
  //   name: "Acceso",
  //   component: () => import("@/views/Acceso.vue"),
  //   // Pública (Página de login/registro)
  // },
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
router.beforeEach(async (to, from, next) => {
  // 1. Obtenemos la sesión actual de forma segura
  const { data: { session } } = await supabase.auth.getSession();

  // 2. ¿Requiere login pero NO hay sesión?
  if (to.meta.requiresAuth && !session) {
    // Si no está logueado, lo mandamos a la página de acceso (o a home '/')
    return next('/'); 
  }

  // 3. ¿Requiere liga pero no detectamos el ID en la URL o caché?
  if (to.meta.requiresLiga) {
    const ligaId = to.query.ligaId || localStorage.getItem('ligaIdActiva');
    
    if (!ligaId || ligaId === 'null') {
      // Si está logueado pero no tiene liga activa, lo mandamos a que elija una
      return next('/juega'); 
    }
  }

  // Si pasó todos los filtros, lo dejamos continuar a su destino
  next();
});

export default router;