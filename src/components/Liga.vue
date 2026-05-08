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
                  <h5 class="card-title text-gold fw-bold">¡Juega la Liga!</h5>
                  <p class="card-text small text-white-50">
                    ¿Tienes un código de invitación? Úsalo para unirte a una liga y comenzar a jugar.
                  </p>
                  
                  <div class="mt-auto pt-3">
                    <div class="input-group input-group-sm">
                      <input 
                        type="text" 
                        class="form-control bg-dark text-white border-secondary" 
                        placeholder="Código"
                      >
                      <button class="btn btn-primary fw-bold" type="button">
                        Unirse
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-5 col-md-6 d-flex">
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
                  <h5 class="card-title text-gold fw-bold">Liga Campeones</h5>
                  <p class="card-text small text-white-50">
                    Elige el país que consideras será el campeón del Mundial 2026.
                  </p>

                  <div class="mt-auto pt-3">
                    <div v-if="loading" class="text-center py-1">
                      <div class="spinner-border spinner-border-sm text-gold" role="status"></div>
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
                    </div>

                    <Transition name="fade">
                      <button 
                        v-if="selectedTeam" 
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
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const worldCupTeams = ref([]);
const selectedTeam = ref(null);
const loading = ref(true);
const qualifiedCodes = [
  'MX', 'US', 'CA', 'PA', 'CR', 'JM', 'AR', 'BR', 'CO', 'UY', 'EC', 'PE', 'CL',
  'FR', 'ES', 'GB', 'DE', 'IT', 'NL', 'BE', 'PT', 'HR', 'CH', 'DK', 'PL', 'RS', 'UA', 'TR',
  'MA', 'SN', 'TN', 'DZ', 'EG', 'NG', 'CM', 'CI', 'ZA', 'JP', 'KR', 'AU', 'SA', 'IR', 'QA', 
  'IQ', 'UZ', 'NZ', 'GH', 'ML'
];

onMounted(async () => {
  try {
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
    console.error("Error loading World Cup teams:", err);
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

/* Dropdown & Inputs */
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