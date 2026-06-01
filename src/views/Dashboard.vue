<template>
  <div class="bg-black min-vh-100">
    <Header />

    <div class="container-fluid px-3 py-3">
      <div class="d-flex gap-3 align-items-start">
        <aside
          class="d-none d-lg-block col-lg-3 col-xl-2 vh-100 overflow-hidden"
        >
          <Sidebar />
        </aside>

        <main class="flex-grow-1 overflow-hidden">
          
          <!-- BANNER PRINCIPAL -->
          <!-- <section
            class="hero-card position-relative rounded-4 overflow-hidden border border-success border-opacity-25 mb-4"
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
          </section> -->

          <!-- SECCIÓN DE REGLAS -->
          <section class="rules-section">
            <div class="card bg-dark text-white border-success border-opacity-25 rounded-4 shadow">
              <div class="card-header bg-transparent border-bottom border-success border-opacity-25 py-3 px-4">
                <h4 class="fw-bold mb-0 text-gold d-flex align-items-center gap-2">
                  📜 Reglas de la Quiniela
                </h4>
              </div>
              
              <div class="card-body p-4">
                <!-- Dinámica de Premios -->
                <h5 class="fw-bold text-success mb-3">🏆 Dinámica de Premios</h5>
                <p class="text-white-50 mb-4">
                  Todo el monto acumulado de nuestra quiniela se dividirá en <strong>dos bolsas iguales (50% y 50%)</strong>. Tienes dos grandes oportunidades de ganar:
                </p>

                <div class="row g-4 mb-4">
                  <div class="col-12 col-md-6">
                    <div class="p-3 bg-black rounded-4 border border-secondary border-opacity-25 h-100">
                      <h6 class="fw-bold text-gold border-bottom border-secondary border-opacity-25 pb-2 mb-3">
                        💰 Bolsa 1: Fase de Grupos (50%)
                      </h6>
                      <ul class="text-white-50 small mb-0 ps-3">
                        <li class="mb-2">🥇 <strong>1º Lugar:</strong> 50% de esta bolsa</li>
                        <li class="mb-2">🥈 <strong>2º Lugar:</strong> 30% de esta bolsa</li>
                        <li>🥉 <strong>3º Lugar:</strong> 20% de esta bolsa</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div class="col-12 col-md-6">
                    <div class="p-3 bg-black rounded-4 border border-secondary border-opacity-25 h-100">
                      <h6 class="fw-bold text-gold border-bottom border-secondary border-opacity-25 pb-2 mb-3">
                        💰 Bolsa 2: Campeón Absoluto (50%)
                      </h6>
                      <ul class="text-white-50 small mb-0 ps-3">
                        <li class="mb-2">🥇 <strong>1º Lugar:</strong> 50% de esta bolsa</li>
                        <li class="mb-2">🥈 <strong>2º Lugar:</strong> 30% de esta bolsa</li>
                        <li>🥉 <strong>3º Lugar:</strong> 20% de esta bolsa</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- EJEMPLO PRÁCTICO -->
                <div class="alert bg-success bg-opacity-10 border border-success border-opacity-25 text-white-50 mb-5 rounded-4 p-4">
                  <h6 class="fw-bold text-success mb-3">💡 Ejemplo para que quede clarísimo:</h6>
                  <p class="mb-3">
                    <strong class="text-white">Para la Bolsa 1 (Fase de Grupos):</strong> Si Pablo suma más puntos que nadie durante los primeros 48 partidos (antes de octavos de final), él se lleva el 50% de la Bolsa 1. ¡No importa qué pase después, ese premio ya es suyo!
                  </p>
                  <p class="mb-3">
                    <strong class="text-white">Para la Bolsa 2 (Fase de Elminación):</strong> Borrón de puntos y cuenta nueva, Selma no ganó la fase de grupos (ya que ganó Pablo), pero acertó casi todos los partidos de eliminación directa y además adivinó desde el principio qué país sería el Campeón del Mundo (ganando sus 10 puntos de bono extra), su suma total al terminar el Mundial será la más alta y se llevará el 50% de la Bolsa 2.
                  </p>
                  <p class="mb-3">
                    <strong class="text-white">En caso de empate en puntos (Para todos):</strong> Se tomará en cuenta al participante que haya registrado primero que todos, su último marcador. Ejemplo: Gana el que registro su resultado 5 horas antes del partido y no el que registro su resultado una hora antes.
                  </p>
                </div>

                <!-- Sistema de Puntuación -->
                <h5 class="fw-bold text-success mb-3">📊 Sistema de Puntuación</h5>
                <div class="bg-black rounded-4 border border-secondary border-opacity-25 p-3 mb-5">
                  <ul class="text-white-50 mb-0 ps-3">
                    <li class="mb-2">
                      <strong class="text-white">3 puntos:</strong> Si aciertas al resultado del juego (ganador o empate), incluyendo el marcador exacto.
                    </li>
                    <li>
                      <strong class="text-white">1 punto:</strong> Si aciertas al resultado del juego (ganador o empate), pero fallas en el marcador exacto.
                    </li>
                  </ul>
                </div>

                <!-- Bono de Oro -->
                <h5 class="fw-bold text-success mb-3">🌟 El Bono de Oro</h5>
                <p class="text-white-50 mb-0">
                  Antes de que ruede el primer balón del Mundial, deberás registrar qué selección crees que levantará la Copa. Si tu equipo elegido resulta ser el Campeón del Mundo, sumarás <strong>10 puntos extra</strong> a tu conteo general final. ¡Este bono puede ser el empujón definitivo para llevarte la bolsa principal!
                </p>
              </div>
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

const route = useRoute();

const userId = ref(null);
const idLigaActiva = ref(route.query.ligaId || localStorage.getItem('ligaIdActiva') || null);
const nombreLigaActiva = ref(route.query.ligaNombre || localStorage.getItem('ligaNombreActiva') || "Mi Quiniela");

if (idLigaActiva.value && idLigaActiva.value !== 'null') {
  localStorage.setItem('ligaIdActiva', idLigaActiva.value);
  localStorage.setItem('ligaNombreActiva', nombreLigaActiva.value);
}

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    userId.value = session.user.id;
  }
});

watch(() => route.query.ligaId, (newId) => {
  if (newId && newId !== 'null') {
    idLigaActiva.value = newId;
    nombreLigaActiva.value = route.query.ligaNombre || localStorage.getItem('ligaNombreActiva') || "Mi Quiniela";
    
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

.text-gold {
  color: #d4af37;
}
</style>