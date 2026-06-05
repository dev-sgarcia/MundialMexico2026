<template>
  <div class="rules-page min-vh-100 pb-5">
    <div class="container-fluid px-3 px-md-4">
      <div class="row g-3 align-items-start">
        <aside class="d-none d-lg-block col-lg-3 col-xl-2">
          <div class="position-fixed top-0 start-0 p-3 sidebar-fixed">
            <Sidebar />
          </div>
        </aside>

        <main
          class="col-12 col-lg-9 col-xl-10 offset-lg-3 offset-xl-2 position-relative"
        >
          <div
            class="d-none d-lg-flex position-absolute top-0 end-0 mt-3 me-4 z-3"
          >
            <UserProfile />
          </div>
          <section class="p-0">
            <div class="hero-banner rounded-4 mb-3 mb-xl-4 p-3 p-md-4">
              <div class="row align-items-center h-100 g-3">
                <div class="col-12 col-lg-5 col-xl-3">
                  <span
                    class="rules-kicker text-uppercase fw-bold d-block mb-2"
                  >
                    Mundial México 2026
                  </span>

                  <h1 class="rules-title mb-3">
                    REGLAS DE
                    <span class="title-highlight">LA QUINIELA</span>
                  </h1>

                  <div class="title-line"></div>
                </div>

                <div class="col-12 col-lg-4 col-xl-3 hero-copy-col">
                  <p class="hero-copy text-justify mb-0">
                    Conoce cómo se reparten los premios, cómo se calculan los
                    puntos y cómo puedes convertirte en campeón.
                  </p>
                </div>

                <div class="d-none d-xl-block col-xl-4"></div>
              </div>
            </div>
            <div class="row g-3 mb-3 mb-xl-4">
              <div class="col-12 col-md-6 col-xl-4">
                <article
                  class="rule-card stadium-mercedesbenz rule-green h-100 p-3 d-flex flex-column flex-sm-row align-items-center align-items-sm-start text-center text-sm-start gap-3"
                >
                  <div class="rule-icon flex-shrink-0">
                    <i class="fa-solid fa-trophy"></i>
                  </div>

                  <div class="rule-content flex-grow-1">
                    <h5 class="mb-1">Dinámica de Premios</h5>
                    <div class="rule-divider divider-green mb-3"></div>
                    <p class="mb-0 text-justify">
                      Todo el monto acumulado se divide en
                      <strong>dos bolsas iguales</strong>: 50% y 50%. Tienes dos
                      grandes oportunidades de ganar.
                    </p>
                  </div>
                  <div class="stadium-overlay"></div>

                  <div class="stadium-info">
                    <div class="fw-bold text-white small">
                      Mercedes-Benz Stadium
                    </div>

                    <div class="text-white-50 small">
                      Atlanta, USA · Mundial 2026
                    </div>
                  </div>
                </article>
              </div>

              <div class="col-12 col-md-6 col-xl-4">
                <article
                  class="rule-card stadium-monterrey rule-blue h-100 p-3 d-flex flex-column flex-sm-row align-items-center align-items-sm-start text-center text-sm-start gap-3"
                >
                  <div class="rule-icon flex-shrink-0">
                    <i class="fa-solid fa-sack-dollar"></i>
                  </div>

                  <div class="rule-content flex-grow-1">
                    <h5 class="mb-1">Bolsa 1: Fase de Grupos (50%)</h5>
                    <div class="rule-divider divider-blue mb-3"></div>

                    <div class="points-row">
                      <span>1º Lugar</span>
                      <strong>50%</strong>
                    </div>
                    <div class="points-row">
                      <span>2º Lugar</span>
                      <strong>30%</strong>
                    </div>
                    <div class="points-row mb-0">
                      <span>3º Lugar</span>
                      <strong>20%</strong>
                    </div>
                  </div>
                  <div class="stadium-overlay"></div>

                  <div class="stadium-info">
                    <div class="fw-bold text-white small">Estadio BBVA</div>

                    <div class="text-white-50 small">
                      Monterrey, México · Mundial 2026
                    </div>
                  </div>
                </article>
              </div>

              <div class="col-12 col-md-6 col-xl-4">
                <article
                  class="rule-card stadium-sofi rule-gold h-100 p-3 d-flex flex-column flex-sm-row align-items-center align-items-sm-start text-center text-sm-start gap-3"
                >
                  <div class="rule-icon flex-shrink-0">
                    <i class="fa-solid fa-crown"></i>
                  </div>

                  <div class="rule-content flex-grow-1">
                    <h5 class="mb-1">Bolsa 2: Campeón Absoluto (50%)</h5>
                    <div class="rule-divider divider-gold mb-3"></div>

                    <div class="points-row">
                      <span>1º Lugar</span>
                      <strong>50%</strong>
                    </div>
                    <div class="points-row">
                      <span>2º Lugar</span>
                      <strong>30%</strong>
                    </div>
                    <div class="points-row mb-0">
                      <span>3º Lugar</span>
                      <strong>20%</strong>
                    </div>
                  </div>
                  <div class="stadium-overlay"></div>

                  <div class="stadium-info">
                    <div class="fw-bold text-white small">SoFi Stadium</div>

                    <div class="text-white-50 small">
                      Los Ángeles, USA · Sede Mundial 2026
                    </div>
                  </div>
                </article>
              </div>

              <div class="col-12 col-md-6 col-xl-4">
                <article
                  class="rule-card stadium-toronto rule-purple h-100 p-3 d-flex flex-column flex-sm-row align-items-center align-items-sm-start text-center text-sm-start gap-3"
                >
                  <div class="rule-icon flex-shrink-0">
                    <i class="fa-solid fa-bullseye"></i>
                  </div>

                  <div class="rule-content flex-grow-1">
                    <h5 class="mb-1">Sistema de Puntuación</h5>
                    <div class="rule-divider divider-purple mb-3"></div>

                    <p class="mb-2 text-justify">
                      <strong>3 puntos</strong> Si aciertas al resultado del
                      juego (ganador o empate), incluyendo el marcador exacto.
                    </p>

                    <p class="mb-0 text-justify">
                      <strong>1 punto</strong> Si aciertas al resultado del
                      juego (ganador o empate), pero fallas en el marcador
                      exacto.
                    </p>
                  </div>
                  <div class="stadium-overlay"></div>

                  <div class="stadium-info">
                    <div class="fw-bold text-white small">BMO Field</div>

                    <div class="text-white-50 small">
                      Toronto, Canadá · Mundial 2026
                    </div>
                  </div>
                </article>
              </div>

              <div class="col-12 col-md-6 col-xl-4">
                <article
                  class="rule-card stadium-metlife rule-cyan h-100 p-3 d-flex flex-column flex-sm-row align-items-center align-items-sm-start text-center text-sm-start gap-3"
                >
                  <div class="rule-icon flex-shrink-0">
                    <i class="fa-solid fa-star"></i>
                  </div>

                  <div class="rule-content flex-grow-1">
                    <h5 class="mb-1">Bono de Oro</h5>
                    <div class="rule-divider divider-cyan mb-3"></div>

                    <p class="mb-0 text-justify">
                      Elige al campeón antes del primer partido. Si aciertas,
                      sumas <strong>10 puntos extra</strong>.
                    </p>
                  </div>
                  <div class="stadium-overlay"></div>

                  <div class="stadium-info">
                    <div class="fw-bold text-white small">MetLife Stadium</div>

                    <div class="text-white-50 small">
                      New Jersey, USA · Final Mundial 2026
                    </div>
                  </div>
                </article>
              </div>

              <div class="col-12 col-md-6 col-xl-4">
                <article
                  class="rule-card stadium-guadalajara rule-red h-100 p-3 d-flex flex-column flex-sm-row align-items-center align-items-sm-start text-center text-sm-start gap-3"
                >
                  <div class="rule-icon flex-shrink-0">
                    <i class="fa-solid fa-scale-balanced"></i>
                  </div>

                  <div class="rule-content flex-grow-1">
                    <h5 class="mb-1">Desempate</h5>
                    <div class="rule-divider divider-red mb-3"></div>

                    <p class="mb-0 text-justify">
                      En caso de empate, gana quien haya registrado primero su
                      último marcador.
                    </p>
                  </div>
                  <div class="stadium-overlay"></div>

                  <div class="stadium-info">
                    <div class="fw-bold text-white small">Estadio Akron</div>

                    <div class="text-white-50 small">
                      Guadalajara, México · Mundial 2026
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <div class="cta-card rounded-4 p-3 p-md-4">
              <div class="row align-items-center g-3">
                <div class="col-auto">
                  <div class="cta-icon">
                    <i class="fa-solid fa-trophy"></i>
                  </div>
                </div>

                <div class="col">
                  <h3 class="h5 fw-black text-white mb-1">
                    ¡QUE GANE <span>EL MEJOR!</span>
                  </h3>
                  <p class="text-white-50 small mb-0">
                    Participa, diviértete y demuestra tus conocimientos.
                  </p>
                </div>

                <div class="col-12 col-md-auto">
                  <RouterLink to="/predicciones" class="btn-play">
                    <i class="fa-solid fa-futbol"></i>
                    IR A JUGAR
                    <i class="fa-solid fa-chevron-right"></i>
                  </RouterLink>
                </div>
              </div>
            </div>
          </section>

          <div class="d-lg-none pb-5"></div>
        </main>
      </div>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "@/supabaseClient";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import BottomNav from "@/components/dashboard/BottomNav.vue";
