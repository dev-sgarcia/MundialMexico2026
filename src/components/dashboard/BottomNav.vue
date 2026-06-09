<template>
  <nav
    class="bottom-nav d-lg-none position-fixed rounded-4 shadow-lg px-2 py-2 z-3"
  >
    <div class="d-flex justify-content-around align-items-center">
      <RouterLink
        v-for="item in menuItems"
        :key="item.to"
        :to="obtenerRutaConLiga(item.to)"
        class="bottom-nav-item text-decoration-none d-flex flex-column align-items-center gap-1 px-1 py-1 rounded-3"
        :class="isActive(item.to) ? 'bottom-nav-active' : 'text-secondary'"
      >
        <component :is="item.icon" size="22" weight="fill" />
        <span class="fw-semibold">{{ item.label }}</span>
      </RouterLink>

      <MobileUser />
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "@/supabaseClient"; // <-- Importamos Supabase
import MobileUser from "@/components/dashboard/MobileUser.vue";
import {
  PhTrophy,
  PhSoccerBall,
  PhChartBar,
  PhRanking,
  PhCalendarCheck,
  PhStar
} from "@phosphor-icons/vue";

const route = useRoute();

// --- VALIDACIÓN DE ADMINISTRADOR ---
const isAdmin = ref(false);
const adminEmails = [
  "ingeniero.mx@gmail.com",
  "javiergonzalezr93@gmail.com",  
  "rubencruz4052@gmail.com"
];

const esUsuarioVip = ref(localStorage.getItem("isVipActiva") === "true");

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session && adminEmails.includes(session.user.email)) {
    isAdmin.value = true;
  }
});

// --- CONFIGURACIÓN DEL MENÚ MÓVIL ---
const allMenuItems = [
  { label: "Reglas", to: "/dashboard", icon: PhCalendarCheck },
  { label: "Mis Quinielas", to: "/quinielas", icon: PhTrophy, adminOnly: true }, // <-- Opción protegida
  { label: "Predicciones", to: "/predicciones", icon: PhSoccerBall },
  { label: "Resultados", to: "/resultados", icon: PhChartBar },
  { label: "Posiciones", to: "/posiciones", icon: PhRanking },
  { label: "VIP", to: "/vip", icon: PhStar, vipOnly: true },  
];

const menuItems = computed(() => {
  return allMenuItems.filter(item => {
    // Filtro para el admin que ya tenías
    if (item.adminOnly && !isAdmin.value) return false;
    
    // 👇 4. NUEVO: Filtro para ocultar/mostrar VIP
    if (item.vipOnly && !esUsuarioVip.value) return false;
    
    return true; 
  });
});

const isActive = (path) => route.path === path;

const obtenerRutaConLiga = (basePath) => {
  // Rescatamos de la URL o de la memoria caché
  const currentLigaId =
    route.query.ligaId || localStorage.getItem("ligaIdActiva");
  const currentLigaNombre =
    route.query.ligaNombre || localStorage.getItem("ligaNombreActiva");
  // 👇 Rescatamos el eventoId
  const currentEventoId =
    route.query.eventoId || localStorage.getItem("eventoIdActiva");

  return {
    path: basePath,
    query: {
      ligaId: currentLigaId,
      ligaNombre: currentLigaNombre,
      eventoId: currentEventoId, // 👇 Lo inyectamos en la URL de destino
    },
  };
};
</script>

<style scoped>
.bottom-nav {
  left: 1.25rem;
  right: 1.25rem;
  bottom: 0.75rem;

  border: none;

  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.35),
    0 0 12px rgba(212, 175, 55, 0.04);
  background: linear-gradient(
    90deg,
    rgba(0, 25, 20, 0.16) 0%,
    rgba(55, 40, 10, 0.1) 50%,
    rgba(0, 25, 20, 0.16) 100%
  );

  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.bottom-nav-item {
  font-size: 0.75rem;
  min-width: 60px;
  transition: all 0.2s ease;
}

.bottom-nav-active {
  color: #d4af37;
}

.bottom-nav-item:hover {
  background-color: rgba(212, 175, 55, 0.12);
  transform: translateY(-4px) scale(1.05);
}
</style>
