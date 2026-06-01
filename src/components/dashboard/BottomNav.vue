<template>
  <nav
    class="d-lg-none fixed-bottom bg-dark border-top border-secondary border-opacity-25 px-1 py-2"
  >
    <div class="d-flex justify-content-around align-items-center">
      <RouterLink
        v-for="item in menuItems"
        :key="item.to"
        :to="obtenerRutaConLiga(item.to)"
        class="bottom-nav-item text-decoration-none d-flex flex-column align-items-center gap-1 px-1 py-1 rounded-3"
        :class="isActive(item.to) ? 'text-success' : 'text-secondary'"
      >
        <component :is="item.icon" size="22" weight="fill" />
        <span class="fw-semibold">{{ item.label }}</span>
      </RouterLink>

      <MobileUser />
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";
import MobileUser from "@/components/dashboard/MobileUser.vue";
import {
  PhHouse,
  PhTrophy,
  PhSoccerBall,
  PhChartBar,
  PhRanking,
  PhActivity,
  PhAddressBookTabs,
  PhArchiveBox,
  PhCheckerboard,
  PhCheckSquare,
  PhFlagCheckered,
  PhCalendarHeart,
  PhCalendarCheck,
} from "@phosphor-icons/vue";

const route = useRoute();

// Ajusta las rutas si es necesario (ej. "/juega" o "/quinielas" según tu configuración)
const menuItems = [
  { label: "Reglas", to: "/dashboard", icon: PhCalendarCheck },
  { label: "Quinielas", to: "/quinielas", icon: PhTrophy }, 
  { label: "Predicciones", to: "/predicciones", icon: PhSoccerBall },
  { label: "Resultados", to: "/resultados", icon: PhChartBar },
  { label: "Posiciones", to: "/posiciones", icon: PhRanking },
];

const isActive = (path) => route.path === path;

// --- FUNCIÓN PARA MANTENER LAS VARIABLES DE LA LIGA ---
const obtenerRutaConLiga = (basePath) => {
  // Rescatamos de la URL o de la memoria caché
  const currentLigaId = route.query.ligaId || localStorage.getItem("ligaIdActiva");
  const currentLigaNombre = route.query.ligaNombre || localStorage.getItem("ligaNombreActiva");

  return {
    path: basePath,
    query: {
      ligaId: currentLigaId,
      ligaNombre: currentLigaNombre,
    },
  };
};
</script>

<style scoped>
.bottom-nav-item {
  font-size: 0.75rem;
  transition: all 0.2s ease;
  min-width: 60px;
}
</style>