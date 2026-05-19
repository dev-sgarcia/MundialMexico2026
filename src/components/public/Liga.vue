<template>
  <section class="menu-background py-5">

    <div class="overlay"></div>

    <div class="container position-relative z-1">

      <div class="row g-4 justify-content-center">

        <div class="col-12 col-md-6 col-xxl-5 d-flex">

          <div class="card betting-card overflow-hidden w-100 shadow-lg">

            <div class="row g-0 h-100">

              <div class="col-12 col-lg-4">

                <img
                  src="/src/assets/copa-liga.jpg"
                  class="img-fluid fill-image"
                  alt="Copa Liga"
                >

              </div>

              <div class="col-12 col-lg-8">

                <div
                  class="card-body d-flex flex-column h-100 p-3 p-lg-4"
                >

                  <h5 class="card-title text-gold fw-bold">
                    ¡Únete a una Liga!
                  </h5>

                  <p class="card-text small text-white-50">
                    ¿Tienes un código de invitación?
                    Úsalo para unirte a una liga y comenzar a jugar.
                  </p>

                  <div class="mt-auto pt-3">

                    <div
                      class="d-flex flex-column flex-sm-row gap-2"
                    >

                      <input
                        v-model="codigoInvitacion"
                        type="text"
                        class="form-control bg-dark text-white border-secondary"
                        placeholder="Código"
                      >

                      <button
                        @click="unirseALiga"
                        class="btn btn-primary fw-bold w-100 w-sm-auto"
                        type="button"
                      >
                        Unirse
                      </button>

                    </div>

                    <div
                      v-if="errorInvitacion"
                      class="text-danger small mt-2 fw-bold"
                    >
                      {{ errorInvitacion }}
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        <div
          v-for="liga in misLigas"
          :key="liga.league_id"
          class="col-12 col-md-6 col-xxl-5 d-flex"
        >

          <div class="card betting-card w-100 shadow-lg overflow-hidden">

            <div class="row g-0 h-100">

              <div
                class="col-12 col-lg-4 border-lg-end border-white border-opacity-10"
              >

                <img
                  src="/src/assets/handed-cup.png"
                  class="img-fluid fill-handed-cup"
                  alt="Campeón"
                >

              </div>

              <div class="col-12 col-lg-8">

                <div
                  class="card-body d-flex flex-column h-100 p-3 p-lg-4"
                >

                  <h5 class="card-title text-gold fw-bold">
                    {{ liga.leagues?.name || 'Liga Activa' }}
                  </h5>

                  <p class="card-text small text-white-50">
                    Elige el país que consideras será
                    el campeón del Mundial 2026.
                  </p>

                  <div class="mt-auto pt-3">
                    <div
                      v-if="loading"
                      class="text-center py-1"
                    >

                      <div
                        class="spinner-border spinner-border-sm text-warning"
                        role="status"
                      ></div>

                    </div>

                    <div v-else>

                      <div
                        v-if="liga.champion_team && obtenerCampeonAsignado(liga.champion_team)"
                        class="d-flex flex-column gap-2"
                      >

                        <div
                          class="d-flex align-items-center gap-2 bg-dark bg-opacity-50 p-2 rounded border border-secondary border-opacity-25"
                        >

                          <span
                            :class="'fi fi-' + obtenerCampeonAsignado(liga.champion_team).code.toLowerCase()"
                          ></span>

                          <span class="small text-white fw-semibold">

                            Tu Campeón:
                            {{ obtenerCampeonAsignado(liga.champion_team).name }}

                          </span>

                        </div>

                        <router-link
                          to="/predicciones"
                          class="btn btn-success btn-sm w-100 fw-bold mt-1"
                        >
                          Jugar
                        </router-link>

                      </div>

                      <div v-else>

                        <button
                          class="btn btn-outline-light btn-sm w-100 d-flex align-items-center justify-content-between select-trigger"
                          type="button"
                          @click="toggleDropdown(liga.league_id)"
                        >

                          <div
                            v-if="liga.selectedTeam"
                            class="d-flex align-items-center gap-2"
                          >

                            <span
                              :class="'fi fi-' + liga.selectedTeam.code.toLowerCase()"
                            ></span>

                            <span
                              class="text-truncate"
                              style="max-width: 140px;"
                            >
                              {{ liga.selectedTeam.name }}
                            </span>

                          </div>

                          <span v-else>
                            Seleccionar país...
                          </span>

                          <i class="bi bi-chevron-down"></i>

                        </button>

                        <Transition name="fade">

                          <button
                            v-if="liga.selectedTeam"
                            @click="guardarCampeon(liga)"
                            class="btn btn-primary btn-sm w-100 mt-2 fw-bold animate-slide-up"
                          >

                            Apostar por
                            {{ liga.selectedTeam.name }}

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

    <Teleport to="body">

      <div
        v-if="selectedLeagueDropdown"
        class="custom-teleport-dropdown"
        @click.self="closeDropdown"
      >

        <div class="dropdown-card shadow-lg">

          <div
            class="d-flex justify-content-between align-items-center mb-3"
          >

            <h5 class="text-gold fw-bold m-0">
              Seleccionar país
            </h5>

            <button
              class="btn btn-sm btn-outline-light"
              @click="closeDropdown"
            >
              <i class="bi bi-x-lg"></i>
            </button>

          </div>

          <button
            v-for="country in worldCupTeams"
            :key="country.code"
            class="dropdown-country"
            @click="selectTeamForLeague(country)"
          >

            <span
              :class="'fi fi-' + country.code.toLowerCase()"
            ></span>

            <span>
              {{ country.name }}
            </span>

          </button>

        </div>

      </div>

    </Teleport>

  </section>
