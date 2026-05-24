<template>
  <div class="bg-black text-white vh-100 overflow-hidden">
    <div class="container-fluid px-0 h-100">
      <div class="row g-0 h-100">
        <!-- SIDEBAR -->
        <aside
          class="d-none d-lg-block col-lg-3 col-xl-2 bg-black border-end border-success border-opacity-25"
        >
          <Sidebar />
        </aside>

        <!-- CONTENIDO -->
        <main
          class="col-12 col-lg-9 col-xl-10 vh-100 overflow-hidden px-3 pt-3 pb-4"
        >
          <section
            class="container-fluid h-100 d-flex flex-column overflow-hidden"
          >
            <!-- HEADER FIJO -->
            <div class="sticky-top bg-black z-3 pb-0">
              <div
                class="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-0"
              >
                <div>
                  <h4 class="fw-bold mb-1">🏆 Tabla de posiciones</h4>

                  <p class="text-white-50 mb-0">
                    Ranking general de participantes de la Quiniela RA.
                  </p>
                </div>

                <UserProfile />
              </div>
            </div>

            <!-- TODO ESTO SÍ SE MUEVE -->
            <div class="flex-grow-1 overflow-auto overflow-x-hidden pt-4 pb-4">
              <!-- CARDS -->
              <div class="row g-4 mb-4">
                <!-- LIDER -->
                <div class="col-12 col-md-6 col-xl-3">
                  <div class="card prediction-card text-white rounded-4">
                    <div class="card-body p-2">
                      <div class="d-flex align-items-center gap-2 mb-2">
                        <PhCrown size="16" weight="fill" class="text-warning" />

                        <small class="text-white-50"> Líder actual </small>
                      </div>

                      <div class="d-flex align-items-center gap-2">
                        <div
                          class="avatar-md rounded-circle border border-success text-white fw-bold d-flex align-items-center justify-content-center"
                        >
                          {{ getInitials(leader?.participantName ?? "") }}
                        </div>

                        <div>
                          <h6 class="fw-bold mb-1">
                            {{ leader?.participantName ?? "Sin líder" }}
                          </h6>

                          <span class="text-success fw-bold fs-5">
                            {{ leader?.points ?? 0 }} pts
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- POSICION -->
                <div class="col-12 col-md-6 col-xl-3">
                  <div class="card prediction-card text-white rounded-4">
                    <div class="card-body p-2">
                      <div class="d-flex align-items-center gap-2 mb-2">
                        <PhUser size="16" weight="fill" class="text-success" />

                        <small class="text-white-50"> Tu posición </small>
                      </div>

                      <h4 class="fw-bold mb-0">{{ currentUserPosition }}°</h4>

                      <span class="text-white-50 small">
                        de {{ standings.length }} participantes
                      </span>
                    </div>
                  </div>
                </div>

                <!-- RACHA -->
                <div class="col-12 col-md-6 col-xl-3">
                  <div class="card prediction-card text-white rounded-4">
                    <div class="card-body p-2">
                      <div
                        class="d-flex justify-content-between align-items-center mb-2"
                      >
                        <h6 class="fw-bold mb-0">
                          <PhLightning
                            size="16"
                            weight="fill"
                            class="text-warning me-1"
                          />

                          <small class="text-white-50"> Racha actual </small>
                        </h6>

                        <small class="text-success"> Ver todos </small>
                      </div>

                      <div class="d-flex align-items-center gap-3">
                        <h4 class="fw-bold mb-0">
                          {{ currentStreak }}
                        </h4>

                        <div class="d-flex gap-2 ms-auto">
                          <span
                            v-for="item in streakDots"
                            :key="item.id"
                            class="badge rounded-circle"
                            :class="
                              item.success
                                ? 'text-bg-success'
                                : 'text-bg-danger'
                            "
                          >
                            {{ item.success ? "✓" : "×" }}
                          </span>
                        </div>
                      </div>

                      <small class="text-white-50">
                        Tu mejor racha:
                        {{ bestStreak }} aciertos
                      </small>
                    </div>
                  </div>
                </div>

                <!-- EXACTOS -->
                <div class="col-12 col-md-6 col-xl-3">
                  <div class="card prediction-card text-white rounded-4">
                    <div class="card-body p-2">
                      <div class="d-flex align-items-center gap-2 mb-2">
                        <PhTarget
                          size="16"
                          weight="fill"
                          class="text-success"
                        />

                        <small class="text-white-50"> Exactos totales </small>
                      </div>

                      <h4 class="fw-bold mb-0">
                        {{ totalExactScores }}
                      </h4>

                      <span class="text-white-50 small">
                        marcadores exactos
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- CONTENIDO -->
              <div class="row g-4 align-items-start">
                <!-- IZQUIERDA -->
                <div class="col-12 col-xl-9">
                  <!-- FILTROS -->
                  <div class="card prediction-card text-white rounded-4 mb-3">
                    <div class="card-body p-3">
                      <div class="row g-3 align-items-center">
                        <div class="col-12 col-md-5">
                          <div class="input-group">
                            <input
                              v-model="search"
                              type="text"
                              class="form-control bg-black text-light border-success"
                              placeholder="Buscar participante..."
                            />

                            <span
                              class="input-group-text bg-black border-success text-white-50"
                            >
                              <PhMagnifyingGlass size="18" />
                            </span>
                          </div>
                        </div>

                        <div class="col-12 col-md-3 ms-md-auto">
                          <select
                            v-model="sortBy"
                            class="form-select bg-dark text-white border-success"
                          >
                            <option value="points">Ordenar por: Puntos</option>
                            <option value="exactScores">Marc. exactos</option>
                            <option value="correctResults">Aciertos</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- TABLA -->
                  <div
                    class="card prediction-card text-white rounded-4 overflow-hidden"
                  >
                    <div class="table-responsive">
                      <table
                        class="table table-dark table-hover align-middle mb-0"
                      >
                        <thead>
                          <tr>
                            <th>Posición</th>
                            <th>Participante</th>
                            <th>Marc. exactos</th>
                            <th>Aciertos</th>
                            <th>Errores</th>
                            <th>Puntos</th>
                            <th>Movimiento</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr
                            v-for="player in paginatedStandings"
                            :key="player.id"
                            :class="
                              player.isCurrentUser ? 'current-user-row' : ''
                            "
                          >
                            <td>
                              <span
                                class="badge rounded-pill"
                                :class="getPositionBadge(player.rank)"
                              >
                                {{ player.rank }}
                              </span>
                            </td>

                            <td>
                              <div class="d-flex align-items-center gap-2">
                                <div
                                  class="avatar-md rounded-circle bg-success text-white fw-bold d-flex align-items-center justify-content-center"
                                >
                                  {{ getInitials(player.participantName) }}
                                </div>

                                <div>
                                  <div class="fw-semibold">
                                    {{ player.participantName }}

                                    <span
                                      v-if="player.isCurrentUser"
                                      class="badge text-bg-success ms-1"
                                    >
                                      Tú
                                    </span>
                                  </div>

                                  <small class="text-white-50">
                                    Participante activo
                                  </small>
                                </div>
                              </div>
                            </td>

                            <td>{{ player.exactScores }}</td>
                            <td>{{ player.correctResults }}</td>
                            <td>{{ player.failedPredictions }}</td>

                            <td class="fw-bold text-success fs-5">
                              {{ player.points }}
                            </td>

                            <td>
                              <span :class="getMovementClass(player.movement)">
                                {{ getMovementIcon(player.movement) }}
                                {{ Math.abs(player.movement) || "" }}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <!-- PAGINADO -->
                    <div
                      class="d-flex justify-content-between align-items-center flex-wrap gap-3 px-3 py-3"
                    >
                      <small class="text-white-50">
                        Mostrando {{ paginationStart }} - {{ paginationEnd }} de
                        {{ filteredStandings.length }} participantes
                      </small>

                      <nav>
                        <ul class="pagination pagination-sm mb-0">
                          <li
                            class="page-item"
                            :class="{ disabled: currentPage === 1 }"
                          >
                            <button
                              class="page-link bg-dark text-white border-success"
                              type="button"
                              @click="previousPage"
                            >
                              Anterior
                            </button>
                          </li>

                          <li
                            v-for="page in totalPages"
                            :key="page"
                            class="page-item"
                            :class="{ active: page === currentPage }"
                          >
                            <button
                              class="page-link border-success"
                              :class="
                                page === currentPage
                                  ? 'bg-success text-white'
                                  : 'bg-dark text-white'
                              "
                              type="button"
                              @click="goToPage(page)"
                            >
                              {{ page }}
                            </button>
                          </li>

                          <li
                            class="page-item"
                            :class="{ disabled: currentPage === totalPages }"
                          >
                            <button
                              class="page-link bg-dark text-white border-success"
                              type="button"
                              @click="nextPage"
                            >
                              Siguiente
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>

                <!-- DERECHA -->
                <div class="col-12 col-xl-3">
                  <div class="d-flex flex-column gap-4 w-100">
                    <!-- PARTIDOS -->
                    <div class="card prediction-card text-white rounded-4">
                      <div class="card-body p-3">
                        <div
                          class="d-flex justify-content-between align-items-center mb-3"
                        >
                          <h6 class="fw-bold mb-0">
                            <PhCalendarBlank
                              size="18"
                              weight="fill"
                              class="text-success me-1"
                            />

                            Próximos partidos
                          </h6>

                          <small class="text-success"> Ver todos </small>
                        </div>

                        <div
                          v-for="match in nextMatches"
                          :key="match.id"
                          class="border-bottom border-success border-opacity-25 pb-2 mb-2"
                        >
                          <div
                            class="d-flex justify-content-between align-items-center text-center gap-2"
                          >
                            <div class="d-flex align-items-center gap-2">
                              <span class="fw-semibold">
                                {{ match.homeTeam }}
                              </span>

                              <img
                                :src="`https://flagcdn.com/w40/${match.homeFlag}.png`"
                                :alt="match.homeTeam"
                                width="28"
                                height="20"
                                class="rounded-1"
                              />
                            </div>

                            <span class="text-white-50">vs</span>

                            <div class="d-flex align-items-center gap-2">
                              <img
                                :src="`https://flagcdn.com/w40/${match.awayFlag}.png`"
                                :alt="match.awayTeam"
                                width="28"
                                height="20"
                                class="rounded-1"
                              />

                              <span class="fw-semibold">
                                {{ match.awayTeam }}
                              </span>
                            </div>
                          </div>

                          <small class="d-block text-center text-white-50 mt-2">
                            {{ match.date }} · {{ match.time }}
                          </small>
                        </div>

                        <button
                          type="button"
                          class="btn btn-outline-success w-100 rounded-3 mt-3"
                        >
                          Ir a mis predicciones
                        </button>
                      </div>
                    </div>

                    <!-- RESUMEN -->
                    <div class="card prediction-card text-white rounded-4">
                      <div class="card-body p-3">
                        <h6 class="fw-bold mb-3">
                          <PhChartLineUp
                            size="18"
                            weight="fill"
                            class="text-success me-1"
                          />

                          Resumen general
                        </h6>

                        <div class="row g-3">
                          <div class="col-6">
                            <div class="bg-dark rounded-4 p-2 h-100">
                              <small class="text-white-50">
                                Participantes
                              </small>

                              <h4 class="fw-bold mb-0">
                                {{ standings.length }}
                              </h4>
                            </div>
                          </div>

                          <div class="col-6">
                            <div class="bg-dark rounded-4 p-2 h-100">
                              <small class="text-white-50"> Exactos </small>

                              <h4 class="fw-bold mb-0">
                                {{ totalExactScores }}
                              </h4>
                            </div>
                          </div>

                          <div class="col-6">
                            <div class="bg-dark rounded-4 p-2 h-100">
                              <small class="text-white-50"> Aciertos </small>

                              <h4 class="fw-bold mb-0">
                                {{ totalCorrectResults }}
                              </h4>
                            </div>
                          </div>

                          <div class="col-6">
                            <div class="bg-dark rounded-4 p-2 h-100">
                              <small class="text-white-50">
                                Predicciones
                              </small>

                              <h4 class="fw-bold mb-0">
                                {{ totalPredictions }}
                              </h4>
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
        </main>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import UserProfile from "@/components/common/UserProfile.vue";

