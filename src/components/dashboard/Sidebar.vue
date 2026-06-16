<template>
  <aside
    class="sidebar d-none d-lg-flex flex-column bg-dark rounded-bottom-4 p-2 position-sticky top-0 rounded-4"
  >
    <!-- LOGO -->
    <div
      class="w-100 border-bottom border-secondary border-opacity-25 mb-3 overflow-hidden"
    >
      <RouterLink to="/" class="d-block">
        <img src="@/assets/zonafan.png" alt="Zona Fan" class="logo-zona-fan" />
      </RouterLink>
    </div>

    <!-- MENÚ -->
    <nav class="nav flex-column gap-2">
      <RouterLink
        v-for="item in menuItems"
        :key="item.label"
        :to="obtenerRutaConLiga(item.path)"
        class="menu-link nav-link d-flex align-items-center gap-2 rounded-4 px-3 py-2 fw-semibold text-white-50"
        active-class="text-white bg-success bg-opacity-25"
      >
        <component :is="item.icon" size="18" weight="fill" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <!-- CARD -->
    <div
      class="card bg-success bg-opacity-10 border border-success border-opacity-25 rounded-4 p-2 text-white mt-auto"
    >
      <div class="d-flex align-items-center gap-2 mb-2">
        <img
          src="@/assets/world-cupp.png"
          alt="Mundial 2026"
          class="cup-img object-fit-contain"
        />

        <div>
          <h6 class="fw-bold mb-0 small">VIVE EL MUNDIAL</h6>
          <span class="text-success fw-bold small">MÉXICO 2026</span>
        </div>
      </div>

      <p class="small text-white-50 mb-2">
        Predice resultados y compite con tus grupos.
      </p>

      <RouterLink
        :to="obtenerRutaConLiga('/posiciones')"
        class="btn btn-success rounded-4 fw-bold w-100 py-1"
      >
        Ver posición actual
      </RouterLink>
    </div>
  </aside>

<Teleport to="body">
  <a 
    v-if="linkWhatsapp" 
    :href="linkWhatsapp" 
    target="_blank" 
    rel="noopener noreferrer"
    class="whatsapp-fab d-flex align-items-center justify-content-center shadow-lg"
  >
    <i class="fa-brands fa-whatsapp"></i>
  </a>
</Teleport>  

</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue"; // 👇 Agregamos 'watch'
import { useRoute } from "vue-router";
import { supabase } from "@/supabaseClient"; // Ajusta si la ruta a tu cliente es diferente
import {
  PhHouse,
  PhTrophy,
  PhSoccerBall,
  PhChartBar,
  PhUser,
  PhGearSix,
  PhRanking,
  PhCalendarCheck,
  PhStar,
  PhChartPieSlice,
  PhSquaresFour,
} from "@phosphor-icons/vue";

const route = useRoute();

// --- WHATSAPP LINK ---
const linkWhatsapp = ref(null);

const cargarWhatsapp = async () => {
  const currentLigaId = route.query.ligaId || localStorage.getItem("ligaIdActiva");
  if (!currentLigaId || currentLigaId === "null") return;
  
  try {
    const { data, error } = await supabase
      .from('leagues')
      .select('whatsapp_link')
      .eq('id', currentLigaId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    
    linkWhatsapp.value = data?.whatsapp_link || null;
  } catch (error) {
    console.error("Error cargando WhatsApp:", error);
  }
};

// Si el usuario cambia de liga navegando, actualizamos el link
watch(
  () => route.query.ligaId,
  (newId) => {
    if (newId && newId !== "null") {
      cargarWhatsapp();
    }
  }
);

// --- VALIDACIÓN DE ADMINISTRADOR ---
const isAdmin = ref(false);
const adminEmails = [
  "tu_correo@ejemplo.com", // Reemplaza con tus correos reales
  "otro_admin@ejemplo.com",
];

onMounted(async () => {
  // 👇 Cargamos el link al iniciar el componente
  cargarWhatsapp();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session && adminEmails.includes(session.user.email)) {
    isAdmin.value = true;
  }
});

// --- CONFIGURACIÓN DEL MENÚ ---
// Lista maestra con todas las opciones posibles
const allMenuItems = [
  { label: "Dashboard", path: "/dashboard", icon: PhChartPieSlice },
  { label: "Reglas", path: "/bases", icon: PhCalendarCheck },
  {
    label: "Mis Quinielas",
    path: "/quinielas",
    icon: PhTrophy,
    adminOnly: true,
  }, // <-- Bloqueo activado
  { label: "Predicciones", path: "/predicciones", icon: PhSoccerBall },
  { label: "Resultados", path: "/resultados", icon: PhChartBar },
  { label: "Posiciones", path: "/posiciones", icon: PhRanking },
  { label: "VIP", path: "/vip", icon: PhStar, vipOnly: true },
];

// Leemos la memoria caché. Si dice 'true', la variable será verdadera
const esUsuarioVip = ref(localStorage.getItem("isVipActiva") === "true");

const menuItems = computed(() => {
  return allMenuItems.filter((item) => {
    if (item.adminOnly && !isAdmin.value) return false;
    if (item.vipOnly && !esUsuarioVip.value) return false;
    return true; 
  });
});

const obtenerRutaConLiga = (basePath) => {
  const currentLigaId = route.query.ligaId || localStorage.getItem("ligaIdActiva");
  const currentLigaNombre = route.query.ligaNombre || localStorage.getItem("ligaNombreActiva");
  const currentEventoId = route.query.eventoId || localStorage.getItem("eventoIdActiva");

  if (currentLigaId) localStorage.setItem("ligaIdActiva", currentLigaId);
  if (currentLigaNombre) localStorage.setItem("ligaNombreActiva", currentLigaNombre);
  if (currentEventoId) localStorage.setItem("eventoIdActiva", currentEventoId);

  return {
    path: basePath,
    query: {
      ligaId: currentLigaId,
      ligaNombre: currentLigaNombre,
      eventoId: currentEventoId, 
    },
  };
};
</script>

<style scoped>
.sidebar {
  width: 220px;
  min-height: calc(100vh - 2rem);
  overflow-y: auto;
}

.sidebar-logo {
  height: 80px;
}

.cup-img {
  width: 62px;
}

.menu-link {
  font-size: 0.9rem;
}

.logo-zona-fan {
  height: 60px; /* Ajusta el alto según prefieras */
  width: auto;
  mix-blend-mode: screen; /* Esta es la magia que oculta el fondo negro */
}



.whatsapp-fab {
  position: fixed;
  right: 20px;
  bottom: 85px; 
  width: 55px;
  height: 55px;
  background-color: #25D366;
  color: white;
  border-radius: 50%;
  font-size: 1.9rem;
  z-index: 9999 !important;
  text-decoration: none;
  transition: transform 0.2s ease, background-color 0.2s;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4) !important;
}

.whatsapp-fab:hover {
  background-color: #1ebe57;
  transform: scale(1.08);
  color: white;
}

@media (min-width: 992px) {
  .whatsapp-fab {
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    font-size: 2.1rem;
  }
}
</style>
