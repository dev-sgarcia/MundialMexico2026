<template>
  <section class="cards container">
    <div class="card" v-for="item in items" :key="item.title">
    <div :class="['icon-circle', item.theme]">
    <!-- Si tiene imagen (Google) -->
    <img v-if="item.image" :src="item.image" class="icon-img" />

    <!-- Si no, usa icono normal -->
    <component v-else :is="item.icon" />
    </div>
    <h3 :class="item.theme">{{ item.title }}</h3>
    <p>{{ item.desc }}</p>
    <button :class="['btn', item.theme]">
        {{ item.btn }}
    </button>
    </div>
  </section>
</template>

<script setup>
import {
  UserIcon,
  TrophyIcon,
  BookOpenIcon,
  UsersIcon,
  HeartIcon
} from '@heroicons/vue/24/solid'

const items = [
{
  image: new URL('/src/assets/google.png', import.meta.url).href,
  title: 'ACCESO',
  desc: 'Inicia sesión con tu cuenta de Google y únete usando tu clave de invitado.',
  btn: 'ACCEDER CON GOOGLE',
  theme: 'green'
},
  // { icon: UserIcon, title: 'ACCESO', desc: 'Inicia sesión con tu cuenta de Google y únete usando tu clave de invitado.', btn: 'ACCEDER CON GOOGLE', theme: 'green' },
{
  image: new URL('/src/assets/results2.png', import.meta.url).href,
  title: 'RESULTADOS MUNDIAL',
  desc: 'Consulta los resultados de todos los partidos.',
  btn: 'VER RESULTADOS',
  theme: 'red'
},  
  //{ icon: TrophyIcon, title: 'RESULTADOS MUNDIAL', desc: 'Consulta los resultados de todos los partidos.', btn: 'VER RESULTADOS', theme: 'red' },
{
  image: new URL('/src/assets/rules.png', import.meta.url).href,
  title: 'REGLAS',
  desc: 'Conoce las reglas generales de puntuación y cómo funciona la quiniela.',
  btn: 'VER REGLAS',
  theme: 'green'
},
  // { icon: BookOpenIcon, title: 'REGLAS', desc: 'Conoce las reglas generales de puntuación y cómo funciona la quiniela.', btn: 'VER REGLAS', theme: 'green' },
{
  image: new URL('/src/assets/play2.png', import.meta.url).href,
  title: 'JUEGA CON NOSOTROS',
  desc: '¿Quieres organizar una quiniela con tu empresa o amigos?',
  btn: 'MÁS INFORMACIÓN',
  theme: 'red'
},  
  //{ icon: UsersIcon, title: 'JUEGA CON NOSOTROS', desc: '¿Quieres organizar una quiniela con tu empresa o amigos?', btn: 'MÁS INFORMACIÓN', theme: 'red' },
{
  image: new URL('/src/assets/donate.png', import.meta.url).href,
  title: 'DONACIÓN',
  desc: 'Apoya a los desarrolladores para seguir mejorando la plataforma.',
  btn: 'DONAR CON PAYPAL',
  theme: 'green'
}   
  // { icon: HeartIcon, title: 'DONACIÓN', desc: 'Apoya a los desarrolladores para seguir mejorando la plataforma.', btn: 'DONAR CON PAYPAL', theme: 'green' }
]
</script>

<style scoped>
.cards {
  position: relative;
  z-index: 5; /* 🔥 encima del hero */
  
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  margin-top: -120px; /* 🔥 clave: las sube encima del hero */
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

.icon {
  font-size: 28px;
  margin-bottom: 10px;
}

h3 {
  font-size: 14px;
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
  background: #1e7f3f;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
}

/* Responsive */
@media (max-width: 900px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 20px;
  }

@media (max-width: 768px) {
  .cards {
    margin-top: -40px;
    /*grid-template-columns: 1fr;
    margin-top: -60px;*/
  }
}  
}

.icon {
  width: 50px;
  height: 50px;
  margin: auto;
  margin-bottom: 10px;
  color: var(--green-primary);
}

.icon-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-bottom: 15px;
}

/* ICONO SVG */
.icon-circle svg {
  width: 30px;
  height: 30px;
  color: white;
}

/* TEMAS */
.icon-circle.green {
  background: linear-gradient(135deg, #198754, #0f5132);
}

.icon-circle.red {
  background: linear-gradient(135deg, #ff4d4d, #b30000);
}

.icon-img {
  width: 45px;
  height: 45px;
  object-fit: contain;
}

/* TITULOS */
h3.green {
  color: #0f5132;
}

h3.red {
  color: #dc3545;
}

</style>