import UserProfile from "@/components/common/UserProfile.vue";

const route = useRoute();

const userId = ref(null);

const idLigaActiva = ref(
  route.query.ligaId || localStorage.getItem("ligaIdActiva") || null,
);

const nombreLigaActiva = ref(
  route.query.ligaNombre ||
    localStorage.getItem("ligaNombreActiva") ||
    "Mi Quiniela",
);

// 👇 SOLUCIÓN: Faltaba declarar la variable eventoIdActiva
const eventoIdActiva = ref(
  route.query.eventoId || localStorage.getItem("eventoIdActiva") || null,
);

// Caché al inicio
if (idLigaActiva.value && idLigaActiva.value !== "null") {
  localStorage.setItem("ligaIdActiva", idLigaActiva.value);
  localStorage.setItem("ligaNombreActiva", nombreLigaActiva.value);
}

if (eventoIdActiva.value && eventoIdActiva.value !== "null") {
  localStorage.setItem("eventoIdActiva", eventoIdActiva.value);
}

onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    userId.value = session.user.id;
  }
});

watch(
  () => route.query.ligaId,
  (newId) => {
    if (newId && newId !== "null") {
      idLigaActiva.value = newId;
      nombreLigaActiva.value =
        route.query.ligaNombre ||
        localStorage.getItem("ligaNombreActiva") ||
        "Mi Quiniela";

      // 👇 También la atrapamos aquí por si cambian de liga en el menú
      eventoIdActiva.value =
        route.query.eventoId || localStorage.getItem("eventoIdActiva") || null;

      localStorage.setItem("ligaIdActiva", newId);
      localStorage.setItem("ligaNombreActiva", nombreLigaActiva.value);

      if (eventoIdActiva.value) {
        localStorage.setItem("eventoIdActiva", eventoIdActiva.value);
      }
    }
  },
  { immediate: false },
);
</script>
<style scoped>
.rules-page {
  color: #fff;
  background: #020807;
}