import {
  PhCalendarBlank,
  PhChartLineUp,
  PhCrown,
  PhLightning,
  PhMagnifyingGlass,
  PhTarget,
  PhUser,
} from "@phosphor-icons/vue";

import Sidebar from "@/components/dashboard/Sidebar.vue";
import { standingsMock } from "@/data/standings.mock";

const search = ref("");
const sortBy = ref("points");
const currentPage = ref(1);
const pageSize = 5;

const standings = ref(standingsMock);

const nextMatches = ref([
  {
    id: 1,
    homeTeam: "México",
    homeFlag: "mx",
    awayTeam: "Argentina",
    awayFlag: "ar",
    date: "Mañana",
    time: "11:00 a.m.",
  },
  {
    id: 2,
    homeTeam: "Brasil",
    homeFlag: "br",
    awayTeam: "Francia",
    awayFlag: "fr",
    date: "Mañana",
    time: "2:00 p.m.",
  },
]);

const streakDots = ref([
  { id: 1, success: true },
  { id: 2, success: true },
  { id: 3, success: true },
  { id: 4, success: false },
]);

const rankedStandings = computed(() => {
  return [...standings.value]
    .sort((a, b) => b.points - a.points)
    .map((player, index) => ({
      ...player,
      rank: index + 1,
    }));
});

