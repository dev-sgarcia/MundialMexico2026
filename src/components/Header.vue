<template>
  <header class="header">
    <div class="nav">
      <router-link to="/" class="logo">
        <img src="@/assets/logo.png" alt="Mundial 2026" />

        <div class="logo-text">
          <span class="title">MUNDIAL</span>
          <span class="subtitle">MÉXICO <b>2026</b></span>
        </div>
      </router-link>

      <nav class="menu">
        <router-link to="/" class="menu-item" active-class="active">
          <PhHouse class="icon" weight="fill" />
          <span>INICIO</span>
        </router-link>

        <router-link to="/resultados" class="menu-item" active-class="active">
          <PhChartBar class="icon" weight="fill" />
          <span>RESULTADOS</span>
        </router-link>

        <router-link to="/reglas" class="menu-item" active-class="active">
          <PhBookOpen class="icon" weight="duotone" />
          <span>REGLAS</span>
        </router-link>

        <router-link to="/juega" class="menu-item" active-class="active">
          <PhSoccerBall class="icon soccer-icon" weight="fill" />
          <span>JUEGA</span>
        </router-link>

        <router-link to="/donacion" class="menu-item" active-class="active">
          <PhHandshake class="icon" weight="fill" />
          <span>DONACIÓN</span>
        </router-link>
      </nav>

      <div class="desktop-login">
        <button class="google-login-btn" @click="goToAccess">
          <img src="@/assets/google.png" alt="Google" />
          <span>Acceder con Google</span>
        </button>
      </div>

      <div class="header-actions">
        <button class="google-login-btn mobile-login-btn" @click="goToAccess">
          <img src="@/assets/google.png" alt="Google" />
          <span>Acceder con Google</span>
        </button>
        <button class="menu-toggle" @click="isMenuOpen = true">☰</button>
      </div>
    </div>

    <div
      class="mobile-overlay"
      :class="{ show: isMenuOpen }"
      @click="isMenuOpen = false"
    ></div>

    <aside class="mobile-menu" :class="{ open: isMenuOpen }">
      <button class="close-menu" @click="isMenuOpen = false">×</button>

      <router-link to="/" class="mobile-menu-item" @click="isMenuOpen = false">
        <PhHouse class="mobile-icon" weight="fill" />
        <span>INICIO</span>
      </router-link>

      <router-link
        to="/resultados"
        class="mobile-menu-item"
        @click="isMenuOpen = false"
      >
        <PhChartBar class="mobile-icon" weight="fill" />
        <span>RESULTADOS</span>
      </router-link>

      <router-link
        to="/reglas"
        class="mobile-menu-item"
        @click="isMenuOpen = false"
      >
        <PhBookOpen class="mobile-icon" weight="duotone" />
        <span>REGLAS</span>
      </router-link>

      <router-link
        to="/juega"
        class="mobile-menu-item"
        @click="isMenuOpen = false"
      >
        <PhSoccerBall class="mobile-icon" weight="fill" />
        <span>JUEGA</span>
      </router-link>

      <router-link
        to="/donacion"
        class="mobile-menu-item"
        @click="isMenuOpen = false"
      >
        <PhHandshake class="mobile-icon" weight="fill" />
        <span>DONACIÓN</span>
      </router-link>
    </aside>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goToAccess = () => {
  router.push("/acceso");
};
import {
  PhHouse,
  PhChartBar,
  PhBookOpen,
  PhSoccerBall,
  PhHandshake,
} from "@phosphor-icons/vue";

const isMenuOpen = ref(false);
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
}

