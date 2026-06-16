<template>
  <section class="hero position-relative overflow-hidden">
    <!-- OVERLAY -->
    <div class="overlay"></div>

    <div class="container position-relative z-1 py-5">
      <!-- HERO CONTENT -->
      <div class="row align-items-center g-5">
        <!-- LEFT: Textos -->
        <div class="col-12 col-lg-7">
          <div class="hero-left mx-auto mx-lg-0">
            <h1 class="hero-subtitle">LA PASIÓN NOS UNE,</h1>

            <h2 class="hero-title">
              LA QUINIELA NOS HACE
              <span>CAMPEONES</span>
            </h2>

            <p class="hero-description">
              Únete a la mejor quiniela del Mundial 2026. Compite con tu liga,
              demuestra tus conocimientos y vive cada partido al máximo.
            </p>

            <div
              class="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start mt-4 hero-info"
            >
              <div class="hero-chip">📅 11 JUN - 19 JUL 2026</div>

              <div class="hero-chip">📍 MÉXICO, EE.UU. Y CANADÁ</div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Contador del Siguiente Partido -->
        <div class="col-12 col-lg-5 d-flex justify-content-center justify-content-lg-end mt-5 mt-lg-0">
          
          <!-- Se muestra SOLO si encontró un partido futuro -->
          <div v-if="siguientePartido" class="countdown-card w-100 mx-auto" style="max-width: 420px;">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <h4 class="countdown-title mb-0">PRÓXIMO PARTIDO</h4>
              <span class="pulse-dot"></span>
            </div>

            <div class="match-info text-center">
               <div class="d-flex justify-content-center align-items-center gap-3">
                 <div class="team text-center" style="width: 40%">
                    <img :src="`https://flagcdn.com/w80/${getFlagCode(siguientePartido.home_team)}.png`" class="flag-img shadow" />
                    <span class="d-block mt-2 fw-bold text-truncate">{{ siguientePartido.home_team }}</span>
                 </div>
                 <div class="vs-badge">VS</div>
                 <div class="team text-center" style="width: 40%">
                    <img :src="`https://flagcdn.com/w80/${getFlagCode(siguientePartido.away_team)}.png`" class="flag-img shadow" />
                    <span class="d-block mt-2 fw-bold text-truncate">{{ siguientePartido.away_team }}</span>
                 </div>
               </div>
               
               <div class="mt-3 py-2 px-3 rounded-3 bg-black bg-opacity-25 border border-white border-opacity-10">
                 <p class="match-date mb-1 fw-semibold text-gold">{{ formatMatchDate(siguientePartido.parsedDate) }} · {{ siguientePartido.match_time }}</p>
                 <p class="match-stadium small text-white-50 mb-0">{{ siguientePartido.group_name }} | {{ siguientePartido.stadium }}</p>
               </div>
            </div>

            <!-- RELOJ -->
            <div class="timer-display mt-4 d-flex justify-content-between align-items-center gap-2">
              <div class="time-box">
                <span class="number">{{ timeLeft.days }}</span>
                <span class="label">DÍAS</span>
              </div>
              <span class="separator">:</span>
              <div class="time-box">
                <span class="number">{{ timeLeft.hours }}</span>
                <span class="label">HRS</span>
              </div>
              <span class="separator">:</span>
              <div class="time-box">
                <span class="number">{{ timeLeft.minutes }}</span>
                <span class="label">MIN</span>
              </div>
              <span class="separator">:</span>
              <div class="time-box text-success">
                <span class="number text-success">{{ timeLeft.seconds }}</span>
                <span class="label">SEG</span>
              </div>
            </div>
          </div>
          
          <!-- Loader SOLO mientras está verificando la sesión/partidos -->
          <div v-else-if="buscandoPartido" class="countdown-card w-100 mx-auto d-flex flex-column align-items-center justify-content-center py-5" style="max-width: 420px; min-height: 300px;">
            <div class="spinner-border text-success mb-3" role="status"></div>
            <p class="text-white-50">Sincronizando...</p>
          </div>
          
        </div>
      </div>

      <!-- ======================================== -->
      <!-- CARDS INFERIORES -->
      <!-- ======================================== -->

      <div class="row g-4 cards-wrapper justify-content-center mt-5">
        <div
          v-for="item in items"
          :key="item.title"
          class="col-12 col-sm-6 col-xl-3 d-flex"
        >
          <div class="custom-card w-100">
            <div :class="['icon-circle', item.theme]">
              <img v-if="item.image" :src="item.image" class="icon-img" />

              <component v-else :is="item.icon" />
            </div>

            <h3 :class="item.theme">
              {{ item.title }}
            </h3>

            <p>
              {{ item.desc }}
            </p>

            <button
              :class="['custom-btn', item.theme]"
              @click="
                typeof item.action === 'function'
                  ? item.action()
                  : item.route
                    ? router.push(item.route)
                    : null
              "
            >
              {{ item.btn }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { supabase } from "@/supabaseClient";

const router = useRouter();

// Variables del Contador
const buscandoPartido = ref(true);
const siguientePartido = ref(null);
const timeLeft = ref({ days: '00', hours: '00', minutes: '00', seconds: '00' });
let timerInterval = null;

/* ======================================== */
/* LÓGICA DEL CONTADOR DE PARTIDO           */
/* ======================================== */

// 1. Normaliza fechas (asegura el formato YYYY-MM-DD para JS)
const normalizarFecha = (fechaTexto) => {
  if (!fechaTexto) return "9999-99-99";
  const partes = fechaTexto.includes("/") ? fechaTexto.split("/") : fechaTexto.split("-");
  if (partes.length === 3 && partes[0].length <= 2) {
    return `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
  }
  return fechaTexto;
};

// 2. Busca en la BD el partido más cercano
// 2. Busca en la BD el partido más cercano SOLO si hay sesión
const cargarSiguientePartido = async () => {
  buscandoPartido.value = true;
  try {
    // A. Verificar si el usuario está logueado
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      // Si no hay sesión, paramos la búsqueda y no mostramos nada
      buscandoPartido.value = false;
      return; 
    }

    // B. Si hay sesión, buscamos los partidos
    const { data, error } = await supabase.from('matches').select('*');
    if (error || !data || data.length === 0) return;

    const ahora = new Date().getTime();
    let partidoMasCercano = null;
    let menorDiferencia = Infinity;

    // Evaluamos cuál es el partido que sigue
    data.forEach(match => {
      if (!match.match_date || !match.match_time) return;
      
      const fechaNormalizada = normalizarFecha(match.match_date);
      const matchTime = new Date(`${fechaNormalizada}T${match.match_time}`).getTime();
      const diferencia = matchTime - ahora;

      // Solo tomamos en cuenta partidos futuros (diferencia > 0)
      if (diferencia > 0 && diferencia < menorDiferencia) {
        menorDiferencia = diferencia;
        partidoMasCercano = { ...match, timestamp: matchTime, parsedDate: fechaNormalizada };
      }
    });

    // C. Si encontramos un partido futuro, iniciamos el reloj
    if (partidoMasCercano) {
      siguientePartido.value = partidoMasCercano;
      iniciarReloj(partidoMasCercano.timestamp);
    }
    // Si no encontró partidoMasCercano (porque todos ya pasaron), siguientePartido se queda en null y el HTML se oculta.

  } catch (err) {
    console.error("Error al buscar el próximo partido:", err);
  } finally {
    buscandoPartido.value = false;
  }
};

// 3. Ejecuta el cronómetro visual
const iniciarReloj = (targetTime) => {
  const actualizarReloj = () => {
    const ahora = new Date().getTime();
    const diferencia = targetTime - ahora;

    // Si el partido ya empezó mientras el usuario está en la página
    if (diferencia <= 0) {
      clearInterval(timerInterval);
      timeLeft.value = { days: '00', hours: '00', minutes: '00', seconds: '00' };
      // Opcional: Podrías llamar a cargarSiguientePartido() de nuevo aquí
      return;
    }

    const days = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diferencia % (1000 * 60)) / 1000);

    timeLeft.value = {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0')
    };
  };

  actualizarReloj(); // Llama inmediatamente para no esperar 1 segundo
  timerInterval = setInterval(actualizarReloj, 1000);
};

// Utilidades visuales
const formatMatchDate = (d) => {
  const dateObj = new Date(d + 'T00:00:00');
  return isNaN(dateObj) ? d : dateObj.toLocaleDateString('es-MX', { day: 'numeric', month: 'long' }).toUpperCase();
};

const getFlagCode = (team) => {
  const flagCodes = {
    México: "mx", Sudáfrica: "za", "República de Corea": "kr", Chequia: "cz",
    Canadá: "ca", "Bosnia y Herzegovina": "ba", "EE. UU.": "us", Paraguay: "py",
    Catar: "qa", Suiza: "ch", Brasil: "br", Marruecos: "ma", Haití: "ht",
    Escocia: "gb-sct", Australia: "au", Turquía: "tr", Alemania: "de",
    Curazao: "cw", "Países Bajos": "nl", Japón: "jp", "Costa de Marfil": "ci",
    Ecuador: "ec", Suecia: "se", Túnez: "tn", España: "es",
    "Islas de Cabo Verde": "cv", Bélgica: "be", Egipto: "eg", "Arabia Saudí": "sa",
    Uruguay: "uy", "RI de Irán": "ir", "Nueva Zelanda": "nz", Francia: "fr",
    Senegal: "sn", Irak: "iq", Noruega: "no", Argentina: "ar", Argelia: "dz",
    Austria: "at", Jordania: "jo", Portugal: "pt", "RD Congo": "cd",
    Inglaterra: "gb-eng", Croacia: "hr", Ghana: "gh", Panamá: "pa",
    Uzbekistán: "uz", Colombia: "co",
  };
  return flagCodes[team] || "un"; 
};

// Ciclos de vida del componente
onMounted(() => {
  cargarSiguientePartido();
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});


/* ======================================== */
/* CARDS INFERIORES                         */
/* ======================================== */
const validateZonaFan = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    Swal.fire({
      title: "Inicia sesión",
      text: "Para acceder a la Zona Fan, primero debes iniciar sesión con Google.",
      icon: "info",
      confirmButtonText: "Entendido",
      confirmButtonColor: "#198754",
      background: "#0b1f1a",
      color: "#fff",
    });
    return;
  } else {
    router.push("/juega");
  }
};

const items = [
  {
    image: new URL("/src/assets/results2.png", import.meta.url).href,
    title: "ZONA FAN",
    desc: "Accede a la plataforma con gmail y tu código para integrarte a una liga.",
    btn: "ZONA FAN",
    theme: "red",
    action: validateZonaFan,
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
.hero {
  min-height: 100vh;
  background: url("/src/assets/hero-bg.jpg") center/cover no-repeat;
  display: flex;
  align-items: center;
  color: white;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 50, 30, 0.92) 26%,
    rgba(0, 0, 0, 0.34) 58%,
    rgba(0, 0, 0, 0.15) 100%
  );
}

.hero-left {
  max-width: 620px;
}

.hero-subtitle {
  font-size: clamp(18px, 3vw, 26px);
  font-weight: 500;
}

.hero-title {
  font-size: clamp(38px, 6vw, 70px);
  font-weight: 900;
  line-height: 1.05;
  margin-top: 12px;
}

.hero-title span {
  display: block;
  color: #ff2e2e;
}

.hero-description {
  margin-top: 18px;
  font-size: 1rem;
  line-height: 1.8;
  opacity: 0.92;
}

.hero-chip {
  padding: 0.7rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  font-size: 0.9rem;
}

.cards-wrapper {
  margin-top: 5rem;
}

.custom-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.16);
  cursor: pointer;
}

.custom-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.22);
  border-color: rgba(212, 175, 55, 0.35);
}

.custom-card p {
  flex-grow: 1;
  margin-top: 0.8rem;
  opacity: 0.9;
  line-height: 1.7;
  font-size: 0.95rem;
}

.icon-circle {
  width: 78px;
  height: 78px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.icon-circle.green {
  background: linear-gradient(135deg, #198754, #0f5132);
}

.icon-circle.red {
  background: linear-gradient(135deg, #ff4d4d, #b30000);
}

.icon-img {
  width: 48px;

  height: 48px;

  object-fit: contain;
}

h3.green {
  color: #73ff73;
}

h3.red {
  color: #ff6b6b;
}

.custom-card h3 {
  font-size: 1rem;

  font-weight: 800;

  margin-bottom: 0.4rem;
}

.custom-btn {
  margin-top: 1rem;

  border: none;

  border-radius: 12px;

  padding: 0.85rem 1rem;

  color: white;

  font-weight: 700;

  transition: all 0.25s ease;
}

.custom-btn.green {
  background: linear-gradient(135deg, #198754, #0f5132);
}

.custom-btn.red {
  background: linear-gradient(135deg, #ff4d4d, #b30000);
}

.custom-btn:hover {
  transform: translateY(-2px);

  opacity: 0.92;
}

/* ======================================== */
/* ESTILOS DEL CONTADOR                     */
/* ======================================== */

.text-gold {
  color: #d4af37;
}

.countdown-card {
  background: rgba(10, 20, 15, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(25, 135, 84, 0.4);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
}

.countdown-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 4px;
  background: linear-gradient(90deg, #198754, #ff2e2e);
}

.countdown-title {
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: white;
}

.pulse-dot {
  width: 10px;
  height: 10px;
  background-color: #ff2e2e;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 46, 46, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(255, 46, 46, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 46, 46, 0); }
}

.flag-img {
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.1);
}

.vs-badge {
  background: #ff2e2e;
  color: white;
  font-weight: 900;
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  letter-spacing: 1px;
}

.time-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  width: 70px;
  padding: 10px 0;
}

.time-box .number {
  font-size: 1.8rem;
  font-weight: 900;
  line-height: 1;
}

.time-box .label {
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 4px;
}

.separator {
  font-size: 1.8rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.3);
  margin-top: -15px;
}
</style>
