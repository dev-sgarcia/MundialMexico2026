<template>
  <section class="hero position-relative overflow-hidden">

    <!-- OVERLAY -->
    <div class="overlay"></div>

    <div class="container position-relative z-1 py-5">

      <!-- HERO CONTENT -->
      <div class="row align-items-center g-5">

        <!-- LEFT -->
        <div class="col-12 col-lg-7 text-center text-lg-start">

          <div class="hero-left mx-auto mx-lg-0">

            <h1 class="hero-subtitle">
              LA PASIÓN NOS UNE,
            </h1>

            <h2 class="hero-title">
              LA QUINIELA NOS HACE
              <span>CAMPEONES</span>
            </h2>

            <p class="hero-description">
              Únete a la mejor quiniela del Mundial 2026.
              Compite con tu liga, demuestra tus conocimientos
              y vive cada partido al máximo.
            </p>

            <div
              class="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start mt-4 hero-info"
            >

              <div class="hero-chip">
                📅 11 JUN - 19 JUL 2026
              </div>

              <div class="hero-chip">
                📍 MÉXICO, EE.UU. Y CANADÁ
              </div>

            </div>

          </div>

        </div>

        <!-- RIGHT -->
        <div class="col-12 col-lg-5">

          <div class="countdown-card mx-auto">

            <div class="countdown-header text-center">

              <strong>
                COMIENZA EN
              </strong>

            </div>

            <div class="row g-2 text-center">

              <div class="col-3">

                <div class="countdown-item">

                  <strong>
                    {{ timeLeft.days }}
                  </strong>

                  <small>Días</small>

                </div>

              </div>

              <div class="col-3">

                <div class="countdown-item">

                  <strong>
                    {{ timeLeft.hours }}
                  </strong>

                  <small>Horas</small>

                </div>

              </div>

              <div class="col-3">

                <div class="countdown-item">

                  <strong>
                    {{ timeLeft.minutes }}
                  </strong>

                  <small>Minutos</small>

                </div>

              </div>

              <div class="col-3">

                <div class="countdown-item">

                  <strong>
                    {{ timeLeft.seconds }}
                  </strong>

                  <small>Segundos</small>

                </div>

              </div>

            </div>

            <div class="countdown-footer">

              <span>📅 11 JUNIO 2026</span>

              <span>🕐 13:00 HRS</span>

              <span>📍 MÉXICO, EE.UU. Y CANADÁ</span>

            </div>

          </div>

        </div>

      </div>

      <!-- ======================================== -->
      <!-- CARDS -->
      <!-- ======================================== -->

      <div class="row g-4 cards-wrapper justify-content-center">

        <div
          v-for="item in items"
          :key="item.title"
          class="col-12 col-sm-6 col-xl-3 d-flex"
        >

          <div class="custom-card w-100">

            <div
              :class="[
                'icon-circle',
                item.theme
              ]"
            >

              <img
                v-if="item.image"
                :src="item.image"
                class="icon-img"
              >

              <component
                v-else
                :is="item.icon"
              />

            </div>

            <h3 :class="item.theme">
              {{ item.title }}
            </h3>

            <p>
              {{ item.desc }}
            </p>

            <button
              :class="[
                'custom-btn',
                item.theme
              ]"
              @click="item.route && router.push(item.route)"
            >

              {{ item.btn }}

            </button>

          </div>

        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted
} from "vue";

import { useRouter } from "vue-router";

import {
  UserIcon,
  TrophyIcon,
  BookOpenIcon,
  UsersIcon,
  HeartIcon,
} from "@heroicons/vue/24/solid";

const router = useRouter();

/* ======================================== */
/* CARDS */
/* ======================================== */

const items = [
  {
    image: new URL(
      "/src/assets/results2.png",
      import.meta.url
    ).href,

    title: "ZONA FAN",
    desc:
      "Accede a la plataforma con gmail y tu código para integrarte a una liga.",
    btn: "ZONA FAN",
    theme: "red",
    route: "/juega",
  },

  {
    image: new URL(
      "/src/assets/rules.png",
      import.meta.url
    ).href,
    title: "REGLAS",
    desc:
      "Conoce las reglas generales de puntuación y cómo funciona la quiniela.",
    btn: "VER REGLAS",
    theme: "green",
    route: "/reglas",
  },

  {
    image: new URL(
      "/src/assets/play2.png",
      import.meta.url
    ).href,
    title: "JUEGA CON NOSOTROS",
    desc:
      "¿Quieres organizar una quiniela con tu empresa o amigos?",
    btn: "MÁS INFORMACIÓN",
    theme: "red",
    route: "/juega-nosotros",
  },

  {
    image: new URL(
      "/src/assets/donate.png",
      import.meta.url
    ).href,
    title: "DONACIÓN",
    desc:
      "Apoya a los desarrolladores para seguir mejorando la plataforma.",
    btn: "DONAR CON PAYPAL",
    theme: "green",
    route: "/donacion",
  },
];

