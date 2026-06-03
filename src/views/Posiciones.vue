<template>
  <div class="bg-black min-vh-100 text-white pb-5 pb-lg-0">
    <div class="container-fluid px-3 py-3">
      <div class="row g-0">
        <!-- SIDEBAR -->
        <aside class="d-none d-lg-block col-lg-3 col-xl-2">
          <div class="position-sticky top-0 vh-100 overflow-hidden py-3">
            <Sidebar />
          </div>
        </aside>

        <!-- CONTENIDO -->
        <main class="col-12 col-lg-9 col-xl-10 px-0 pt-3 pb-5 pb-lg-1">
          <section class="container-fluid">
            <!-- HEADER -->
            <div class="bg-black z-3 mb-4">
              <div
                class="d-flex justify-content-between align-items-start flex-wrap gap-3"
              >
                <div>
                  <h2 class="fw-bold mb-1 d-flex align-items-center gap-2">
                    Tabla de posiciones
                  </h2>

                  <p class="text-white-50 mb-0">
                    Ranking general de participantes de la Quiniela RA.
                  </p>
                </div>

                <div class="mt-2 d-none d-md-block">
                  <UserProfile />
                </div>
              </div>
            </div>

            <!-- CARDS SUPERIORES -->
            <div class="row g-4 mb-4">
              <div class="col-6 col-md-6 col-xl-3">
                <div
                  class="card bg-warning bg-opacity-10 text-white border border-warning border-opacity-50 rounded-4 shadow-sm h-100"
                >
                  <div class="card-body p-3">
                    <div class="d-flex align-items-center gap-2 mb-3">
                      <PhCrown size="20" weight="fill" class="text-warning" />
                      <small class="text-white-50 fw-bold text-uppercase">
                        Líder actual
                      </small>
                    </div>

                    <div class="d-flex align-items-center gap-3">
                      <div>
                        <h6 class="fw-bold mb-1">
                          {{ leader?.participantName ?? "Sin líder" }}
                        </h6>

                        <span class="text-warning fw-bold fs-5">
                          {{ leader?.points ?? 0 }} pts
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-6 col-md-6 col-xl-3">
                <div
                  class="card bg-primary bg-opacity-10 text-white border border-primary border-opacity-50 rounded-4 shadow-sm h-100"
                >
                  <div class="card-body p-3">
                    <div class="d-flex align-items-center gap-2 mb-3">
                      <PhMedal size="20" weight="fill" class="text-primary" />
                      <small class="text-white-50 fw-bold text-uppercase">
                        Tu posición
                      </small>
                    </div>

                    <h4 class="fw-bold mb-0 text-primary">
                      {{ currentUserPosition }}°
                    </h4>

                    <span class="text-white-50 small">
                      de {{ standings.length }} participantes
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-6 col-md-6 col-xl-3">
                <div
                  class="card bg-success bg-opacity-10 text-white border border-success border-opacity-50 rounded-4 shadow-sm h-100"
                >
                  <div class="card-body p-3">
                    <div
                      class="d-flex justify-content-between align-items-center mb-3"
                    >
                      <div class="d-flex align-items-center gap-2">
                        <PhTarget
                          size="20"
                          weight="fill"
                          class="text-success"
                        />
                        <small class="text-white-50 fw-bold text-uppercase">
                          Racha actual
                        </small>
                      </div>

                      <small class="text-success">Ver todos</small>
                    </div>

                    <div class="d-flex align-items-center gap-3">
                      <h4 class="fw-bold mb-0 text-success">
                        {{ currentStreak }}
                      </h4>

                      <div class="d-flex gap-2 ms-auto">
                        <span
                          v-for="item in streakDots"
                          :key="item.id"
                          class="badge rounded-circle"
                          :class="
                            item.success ? 'text-bg-success' : 'text-bg-danger'
                          "
                        >
                          {{ item.success ? "✓" : "×" }}
                        </span>
                      </div>
                    </div>

                    <small class="text-white-50">
                      Tu mejor racha: {{ bestStreak }} aciertos
                    </small>
                  </div>
                </div>
              </div>

              <div class="col-6 col-md-6 col-xl-3">
                <div
                  class="card bg-info bg-opacity-10 text-white border border-info border-opacity-50 rounded-4 shadow-sm h-100"
                >
                  <div class="card-body p-3">
                    <div class="d-flex align-items-center gap-2 mb-3">
                      <PhLightning size="20" weight="fill" class="text-info" />
                      <small class="text-white-50 fw-bold text-uppercase">
                        Exactos totales
                      </small>
                    </div>

                    <h4 class="fw-bold mb-0 text-info">
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
              <!-- TABLA -->
              <div class="col-12 col-xl-9">
                <!-- FILTROS -->
                <div
                  class="card bg-dark text-white border border-success border-opacity-25 rounded-4 shadow-sm mb-3"
                >
                  <div class="card-body p-3">
                    <div class="row g-2">
                      <div class="col-6">
                        <div class="input-group input-group-sm">
                          <input
                            v-model="search"
                            type="text"
                            class="form-control bg-black text-white border-success search-input"
                            placeholder="Buscar participante"
                          />

                          <span
                            class="input-group-text bg-black border-success text-white-50"
                          >
                            <PhMagnifyingGlass size="16" />
                          </span>
                        </div>
                      </div>

                      <div class="col-6">
                        <select
                          v-model="sortBy"
                          class="form-select form-select-sm bg-black text-white border-success"
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
                  class="card bg-dark text-white border border-success border-opacity-25 rounded-4 shadow-sm overflow-hidden"
                >
                  <div class="table-responsive d-none d-md-block">
                    <table
                      class="table table-dark table-hover align-middle mb-0"
                    >
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Participante</th>
                          <th>Puntos</th>
                          <th>Exactos</th>
                          <th>Aciertos</th>
                          <th>Errores</th>
                          <th>Movimiento</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          v-for="player in paginatedStandings"
                          :key="player.id"
                          :class="`mobile-rank-${player.rank}`"
                        >
                          <td>
                            <div
                              class="position-relative d-inline-flex align-items-center justify-content-center"
                            >
                              <PhMedal
                                v-if="player.rank <= 3"
                                size="34"
                                weight="fill"
                                :class="getMedalClass(player.rank)"
                              />

                              <span
                                v-if="player.rank <= 3"
                                class="position-absolute top-50 start-50 translate-middle fw-bold medal-number"
                              >
                                {{ player.rank }}
                              </span>

                              <span
                                v-else
                                class="badge rounded-pill text-bg-dark border border-secondary px-3 py-2"
                              >
                                {{ player.rank }}
                              </span>
                            </div>
                          </td>

                          <td>
                            <div class="d-flex align-items-center gap-2">
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
                                <small class="player-summary text-white-50">
                                  {{ player.correctResults }} aciertos ·
                                  {{ player.exactScores }} exactos
                                </small>
                              </div>
                            </div>
                          </td>
                          <td class="fw-bold text-success fs-5">
                            {{ player.points }}
                          </td>
                          <td>{{ player.exactScores }}</td>
                          <td>{{ player.correctResults }}</td>

                          <td class="d-none d-md-table-cell">
                            {{ player.failedPredictions }}
                          </td>

                          <td class="d-none d-md-table-cell">
                            <span :class="getMovementClass(player.movement)">
                              {{ getMovementIcon(player.movement) }}
                              {{ Math.abs(player.movement) || "" }}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="table-responsive d-md-none">
                    <table
                      class="table table-dark table-hover table-sm align-middle text-nowrap mb-0 mobile-standings-table"
                    >
                      <thead>
                        <tr>
                          <th class="text-center">#</th>
                          <th>Jugador</th>
                          <th class="text-center">Pts</th>
                          <th class="text-center">Ex</th>
                          <th class="text-center">Ac</th>
                          <th class="text-center">Er</th>
                          <th class="text-center">Mov</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          v-for="player in paginatedStandings"
                          :key="player.id"
                          :class="`mobile-rank-${player.rank}`"
                        >
                          <td class="text-center">
                            <div
                              class="position-relative d-inline-flex align-items-center justify-content-center"
                            >
                              <PhMedal
                                v-if="player.rank <= 3"
                                size="28"
                                weight="fill"
                                :class="getMedalClass(player.rank)"
                              />

                              <span
                                v-if="player.rank <= 3"
                                class="position-absolute top-50 start-50 translate-middle fw-bold medal-number"
                              >
                                {{ player.rank }}
                              </span>

                              <span v-else class="fw-bold text-white-50">
                                {{ player.rank }}
                              </span>
                            </div>
                          </td>

                          <td class="px-1">
                            <div
                              class="fw-semibold text-truncate d-flex align-items-center gap-1"
                            >
                              <span class="text-truncate">
                                {{ player.participantName }}
                              </span>

                              <small
                                v-if="player.isCurrentUser"
                                class="badge bg-success px-1 py-0 current-user-badge"
                              >
                                Tú
                              </small>
                            </div>

                            <small
                              class="player-summary text-white-50 d-block lh-1"
                            >
                              {{ player.correctResults }} aciertos ·
                              {{ player.exactScores }} exactos
                            </small>
                          </td>

                          <td class="text-center fw-bold text-white">
                            {{ player.points }}
                          </td>

                          <td class="text-center text-primary fw-semibold">
                            {{ player.exactScores }}
                          </td>

                          <td class="text-center text-success fw-semibold">
                            {{ player.correctResults }}
                          </td>
                          <td class="text-center text-danger fw-semibold">
                            {{ player.failedPredictions }}
                          </td>
                          <td class="text-center">
                            <span :class="getMovementClass(player.movement)">
                              {{ getMovementIcon(player.movement) }}
                              {{ Math.abs(player.movement) || "" }}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="legend-mobile d-flex justify-content-center gap-3 text-white-50 pt-1 pb-0 d-md-none"
                  >
                    <span>
                      <i class="fa-solid fa-circle text-primary me-1"></i>
                      Ex
                    </span>

                    <span>
                      <i class="fa-solid fa-circle text-success me-1"></i>
                      Ac
                    </span>

                    <span>
                      <i class="fa-solid fa-circle text-danger me-1"></i>
                      Er
                    </span>

                    <span>
                      <i class="fa-solid fa-circle text-warning me-1"></i>
                      Mov
                    </span>
                  </div>
                  <div
                    class="d-flex justify-content-center justify-content-md-between align-items-center flex-wrap gap-3 px-3 pt-1 pb-3"
                  >
                    <small class="text-white-50 d-none d-md-block">
                      Mostrando {{ paginationStart }} - {{ paginationEnd }} de
                      {{ filteredStandings.length }} participantes
                    </small>

                    <nav>
                      <ul class="pagination mb-0">
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
                <div class="d-flex flex-column gap-4">
                  <!-- PARTIDOS -->
                  <div
                    class="card bg-dark text-white border border-success border-opacity-25 rounded-4 shadow-sm"
                  >
                    <div class="card-body p-3">
                      <div
                        class="d-flex justify-content-between align-items-center mb-3"
                      >
                        <h6
                          class="fw-bold mb-0 d-flex align-items-center gap-2"
                        >
                          <PhCalendarBlank
                            size="18"
                            weight="fill"
                            class="text-success"
                          />
                          Próximos partidos
                        </h6>

                        <small class="text-success">Ver todos</small>
                      </div>
                      <div
                        v-for="match in nextMatches"
                        :key="match.id"
                        class="border-bottom border-secondary border-opacity-25 pb-3 mb-3"
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

                          <span class="text-white-50 small fw-semibold">
                            VS
                          </span>

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

                      <RouterLink
                        to="/predicciones"
                        class="btn btn-outline-success w-100 rounded-3 mt-2"
                      >
                        Ir a mis predicciones
                      </RouterLink>
                    </div>
                  </div>

                  <!-- RESUMEN -->
                  <div
                    class="card bg-dark text-white border border-success border-opacity-25 rounded-4 shadow-sm"
                  >
                    <div class="card-body p-3">
                      <h6 class="fw-bold mb-3 d-flex align-items-center gap-2">
                        <PhChartLineUp
                          size="18"
                          weight="fill"
                          class="text-success"
                        />
                        Resumen general
                      </h6>

                      <div class="row g-3">
                        <div class="col-6">
                          <div
                            class="bg-primary bg-opacity-10 border border-primary border-opacity-25 rounded-4 p-3 h-100"
                          >
                            <PhUsers size="26" class="text-primary mb-2" />
                            <small class="d-block text-white-50"
                              >Participantes</small
                            >
                            <h4 class="fw-bold mb-0">
                              {{ standings.length }}
                            </h4>
                          </div>
                        </div>

                        <div class="col-6">
                          <div
                            class="bg-success bg-opacity-10 border border-success border-opacity-25 rounded-4 p-3 h-100"
                          >
                            <PhTarget size="26" class="text-success mb-2" />
                            <small class="d-block text-white-50">Exactos</small>
                            <h4 class="fw-bold mb-0">
                              {{ totalExactScores }}
                            </h4>
                          </div>
                        </div>

                        <div class="col-6">
                          <div
                            class="bg-warning bg-opacity-10 border border-warning border-opacity-25 rounded-4 p-3 h-100"
                          >
                            <PhCheckCircle
                              size="26"
                              class="text-warning mb-2"
                            />
                            <small class="d-block text-white-50"
                              >Aciertos</small
                            >
                            <h4 class="fw-bold mb-0">
                              {{ totalCorrectResults }}
                            </h4>
                          </div>
                        </div>

                        <div class="col-6">
                          <div class="summary-purple rounded-4 p-3 h-100">
                            <PhChartBar
                              size="26"
                              class="summary-purple-icon mb-2"
                            />
                            <small class="d-block text-white-50"
                              >Predicciones</small
                            >
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
          </section>
        </main>
      </div>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import UserProfile from "@/components/common/UserProfile.vue";
