<template>
  <section class="menu-background">
    <div class="overlay"></div>
    <div class="container mt-5">
      <div class="row g-4 justify-content-center">
        
        <div class="col-lg-5 col-md-6 d-flex">
          <div class="card betting-card overflow-hidden w-100 shadow-lg">
            <div class="row g-0 h-100">
              <div class="col-4">
                <img 
                  src="/src/assets/copa-liga.jpg" 
                  class="img-fluid h-100 w-100 fill-image"
                  alt="Copa Liga"
                >
              </div>
              <div class="col-8">
                <div class="card-body d-flex flex-column h-100">
                  <h5 class="card-title text-gold fw-bold">¡Únete a una Liga!</h5>
                  <p class="card-text small text-white-50">
                    ¿Tienes un código de invitación? Úsalo para unirte a una liga y comenzar a jugar.
                  </p>
                  
                  <div class="mt-auto pt-3">
                    <div class="input-group input-group-sm">
                      <input 
                        v-model="codigoInvitacion"
                        type="text" 
                        class="form-control bg-dark text-white border-secondary" 
                        placeholder="Código"
                      >
                      <button @click="unirseALiga" class="btn btn-primary fw-bold" type="button">
                        Unirse
                      </button>
                    </div>
                    <div v-if="errorInvitacion" class="text-danger small mt-2 fw-bold">
                      {{ errorInvitacion }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div v-if="misLigas.length > 0" class="col-lg-5 col-md-6 d-flex">
          <div class="card betting-card w-100 shadow-lg">
            <div class="row g-0 h-100">
              <div class="col-4 border-end border-white border-opacity-10">
                <img 
                  src="/src/assets/handed-cup.png" 
                  class="img-fluid h-100 w-100 fill-handed-cup" 
                  alt="Campeón"
                >
              </div>
              <div class="col-8">
                <div class="card-body d-flex flex-column h-100">
                  <h5 class="card-title text-gold fw-bold">{{ misLigas[0].leagues?.name || 'Liga Activa' }}</h5>
                  
                  <p class="card-text small text-white-50">
                    Elige el país que consideras será el campeón del Mundial 2026.
                  </p>

                  <div class="mt-auto pt-3">
                    <div id="loading-spinner" v-if="loading" class="text-center py-1">
                      <div class="spinner-border spinner-border-sm text-gold" role="status"></div>
                    </div>

                    <div v-else>
                      <div v-if="misLigas[0].champion_team && campeonAsignado" class="d-flex flex-column gap-2">
                        <div class="d-flex align-items-center gap-2 bg-dark bg-opacity-50 p-2 rounded border border-secondary border-opacity-20">
                          <span :class="'fi fi-' + campeonAsignado.code.toLowerCase()"></span>
                          <span class="small text-white fw-semibold">Tu Campeón: {{ campeonAsignado.name }}</span>
                        </div>
                        
                        <router-link to="/predicciones" class="btn btn-success btn-sm w-100 fw-bold mt-1">
                          Jugar
                        </router-link>
                      </div>

                      <div v-else class="dropdown">
                        <button
                          class="btn btn-outline-light btn-sm dropdown-toggle w-100 d-flex align-items-center justify-content-between select-trigger"
                          type="button" 
                          data-bs-toggle="dropdown"
                        >
                          <div v-if="selectedTeam" class="d-flex align-items-center gap-2">
                            <span :class="'fi fi-' + selectedTeam.code.toLowerCase()"></span>
                            <span class="text-truncate" style="max-width: 110px;">{{ selectedTeam.name }}</span>
                          </div>
                          <span v-else>Seleccionar país...</span>
                        </button>

                        <ul class="dropdown-menu dropdown-menu-dark custom-select-list w-100 shadow-lg">
                          <li v-for="country in worldCupTeams" :key="country.code">
                            <button class="dropdown-item d-flex align-items-center gap-2 py-2" @click="selectTeam(country)">
                              <span :class="'fi fi-' + country.code.toLowerCase()"></span>
                              <span class="small">{{ country.name }}</span>
                            </button>
                          </li>
                        </ul>

                        <Transition name="fade">
                          <button 
                            v-if="selectedTeam" 
                            @click="guardarCampeon"
                            class="btn btn-primary btn-sm w-100 mt-2 fw-bold animate-slide-up"
                          >
                            Apostar por {{ selectedTeam.name }}
                          </button>
                        </Transition>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <div 
          v-for="liga in misLigas" 
          :key="liga.league_id" 
          class="col-lg-5 col-md-6 d-flex"
        >
          <div class="card betting-card w-100 shadow-lg">
            <div class="row g-0 h-100">
              <div class="col-4 border-end border-white border-opacity-10">
                <img 
                  src="/src/assets/handed-cup.png" 
                  class="img-fluid h-100 w-100 fill-handed-cup" 
                  alt="Campeón"
                >
              </div>
              <div class="col-8">
                <div class="card-body d-flex flex-column h-100">
                  <h5 class="card-title text-gold fw-bold">{{ liga.leagues?.name || 'Liga Activa' }}</h5>
                  
                  <p class="card-text small text-white-50">
                    Elige el país que consideras será el campeón del Mundial 2026.
                  </p>

                  <div class="mt-auto pt-3">
                    <div v-if="loading" class="text-center py-1">
                      <div class="spinner-border spinner-border-sm text-gold" role="status"></div>
                    </div>

                    <div v-else>
                      <div v-if="liga.champion_team && obtenerCampeonAsignado(liga.champion_team)" class="d-flex flex-column gap-2">
                        <div class="d-flex align-items-center gap-2 bg-dark bg-opacity-50 p-2 rounded border border-secondary border-opacity-20">
                          <span :class="'fi fi-' + obtenerCampeonAsignado(liga.champion_team).code.toLowerCase()"></span>
                          <span class="small text-white fw-semibold">Tu Campeón: {{ obtenerCampeonAsignado(liga.champion_team).name }}</span>
                        </div>
                        
                        <router-link to="/predicciones" class="btn btn-success btn-sm w-100 fw-bold mt-1">
                          Jugar
                        </router-link>
                      </div>

                      <div v-else class="dropdown">
                        <button
                          class="btn btn-outline-light btn-sm dropdown-toggle w-100 d-flex align-items-center justify-content-between select-trigger"
                          type="button" 
                          data-bs-toggle="dropdown"
                        >
                          <div v-if="liga.selectedTeam" class="d-flex align-items-center gap-2">
                            <span :class="'fi fi-' + liga.selectedTeam.code.toLowerCase()"></span>
                            <span class="text-truncate" style="max-width: 110px;">{{ liga.selectedTeam.name }}</span>
                          </div>
                          <span v-else>Seleccionar país...</span>
                        </button>

                        <ul class="dropdown-menu dropdown-menu-dark custom-select-list w-100 shadow-lg">
                          <li v-for="country in worldCupTeams" :key="country.code">
                            <button class="dropdown-item d-flex align-items-center gap-2 py-2" @click="selectTeamForLeague(country, liga)">
                              <span :class="'fi fi-' + country.code.toLowerCase()"></span>
                              <span class="small">{{ country.name }}</span>
                            </button>
                          </li>
                        </ul>

                        <Transition name="fade">
                          <button 
                            v-if="liga.selectedTeam" 
                            @click="guardarCampeon(liga)"
                            class="btn btn-primary btn-sm w-100 mt-2 fw-bold animate-slide-up"
                          >
                            Apostar por {{ liga.selectedTeam.name }}
                          </button>
                        </Transition>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '@/supabaseClient';

// Estados globales y carga
const loading = ref(true);
const misLigas = ref([]);

// 1. LÓGICA DE LA PRIMERA CARD (UNIRSE A UNA LIGA)
const codigoInvitacion = ref('');
const errorInvitacion = ref('');

const unirseALiga = async () => {
  errorInvitacion.value = '';

  if (!codigoInvitacion.value) {
    errorInvitacion.value = 'Por favor, escribe un código.';
    return;
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    errorInvitacion.value = 'Debes iniciar sesión primero.';
    return;
  }

  const { data: ligas, error: errBusqueda } = await supabase
    .from('leagues')
    .select('id, name')
    .eq('invite_code', codigoInvitacion.value);

  if (errBusqueda || !ligas || ligas.length === 0) {
    errorInvitacion.value = 'Código no encontrado. Revisa las mayúsculas y guiones.';
    return;
  }

  const ligaEncontrada = ligas[0];

  const { data: yaEsMiembro } = await supabase
    .from('league_members')
    .select('*')
    .eq('league_id', ligaEncontrada.id)
    .eq('user_id', session.user.id);

  if (yaEsMiembro && yaEsMiembro.length > 0) {
    errorInvitacion.value = 'Ya perteneces a esta liga.';
    return;
  }

  const { error: errInscripcion } = await supabase.from('league_members').insert({
    league_id: ligaEncontrada.id,
    user_id: session.user.id,
  });

  if (errInscripcion) {
    errorInvitacion.value = 'Hubo un problema al inscribirte.';
    console.error(errInscripcion);
  } else {
    alert(`¡Felicidades! Te has unido a: ${ligaEncontrada.name}`);
    codigoInvitacion.value = '';
    window.location.reload();
  }
};


// ==========================================
// 2. LÓGICA DE LA SEGUNDA CARD (LIGAS Y CAMPEÓN)
// ==========================================
const worldCupTeams = ref([]);
const qualifiedCodes = [
  'MX', 'US', 'CA', 'PA', 'CR', 'JM', 'AR', 'BR', 'CO', 'UY', 'EC', 'PE', 'CL',
  'FR', 'ES', 'GB', 'DE', 'IT', 'NL', 'BE', 'PT', 'HR', 'CH', 'DK', 'PL', 'RS', 'UA', 'TR',
  'MA', 'SN', 'TN', 'DZ', 'EG', 'NG', 'CM', 'CI', 'ZA', 'JP', 'KR', 'AU', 'SA', 'IR', 'QA', 
  'IQ', 'UZ', 'NZ', 'GH', 'ML'
];

// Traer todas las ligas a las que pertenece el usuario logueado
const cargarLigas = async (userId) => {
  const { data, error } = await supabase
    .from('league_members')
    .select('league_id, champion_team, leagues(id, name, invite_code)')
    .eq('user_id', userId);

  if (!error && data) {
    // Inicializamos una propiedad reactiva local 'selectedTeam' en cada liga para el combo independiente
    misLigas.value = data.map(liga => ({
      ...liga,
      selectedTeam: null
    }));
  }
};

// Modificado a función: Busca un campeón específico según el código guardado
const obtenerCampeonAsignado = (championTeamCode) => {
  if (!championTeamCode) return null;
  const codeToFind = championTeamCode.toUpperCase();
  return worldCupTeams.value.find(t => t.code === codeToFind) || null;
};

// Asigna el país seleccionado únicamente a la tarjeta de la liga donde se hizo clic
const selectTeamForLeague = (team, liga) => {
  liga.selectedTeam = team;
};

// Persiste la selección del campeón apuntando a la liga correcta
const guardarCampeon = async (liga) => {
  if (!liga.selectedTeam) return;

  try {
    loading.value = true;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase
      .from('league_members')
      .update({ champion_team: liga.selectedTeam.code })
      .eq('league_id', liga.league_id)
      .eq('user_id', session.user.id);

    if (error) throw error;

    alert(`Se guardó con éxito tu pronóstico: ${liga.selectedTeam.name} Campeón.`);
    window.location.reload();

  } catch (err) {
    console.error("Error al guardar campeón:", err.message);
    alert("No se pudo registrar tu elección. Inténtalo de nuevo.");
  } finally {
    loading.value = false;
  }
};


onMounted(async () => {
  try {
    // 1. Comprobar sesión de usuario y cargar sus ligas asignadas
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await cargarLigas(session.user.id);
    }

    // 2. Cargar los países clasificados desde la API de países
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,translations');
    const data = await res.json();

    worldCupTeams.value = data
      .filter(c => qualifiedCodes.includes(c.cca2))
      .map(c => {
        let name = c.translations.spa.common;
        if (c.cca2 === 'GB') name = 'Inglaterra';
        if (c.cca2 === 'US') name = 'Estados Unidos';
        return { name, code: c.cca2 };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

  } catch (err) {
    console.error("Error loading setup:", err);
  } finally {
    loading.value = false;
  }
});

const selectTeam = (team) => { 
  selectedTeam.value = team; 
};

</script>

<style scoped>
@import "https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css";

.menu-background {
  position: relative;
  height: 100vh;
  max-height: 620px;
  background: url("/src/assets/fifa-world-cup.png") center/cover no-repeat;
  display: flex;
  align-items: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg,
      rgba(30, 49, 42, 0.95) 20%,
      rgba(10, 16, 33, 0.4) 100%);
}

.betting-card {
  background: rgba(200, 300, 300, 0.02);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(154, 235, 154, 0.15);
  color: white;
  min-height: 240px;
}

.text-gold { color: #d4af37; }

.fill-image {
  object-fit: cover;
  object-position: -219px;
}

.fill-handed-cup {
  object-fit: cover;
}

.select-trigger {
  border-color: rgba(19, 143, 81, 0.4);
  background: rgba(0, 0, 0, 0.3);
  font-size: 0.85rem;
}

.custom-select-list {
  max-height: 250px;
  overflow-y: auto;
  background-color: #12192c;
  border: 1px solid #d4af37;
}

.dropdown-item:hover {
  background-color: rgba(212, 175, 55, 0.2);
  color: #d4af37;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>