/* ======================================== */
/* COUNTDOWN */
/* ======================================== */

const timeLeft = ref({
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
});

let intervalId = null;

const updateCountdown = () => {

  const targetDate = new Date(
    "2026-06-11T13:00:00-06:00"
  ).getTime();

  const now = new Date().getTime();

  const distance = targetDate - now;

  if (distance <= 0) {

    timeLeft.value = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    clearInterval(intervalId);

    return;
  }

  timeLeft.value = {

    days: Math.floor(
      distance / (1000 * 60 * 60 * 24)
    )
      .toString()
      .padStart(2, "0"),

    hours: Math.floor(
      (distance / (1000 * 60 * 60)) % 24
    )
      .toString()
      .padStart(2, "0"),

    minutes: Math.floor(
      (distance / (1000 * 60)) % 60
    )
      .toString()
      .padStart(2, "0"),

    seconds: Math.floor(
      (distance / 1000) % 60
    )
      .toString()
      .padStart(2, "0"),
  };
};

onMounted(() => {

  updateCountdown();

  intervalId = setInterval(
    updateCountdown,
    1000
  );
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.hero {
  min-height: 100vh;
  background:
    url("/src/assets/hero-bg.jpg")
    center/cover no-repeat;
  display: flex;
  align-items: center;
  color: white;
}

.overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      90deg,
      rgba(0, 50, 30, 0.92) 26%,
      rgba(0, 0, 0, 0.34) 58%,
      rgba(0, 0, 0, 0.15) 100%
    );
}

.hero-left {
  max-width: 620px;
}

.hero-subtitle {
  font-size: clamp(18px, 3vw, 26px);
  font-weight: 500;
}

.hero-title {
  font-size: clamp(38px, 6vw, 70px);
  font-weight: 900;
  line-height: 1.05;
  margin-top: 12px;
}

.hero-title span {
  display: block;
  color: #ff2e2e;
}

.hero-description {
  margin-top: 18px;
  font-size: 1rem;
  line-height: 1.8;
  opacity: 0.92;
}

.hero-chip {
  padding: 0.7rem 1rem;
  border-radius: 14px;
  background:rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(8px);
  font-size: 0.9rem;
}

.countdown-card {
  width: 100%;
  max-width: 420px;
  padding: 1.5rem;
  border-radius: 24px;
  background:rgba(255,255,255,0.06);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(0,255,166,0.25);
  box-shadow: 0 18px 42px rgba(0,0,0,0.35);
}

.countdown-header strong {
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 900;
}

.countdown-item {
  padding: 1rem 0.5rem;
  border-radius: 16px;
  background:rgba(0,0,0,0.24);
  border: 1px solid rgba(255,255,255,0.08);
}

.countdown-item strong {
  display: block;
  font-size: clamp(24px, 3vw, 38px);
  font-weight: 900;
}

.countdown-item small {
  color: #73ff73;
  font-size: 0.75rem;
  font-weight: 700;
}

.countdown-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  opacity: 0.9;
}

.cards-wrapper {
  margin-top: 5rem;
}

.custom-card {
  background:rgba(255,255,255,0.04);
  backdrop-filter: blur(14px);
  border:1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  transition:
    all 0.3s ease;
  box-shadow:
    0 10px 30px rgba(0,0,0,0.16);
  cursor: pointer;
}

.custom-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.22);
  border-color:rgba(212, 175, 55, 0.35);
}

.custom-card p {
  flex-grow: 1;
  margin-top: 0.8rem;
  opacity: 0.9;
  line-height: 1.7;
  font-size: 0.95rem;
}

.icon-circle {
  width: 78px;
  height: 78px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.icon-circle.green {
  background:
    linear-gradient(
      135deg,
      #198754,
      #0f5132
    );
}

.icon-circle.red {
  background:
    linear-gradient(
      135deg,
      #ff4d4d,
      #b30000
    );
}

.icon-img {
  width: 48px;

  height: 48px;

  object-fit: contain;
}

h3.green {
  color: #73ff73;
}

h3.red {
  color: #ff6b6b;
}

.custom-card h3 {
  font-size: 1rem;

  font-weight: 800;

  margin-bottom: 0.4rem;
}

.custom-btn {
  margin-top: 1rem;

  border: none;

  border-radius: 12px;

  padding: 0.85rem 1rem;

  color: white;

  font-weight: 700;

  transition:
    all 0.25s ease;
}

.custom-btn.green {
  background:
    linear-gradient(
      135deg,
      #198754,
      #0f5132
    );
}

.custom-btn.red {
  background:
    linear-gradient(
      135deg,
      #ff4d4d,
      #b30000
    );
}

.custom-btn:hover {
  transform: translateY(-2px);

  opacity: 0.92;
}
</style>