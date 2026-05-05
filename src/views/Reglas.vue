<template>
  <!-- <div class="reglas-page"> -->
  <div class="reglas-page-bg">
    <!-- HEADER -->
    <Header />

    <!-- HERO -->
    <section class="hero-reglas">
    <h1>REGLAS DE LA QUINIELA</h1>
    <p>Conoce cómo se puntúa y las condiciones para participar.</p>
    </section>

    <!-- CARDS -->
    <section class="reglas-container">
      <div class="card">
      <div class="card-header">
        <div class="icon-circle green">
        <img src="@/assets/porteria.png" />
        </div>
        <div class="card-content">
        <h3>3 PUNTOS</h3>
        <p>Si le atinas al marcador exacto.</p>
        <small>(Ej. Dices 2-1 y termina 2-1)</small>
      </div>
      </div>
      </div>

      <div class="card">
        <div class="card-header">
        <div class="icon-circle green">
        <img src="@/assets/campeon.png" />
        </div>
        <div class="card-content">
        <h3>1 PUNTO</h3>
        <p>Si aciertas ganador o empate, pero no el marcador.</p>
      </div>
      </div>
      </div>


      <div class="card">
        <div class="card-header">
        <div class="icon-circle green">
        <img src="@/assets/corona.png" />
        </div>
        <div class="card-content">
        <h3>10 PUNTOS</h3>
        <p>Si eliges al campeón desde el inicio.</p>
      </div>
      </div>
      </div>

      <div class="card">
        <div class="card-header">
        <div class="icon-circle green">
        <img src="@/assets/reloj.png" />
        </div>
        <div class="card-content">
        <h3>TIEMPO LÍMITE</h3>
        <p>Tienes hasta 1 hora antes del partido.</p>
      </div>
      </div>
      </div>

      <div class="card red">
        <div class="card-header">
        <div class="icon-circle red">
        <img src="@/assets/regalo.png" />
        </div>
        <div class="card-content">
        <h3>PREMIOS</h3>
        <ul>
        <li>Ganador fase grupos</li>
        <li>Ganador finales</li>
        <li>Mayor puntaje</li>
        </ul>        
      </div>
      </div>
      </div>      

      <div class="card">
        <div class="card-header">        
        <div class="icon-circle green">
        <img src="@/assets/balanza.png" />
        </div>
        <div class="card-content">
        <h3>DESEMPATE</h3>
        <p>Se toma el primer registro realizado.</p>
      </div>
      </div>
      </div>

    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="cta-content">
        <h2>¡Que gane el mejor!</h2>
        <p>Participa, diviértete y demuestra tus conocimientos.</p>
      </div>

      <button class="btn-jugar">IR A JUGAR</button>
    </section>

    <!-- FOOTER -->
    <Footer />

  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
/* 
.reglas-page {
  background: #f4f6f9;
} 
*/

.reglas-page-bg {
  min-height: 100vh;
  background: linear-gradient(
      rgba(0, 50, 30, 0.7),
      rgba(0, 0, 0, 0.8)
    ),
    url('/src/assets/bg-rules.jpg') center/cover no-repeat;    
}

/* HERO */
.hero-reglas {
  text-align: center;
  padding: 60px 20px 30px;
  color: white;
}

.hero-reglas h1 {
  font-size: 36px;
  font-weight: bold;
}

.hero-reglas p {
  opacity: 0.9;
}

/* GRID */
.reglas-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  padding: 40px;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}


.card-header {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.card-content {
  text-align: left;
}

.card-content h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.card-content p {
  margin: 5px 0;
  font-size: 14px;
}

.card-content small {
  color: #666;
}


.icon {
  font-size: 30px;
  margin-bottom: 10px;
}

.icon.green {
  color: #2e7d32;
}

.icon.red {
  color: #e53935;
}

.icon-circle {
  min-width: 60px;
  height: 60px;
}

.card.red h3 {
  color: #e53935;
}

/* CTA */
.cta {
  background: linear-gradient(90deg, #1b5e20, #2e7d32);
  margin: 40px;
  padding: 25px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.btn-jugar {
  background: #66bb6a;
  border: none;
  padding: 12px 22px;
  border-radius: 8px;
  font-weight: bold;
}

.icon-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.icon-circle.green {
  background: #2e7d32;
}

.icon-circle.red {
  background: #e53935;
}

.icon-circle img {
  width: 38px;
}

ul {
  padding-left: 18px;
  margin-top: 5px;
}

ul li {
  font-size: 14px;
}

@media (max-width: 768px) {
  .hero-reglas h1 {
    font-size: 26px;
  }

  .cta {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .card-header {
    align-items: flex-start;
  }

  .icon-circle {
    width: 50px;
    height: 50px;
  }
}
</style>