.fw-black {
  font-weight: 900;
}

.rule-card,
.example-card,
.cta-card {
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
}

/* HERO */
.hero-banner {
  min-height: 200px;
  background:
    linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.72) 34%,
      rgba(0, 0, 0, 0.32) 58%,
      rgba(0, 0, 0, 0.05) 100%
    ),
    url("@/assets/trionda-stadium.png");
  background-size: cover;
  background-position: center bottom;
}

.hero-banner .row {
  min-height: 100%;
}

.rules-kicker {
  color: #48c866;
  letter-spacing: 0.11rem;
  font-size: 0.72rem;
}

.rules-title {
  font-size: clamp(1.9rem, 3.2vw, 3.15rem);
  line-height: 0.95;
  font-weight: 900;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.24);
}

.rules-title span {
  display: block;
  color: #4caf6a;
  text-shadow:
    0 0 6px rgba(76, 175, 106, 0.22),
    0 0 12px rgba(76, 175, 106, 0.1);
}

.title-highlight {
  display: inline-block;
}

.title-line {
  width: 100%;
  max-width: 420px;
  height: 5px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    #00c853 0 45%,
    #ffffff 45% 60%,
    #ff3d3d 60%
  );
}

.hero-copy-col {
  border-left: 1px solid rgba(57, 211, 83, 0.35);
  padding-left: 1rem;
}

