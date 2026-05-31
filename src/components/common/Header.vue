<template>
  <header class="sticky-top w-100 z-3 header-dark">
    <div class="container-fluid shadow-sm">
      <div class="row align-items-center py-2 px-5">
        <!-- LOGO -->
        <div class="col-auto">
          <router-link
            to="/"
            class="d-flex align-items-center gap-2 text-decoration-none text-white"
          >
            <img
              src="@/assets/logo.png"
              alt="Mundial 2026"
              class="header-logo"
            />

            <div class="d-flex flex-column lh-1">
              <span class="fw-bold text-success small">MUNDIAL</span>
              <span class="fw-bold text-white small">
                MÉXICO <b class="text-danger">2026</b>
              </span>
            </div>
          </router-link>
        </div>

        <!-- MENU DESKTOP -->
        <nav class="col d-none d-lg-flex justify-content-center gap-5">
          <router-link
            to="/"
            class="menu-item position-relative d-flex flex-column align-items-center gap-1 text-white text-decoration-none fw-bold bg-transparent border-0 p-0"
            active-class="active"
          >
            <PhHouse class="menu-icon" weight="fill" />
            <span>INICIO</span>
          </router-link>

          <button
            type="button"
            class="menu-item position-relative d-flex flex-column align-items-center gap-1 text-white text-decoration-none fw-bold bg-transparent border-0 p-0"
            @click="validateZonaFan"
          >
            <PhHandsClapping class="menu-icon" weight="fill" />
            <span>ZONA FAN</span>
          </button>

          <router-link
            to="/reglas"
            class="menu-item menu-item position-relative d-flex flex-column align-items-center gap-1 text-decoration-none fw-bold-items-center gap-1 text-decoration-none text-light fw-bold"
            active-class="active"
          >
            <PhBookOpen class="menu-icon" weight="duotone" />
            <span>REGLAS</span>
          </router-link>

          <router-link
            to="/juega-nosotros"
            class="menu-item menu-item position-relative d-flex flex-column align-items-center gap-1 text-decoration-none fw-bold-items-center gap-1 text-decoration-none text-light fw-bold"
            active-class="active"
          >
            <PhSoccerBall class="menu-icon" weight="fill" />
            <span>JUEGA</span>
          </router-link>

          <router-link
            to="/donacion"
            class="menu-item menu-item position-relative d-flex flex-column align-items-center gap-1 text-decoration-none fw-bold-items-center gap-1 text-decoration-none text-light fw-bold"
            active-class="active"
          >
            <PhHandshake class="menu-icon" weight="fill" />
            <span>DONACIÓN</span>
          </router-link>
        </nav>

        <!-- LOGIN DESKTOP -->
        <div class="col-auto d-none d-lg-flex justify-content-end">
          <div v-if="user">
            <UserProfile textColor="#198754" />
          </div>

          <button
            v-else
            class="btn btn-success rounded-pill fw-bold d-flex align-items-center gap-2 px-3"
            @click="goToAccess"
          >
            <img src="@/assets/google.png" alt="Google" class="google-icon" />
            <span>Acceder con Google</span>
          </button>
        </div>

        <!-- MOBILE ACTIONS -->
        <div
          class="col d-flex d-lg-none justify-content-end align-items-center"
        >
          <button
            class="btn btn-outline-success rounded-3 px-3 py-2"
            @click="isMenuOpen = !isMenuOpen"
          >
            ☰
          </button>
        </div>
      </div>
    </div>

    <!-- OVERLAY -->
    <div
      class="mobile-overlay"
      :class="{ show: isMenuOpen }"
      @click="isMenuOpen = false"
    ></div>

    <!-- MOBILE MENU -->
    <aside
      class="mobile-menu position-fixed top-0 vh-100 px-3 py-4 bg-dark text-white d-flex flex-column gap-3"
      :class="{ open: isMenuOpen }"
    >
      <div
        class="d-flex justify-content-between align-items-start border-bottom border-secondary border-opacity-25 pb-3 mb-2"
      >
        <div v-if="user" class="me-3">
          <UserProfile />
        </div>

        <div v-else class="me-3 flex-grow-1">
          <button
            class="btn btn-success w-100 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2"
            @click="goToAccess"
          >
            <img src="@/assets/google.png" alt="Google" class="google-icon" />
            <span>Acceder</span>
          </button>
        </div>

        <button
          class="btn-close btn-close-white mt-1 flex-shrink-0"
          @click="isMenuOpen = false"
        ></button>
      </div>

      <router-link
        to="/"
        class="mobile-menu-item d-flex align-items-center gap-3 text-decoration-none text-light fw-bold p-3 rounded-3"
        @click="isMenuOpen = false"
      >
        <PhHouse class="menu-icon" weight="fill" />
        <span>INICIO</span>
      </router-link>

      <button
        type="button"
        class="mobile-menu-item btn btn-link d-flex align-items-center gap-3 text-decoration-none text-light fw-bold p-3 rounded-3 w-100 text-start bg-transparent border-0 shadow-none"
        @click="
          validateZonaFan();
          isMenuOpen = false;
        "
      >
        <PhHandsClapping class="menu-icon" weight="fill" />
        <span>ZONA FAN</span>
      </button>

      <router-link
        to="/reglas"
        class="mobile-menu-item d-flex align-items-center gap-3 text-decoration-none text-light fw-bold p-3 rounded-3"
        @click="isMenuOpen = false"
      >
        <PhBookOpen class="menu-icon" weight="duotone" />
        <span>REGLAS</span>
      </router-link>

      <router-link
        to="/juega-nosotros"
        class="mobile-menu-item d-flex align-items-center gap-3 text-decoration-none text-light fw-bold p-3 rounded-3"
        @click="isMenuOpen = false"
      >
        <PhSoccerBall class="menu-icon" weight="fill" />
        <span>JUEGA</span>
      </router-link>

      <router-link
        to="/donacion"
        class="mobile-menu-item d-flex align-items-center gap-3 text-decoration-none text-light fw-bold p-3 rounded-3"
        @click="isMenuOpen = false"
      >
        <PhHandshake class="menu-icon" weight="fill" />
        <span>DONACIÓN</span>
      </router-link>
    </aside>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/supabaseClient";
