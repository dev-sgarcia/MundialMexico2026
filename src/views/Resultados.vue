<template>
  <div class="bg-black vh-100 text-white overflow-hidden">
    <div class="container-fluid px-0 h-100">
      <div class="row g-3 h-100">
        <!-- SIDEBAR -->
        <aside class="col-12 col-lg-3 col-xl-2 vh-100 overflow-hidden">
          <Sidebar />
        </aside>

        <!-- MAIN -->
        <main class="col-12 col-lg-9 col-xl-10 vh-100 overflow-hidden">
          <section
            class="container-fluid h-100 d-flex flex-column overflow-hidden"
          >
            <!-- FIJO -->
            <div class="sticky-top bg-black z-3 pb-3">
              <!-- TÍTULO -->
              <div
                class="d-flex justify-content-between align-items-start mb-4 pt-2"
              >
                <div>
                  <h2 class="fw-bold mb-1">Resultados</h2>

                  <p class="text-white-50 mb-0">
                    Consulta los marcadores oficiales, quién acertó y cómo
                    cambia la tabla de la quiniela.
                  </p>
                </div>
              </div>

              <!-- FILTROS -->
              <div
                class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4"
              >
                <div class="btn-group">
                  <button
                    class="btn"
                    :class="
                      selectedStatus === 'all'
                        ? 'btn-success'
                        : 'btn-outline-success'
                    "
                    @click="selectedStatus = 'all'"
                  >
                    Todos
                  </button>

                  <button
                    class="btn"
                    :class="
                      selectedStatus === 'live'
                        ? 'btn-success'
                        : 'btn-outline-success'
                    "
                    @click="selectedStatus = 'live'"
                  >
                    En vivo
                  </button>

                  <button
                    class="btn"
                    :class="
                      selectedStatus === 'finished'
                        ? 'btn-success'
                        : 'btn-outline-success'
                    "
                    @click="selectedStatus = 'finished'"
                  >
                    Finalizados
                  </button>

                  <button
                    class="btn"
                    :class="
                      selectedStatus === 'pending'
                        ? 'btn-success'
                        : 'btn-outline-success'
                    "
                    @click="selectedStatus = 'pending'"
                  >
                    Pendientes
                  </button>
                </div>

                <div class="d-flex align-items-center gap-2">
                  <select
                    v-model="filterType"
                    class="form-select bg-dark text-white border-success"
                  >
                    <option value="group">Filtrar por grupo</option>
                    <option value="team">Filtrar por selección</option>
                  </select>

                  <select
                    v-if="filterType === 'group'"
                    v-model="selectedGroup"
                    class="form-select bg-dark text-white border-success"
                  >
                    <option value="Todos">Todos los grupos</option>

                    <option v-for="group in groups" :key="group" :value="group">
                      {{ group }}
                    </option>
                  </select>

                  <select
                    v-if="filterType === 'team'"
                    v-model="selectedTeam"
                    class="form-select bg-dark text-white border-success"
                  >
                    <option value="Todas">Todas las selecciones</option>

                    <option v-for="team in teams" :key="team" :value="team">
                      {{ team }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- RESUMEN -->
              <div class="card results-card text-white rounded-4 mb-4">
                <div class="card-body">
                  <div
                    class="d-flex justify-content-between align-items-center flex-wrap gap-3"
                  >
                    <div>
                      <strong>
                        Primera fase
                        <span class="text-success">· Resultados</span>
                      </strong>

                      <p class="text-white-50 mb-0">
                        Los marcadores aparecerán cuando los partidos estén en
                        vivo o finalizados.
                      </p>
                    </div>

                    <div class="d-flex align-items-center gap-2 flex-wrap">
                      <span class="badge text-bg-success rounded-pill">
                        {{ finishedMatches.length }} finalizados
                      </span>

                      <span class="badge text-bg-danger rounded-pill">
                        {{ liveMatches.length }} en vivo
                      </span>

                      <span class="badge text-bg-warning rounded-pill">
                        {{ pendingMatches.length }} pendientes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- SCROLL -->
            <div
              class="flex-grow-1 overflow-auto overflow-x-hidden pb-4 scroll-clean"
            >
              <div class="row g-3">
                <!-- PARTIDOS -->
                <div class="col-12 col-xl-8">
                  <div class="row g-3">
                    <div
                      v-for="match in filteredMatches"
                      :key="match.id"
                      class="col-12 col-md-6"
                    >
                      <div class="card results-card text-white rounded-4 h-100">
                        <div class="card-body">
                          <div class="text-center mb-3">
                            <small class="text-white-50 fw-semibold">
                              {{ formatDate(match.date) }} · {{ match.time }} ·
                              {{ match.group }}
                            </small>
                          </div>

                          <div
                            class="d-flex align-items-center justify-content-center gap-4"
                          >
                            <!-- LOCAL -->
                            <div
                              class="d-flex align-items-center justify-content-end gap-2 team-side"
                            >
                              <span class="fw-bold text-end team-name">
                                {{ match.homeTeam }}
                              </span>

                              <img
                                :src="`https://flagcdn.com/w80/${getFlagCode(
                                  match.homeTeam,
                                )}.png`"
                                :alt="match.homeTeam"
                                class="team-flag"
                              />
                            </div>

                            <!-- SCORE -->
                            <div class="fw-bold fs-3 text-success score-box">
                              {{ formatScore(match.homeScore) }} -
                              {{ formatScore(match.awayScore) }}
                            </div>

                            <!-- VISITANTE -->
                            <div
                              class="d-flex align-items-center justify-content-start gap-2 team-side"
                            >
                              <img
                                :src="`https://flagcdn.com/w80/${getFlagCode(
                                  match.awayTeam,
                                )}.png`"
                                :alt="match.awayTeam"
                                class="team-flag"
                              />

                              <span class="fw-bold text-start team-name">
                                {{ match.awayTeam }}
                              </span>
                            </div>
                          </div>

                          <div class="text-center mt-3">
                            <span
                              class="badge rounded-pill"
                              :class="getStatusClass(match.status)"
                            >
                              {{ getStatusLabel(match.status) }}
                            </span>
                          </div>

                          <div class="text-center mt-2">
                            <small class="text-white-50">
                              {{ match.phase }} · {{ match.stadium }} ·
                              {{ match.city }}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- DERECHA -->
                <div class="col-12 col-xl-4">
                  <div class="d-flex flex-column gap-3">
                    <!-- ACERTARON -->
                    <div class="card results-card text-white rounded-4">
                      <div class="card-body">
                        <h4 class="fw-bold mb-3">Acertaron el marcador</h4>

                        <div
                          v-for="hit in predictionHits"
                          :key="hit.id"
                          class="info-row d-flex justify-content-between align-items-center rounded-4 p-3 mb-2"
                        >
                          <div>
                            <strong>{{ hit.userName }}</strong>

                            <div class="small text-white-50">
                              {{ hit.match }} · Predijo
                              {{ hit.prediction }}
                            </div>
                          </div>

                          <span class="badge text-bg-success rounded-pill">
                            +{{ hit.points }} pts
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- TOP -->
                    <div class="card results-card text-white rounded-4">
                      <div class="card-body">
                        <h4 class="fw-bold mb-3">Top 5 de la quiniela</h4>

                        <div
                          v-for="player in ranking"
                          :key="player.id"
                          class="info-row d-flex justify-content-between align-items-center rounded-4 p-3 mb-2"
                        >
                          <div>
                            <strong>
                              {{ player.position }}.
                              {{ player.name }}
                            </strong>

                            <div class="small text-white-50">
                              {{ player.status }}
                            </div>
                          </div>

                          <span class="fw-bold text-success">
                            {{ player.points }} pts
                          </span>
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
import { computed, ref } from "vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import matchesData from "@/data/matches.json";

const filterType = ref("group");
const selectedGroup = ref("Todos");
const selectedTeam = ref("Todas");
const selectedStatus = ref("all");

const matches = ref(matchesData);

const predictionHits = ref([
  {
    id: 1,
    userName: "Javi",
    match: "México vs Sudáfrica",
    prediction: "2 - 1",
    points: 3,
  },
  {
    id: 2,
    userName: "Nancy",
    match: "Brasil vs Marruecos",
    prediction: "1 - 0",
    points: 3,
  },
  {
    id: 3,
    userName: "Daniel",
    match: "Canadá vs Catar",
    prediction: "2 - 0",
    points: 1,
  },
]);

const ranking = ref([
  {
    id: 1,
    position: 1,
    name: "Javi",
    points: 48,
    status: "Racha de 3 aciertos",
  },
  {
    id: 2,
    position: 2,
    name: "Nancy",
    points: 42,
    status: "Subió 2 posiciones",
  },
  {
    id: 3,
    position: 3,
    name: "Daniel",
    points: 39,
    status: "Marcador exacto reciente",
  },
]);

const teams = computed(() => {
  const allTeams = matches.value.flatMap((match) => [
    match.homeTeam,
    match.awayTeam,
  ]);

  return [...new Set(allTeams)].sort();
});

const groups = computed(() => {
  return [...new Set(matches.value.map((match) => match.group))];
});

const filteredMatches = computed(() => {
  return matches.value.filter((match) => {
    const statusValid =
      selectedStatus.value === "all" || match.status === selectedStatus.value;

    const groupValid =
      filterType.value !== "group" ||
      selectedGroup.value === "Todos" ||
      match.group === selectedGroup.value;

    const teamValid =
      filterType.value !== "team" ||
      selectedTeam.value === "Todas" ||
      match.homeTeam === selectedTeam.value ||
      match.awayTeam === selectedTeam.value;

    return statusValid && groupValid && teamValid;
  });
});

const finishedMatches = computed(() => {
  return matches.value.filter((match) => match.status === "finished");
});

const liveMatches = computed(() => {
  return matches.value.filter((match) => match.status === "live");
});

const pendingMatches = computed(() => {
  return matches.value.filter((match) => match.status === "pending");
});

const formatScore = (score) => {
  return score === null || score === undefined ? "-" : score;
};

const formatDate = (date) => {
  const parsedDate = new Date(`${date}T00:00:00`);

  return parsedDate.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
  });
};

const getStatusLabel = (status) => {
  const labels = {
    pending: "Pendiente",
    live: "En vivo",
    finished: "Finalizado",
  };

  return labels[status] || "Pendiente";
};

const getStatusClass = (status) => {
  if (status === "live") return "text-bg-danger";
  if (status === "finished") return "text-bg-success";

  return "text-bg-warning";
};

const getFlagCode = (team) => {
  const flagCodes = {
    México: "mx",
    Sudáfrica: "za",
    "República de Corea": "kr",
    Chequia: "cz",
    Canadá: "ca",
    "Bosnia y Herzegovina": "ba",
    "EE. UU.": "us",
    Paraguay: "py",
    Catar: "qa",
    Suiza: "ch",
    Brasil: "br",
    Marruecos: "ma",
    Haití: "ht",
    Escocia: "gb-sct",
    Australia: "au",
    Turquía: "tr",
    Alemania: "de",
    Curazao: "cw",
    "Países Bajos": "nl",
    Japón: "jp",
    "Costa de Marfil": "ci",
    Ecuador: "ec",
    Suecia: "se",
    Túnez: "tn",
    España: "es",
    "Islas de Cabo Verde": "cv",
    Bélgica: "be",
    Egipto: "eg",
    "Arabia Saudí": "sa",
    Uruguay: "uy",
    "RI de Irán": "ir",
    "Nueva Zelanda": "nz",
    Francia: "fr",
    Senegal: "sn",
    Irak: "iq",
    Noruega: "no",
    Argentina: "ar",
    Argelia: "dz",
    Austria: "at",
    Jordania: "jo",
    Portugal: "pt",
    "RD Congo": "cd",
    Inglaterra: "gb-eng",
    Croacia: "hr",
    Ghana: "gh",
    Panamá: "pa",
    Uzbekistán: "uz",
    Colombia: "co",
  };

  return flagCodes[team] || "un";
};
</script>
<style scoped>
.results-card {
  background: #061a16;
  border: 1px solid rgba(25, 135, 84, 0.35);
}

.info-row {
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(25, 135, 84, 0.25);
}

.team-flag {
  width: 34px;
  height: 24px;
  object-fit: contain;
}

.team-side {
  width: 38%;
}

.team-name {
  max-width: 115px;
}

.score-box {
  min-width: 72px;
  text-align: center;
}

.scroll-clean {
  scrollbar-width: none;
}

.scroll-clean::-webkit-scrollbar {
  display: none;
}
</style>
