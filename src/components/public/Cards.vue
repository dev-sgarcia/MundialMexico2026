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

      <!-- <button
        :class="[
          'btn',
          item.theme,
          item.route === '/juega' ? 'google-btn' : '',
        ]"
        @click="item.route && router.push(item.route)"
      >
        <img v-if="item.route === '/'" class="google-icon" />
        {{ item.btn }}
      </button> -->


      <button
        type="button"
        class="mobile-menu-item btn btn-link d-flex align-items-center gap-3 text-decoration-none text-light fw-bold p-3 rounded-3 w-100 text-start bg-transparent border-0 shadow-none"
        @click="
          validateZonaFan();
          isMenuOpen = false;
        "
      >
        <PhHandsClapping class="menu-icon" weight="fill" />
        <span>ZONA FAN</span>
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
  HeartIcon,
} from "@heroicons/vue/24/solid";
import { useRouter } from "vue-router";
import { supabase } from "@/supabaseClient";
import Swal from 'sweetalert2';

//DECLARA EL ROUTER AQUÍ, AL PRINCIPIO
const router = useRouter();

const validateZonaFan = async () => {
  const { data: { session } } = await supabase.auth.getSession();

  // 1. Si no hay sesión, mandamos a loguearse
  if (!session) {
    Swal.fire({
      title: 'Inicia sesión',
      text: 'Para acceder a la Zona Fan, primero debes iniciar sesión con Google.',
      icon: 'info',
      confirmButtonColor: '#1e7f3f'
    });
    router.push('/juega');
    return;
  }

  // 2. Si hay sesión, verificamos si ya tiene ligas registradas
  const { data, error } = await supabase
    .from('league_members')
    .select('league_id')
    .eq('user_id', session.user.id)
    .limit(1);

  if (error || !data || data.length === 0) {
    // Si no tiene ligas, lo mandamos a unirse a una
    router.push('/juega');
  } else {
    // Si ya tiene ligas, lo mandamos al dashboard
    router.push('/dashboard');
  }
};

const items = [
  {
     image: new URL("/src/assets/results2.png", import.meta.url).href,
     title: "ZONA FAN",
     desc: "Accede a la plataforma con gmail y tu código para integrarte a una liga.",
     btn: "ZONA FAN",
     theme: "red",
     route: "/juega",    
  },
  {
    image: new URL("/src/assets/rules.png", import.meta.url).href,
    title: "REGLAS",
    desc: "Conoce las reglas generales de puntuación y cómo funciona la quiniela.",
    btn: "VER REGLAS",
    theme: "green",
    route: "/reglas",
  },
  {
    image: new URL("/src/assets/play2.png", import.meta.url).href,
    title: "JUEGA CON NOSOTROS",
    desc: "¿Quieres organizar una quiniela con tu empresa o amigos?",
    btn: "MÁS INFORMACIÓN",
    theme: "red",
    route: "/juega-nosotros",
  },
  {
    image: new URL("/src/assets/donate.png", import.meta.url).href,
    title: "DONACIÓN",
    desc: "Apoya a los desarrolladores para seguir mejorando la plataforma.",
    btn: "DONAR CON PAYPAL",
    theme: "green",
    route: "/donacion",
  },
];
</script>

<style scoped>
.cards {
  position: relative;
  z-index: 5;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: -120px;
  margin-bottom: 5px;
}

.card {
  transition: all 0.3s ease;
  background:
    rgba(255, 255, 255, 0.03);
  padding: 20px;
  border-radius: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.15),
    0 2px 5px rgba(0, 0, 0, 0.05);
}

.card p {
  flex-grow: 1;
}

.card button {
  background: #1e7f3f;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
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

@media (max-width: 900px) {
  .cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    margin-top: -60px;
    padding: 0 16px;
  }

  .card {
    min-width: 0;
  }
}

@media (max-width: 600px) {
  .icon-circle {
    width: 64px;
    height: 64px;
  }

  .icon-img {
    width: 40px;
    height: 40px;
  }

  .card {
    padding: 18px 16px;
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
