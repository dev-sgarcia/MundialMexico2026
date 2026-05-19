<template>
  <div class="reglas-page-bg">
    <Header />
    <section class="hero-reglas text-center text-white px-3">

      <div class="container">

        <h1 class="fw-bold display-4 display-lg-3">
          REGLAS DE LA QUINIELA
        </h1>

        <p class="hero-description mx-auto">
          Conoce cómo se puntúa y las condiciones para participar.
        </p>

      </div>

    </section>

    <section class="container pb-5">

      <div class="row g-4">

        <div class="col-12 col-md-6 col-xl-4">

          <div class="rule-card h-100">

            <div class="d-flex align-items-start gap-3">

              <div class="icon-circle green">

                <img src="@/assets/porteria.png" />

              </div>

              <div class="card-content">

                <h3>3 PUNTOS</h3>

                <p>
                  Si le atinas al marcador exacto.
                </p>

                <small>
                  (Ej. Dices 2-1 y termina 2-1)
                </small>

              </div>

            </div>

          </div>

        </div>

        <div class="col-12 col-md-6 col-xl-4">

          <div class="rule-card h-100">

            <div class="d-flex align-items-start gap-3">

              <div class="icon-circle green">

                <img src="@/assets/campeon.png" />

              </div>

              <div class="card-content">

                <h3>1 PUNTO</h3>

                <p>
                  Si aciertas ganador o empate,
                  pero no el marcador.
                </p>

              </div>

            </div>

          </div>

        </div>

        <div class="col-12 col-md-6 col-xl-4">

          <div class="rule-card h-100">

            <div class="d-flex align-items-start gap-3">

              <div class="icon-circle green">

                <img src="@/assets/corona.png" />

              </div>

              <div class="card-content">

                <h3>10 PUNTOS</h3>

                <p>
                  Si eliges al campeón
                  desde el inicio.
                </p>

              </div>

            </div>

          </div>

        </div>

        <div class="col-12 col-md-6 col-xl-4">

          <div class="rule-card h-100">

            <div class="d-flex align-items-start gap-3">

              <div class="icon-circle green">

                <img src="@/assets/reloj.png" />

              </div>

              <div class="card-content">

                <h3>TIEMPO LÍMITE</h3>

                <p>
                  Tienes hasta 1 hora antes del partido.
                </p>

              </div>

            </div>

          </div>

        </div>

        <div class="col-12 col-md-6 col-xl-4">

          <div class="rule-card red h-100">

            <div class="d-flex align-items-start gap-3">

              <div class="icon-circle red">

                <img src="@/assets/regalo.png" />

              </div>

              <div class="card-content">

                <h3>PREMIOS</h3>

                <ul class="mb-0">

                  <li>Ganador fase grupos</li>

                  <li>Ganador finales</li>

                  <li>Mayor puntaje</li>

                </ul>

              </div>

            </div>

          </div>

        </div>

        <div class="col-12 col-md-6 col-xl-4">

          <div class="rule-card h-100">

            <div class="d-flex align-items-start gap-3">

              <div class="icon-circle green">

                <img src="@/assets/balanza.png" />

              </div>

              <div class="card-content">

                <h3>DESEMPATE</h3>

                <p>
                  Se toma el primer registro realizado.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

    <section class="container pb-5">

      <div
        class="cta-card d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 text-center text-lg-start"
      >

        <div>

          <h2 class="fw-bold mb-2">
            ¡Que gane el mejor!
          </h2>

          <p class="mb-0 text-white-50">
            Participa, diviértete y demuestra tus conocimientos.
          </p>

        </div>

        <button class="btn-jugar">
          IR A JUGAR
        </button>

      </div>

    </section>
    <Footer />

  </div>
</template>

<script setup>
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
</script>

<style scoped>
.reglas-page-bg {
  min-height: 100vh;

  background:
    linear-gradient(
      rgba(0, 50, 30, 0.72),
      rgba(0, 0, 0, 0.84)
    ),
    url("/src/assets/bg-rules.jpg")
    center/cover no-repeat;
}


.hero-reglas {
  padding:
    4rem 0 3rem;
}

.hero-description {
  color:
    rgba(255,255,255,0.82);

  max-width: 700px;

  line-height: 1.8;

  font-size: 1rem;
}

.rule-card {
  position: relative;
  cursor: pointer;
  background:
    rgba(255, 255, 255, 0.05);

  backdrop-filter: blur(14px);

  -webkit-backdrop-filter: blur(14px);

  border:
    1px solid rgba(255, 255, 255, 0.12);

  border-radius: 22px;

  padding: 1.4rem;

  overflow: hidden;

  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.18);
}

.rule-card::before {
  content: "";

  position: absolute;

  inset: 0;

  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,0.06),
      transparent 40%
    );

  pointer-events: none;
}

.rule-card:hover {
  transform: translateY(-6px);

  border-color:
    rgba(212, 175, 55, 0.35);

  box-shadow:
    0 0 30px rgba(0,0,0,0.28);
}

.icon-circle {
  width: 68px;

  height: 68px;

  min-width: 68px;

  border-radius: 18px;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

  border:
    1px solid rgba(255,255,255,0.12);

  backdrop-filter: blur(8px);
}

.icon-circle.green {
  background:
    linear-gradient(
      135deg,
      rgba(31, 122, 66, 0.75),
      rgba(40, 167, 69, 0.55)
    );
}

.icon-circle.red {
  background:
    linear-gradient(
      135deg,
      rgba(180, 30, 30, 0.75),
      rgba(255, 70, 70, 0.55)
    );
}

.icon-circle img {
  width: 38px;

  object-fit: contain;
}

.card-content h3 {
  margin: 0;

  font-size: 1.1rem;

  font-weight: 800;

  color: #d4af37;
}

.card-content p {
  margin: 0.4rem 0;

  font-size: 0.95rem;

  line-height: 1.7;

  color:
    rgba(255,255,255,0.82);
}

.card-content small {
  color:
    rgba(255,255,255,0.55);

  font-size: 0.8rem;
}

.rule-card.red .card-content h3 {
  color: #ff6b6b;
}

ul li {
  color:
    rgba(255,255,255,0.82);

  margin-bottom: 0.3rem;

  font-size: 0.9rem;
}


.cta-card {
  background:
    rgba(255,255,255,0.05);

  backdrop-filter: blur(14px);

  -webkit-backdrop-filter: blur(14px);

  border:
    1px solid rgba(255,255,255,0.12);

  border-radius: 22px;

  padding: 2rem;

  color: white;

  box-shadow:
    0 10px 30px rgba(0,0,0,0.18);
}

.btn-jugar {
  border: none;
  padding:0.9rem 1.6rem;
  border-radius: 14px;
  font-weight: 700;
  color: white;
  background:
    linear-gradient(
      135deg,
      #1f7a42,
      #28a745
    );

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  white-space: nowrap;
}

.btn-jugar:hover {
  transform: translateY(-3px);

  box-shadow:
    0 8px 24px rgba(40,167,69,0.35);
}
</style>