.nav {
  width: 100%;
  padding: 10px 32px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 220px 1fr auto auto;
  align-items: center;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.desktop-login {
  display: flex;
  justify-content: flex-end;
  margin-right: 14px;
}

.mobile-login-btn {
  display: none;
  align-items: center;
  gap: 10px;
  height: 46px;
  padding: 0 18px;
  border-radius: 999px;
  white-space: nowrap;
}

.mobile-login-btn img {
  width: 18px;
  height: 18px;
}

.mobile-login-btn span {
  display: block;
}

.google-login-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  background: linear-gradient(135deg, #198754, #0f5132);
  color: white;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow:
    0 10px 22px rgba(15, 81, 50, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.google-login-btn img {
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  padding: 2px;
}

.google-login-btn:hover {
  transform: translateY(-2px);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
}

.logo img {
  height: 38px;
  width: auto;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.title {
  font-size: 16px;
  font-weight: 800;
  color: #0f5132;
  letter-spacing: 0.5px;
}

.subtitle {
  margin-top: 3px;
  font-size: 13px;
  color: #198754;
  font-weight: 700;
}

.subtitle b {
  color: #dc3545;
}

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 26px;
}

.menu-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: #143d2d;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.4px;
  transition: all 0.25s ease;
}

.icon {
  width: 22px;
  height: 22px;
  color: #32620e;
  transition: all 0.25s ease;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.12));
}

.menu-item span {
  position: relative;
}

.menu-item span::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -7px;
  width: 0;
  height: 2px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: #32620e;
  box-shadow: 0 0 4px rgba(46, 125, 50, 0.15);
  transition: width 0.25s ease;
}

.menu-item:hover {
  color: #32620e;
  transform: translateY(-3px);
  /* background: rgba(50, 98, 14, 0.08);
  border-radius: 14px; */
}

.menu-item {
  padding: 6px 10px;
}

.menu-item:hover .icon {
  color: #32620e;
  transform: scale(1.08);
  filter: drop-shadow(0 0 4px rgba(46, 125, 50, 0.18));
}

.menu-item.active {
  color: #32620e;
}

.menu-item.active .icon {
  color: #32620e;
  transform: scale(1.1);
  filter: drop-shadow(0 0 5px rgba(46, 125, 50, 0.2));
}

.menu-item.active span::after {
  width: 100%;
}

/* .soccer-icon {
  animation: ballPulse 2.6s ease-in-out infinite;
} */

@keyframes ballPulse {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.12);
  }
}

.header-actions {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-toggle {
  display: none;
  border: none;
  background: #0f7a45;
  color: white;
  border-radius: 12px;
  padding: 8px 12px;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(0, 122, 69, 0.25);
}

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  opacity: 0;
  pointer-events: none;
  transition: 0.25s ease;
  z-index: 150;
}

.mobile-overlay.show {
  opacity: 1;
  pointer-events: auto;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: -280px;
  width: 260px;
  height: 100vh;
  background: white;
  padding: 28px 22px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: 0.3s ease;
  z-index: 200;
  box-shadow: -12px 0 30px rgba(0, 0, 0, 0.18);
}

.mobile-menu.open {
  right: 0;
}

.close-menu {
  align-self: flex-end;
  border: none;
  background: transparent;
  font-size: 32px;
  cursor: pointer;
  color: #143d2d;
}

.mobile-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 10px;
  border-radius: 14px;
  text-decoration: none;
  color: #143d2d;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3px;
  transition: all 0.25s ease;
}

.mobile-menu-item:hover {
  background: rgba(50, 98, 14, 0.08);
  color: #32620e;
}

.mobile-menu-item.router-link-active {
  background: rgba(46, 125, 50, 0.1);
  color: #32620e;
}

.mobile-icon {
  width: 22px;
  height: 22px;
  color: #32620e;
  transition: all 0.25s ease;
}

.logo:hover,
.logo:focus,
.logo:active,
.logo:visited {
  text-decoration: none;
  color: inherit;
}

@media (max-width: 1100px) {
  .menu {
    gap: 22px;
  }

  .menu-item {
    font-size: 11px;
  }

  .icon {
    width: 23px;
    height: 23px;
  }
}

@media (min-width: 901px) {
  .mobile-login-btn {
    display: none !important;
  }
}

@media (max-width: 900px) {
  .nav {
    grid-template-columns: 1fr auto;
    padding: 12px 18px;
  }

  .menu {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .desktop-login {
    display: none;
  }

  .mobile-login-btn {
    display: flex;
  }
}

@media (max-width: 480px) {
  .header {
    top: 8px;
    padding: 0 12px;
    box-sizing: border-box;
  }

  .nav {
    border-radius: 28px;
    padding: 10px 14px;
  }

  .logo img {
    height: 35px;
  }

  .title {
    font-size: 14px;
  }

  .subtitle {
    font-size: 11px;
  }
}
</style>
