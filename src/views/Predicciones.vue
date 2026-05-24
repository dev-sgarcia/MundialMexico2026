<template>
  <div class="bg-black vh-100 text-white overflow-hidden">
    <div class="container-fluid px-0 h-100">
      <div class="row g-0 h-100">
        <!-- SIDEBAR -->
        <aside
          class="d-none d-lg-block col-lg-3 col-xl-2 vh-100 overflow-hidden"
        >
          <Sidebar />
        </aside>

        <!-- MAIN -->
        <main
          class="col-12 col-lg-9 col-xl-10 vh-100 overflow-hidden px-3 pt-1 pb-1"
        >
          <section
            class="container-fluid h-100 d-flex flex-column overflow-hidden"
          >
            <!-- FIJO -->
            <div class="sticky-top bg-black z-3 pb-3">
              <!-- TÍTULO -->
              <div
                class="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4"
              >
                <div>
                  <h2 class="fw-bold mb-1">Mis predicciones</h2>

                  <p class="text-white-50 mb-0">
                    Realiza tus predicciones para sumar puntos y escalar
                    posiciones.
                  </p>
                </div>

                <UserProfile />
              </div>

              <!-- FILTROS -->
              <div
                class="d-flex justify-content-between align-items-center gap-3 mb-4"
              >
                <div
                  class="d-flex align-items-center gap-2 ms-lg-auto flex-nowrap"
                >
                  <!-- TIPO FILTRO -->
                  <select
                    v-model="filterType"
                    class="form-select bg-dark text-white border-success w-auto"
                  >
                    <option value="group">Filtrar por grupo</option>
                    <option value="team">Filtrar por selección</option>
                  </select>

                  <!-- FILTRO GRUPO -->
                  <select
                    v-if="filterType === 'group'"
                    v-model="selectedGroup"
                    class="form-select bg-dark text-white border-success w-auto"
                  >
                    <option value="Todos">Todos los grupos</option>

                    <option v-for="group in groups" :key="group" :value="group">
                      {{ group }}
                    </option>
                  </select>

                  <!-- FILTRO SELECCIÓN -->
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
              <div class="card prediction-card text-white rounded-4 mb-4">
                <div class="card-body">
                  <div
                    class="d-flex justify-content-between align-items-center flex-wrap gap-3"
                  >
                    <div>
                      <strong>
                        Primera fase
                        <span class="text-success">· Quiniela RA</span>
                      </strong>

                      <p class="text-white-50 mb-0">
                        <strong>Recuerda:</strong>
                        Solo se contabilizan las predicciones realizadas con al
                        menos 1 hora antes del inicio de cada partido.
                      </p>
                    </div>

                    <div class="d-flex align-items-center gap-3">
                      <div class="progress" style="width: 180px; height: 8px">
                        <div
                          class="progress-bar bg-success"
                          :style="{ width: progressPercentage + '%' }"
                        ></div>
                      </div>

                      <strong>
                        {{ savedMatches.length }}/{{ filteredMatches.length }}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- SCROLL -->
            <div
              class="flex-grow-1 overflow-auto overflow-x-hidden pb-4 scroll-clean"
            >
              <!-- PARTIDOS -->
              <div class="row g-3">
                <div
                  v-for="match in filteredMatches"
                  :key="match.id"
                  class="col-12 col-lg-6"
                >
                  <div class="card prediction-card text-white rounded-4 h-100">
                    <div class="card-body">
                      <div class="text-center mb-3">
                        <small class="text-white-50 fw-semibold">
                          {{ formatDate(match.date) }} · {{ match.group }}
                        </small>
                      </div>

                      <div
                        class="d-flex align-items-center justify-content-center gap-4"
                      >
                        <!-- LOCAL -->
                        <div class="d-flex align-items-center gap-2">
                          <div
                            class="d-flex align-items-center justify-content-end gap-2"
                          >
                            <span class="fw-bold text-end team-name">
                              {{ match.homeTeam }}
                            </span>

                            <img
                              :src="`https://flagcdn.com/w80/${match.homeFlag || getFlagCode(match.homeTeam)}.png`"
                              :alt="match.homeTeam"
                              class="team-flag"
                            />

                            <input
                              v-model="match.homeScore"
                              type="text"
                              inputmode="numeric"
                              maxlength="2"
                              class="form-control bg-dark text-success border-success text-center fw-bold score-input"
                              placeholder="-"
                              @input="updateSavedStatus(match)"
                            />
                          </div>
                        </div>

                        <!-- HORA -->
                        <div class="fw-bold fs-3">
                          {{ match.time }}
                        </div>

                        <!-- VISITANTE -->
                        <div
                          class="d-flex align-items-center justify-content-start gap-2"
                        >
                          <input
                            v-model="match.awayScore"
                            type="text"
                            inputmode="numeric"
                            maxlength="2"
                            class="form-control bg-dark text-success border-success text-center fw-bold score-input"
                            placeholder="-"
                            @input="updateSavedStatus(match)"
                          />

                          <img
                            :src="`https://flagcdn.com/w80/${match.awayFlag || getFlagCode(match.awayTeam)}.png`"
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
                          class="badge"
                          :class="
                            match.saved ? 'text-bg-success' : 'text-bg-warning'
                          "
                        >
                          {{ match.saved ? "Guardada ✓" : "Pendiente" }}
                        </span>
                      </div>

                      <div class="text-center mt-2">
                        <small class="text-white-50">
                          {{ match.stadium }} · {{ match.city }}
                        </small>
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

