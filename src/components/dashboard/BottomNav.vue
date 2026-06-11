<template>
  <nav
    class="bottom-nav d-lg-none position-fixed rounded-4 shadow-lg px-2 py-2 z-3"
  >
    <div class="d-flex justify-content-around align-items-center">
      <RouterLink
        v-for="item in menuItems"
        :key="item.to"
        :to="obtenerRutaConLiga(item.to)"
        class="bottom-nav-item text-decoration-none d-flex align-items-center justify-content-center"
        :class="isActive(item.to) ? 'bottom-nav-active' : 'text-secondary'"
      >
        <component :is="item.icon" size="24" weight="fill" />
      </RouterLink>
      <MobileUser />
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "@/supabaseClient";
import MobileUser from "@/components/dashboard/MobileUser.vue";
import {
  PhTrophy,
  PhSoccerBall,
  PhChartBar,
  PhRanking,
  PhCalendarCheck,
  PhStar,
  PhChartPieSlice,
} from "@phosphor-icons/vue";

const route = useRoute();

// --- VALIDACIÓN DE ADMINISTRADOR ---
const isAdmin = ref(false);
const adminEmails = [
  "ingeniero.mx@gmail.com",
  "javiergonzalezr93@gmail.com",
  "rubencruz4052@gmail.com",
];

const esUsuarioVip = ref(localStorage.getItem("isVipActiva") === "true");

onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session && adminEmails.includes(session.user.email)) {
    isAdmin.value = true;
  }
});

// --- CONFIGURACIÓN DEL MENÚ MÓVIL ---
const allMenuItems = [
  { label: "Reglas", to: "/dashboard", icon: PhChartPieSlice },
  // { label: "Ligas", to: "/quinielas", icon: PhTrophy, adminOnly: true },
  { label: "Predic.", to: "/predicciones", icon: PhSoccerBall },
  { label: "Result.", to: "/resultados", icon: PhChartBar },
  { label: "Ranking", to: "/posiciones", icon: PhRanking },
  { label: "VIP", to: "/vip", icon: PhStar, vipOnly: true },
];

const menuItems = computed(() => {
  return allMenuItems.filter((item) => {
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
  left: 1rem;
  right: 1rem;
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
  flex: 1;
  min-width: 0;
  height: 44px;

  transition: all 0.2s ease;
}

.bottom-nav-active {
  color: #d4af37;
  background: rgba(212, 175, 55, 0.12);
  border-radius: 12px;
}

.bottom-nav-active {
  color: #d4af37;
  background: rgba(212, 175, 55, 0.12);
  border-radius: 12px;
}
</style>