import BottomNav from "@/components/dashboard/BottomNav.vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";

import {
  PhCalendarBlank,
  PhChartBar,
  PhChartLineUp,
  PhCheckCircle,
  PhCrown,
  PhLightning,
  PhMagnifyingGlass,
  PhMedal,
  PhRanking,
  PhSoccerBall,
  PhTarget,
  PhTrendUp,
  PhTrophy,
  PhUser,
  PhUsers,
  PhXCircle,
} from "@phosphor-icons/vue";

import { standingsMock } from "@/data/standings.mock";
import { useRouter, useRoute } from "vue-router";
import { supabase } from "@/supabaseClient";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();

// Variables de estado
const userId = ref(null);
const idLigaActiva = ref(
  route.query.ligaId || localStorage.getItem("ligaIdActiva") || null,
);

// 3. Función cadenero
const validarAcceso = async (userId) => {
  try {
    // Buscamos un registro cualquiera; si no hay, el arreglo será vacío
    const { data, error } = await supabase
      .from("league_members")
      .select("league_id") // Seleccionamos una columna que SÍ existe
      .eq("user_id", String(userId))
      .limit(1);

    if (error) throw error;

    // Si data tiene elementos, tiene acceso. Si está vacío, no.
    return data && data.length > 0;
  } catch (err) {
    console.error("Error en validación:", err);
    return false;
  }
};

