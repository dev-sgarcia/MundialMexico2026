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
            <img
              src="@/assets/bg-dashboard.png"
              alt="Mundial"
              class="hero-image w-100"
            />

            <div class="hero-overlay"></div>

            <div
              class="position-absolute top-50 start-0 translate-middle-y text-white px-4 px-lg-5"
            >
              <h1 class="fw-bold mb-0">MUNDIAL</h1>

              <h2 class="fw-bold mb-2">
                <span class="text-success">MÉXICO</span>
                <span class="text-danger"> 2026</span>
              </h2>

              <h4 v-if="nombreLigaActiva && nombreLigaActiva !== 'Mi Quiniela'" class="text-gold fw-bold mb-3">
                Liga: {{ nombreLigaActiva }}
              </h4>

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
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "@/supabaseClient";
import Sidebar from "@/components/dashboard/Sidebar.vue";
// Importa tu Header si lo estás usando directamente aquí
// import Header from "@/components/common/Header.vue"; 

const route = useRoute();

// 1. Variable segura para el usuario
const userId = ref(null);

// 2. Rescatamos de la URL o de la memoria caché (protección contra F5)
const idLigaActiva = ref(route.query.ligaId || localStorage.getItem('ligaIdActiva') || null);
const nombreLigaActiva = ref(route.query.ligaNombre || localStorage.getItem('ligaNombreActiva') || "Mi Quiniela");

// 3. Guardamos inmediatamente en caché si detectamos una liga válida proveniente de "Juega"
if (idLigaActiva.value && idLigaActiva.value !== 'null') {
  localStorage.setItem('ligaIdActiva', idLigaActiva.value);
  localStorage.setItem('ligaNombreActiva', nombreLigaActiva.value);
}

onMounted(async () => {
  // Obtenemos la sesión del usuario de forma segura
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    userId.value = session.user.id;
  }
});

// 4. Mantenemos el vigilante por si la URL cambia sin recargar la página
watch(() => route.query.ligaId, (newId) => {
  if (newId && newId !== 'null') {
    idLigaActiva.value = newId;
    nombreLigaActiva.value = route.query.ligaNombre || localStorage.getItem('ligaNombreActiva') || "Mi Quiniela";
    
    // Actualizamos la caché con los nuevos datos
    localStorage.setItem('ligaIdActiva', newId);
    localStorage.setItem('ligaNombreActiva', nombreLigaActiva.value);
  }
}, { immediate: false });
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

/* Agregamos el color dorado para el título de la liga */
.text-gold {
  color: #d4af37;
}
</style>