import {
  PhHouse,
  PhHandsClapping,
  PhBookOpen,
  PhSoccerBall,
  PhHandshake,
} from "@phosphor-icons/vue";
import UserProfile from "@/components/common/UserProfile.vue";
import Swal from "sweetalert2";

const router = useRouter();
const isMenuOpen = ref(false);
const user = ref(null);

onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  user.value = session?.user || null;

  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user || null;
  });
});

const goToAccess = async () => {
  try {
    localStorage.setItem("isLoggingIn", "true");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) throw error;
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
  }
};

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    router.push("/");
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
  }
};

const validateZonaFan = async () => {
  if (!user.value) {
    await Swal.fire({
      icon: "warning",
      title: "¡Atención!",
      text: "Para acceder a la Zona Fan, debes iniciar sesión y pertenecer a una liga activa.",
      confirmButtonText: "Entendido",
      confirmButtonColor: "#198754",
      background: "#0b1f1a",
      color: "#fff",
    });

    return;
  }

  router.push("/juega");
};
</script>

<style scoped>
.header-dark {
  background: linear-gradient(180deg, #0b1f1a, #071411);
}

.header-logo {
  height: 38px;
  width: auto;
}

.google-icon {
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  padding: 2px;
}

.menu-icon {
  width: 28px;
  height: 28px;
  color: #198754;
  flex-shrink: 0;
}

.menu-item {
  font-size: 11px;
  letter-spacing: 0.4px;
}

.menu-item::after {
  content: "";
  width: 0;
  height: 2px;
  border-radius: 999px;
  background: #198754;
  transition: width 0.25s ease;
}

.menu-item:hover,
.menu-item.active {
  color: #198754 !important;
}

.menu-item:hover::after,
.menu-item.active::after {
  width: 100%;
}

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  opacity: 0;
  pointer-events: none;
  transition: 0.25s ease;
  z-index: 1040;
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
  padding: 24px 20px;
  transition: right 0.3s ease;
  z-index: 1050;
}

.mobile-menu.open {
  right: 0;
}

.mobile-menu-item {
  font-size: 13px;
}

.mobile-menu-item:hover,
.mobile-menu-item.router-link-active {
  background: rgba(25, 135, 84, 0.15);
  color: #198754 !important;
}
</style>
