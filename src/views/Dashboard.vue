<template>
  <div class="bg-black min-vh-100">
    <Header />

    <div class="container-fluid px-3 py-3">
      <div class="d-flex gap-3 align-items-start">
        <Sidebar />
        <main class="flex-grow-1">
          <section
            class="hero-card position-relative rounded-4 overflow-hidden border border-success border-opacity-25"
          >
            <!-- Imagen -->
            <img
              src="@/assets/bg-dashboard.png"
              alt="Mundial"
              class="hero-image w-100"
            />

            <!-- Overlay -->
            <div class="hero-overlay"></div>

            <!-- Contenido -->
            <div
              class="position-absolute top-50 start-0 translate-middle-y text-white px-4 px-lg-5"
            >
              <h1 class="fw-bold mb-0">MUNDIAL</h1>

              <h2 class="fw-bold mb-3">
                <span class="text-success">MÉXICO</span>
                <span class="text-danger"> 2026</span>
              </h2>

              <p class="fw-semibold mb-4">11 JUN - 19 JUL</p>

              <button class="btn btn-danger rounded-3 px-4 py-2">
                <i class="bi bi-calendar-event me-2"></i>
                Ver calendario
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/dashboard/Sidebar.vue";
</script>

<style scoped>
.hero-card {
  height: 290px;
}

.hero-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center 88%;
}

.hero-overlay {
  position: absolute;
  inset: 0;

  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.82) 25%,
    rgba(0, 0, 0, 0.35) 50%,
    rgba(0, 0, 0, 0.85) 100%
  );
}
</style>