// 3. El onMounted blindado
onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    router.push("/");
    return;
  }

  userId.value = session.user.id;

  // 1. Validar si tiene al menos una liga
  const tieneLiga = await validarAcceso(userId.value);

  if (!tieneLiga) {
    Swal.fire({
      title: "¡Aún no tienes ligas!",
      text: "Debes unirte a una liga para ver las posiciones.",
      icon: "info",
      background: "#1a1d20",
      color: "#fff",
    });
    router.push("/juega");
    return;
  }

  // 2. Si tiene liga, validamos la liga específica activa
  if (idLigaActiva.value && idLigaActiva.value !== "null") {
    // ... aquí tu lógica de cargarPosiciones()
    await cargarPosiciones();
  } else {
    router.push("/juega");
  }
});

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
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
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
  // 👇 AGREGAMOS ESTA VALIDACIÓN
  if (!leader.value || !leader.value.points || leader.value.points === 0) {
    return 0;
  }

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

const getMedalClass = (rank) => {
  if (rank === 1) return "text-warning";
  if (rank === 2) return "text-secondary";
  if (rank === 3) return "medal-bronze";

  return "";
};
</script>

<style scoped>
.avatar-md {
  width: 38px;
  height: 38px;
}

.medal-number {
  font-size: 0.75rem;
  color: #111;
  line-height: 1;
  margin-top: -5px;
}