.hero-copy {
  max-width: 520px;
  color: #fff;
  font-size: 0.95rem;
  line-height: 1.55;
  font-weight: 600;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.85);
}

/* RULE CARDS */
.rule-card {
  min-height: 148px;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(145deg, rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.86)),
    var(--stadium-img) center/cover no-repeat;
  border: 1px solid var(--card-color);
  box-shadow:
    0 0 9px var(--card-glow),
    inset 0 0 22px var(--card-soft);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
  padding-bottom: 3.3rem !important;
}

.stadium-mercedesbenz {
  --stadium-img: url("@/assets/stadiums/Stadium-MercedesBenz.webp");
}

.stadium-monterrey {
  --stadium-img: url("@/assets/stadiums/Stadium-Monterrey.webp");
}

.stadium-sofi {
  --stadium-img: url("@/assets/stadiums/Stadium-Sofi.webp");
}

.stadium-toronto {
  --stadium-img: url("@/assets/stadiums/Stadium-BmoField.webp");
}

.stadium-metlife {
  --stadium-img: url("@/assets/stadiums/Stadium-Metlife.webp");
}

.stadium-guadalajara {
  --stadium-img: url("@/assets/stadiums/Stadium-Guadalajara.webp");
}

.rule-card:hover {
  transform: translateY(-3px);
  box-shadow:
    0 0 12px var(--card-glow),
    0 0 22px var(--card-soft),
    0 12px 24px rgba(0, 0, 0, 0.42);
}

.rule-content {
  min-width: 0;
}

.rule-number {
  font-size: 1.45rem;
  line-height: 1;
  font-weight: 900;
  color: var(--card-bright);
  text-shadow:
    0 0 6px var(--card-glow),
    0 0 12px var(--card-glow);
}

.rule-icon,
.rule-content {
  position: relative;
  z-index: 5;
}

.rule-icon {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  color: var(--card-bright);
  border: 1px solid var(--card-color);
  background: radial-gradient(
    circle,
    var(--card-soft),
    rgba(0, 0, 0, 0.46) 64%
  );
  box-shadow:
    0 0 10px var(--card-glow),
    0 0 18px var(--card-soft),
    inset 0 0 14px var(--card-soft);
}

.rule-icon i {
  filter: drop-shadow(0 0 7px var(--card-bright));
}

.rule-card h5 {
  color: #fff;
  font-size: 0.96rem;
  font-weight: 900;
  line-height: 1.2;
  text-wrap: balance;
  text-shadow: 0 0 7px rgba(255, 255, 255, 0.18);
}

.rule-card p {
  color: rgba(255, 255, 255, 0.76);
  font-size: 0.84rem;
  line-height: 1.45;
  margin: 0;
}

