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

  <Teleport to="body">
    <a 
      v-if="linkWhatsapp" 
      :href="linkWhatsapp" 
      target="_blank" 
      rel="noopener noreferrer"
      class="whatsapp-fab d-lg-none d-flex align-items-center justify-content-center shadow-lg"
    >
      <i class="fa-brands fa-whatsapp"></i>
    </a>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue"; // 👇 Agregamos watch
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

// Observamos si cambia de liga estando en celular
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
  "ingeniero.mx@gmail.com",
  "javiergonzalezr93@gmail.com",
  "rubencruz4052@gmail.com",
];

const esUsuarioVip = ref(localStorage.getItem("isVipActiva") === "true");

onMounted(async () => {
  // 👇 Cargamos el link cuando inicia la barra móvil
  cargarWhatsapp();

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
  { label: "Predic.", to: "/predicciones", icon: PhSoccerBall },
  { label: "Result.", to: "/resultados", icon: PhChartBar },
  { label: "Ranking", to: "/posiciones", icon: PhRanking },
  { label: "VIP", to: "/vip", icon: PhStar, vipOnly: true },
];

const menuItems = computed(() => {
  return allMenuItems.filter((item) => {
    if (item.adminOnly && !isAdmin.value) return false;
    if (item.vipOnly && !esUsuarioVip.value) return false;
    return true;
  });
});

const isActive = (path) => route.path === path;

const obtenerRutaConLiga = (basePath) => {
  const currentLigaId = route.query.ligaId || localStorage.getItem("ligaIdActiva");
  const currentLigaNombre = route.query.ligaNombre || localStorage.getItem("ligaNombreActiva");
  const currentEventoId = route.query.eventoId || localStorage.getItem("eventoIdActiva");

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

/* 👇 ESTILOS DEL BOTÓN DE WHATSAPP */
.whatsapp-fab {
  position: fixed;
  right: 20px;
  bottom: 85px; /* Altura perfecta para que no estorbe el BottomNav */
  width: 55px;
  height: 55px;
  background-color: #25D366;
  color: white;
  border-radius: 50%;
  font-size: 1.9rem;
  z-index: 9999 !important; /* Garantiza que siempre esté arriba */
  text-decoration: none;
  transition: transform 0.2s ease, background-color 0.2s;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4) !important;
}

.whatsapp-fab:hover {
  background-color: #1ebe57;
  transform: scale(1.08);
  color: white;
}
</style>