.medal-bronze {
  color: #cd7f32;
}

.summary-purple {
  background: rgba(111, 66, 193, 0.15);
  border: 1px solid rgba(111, 66, 193, 0.35);
}

.summary-purple-icon {
  color: #8b5cf6;
}

.search-input::placeholder {
  color: rgba(226, 226, 226, 0.8);
  opacity: 1;
}

@media (max-width: 991.98px) {
  .mobile-standings-table {
    min-width: 100%;
  }

  .mobile-player-avatar {
    width: 34px;
    height: 34px;
    font-size: 0.75rem;
  }

  .mobile-player-name {
    max-width: 140px;
  }
}
.legend-mobile {
  font-size: 0.7rem;
}

.legend-mobile i {
  font-size: 0.5rem;
}

.current-user-badge {
  font-size: 0.55rem;
}

.player-summary {
  font-size: 0.65rem;
}

.mobile-standings-table thead th {
  background: rgba(25, 135, 84, 0.16);
  border-bottom: 2px solid rgba(25, 135, 84, 0.45);
}

.mobile-rank-1 td {
  background: rgba(255, 193, 7, 0.08);
}

.mobile-rank-2 td {
  background: rgba(173, 181, 189, 0.06);
}

.mobile-rank-3 td {
  background: rgba(205, 127, 50, 0.07);
}

.mobile-rank-1 td:first-child {
  border-left: 3px solid #ffc107;
}

.mobile-rank-2 td:first-child {
  border-left: 3px solid #adb5bd;
}

.mobile-rank-3 td:first-child {
  border-left: 3px solid #cd7f32;
}

.legend-mobile {
  font-size: 0.65rem;
}

.legend-mobile i {
  font-size: 0.5rem;
}
</style>