<style scoped>
.prediction-card {
  background: #061a16;
  border: 1px solid rgba(25, 135, 84, 0.35);
}

.team-flag {
  width: 34px;
  height: 24px;
  object-fit: contain;
}

.score-input {
  width: 42px;
  height: 38px;
}

.team-name {
  max-width: 95px;
}

.scroll-clean {
  scrollbar-width: none;
}

.scroll-clean::-webkit-scrollbar {
  display: none;
}
</style>

<script setup>
import { computed, ref } from "vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import matchesData from "@/data/matches.json";
import UserProfile from "@/components/common/UserProfile.vue";

const filterType = ref("group");
const selectedGroup = ref("Todos");
const selectedTeam = ref("Todas");

const teams = computed(() => {
  const allTeams = matches.value.flatMap((match) => [
    match.homeTeam,
    match.awayTeam,
  ]);

  return [...new Set(allTeams)].sort();
});

const matches = ref(
  matchesData.map((match) => ({
    ...match,
    homeScore: match.homeScore ?? "",
    awayScore: match.awayScore ?? "",
    saved:
      match.homeScore !== null &&
      match.homeScore !== undefined &&
      match.awayScore !== null &&
      match.awayScore !== undefined,
  })),
);

const groups = computed(() => {
  return [...new Set(matches.value.map((match) => match.group))];
});

const filteredMatches = computed(() => {
  return matches.value.filter((match) => {
    if (filterType.value === "group") {
      return (
        selectedGroup.value === "Todos" || match.group === selectedGroup.value
      );
    }

    if (filterType.value === "team") {
      return (
        selectedTeam.value === "Todas" ||
        match.homeTeam === selectedTeam.value ||
        match.awayTeam === selectedTeam.value
      );
    }

    return true;
  });
});

const savedMatches = computed(() => {
  return filteredMatches.value.filter((match) => match.saved);
});

const pendingMatches = computed(() => {
  return filteredMatches.value.filter((match) => !match.saved);
});

const progressPercentage = computed(() => {
  if (!filteredMatches.value.length) return 0;

  return Math.round(
    (savedMatches.value.length / filteredMatches.value.length) * 100,
  );
});

const updateSavedStatus = (match) => {
  match.saved =
    match.homeScore !== "" &&
    match.homeScore !== null &&
    match.awayScore !== "" &&
    match.awayScore !== null;
};

const formatDate = (date) => {
  const parsedDate = new Date(`${date}T00:00:00`);

  return parsedDate.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
  });
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

  return flagCodes[team];
};
</script>

<style scoped>
.prediction-card {
  background: #061a16;
  border: 1px solid rgba(25, 135, 84, 0.35);
}

.team-flag {
  width: 34px;
  height: 24px;
  object-fit: contain;
}

.score-input {
  width: 42px;
  height: 38px;
}

.team-name {
  max-width: 95px;
}
</style>