</template>

<script setup>
import { ref } from 'vue';

const codigoInvitacion = ref('');
const errorInvitacion = ref('');
const loading = ref(false);

const selectedLeagueDropdown = ref(null);

const misLigas = ref([
  {
    league_id: 1,
    leagues: {
      name: 'Mundialito RA'
    },
    champion_team: null,
    selectedTeam: null
  },
  {
    league_id: 2,
    leagues: {
      name: 'Conade 2026'
    },
    champion_team: null,
    selectedTeam: null
  }
]);

const worldCupTeams = ref([
  { name: 'México', code: 'mx' },
  { name: 'Argentina', code: 'ar' },
  { name: 'Brasil', code: 'br' },
  { name: 'Francia', code: 'fr' },
  { name: 'España', code: 'es' },
  { name: 'Alemania', code: 'de' },
  { name: 'Portugal', code: 'pt' },
  { name: 'Inglaterra', code: 'gb' },
  { name: 'Uruguay', code: 'uy' },
  { name: 'Croacia', code: 'hr' }
]);

const toggleDropdown = (leagueId) => {

  const liga = misLigas.value.find(
    x => x.league_id === leagueId
  );

  selectedLeagueDropdown.value = liga;
};

const closeDropdown = () => {
  selectedLeagueDropdown.value = null;
};

const selectTeamForLeague = (country) => {

  if (!selectedLeagueDropdown.value) return;

  selectedLeagueDropdown.value.selectedTeam = country;

  closeDropdown();
};

const guardarCampeon = (liga) => {
  console.log('Guardar campeón:', liga.selectedTeam);
};

const unirseALiga = () => {
  console.log('Código:', codigoInvitacion.value);
};

const obtenerCampeonAsignado = (team) => {
  return worldCupTeams.value.find(
    x => x.code === team
  );
};
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css";

.menu-background {
  position: relative;

  min-height: 100vh;

  background:
    linear-gradient(
      90deg,
      rgba(30, 49, 42, 0.95) 20%,
      rgba(10, 16, 33, 0.55) 100%
    ),
    url("/src/assets/fifa-world-cup.png")
    center/cover no-repeat;

  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;

  background:
    radial-gradient(
      circle at center,
      rgba(72, 255, 133, 0.08),
      transparent 60%
    );
}

.betting-card {
  background:
    rgba(255, 255, 255, 0.03);

  backdrop-filter: blur(12px);

  border:
    1px solid rgba(154, 235, 154, 0.15);

  color: white;

  border-radius: 24px;

  transition: all 0.3s ease;

  min-height: 260px;
}

.betting-card:hover {
  transform: translateY(-6px);

  border-color:
    rgba(212, 175, 55, 0.35);

  box-shadow:
    0 0 30px rgba(0,0,0,0.25);
}

.fill-image,
.fill-handed-cup {
  object-fit: cover;

  width: 100%;
  height: 100%;

  min-height: 220px;
}

.text-gold {
  color: #d4af37;
}

.card-text {
  line-height: 1.6;
}

.select-trigger {
  border-color:
    rgba(19, 143, 81, 0.4);

  background:
    rgba(0, 0, 0, 0.3);

  min-height: 42px;
}

.custom-teleport-dropdown {
  position: fixed;

  inset: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  z-index: 99999;

  background:
    rgba(0, 0, 0, 0.55);

  backdrop-filter: blur(5px);

  padding: 1rem;
}

.dropdown-card {
  width: min(100%, 420px);

  max-height: 70vh;

  overflow-y: auto;

  border-radius: 22px;

  background: #101820;

  border:
    1px solid rgba(212, 175, 55, 0.35);

  padding: 1rem;
}

.dropdown-country {
  width: 100%;

  border: none;

  background: transparent;

  color: white;

  padding: 0.9rem 1rem;

  border-radius: 12px;

  display: flex;

  align-items: center;

  gap: 0.8rem;

  transition: all 0.2s ease;

  margin-bottom: 0.3rem;
}

.dropdown-country:hover {
  background:
    rgba(212, 175, 55, 0.15);

  color: #d4af37;
}

.btn-primary {
  background:
    linear-gradient(
      135deg,
      #1f7a42,
      #28a745
    );

  border: none;
}

.btn-primary:hover {
  background:
    linear-gradient(
      135deg,
      #28a745,
      #1f7a42
    );
}

.btn-success {
  background:
    linear-gradient(
      135deg,
      #198754,
      #20c997
    );

  border: none;
}

.animate-slide-up {
  animation:
    slideUp 0.3s ease-out;
}

@keyframes slideUp {

  from {
    transform: translateY(10px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>