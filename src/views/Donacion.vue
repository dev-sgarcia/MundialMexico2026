<template>
  <div class="donacion-page">
    <Header />

    <!-- HERO -->
    <section class="hero-donacion">
      <h1>APOYA EL PROYECTO</h1>
      <p>Tu apoyo nos ayuda a seguir mejorando la plataforma</p>
    </section>

    <!-- CONTENIDO -->
    <section class="donacion-container">
      <div class="profile-card">
        <img class="avatar" :src="samImg" @click="openImage(samImg)" />
        <h2>Samuel Arturo García Sánchez</h2>
        <a href="https://github.com/dev-sgarcia" target="_blank" class="link">
          https://github.com/dev-sgarcia
        </a>
        <p class="bio">
          Desarrollador de software especialista en Delphi y creador de esta
          plataforma.
        </p>
      </div>

      <div class="profile-card">
        <img class="avatar" :src="javiImg" @click="openImage(javiImg)" />
        <h2>Javier González Reyes</h2>
        <a href="https://github.com/J4vi3rGR" target="_blank" class="link">
          <br />
          https://github.com/J4vi3rGR
        </a>
        <p class="bio">
          Desarrollador de software especialista en .Net e integrante de este
          proyecto.
        </p>
      </div>

      <div class="profile-card">
        <img class="avatar" :src="erikImg" @click="openImage(erikImg)" />
        <h2>Erik Ruben Cruz Cortes</h2>
        <a href="https://github.com/Erik" target="_blank" class="link">
          https://github.com/Erik
        </a>
        <p class="bio">
          Full Stack Developer especialista en desarrollo de sistemas e
          integrante de este proyecto.
        </p>
      </div>

      <!-- MENSAJE -->
      <div class="profile-card">
        <img class="avatar" src="@/assets/hecho.png" />
        <h2>Gracias por tu apoyo</h2>
        <p>
          Esta quiniela fue desarrollada con el objetivo de crear una
          experiencia divertida y competitiva para el Mundial de México 2026.
        </p>
      </div>

      <!-- PAYPAL -->
      <div class="profile-card">
        <img class="avatar" src="@/assets/paypal-blue.png" />
        <h2>Donar con PayPal</h2>
        <a href="https://paypal.me/sammomx" target="_blank" class="link">
          ¡Invitanos una cerveza!
        </a>

        <p class="location">Ciudad de México</p>
        <p class="bio">
          Puedes apoyar el proyecto de forma rápida y segura, usando PayPal.
        </p>
      </div>

      <!-- TRANSFERENCIA -->
      <div class="profile-card">
        <img class="avatar" src="@/assets/bbva.png" />
        <h2>Transferencia bancaria</h2>
        <p><strong>Banco:</strong> BBVA</p>
        <p><strong>CLABE:</strong> 012180015009614170</p>
        <p><strong>Nombre:</strong> Samuel Arturo García Sánchez</p>
      </div>
    </section>

    <Footer />
  </div>

  <div v-if="showModal" class="modal" @click="closeModal">
    <img :src="selectedImage" class="modal-img" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import samImg from "@/assets/sam.png";
import erikImg from "@/assets/erik.png";
import javiImg from "@/assets/javi.png";

const showModal = ref(false);
const selectedImage = ref("");

const openLink = (url) => {
  window.open(url, "_blank");
};

const openImage = (img) => {
  selectedImage.value = img;
  showModal.value = true;
  document.body.classList.add("modal-open");
};

const closeModal = () => {
  showModal.value = false;
  document.body.classList.remove("modal-open");
};

import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
</script>

<style scoped>
.donacion-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background:
    linear-gradient(rgba(0, 40, 20, 0.75), rgba(0, 0, 0, 0.85)),
    url("@/assets/hero-bg.jpg") center/cover no-repeat;
}

/* HERO */
.hero-donacion {
  text-align: center;
  padding: 80px 20px 40px;
  color: white;
  position: relative;
  z-index: 2;
}

.hero-donacion h1 {
  font-size: 36px;
  font-weight: bold;
}

.hero-donacion p {
  opacity: 0.9;
}

/* GRID */
.donacion-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px 40px; /* 👈 MÁS espacio vertical y horizontal */
  padding: 60px 40px;
  flex: 1;
}

/* CARDS */
.don-card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* CARD PRINCIPAL */
.don-card.main {
  text-align: center;
  border: 2px solid #2e7d32;
}

/* BOTÓN */
.btn-primary {
  background: #2e7d32;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  margin-top: 15px;
  font-weight: bold;
  cursor: pointer;
}

/* BANK INFO */
.bank-info p {
  margin: 5px 0;
  font-size: 14px;
}

/* MENSAJE */
.message {
  background: #e8f5e9;
}

.profile-card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  text-align: center;
  max-width: 400px;
  margin: auto;
  position: relative;
  padding: 60px 20px 25px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.avatar {
  position: absolute;
  top: -35px; /* 👈 controla cuánto sobresale */
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid white;
}

.username {
  color: #666;
}

.location {
  color: #2e7d32;
  font-size: 14px;
}

.bio {
  margin-top: 15px;
  font-size: 14px;
}

.link {
  color: #2e7d32;
  font-size: 14px;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 20px; /* margen en móviles */
}

/* 👇 CLAVE */
.modal-img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

body.modal-open {
  overflow: hidden;
}

@media (max-width: 992px) {
  .donacion-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .donacion-container {
    grid-template-columns: 1fr;
  }
}
</style>