.rule-card strong {
  color: #fff;
}

.rule-line {
  width: 32px;
  height: 3px;
  display: block;
  margin-bottom: 0.6rem;
  border-radius: 999px;
  background: var(--card-bright);
  box-shadow: 0 0 7px var(--card-glow);
}

.points-row {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.82rem;
  margin-bottom: 0.35rem;
}

.points-row strong {
  color: var(--card-bright);
  border: 1px solid var(--card-color);
  border-radius: 0.45rem;
  padding: 0.02rem 0.45rem;
  box-shadow: 0 0 7px var(--card-soft);
}

.rule-green {
  --card-bright: #58d36f;
  --card-color: rgba(88, 211, 111, 0.48);
  --card-glow: rgba(88, 211, 111, 0.2);
  --card-soft: rgba(88, 211, 111, 0.075);
}

.rule-blue {
  --card-bright: #6ea8fe;
  --card-color: rgba(110, 168, 254, 0.48);
  --card-glow: rgba(110, 168, 254, 0.2);
  --card-soft: rgba(110, 168, 254, 0.075);
}

.rule-gold {
  --card-bright: #d8b34d;
  --card-color: rgba(216, 179, 77, 0.5);
  --card-glow: rgba(216, 179, 77, 0.22);
  --card-soft: rgba(216, 179, 77, 0.075);
}

.rule-purple {
  --card-bright: #a970ff;
  --card-color: rgba(169, 112, 255, 0.46);
  --card-glow: rgba(169, 112, 255, 0.18);
  --card-soft: rgba(169, 112, 255, 0.075);
}

.rule-cyan {
  --card-bright: #4fd1c5;
  --card-color: rgba(79, 209, 197, 0.46);
  --card-glow: rgba(79, 209, 197, 0.18);
  --card-soft: rgba(79, 209, 197, 0.075);
}

.rule-red {
  --card-bright: #e57373;
  --card-color: rgba(229, 115, 115, 0.48);
  --card-glow: rgba(229, 115, 115, 0.2);
  --card-soft: rgba(229, 115, 115, 0.075);
}

/* EXAMPLE / CTA */
.example-card {
  border: 1px solid rgba(59, 255, 91, 0.16);
  background: rgba(0, 0, 0, 0.5);
}

.example-card h5 {
  font-size: 0.98rem;
}

.example-card p {
  font-size: 0.9rem;
}

.cta-card {
  border: 1px solid rgba(88, 211, 111, 0.38);
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.74), rgba(4, 12, 10, 0.88)),
    url("@/assets/footer.png") center/cover no-repeat;
  box-shadow:
    0 0 12px rgba(88, 211, 111, 0.16),
    inset 0 0 24px rgba(88, 211, 111, 0.05);
}

.cta-icon {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  color: #d8b34d;
  font-size: 1.9rem;
  text-shadow:
    0 0 8px rgba(216, 179, 77, 0.4),
    0 0 16px rgba(216, 179, 77, 0.16);
}

.cta-card h3 span {
  color: #4caf6a;
  text-shadow: 0 0 7px rgba(76, 175, 106, 0.28);
}