const filteredStandings = computed(() => {
  let result = [...rankedStandings.value];

  if (search.value.trim()) {
    const term = search.value.toLowerCase();

    result = result.filter((player) =>
      player.participantName.toLowerCase().includes(term),
    );
  }

  if (sortBy.value !== "points") {
    result.sort((a, b) => b[sortBy.value] - a[sortBy.value]);
  }

  return result;
});

const totalPages = computed(() => {
  return Math.ceil(filteredStandings.value.length / pageSize) || 1;
});

const paginatedStandings = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;

  return filteredStandings.value.slice(start, end);
});

const paginationStart = computed(() => {
  if (!filteredStandings.value.length) return 0;

  return (currentPage.value - 1) * pageSize + 1;
});

const paginationEnd = computed(() => {
  return Math.min(currentPage.value * pageSize, filteredStandings.value.length);
});

const leader = computed(() => rankedStandings.value[0]);

const currentUser = computed(() =>
  rankedStandings.value.find((player) => player.isCurrentUser),
);

const currentUserPosition = computed(() => currentUser.value?.rank ?? 0);

const totalExactScores = computed(() => {
  return standings.value.reduce(
    (total, player) => total + player.exactScores,
    0,
  );
});

const totalCorrectResults = computed(() => {
  return standings.value.reduce(
    (total, player) => total + player.correctResults,
    0,
  );
});

