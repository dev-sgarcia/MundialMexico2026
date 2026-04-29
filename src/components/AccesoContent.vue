<template>
  <section 
    class="acceso"
    :style="{ backgroundImage: `url(${bgImg})` }"
  >    

    <div class="cards">

      <!-- CARD 1: PERFIL -->
      <div class="card profile">
        <div class="avatar">
          <img :src="userImg" />
        </div>

        <h3>Juan Pérez</h3>
        <p class="google">Cuenta de Google</p>

        <div class="stats">
          <div>
            <strong>1250</strong>
            <span>Puntos</span>
          </div>
          <div>
            <strong>32</strong>
            <span>Partidos</span>
          </div>
          <div>
            <strong>18</strong>
            <span>Aciertos</span>
          </div>
          <div>
            <strong>3°</strong>
            <span>Posición</span>
          </div>
        </div>
      </div>

      <!-- CARD 2: UNIRSE -->
      <div class="card join">
        <h3>Unirse a liga</h3>
        <p>Ingresa tu código de invitación</p>

        <input placeholder="Código de invitación" />

        <button class="btn green">UNIRSE</button>
      </div>

      <!-- CARD 3: LIGA -->
      <div class="card league">
        <h3>Liga Campeones</h3>

        <!-- SI NO HA ELEGIDO -->
        <select>
          <option>Selecciona tu campeón</option>
          <option>Argentina</option>
          <option>Brasil</option>
          <option>Francia</option>
        </select>

        <button class="btn green">GUARDAR</button>

        <!-- SI YA ELIGIÓ -->
        <p class="selected">
          Campeón: <strong>Argentina</strong>
        </p>
      </div>

    </div>

  </section>
</template>

<script setup>
import userImg from '@/assets/user.png'
import bgImg from '@/assets/hero-bg.jpg' 
</script>

<style scoped>
.acceso {
  min-height: 100vh;
  padding: 40px;
}

.cards {
  display: grid;
  justify-content: center;
  gap: 30px;

  grid-template-columns: repeat(3, 1fr);
  margin-top: 120px; /* 🔥 clave: las sube encima del hero */
}

.card {
  transition: all 0.3s ease;    
  background: white;
  padding: 20px;
  border-radius: 16px;
  text-align: center;

  box-shadow: 
    0 10px 30px rgba(0,0,0,0.15),
    0 2px 5px rgba(0,0,0,0.05);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

/*
.cards {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.card {
  background: white;
  padding: 25px;
  border-radius: 20px;
  width: 300px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
} */

/* PERFIL */
.avatar {
  width: 90px;
  height: 90px;
  background: #1f6f4a;
  border-radius: 50%;
  margin: 0 auto 10px;
}

.avatar img {
  width: 100%;
  border-radius: 50%;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 15px;
}

.stats div {
  background: #f3f3f3;
  padding: 10px;
  border-radius: 10px;
}

/* INPUT */
input, select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid #ccc;
}

/* BOTONES */
.btn.green {
  background: #1f6f4a;
  color: white;
  border-radius: 20px;
  padding: 10px;
  width: 100%;
}

/* Responsive */
@media (max-width: 900px) {
  .cards {
    grid-template-columns: repeat(1, 1fr);
    margin-top: 60px;
  }
}

@media (max-width: 768px) {
  .cards {
    grid-template-columns: 1fr;
    margin-top: 60px;
  }
}  
</style>