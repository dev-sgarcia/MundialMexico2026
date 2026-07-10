<template>
  <aside
    class="sidebar d-none d-lg-flex flex-column bg-dark rounded-bottom-4 p-2 position-sticky top-0 rounded-4"
    :class="{ collapsed: sidebarCollapsed }"
  >  


  <button
    class="sidebar-toggle"
    @click="toggleSidebar"
  >
    <PhCaretDoubleRight
      v-if="sidebarCollapsed"
      :size="18"
      weight="bold"
    />

    <PhCaretDoubleLeft
      v-else
      :size="18"
      weight="bold"
    />
  </button>



  <!-- <aside
    class="sidebar d-none d-lg-flex flex-column bg-dark rounded-bottom-4 p-2 position-sticky top-0 rounded-4"
  > -->
    <!-- LOGO -->
    <!-- <div
      class="w-100 border-bottom border-secondary border-opacity-25 mb-3 overflow-hidden"
    > -->
    <div
        class="w-100 mb-3 overflow-hidden"
        :class="{
            'border-bottom border-secondary border-opacity-25': !sidebarCollapsed
        }"
    >    
      <RouterLink to="/" class="d-block"
      >
        <!-- <img src="@/assets/zonafan.png" alt="Zona Fan" class="logo-zona-fan" /> -->
        <img
            src="@/assets/zonafan.png"
            alt="Zona Fan"
            class="logo-zona-fan"
            :class="{ 'logo-small': sidebarCollapsed }"
        />        
      </RouterLink>
    </div>

    <!-- MENÚ -->
    <nav class="nav flex-column gap-2">
      <RouterLink
        v-for="item in menuItems"
        :key="item.label"
        :to="obtenerRutaConLiga(item.path)"

        class="menu-link nav-link d-flex align-items-center rounded-4 px-3 py-2"
        :class="{
            'justify-content-center': sidebarCollapsed,
            'gap-2': !sidebarCollapsed,
            'vip-link': item.label === 'VIP'
        }"        
      >      
        <!-- <component :is="item.icon" size="18" weight="fill" />
        <span>{{ item.label }}</span> -->
        <component :is="item.icon" size="18" weight="fill" />
        <span v-show="!sidebarCollapsed">
          {{ item.label }}
        </span>        
      </RouterLink>
    </nav>

    <!-- CARD -->
    <div
      v-show="!sidebarCollapsed"
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
  PhCaretDoubleLeft,
  PhCaretDoubleRight,  
} from "@phosphor-icons/vue";

const route = useRoute();

// Variable para controlar el estado del sidebar (colapsado o expandido)
const sidebarCollapsed = ref(false);

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

  sidebarCollapsed.value =
    localStorage.getItem("sidebarCollapsed") === "true";

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

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;

  localStorage.setItem(
    "sidebarCollapsed",
    sidebarCollapsed.value
  );
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

.logo-zona-fan{
    width:170px;
    transition:.25s;

    /*height: 60px;
    width: auto;*/
    mix-blend-mode: screen; 
}

.logo-small{
    width:38px;
    margin:auto;
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

.menu-link {
    color: #9CA3AF;
}

.menu-link svg,
.menu-link i {
    color: #9CA3AF;
}

/* Mantener el fondo verde del elemento seleccionado */
.menu-link.router-link-active {
    background: rgba(33, 77, 50, 0.50);
}

/* No cambiar el color del texto al seleccionar */
.menu-link.router-link-active,
.menu-link.router-link-active svg,
.menu-link.router-link-active i {
    color: #9CA3AF;
}

/* VIP siempre dorado */
.vip-link,
.vip-link svg,
.vip-link i {
    color: #C9A227 !important;
}



.sidebar{
    position:sticky;
    transition:width .25s ease;
    /*overflow:hidden;*/
    transition:width .25s ease;
    
}

.sidebar.collapsed{
    width:72px !important;
}


.sidebar-toggle{
    position:absolute;

    top:10px;
    right:8px;

    width:28px;
    height:28px;

    border:none;
    border-radius:50%;

    background:#2a2d31;
    border:1px solid #4b5563;    

    /*background:#4da1ff;
    color:rgba(3, 3, 3, 0.589);*/

    display:flex;
    justify-content:center;
    align-items:center;

    cursor:pointer;

    z-index:9999;

    transition:
        background .25s,
        transform .25s;
}

.sidebar-toggle:hover{
    transform:scale(1.08);
    background:#2563eb;
    border-color:#2563eb;    
}

</style>
