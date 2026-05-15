<template>
  <aside
    class="sidebar d-none d-lg-flex flex-column bg-dark rounded-bottom-4 p-2 position-sticky top-0 rounded-4"
  >
    <!-- LOGO -->
    <div
      class="w-100 border-bottom border-secondary border-opacity-25 mb-3 overflow-hidden"
    >
      <img
        src="@/assets/Logo-Quinielas.png"
        alt="Quiniela RA"
        class="sidebar-logo w-100 object-fit-cover d-block"
      />
    </div>

    <!-- MENÚ -->
    <nav class="nav flex-column gap-2">
      <RouterLink
        v-for="item in menuItems"
        :key="item.label"
        :to="item.path"
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
        to="/calendario"
        class="btn btn-success rounded-4 fw-bold w-100 py-1"
      >
        Ver calendario
      </RouterLink>
    </div>
  </aside>
</template>

<script setup>
import {
  PhHouse,
  PhTrophy,
  PhSoccerBall,
  PhChartBar,
  PhUser,
  PhGearSix,
  PhRanking,
} from "@phosphor-icons/vue";

const menuItems = [
  { label: "Inicio", path: "/", icon: PhHouse },
  { label: "Quinielas", path: "/quinielas", icon: PhTrophy },
  { label: "Predicciones", path: "/Predicciones", icon: PhSoccerBall },
  { label: "Resultados", path: "/resultados", icon: PhChartBar },
  { label: "Posiciones", path: "/posiciones", icon: PhRanking },
  // { label: "Mi perfil", path: "/perfil", icon: PhUser },
];
</script>

<style scoped>
.sidebar {
  width: 220px;
  min-height: 100vh;
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
</style>