.btn-play {
  min-height: 46px;
  padding: 0 1.15rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 900;
  background: linear-gradient(135deg, #157347, #063f1e);
  border: 1px solid rgba(88, 211, 111, 0.58);
  box-shadow:
    0 0 9px rgba(88, 211, 111, 0.28),
    inset 0 0 10px rgba(255, 255, 255, 0.08);
}

/* RESPONSIVE */
.sidebar-fixed {
  width: 16.66666667%;
  max-width: 280px;
}

.rule-divider {
  width: 42px;
  height: 4px;
  border-radius: 999px;
  background: var(--card-bright);
  box-shadow: 0 0 7px var(--card-glow);
}

.text-justify {
  text-align: justify;
}

.divider-green,
.divider-blue,
.divider-gold,
.divider-purple,
.divider-cyan,
.divider-red {
  background: var(--card-bright);
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .sidebar-fixed {
    width: 25%;
  }
}

@media (max-width: 1199.98px) {
  .hero-banner {
    min-height: 200px;
  }

  .rule-card {
    min-height: 142px;
  }

  .rule-icon {
    width: 58px;
    height: 58px;
    font-size: 1.4rem;
  }

  .rule-number {
    font-size: 1.35rem;
  }
}

@media (max-width: 991.98px) {
  .rules-page {
    overflow-x: hidden;
  }

  .hero-banner {
    min-height: auto;
    background:
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0.74) 55%,
        rgba(0, 0, 0, 0.58) 100%
      ),
      url("@/assets/trionda-stadium.png") center/cover no-repeat;
  }

  .hero-copy-col {
    border-left: 0;
    padding-left: 0;
  }

  .hero-copy {
    max-width: 100%;
    font-size: 0.9rem;
  }

  .rules-title {
    font-size: clamp(2rem, 9vw, 2.75rem);
  }

  .rules-kicker {
    font-size: 0.68rem;
  }

  .rule-card {
    min-height: auto;
  }

  .rule-content {
    width: 100%;
  }

  .rule-icon {
    width: 58px;
    height: 58px;
    font-size: 1.4rem;
  }

  .rule-card h5 {
    font-size: 0.98rem;
  }

  .rule-card p,
  .points-row {
    font-size: 0.86rem;
  }

  .points-row {
    width: min(100%, 240px);
    margin-left: auto;
    margin-right: auto;
  }

  .rule-divider {
    margin-left: auto;
    margin-right: auto;
  }

  .cta-card .row {
    text-align: center;
  }

  .cta-icon {
    width: 46px;
    height: 46px;
    margin: 0 auto;
    font-size: 1.65rem;
  }

  .btn-play {
    width: 100%;
  }
}

@media (max-width: 575.98px) {
  .rule-card {
    background:
      linear-gradient(145deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.9)),
      var(--stadium-img) center/cover no-repeat;
  }
}

.hero-banner {
  border-radius: 1rem !important;
}

.rules-kicker,
.rules-title,
.hero-copy {
  text-align: center;
}

.title-line {
  max-width: 260px;
  height: 4px;
  margin: 0 auto;
}

.hero-copy {
  line-height: 1.45;
}

.text-justify {
  text-align: left;
}

.rule-card {
  border-radius: 1rem;
  padding: 1rem !important;
}

.rule-icon {
  width: 54px;
  height: 54px;
  font-size: 1.3rem;
}

.rule-card h5 {
  margin-bottom: 0.35rem !important;
}

.rule-divider {
  width: 38px;
  height: 3px;
  margin-bottom: 0.8rem !important;
}

.points-row {
  width: 100%;
  max-width: 230px;
  gap: 0.75rem;
}

.points-row strong {
  min-width: 48px;
  text-align: center;
}

.cta-card {
  border-radius: 1rem !important;
}

.cta-card .col-auto,
.cta-card .col {
  width: 100%;
}

.stadium-overlay {
  position: absolute;
  inset: 0;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.92) 0%,
    rgba(0, 0, 0, 0.55) 35%,
    transparent 70%
  );

  opacity: 0;
  transition: opacity 0.3s ease;

  z-index: 1;
}

.stadium-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.35rem 0.85rem;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  transform: translateY(100%);
  transition: transform 0.25s ease;
  z-index: 6;
  display: flex;
  align-items: baseline;
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;
}

.stadium-info .fw-bold,
.stadium-info .text-white-50 {
  margin-bottom: 0;
}

.stadium-info .small {
  font-size: 0.72rem;
  line-height: 1.15;
}

.rule-card:hover .stadium-overlay {
  opacity: 1;
}

.rule-card:hover .stadium-info {
  transform: translateY(0);
}
</style>
