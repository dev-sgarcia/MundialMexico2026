<template>
  <nav
    class="d-lg-none fixed-bottom bg-dark border-top border-secondary border-opacity-25 px-1 py-2"
  >
    <div class="d-flex justify-content-around align-items-center">
      <RouterLink
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
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
} from "@phosphor-icons/vue";

const route = useRoute();

const menuItems = [
  { label: "Inicio", to: "/dashboard", icon: PhHouse },
  { label: "Quinielas", to: "/quinielas", icon: PhTrophy },
  { label: "Predicciones", to: "/predicciones", icon: PhSoccerBall },
  { label: "Resultados", to: "/resultados", icon: PhChartBar },
  { label: "Posiciones", to: "/posiciones", icon: PhRanking },
];

const isActive = (path) => route.path === path;
</script>

<style scoped>
.bottom-nav-item {
  min-width: 54px;
  transition: all 0.2s ease;
}

.bottom-nav-item.router-link-active {
  background-color: rgba(25, 135, 84, 0.12);
}

.bottom-nav-item span {
  font-size: 0.62rem;
}
</style>