const totalPredictions = computed(() => {
  return standings.value.reduce((total, player) => {
    return (
      total +
      player.exactScores +
      player.correctResults +
      player.failedPredictions
    );
  }, 0);
});

const bestStreak = computed(() => {
  if (!standings.value.length) return 0;

  return Math.max(...standings.value.map((player) => player.bestStreak ?? 0));
});

const currentStreak = computed(() => currentUser.value?.currentStreak ?? 0);

const goToPage = (page) => {
  currentPage.value = page;
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

watch([search, sortBy], () => {
  currentPage.value = 1;
});

const getInitials = (name) => {
  if (!name) return "--";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const getPerformance = (points) => {
  if (!leader.value?.points) return 0;

  return Math.round((points / leader.value.points) * 100);
};

const getMovementIcon = (movement) => {
  if (movement > 0) return "↑";
  if (movement < 0) return "↓";

  return "—";
};

const getMovementClass = (movement) => {
  if (movement > 0) return "text-success fw-bold";
  if (movement < 0) return "text-danger fw-bold";

  return "text-white-50 fw-bold";
};

const getPositionBadge = (rank) => {
  if (rank === 1) return "text-bg-warning text-dark";
  if (rank === 2) return "text-bg-secondary";
  if (rank === 3) return "bronze-badge";

  return "text-bg-dark border border-secondary";
};
</script>

<style scoped>
.prediction-card {
  background: #061a16;
  border: 1px solid rgba(25, 135, 84, 0.35);
  overflow: hidden;
}

.bronze-badge {
  background-color: #cd7f32;
  color: white;
}

.current-user-row {
  --bs-table-bg: rgba(25, 135, 84, 0.22);
  --bs-table-hover-bg: rgba(25, 135, 84, 0.28);
}

.avatar-lg {
  width: 56px;
  height: 56px;
}

.avatar-md {
  width: 38px;
  height: 38px;
}

.avatar-mobile {
  width: 42px;
  height: 42px;
}

.performance-column {
  min-width: 150px;
}

.progress-sm {
  height: 8px;
}
</style>
