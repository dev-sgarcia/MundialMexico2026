<template>
  <header
    class="d-flex align-items-center justify-content-between bg-black px-4 py-1"
  >
    <RouterLink
      to="/"
      class="d-flex align-items-center gap-2 text-decoration-none"
    >
      <img src="@/assets/Logo-Quinielas.png" alt="Quinielas" class="logo-img" />
    </RouterLink>

    <div class="d-flex align-items-center gap-3">
      <button
        type="button"
        class="btn btn-outline-success rounded-circle position-relative p-2 d-none d-md-flex align-items-center justify-content-center"
      >
        <span class="fs-5">🔔</span>

        <span
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        >
          3
        </span>
      </button>

      <div class="d-flex align-items-center gap-2 rounded-4 px-3 py-2 bg-dark">
        <img
          src="@/assets/user.png"
          alt="Foto de perfil"
          width="42"
          height="42"
          class="rounded-circle object-fit-cover"
        />

        <div class="d-none d-sm-block lh-sm">
          <p class="mb-0 fw-bold text-white small">¡Bienvenido, Samuel!</p>

          <small class="text-white-50">
            Vive la pasión del Mundial 2026 🏆
          </small>
        </div>

        <button type="button" class="btn btn-sm text-white-50 p-0 border-0">
          ▼
        </button>
      </div>
    </div>
  </header>
</template>

<script setup></script>
<style scoped>
.logo-img {
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: contain;
}
</style>
