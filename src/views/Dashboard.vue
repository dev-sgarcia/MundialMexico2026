<template>
  <div class="bg-black min-vh-100 text-white pb-5 pb-lg-0">
    <div class="container-fluid px-3 pt-0 pb-3">
      <div class="row g-0">
        <aside class="d-none d-lg-block col-lg-3 col-xl-2">
          <div class="position-fixed top-0 start-0 p-3 sidebar-fixed">
            <Sidebar />
          </div>
        </aside>

        <main
          class="col-12 col-lg-9 col-xl-10 offset-lg-3 offset-xl-2 px-0 pt-0 pb-5 pb-lg-1"
        >
          <section class="bg-black min-vh-100 text-white pt-0 pb-4">
            <div class="container-fluid px-3 px-md-4">
              <div
                class="d-flex justify-content-between align-items-start mb-4 mt-4"
              >
                <div>
                  <h2 class="fw-bold mb-1">Radar Mundialista</h2>

                  <p class="text-secondary mb-1">
                    Estadísticas y tendencias de tu quiniela
                  </p>
                </div>

                <PageHeader />
              </div>

              <div class="row g-4 align-items-stretch">
                <!-- Card país campeón -->
                <div class="col-12 col-xl-8">
                  <div
                    class="card champion-card text-white rounded-4 border border-success border-opacity-25 p-3 p-md-4 h-100"
                  >
                    <h5 class="fw-bold mb-4">
                      País campeón elegido por los participantes
                    </h5>

                    <div class="row g-4 align-items-stretch">
                      <!-- Dona + lista -->
                      <div class="col-12 col-lg-4">
                        <div class="text-center mb-1">
                          <div class="champion-donut mx-auto">
                            <svg viewBox="0 0 42 42" class="champion-donut-svg">
                              <circle
                                v-for="slice in donutSlices"
                                :key="slice.rawCode"
                                class="champion-donut-slice"
                                cx="21"
                                cy="21"
                                r="15.915"
                                fill="transparent"
                                :stroke="slice.color"
                                stroke-width="8"
                                :stroke-dasharray="`${slice.percentage} ${
                                  100 - slice.percentage
                                }`"
                                :stroke-dashoffset="slice.offset"
                              />
                            </svg>

                            <div class="champion-donut-center">
                              <h2 class="fw-bold mb-0">{{ totalVotes }}</h2>
                              <span class="text-white-50">Total</span>
                            </div>
                          </div>
                        </div>

                        <div class="d-flex flex-column gap-2">
                          <div
                            v-for="country in visibleChampionCountries"
                            :key="country.rawCode"
                            class="champion-country-row rounded-3 px-2 py-1"
                          >
                            <div
                              class="d-flex align-items-center justify-content-between gap-3"
                            >
                              <div
                                class="d-flex align-items-center gap-2 min-w-0"
                              >
                                <img
                                  :src="`https://flagcdn.com/w40/${country.flag}.png`"
                                  :alt="country.name"
                                  width="22"
                                />

                                <span class="text-truncate">
                                  {{ country.name }}
                                </span>
                              </div>

                              <span class="fw-semibold text-nowrap">
                                {{ country.votes }} ({{ country.percentage }}%)
                              </span>
                            </div>
                          </div>
                          <div
                            v-if="countriesWithPercentages.length > 4"
                            class="text-center mt-2"
                          >
                            <button
                              type="button"
                              class="btn btn-link btn-sm text-success text-decoration-none"
                              @click="
                                showAllChampionCountries =
                                  !showAllChampionCountries
                              "
                            >
                              <span v-if="!showAllChampionCountries">
                                Ver
                                {{ countriesWithPercentages.length - 4 }} más
                              </span>

                              <span v-else> Ver menos </span>
                            </button>
                          </div>
                          <div
                            v-if="!countriesWithPercentages.length"
                            class="text-white-50 small text-center py-3"
                          >
                            Aún no hay países seleccionados.
                          </div>
                        </div>
                      </div>

                      <!-- Mapa -->
                      <div class="col-12 col-lg-8">
                        <div
                          ref="mapRef"
                          class="world-map-wrapper bg-success bg-opacity-10 rounded-4 overflow-hidden"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Card ganadores por grupo -->
                <div class="col-12 col-xl-4">
                  <div
                    class="card champion-card text-white rounded-4 border border-success border-opacity-25 p-3 p-md-4 h-100 d-flex flex-column"
                  >
                    <div class="mb-3">
                      <h5 class="fw-bold mb-1">
                        Equipos más elegidos para ganar grupo
                      </h5>

                      <div
                        class="d-flex justify-content-between align-items-center flex-wrap gap-2"
                      >
                        <p class="text-white-50 small mb-0">
                          Basado en predicciones guardadas
                        </p>

                        <select
                          v-model="selectedGroup"
                          class="form-select form-select-sm w-auto bg-dark text-white border-secondary"
                        >
                          <option
                            v-for="group in availableGroups"
                            :key="group"
                            :value="group"
                          >
                            Grupo {{ group }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div
                      v-if="selectedGroupTeams.length"
                      class="d-flex flex-column justify-content-center gap-2 flex-grow-1"
                    >
                      <div v-for="team in selectedGroupTeams" :key="team.code">
                        <div
                          class="d-flex justify-content-between align-items-center gap-3 mb-2"
                        >
                          <div class="d-flex align-items-center gap-2 min-w-0">
                            <img
                              :src="`https://flagcdn.com/w40/${team.flag}.png`"
                              :alt="team.name"
                              width="24"
                            />

                            <span class="fw-semibold text-truncate">
                              {{ team.name }}
                            </span>
                          </div>

                          <span class="fw-bold text-warning text-nowrap">
                            {{ team.percentage }}%
                          </span>
                        </div>

                        <div
                          class="progress bg-secondary bg-opacity-25"
                          style="height: 8px"
                        >
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            :style="{ width: `${team.percentage}%` }"
                            :aria-valuenow="team.percentage"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>

                        <small class="text-white-50">
                          {{ team.votes }} votos
                        </small>
                      </div>
                    </div>

                    <div v-else class="text-white-50 small text-center py-4">
                      Aún no hay predicciones para este grupo.
                    </div>
                  </div>
                </div>
              </div>
              <div class="row g-3 mt-1">
                <div class="col-12 col-md-6 col-xl-4">
                  <div
                    class="card bg-dark bg-opacity-50 text-white rounded-4 border border-success border-opacity-50 p-2 p-md-4 h-100"
                  >
                    <p class="fw-bold text-success mb-4">
                      Más fácil de predecir
                    </p>

                    <div v-if="easiestMatch" class="text-center">
                      <div
                        class="d-flex justify-content-center align-items-center gap-2 mb-2"
                      >
                        <div class="text-center">
                          <img
                            :src="`https://flagcdn.com/w40/${easiestMatch.home_flag}.png`"
                            :alt="easiestMatch.home_team"
                            width="34"
                            class="mb-2"
                          />
                          <p class="small text-white-50 mb-0">
                            {{ easiestMatch.home_team }}
                          </p>
                        </div>

                        <h5 class="fw-bold mb-0">
                          {{ easiestMatch.real_home_score }} -
                          {{ easiestMatch.real_away_score }}
                        </h5>

                        <div class="text-center">
                          <img
                            :src="`https://flagcdn.com/w40/${easiestMatch.away_flag}.png`"
                            :alt="easiestMatch.away_team"
                            width="28"
                            class="mb-1"
                          />
                          <p class="small text-white-50 mb-0 lh-sm">
                            {{ easiestMatch.away_team }}
                          </p>
                        </div>
                      </div>

                      <p class="fw-bold text-success mb-1">
                        {{ easiestMatch.correct_predictions }} usuarios
                        acertaron
                      </p>

                      <small class="text-white-50">
                        {{ easiestMatch.accuracy }}% acertó el resultado exacto
                      </small>
                    </div>

                    <div v-else class="text-white-50 small text-center py-4">
                      Aún no hay partidos finalizados.
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 col-xl-4">
                  <div
                    class="card bg-dark bg-opacity-50 text-white rounded-4 border border-danger border-opacity-50 p-3 p-md-4 h-100"
                  >
                    <p class="fw-bold text-danger mb-4">
                      Más difícil de predecir
                    </p>

                    <div v-if="hardestMatch" class="text-center">
                      <div
                        class="d-flex justify-content-center align-items-center gap-3 mb-3"
                      >
                        <div class="text-center">
                          <img
                            :src="`https://flagcdn.com/w40/${hardestMatch.home_flag}.png`"
                            :alt="hardestMatch.home_team"
                            width="34"
                            class="mb-2"
                          />
                          <p class="small text-white-50 mb-0">
                            {{ hardestMatch.home_team }}
                          </p>
                        </div>

                        <h3 class="fw-bold mb-0">
                          {{ hardestMatch.real_home_score }} -
                          {{ hardestMatch.real_away_score }}
                        </h3>

                        <div class="text-center">
                          <img
                            :src="`https://flagcdn.com/w40/${hardestMatch.away_flag}.png`"
                            :alt="hardestMatch.away_team"
                            width="34"
                            class="mb-2"
                          />
                          <p class="small text-white-50 mb-0">
                            {{ hardestMatch.away_team }}
                          </p>
                        </div>
                      </div>

                      <p class="fw-bold text-danger mb-1">
                        {{ hardestMatch.correct_predictions }} usuarios
                        acertaron
                      </p>

                      <small class="text-white-50">
                        {{ hardestMatch.accuracy }}% acertó el resultado exacto
                      </small>
                    </div>

                    <div v-else class="text-white-50 small text-center py-4">
                      Aún no hay partidos finalizados.
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 col-xl-4">
                  <div
                    class="card bg-dark bg-opacity-50 text-white rounded-4 border border-warning border-opacity-50 p-3 p-md-4 h-100"
                  >
                    <p class="fw-bold text-warning mb-4">Equipo sorpresa</p>

                    <div v-if="surpriseTeam" class="text-center">
                      <div
                        class="d-flex justify-content-center align-items-center gap-3 mb-1"
                      >
                        <div class="text-center">
                          <img
                            v-if="surpriseTeam.home_flag"
                            :src="`https://flagcdn.com/w40/${surpriseTeam.home_flag}.png`"
                            :alt="surpriseTeam.home_team"
                            width="34"
                            class="mb-1"
                          />

                          <div class="small text-white-50">
                            {{ surpriseTeam.home_favorite_percentage }}%
                          </div>
                        </div>

                        <span class="text-white-50 small">vs</span>

                        <div class="text-center">
                          <img
                            v-if="surpriseTeam.away_flag"
                            :src="`https://flagcdn.com/w40/${surpriseTeam.away_flag}.png`"
                            :alt="surpriseTeam.away_team"
                            width="34"
                            class="mb-1"
                          />

                          <div class="small text-white-50">
                            {{ surpriseTeam.away_favorite_percentage }}%
                          </div>
                        </div>
                      </div>

                      <h3 class="fw-bold mb-1">
                        {{ surpriseTeam.team }}
                      </h3>

                      <p class="fw-bold text-warning mb-1">
                        {{ surpriseTeam.type }}
                      </p>

                      <div class="mt-1">
                        <small class="d-block text-white-50">
                          🎯 {{ surpriseTeam.exact_predictions }}
                          usuarios acertaron marcador exacto
                        </small>

                        <small class="d-block text-white-50 mt-1">
                          ✅ {{ surpriseTeam.result_predictions }}
                          usuarios acertaron ganador o empate
                          <span class="fw-bold">
                            ({{ surpriseTeam.result_percentage }}%)
                          </span>
                        </small>
                      </div>
                    </div>

                    <div v-else class="text-white-50 small text-center py-4">
                      Aún no hay datos suficientes.
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
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import PageHeader from "@/components/common/PageHeader.vue";
import BottomNav from "@/components/dashboard/BottomNav.vue";

import { supabase } from "@/supabaseClient";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/jsvectormap.css";
import "jsvectormap/dist/maps/world.js";

const route = useRoute();

const mapRef = ref(null);
let mapInstance = null;

const championCountries = ref([]);
const groupWinnerVotes = ref({});
const groupCatalog = ref({});
const selectedGroup = ref("A");
const showAllChampionCountries = ref(false);
const matchAccuracy = ref([]);
const surpriseMatches = ref([]);

const countryCatalog = {
  mx: { name: "México", color: "#006341" },
  za: { name: "Sudáfrica", color: "#16a34a" },
  kr: { name: "Corea del Sur", color: "#ef4444" },
  cz: { name: "Chequia", color: "#2563eb" },
  ca: { name: "Canadá", color: "#dc2626" },
  ba: { name: "Bosnia y Herzegovina", color: "#2563eb" },
  qa: { name: "Qatar", color: "#7f1d1d" },
  ch: { name: "Suiza", color: "#dc2626" },
  br: { name: "Brasil", color: "#FEDF00" },
  ma: { name: "Marruecos", color: "#dc2626" },
  ht: { name: "Haití", color: "#2563eb" },
  "gb-sct": { name: "Escocia", color: "#2563eb" },
  us: { name: "Estados Unidos", color: "#2563eb" },
  py: { name: "Paraguay", color: "#dc2626" },
  au: { name: "Australia", color: "#1d4ed8" },
  tr: { name: "Turquía", color: "#dc2626" },
  de: { name: "Alemania", color: "#D71016" },
  cw: { name: "Curazao", color: "#2563eb" },
  ci: { name: "Costa de Marfil", color: "#ea580c" },
  ec: { name: "Ecuador", color: "#ffd100" },
  nl: { name: "Países Bajos", color: "#ea580c" },
  jp: { name: "Japón", color: "#dc2626" },
  se: { name: "Suecia", color: "#eab308" },
  tn: { name: "Túnez", color: "#dc2626" },
  be: { name: "Bélgica", color: "#facc15" },
  eg: { name: "Egipto", color: "#111827" },
  ir: { name: "Irán", color: "#16a34a" },
  nz: { name: "Nueva Zelanda", color: "#111827" },
  es: { name: "España", color: "#AA151B" },
  cv: { name: "Cabo Verde", color: "#2563eb" },
  sa: { name: "Arabia Saudita", color: "#16a34a" },
  uy: { name: "Uruguay", color: "#06b6d4" },
  fr: { name: "Francia", color: "#013896" },
  sn: { name: "Senegal", color: "#16a34a" },
  iq: { name: "Irak", color: "#dc2626" },
  no: { name: "Noruega", color: "#dc2626" },
  ar: { name: "Argentina", color: "#75aadb" },
  dz: { name: "Argelia", color: "#16a34a" },
  at: { name: "Austria", color: "#dc2626" },
  jo: { name: "Jordania", color: "#111827" },
  pt: { name: "Portugal", color: "#046A38" },
  cd: { name: "RD Congo", color: "#2563eb" },
  uz: { name: "Uzbekistán", color: "#38bdf8" },
  co: { name: "Colombia", color: "#facc15" },
  "gb-eng": { name: "Inglaterra", color: "#f8fafc" },
  hr: { name: "Croacia", color: "#dc2626" },
  gh: { name: "Ghana", color: "#facc15" },
  pa: { name: "Panamá", color: "#2563eb" },
};

const mapCodeOverrides = {
  "gb-eng": "GB",
  "gb-sct": "GB",
};

const validGroups = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
];

const getLeagueId = () => {
  const leagueId = route.query.ligaId || localStorage.getItem("ligaIdActiva");

  if (route.query.ligaId) {
    localStorage.setItem("ligaIdActiva", route.query.ligaId);
  }

  return leagueId;
};

const getEventId = () =>
  route.query.eventoId || localStorage.getItem("eventoIdActiva");

const getFlagCode = (team) => {
  const flagCodes = {
    México: "mx",
    Sudáfrica: "za",
    "Corea del Sur": "kr",
    "República Checa": "cz",
    Chequia: "cz",
    Canadá: "ca",
    "Bosnia y Herzegovina": "ba",
    "Estados Unidos": "us",
    Paraguay: "py",
    Qatar: "qa",
    Suiza: "ch",
    Brasil: "br",
    Marruecos: "ma",
    Haití: "ht",
    Escocia: "gb-sct",
    Australia: "au",
    Turquía: "tr",
    Alemania: "de",
    Curacao: "cw",
    Curazao: "cw",
    "Países Bajos": "nl",
    Japón: "jp",
    "Costa de Marfil": "ci",
    Ecuador: "ec",
    Suecia: "se",
    Túnez: "tn",
    España: "es",
    "Cabo Verde": "cv",
    Bélgica: "be",
    Egipto: "eg",
    "Arabia Saudita": "sa",
    Uruguay: "uy",
    Irán: "ir",
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
    "RD del Congo": "cd",
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

/* =========================
   GRUPOS
========================= */

const availableGroups = computed(() =>
  Object.keys(groupCatalog.value).sort((a, b) =>
    String(a).localeCompare(String(b), undefined, { numeric: true }),
  ),
);

const selectedGroupTeams = computed(() => {
  const teamsFromCatalog = groupCatalog.value[selectedGroup.value] || [];
  const votesByTeam = groupWinnerVotes.value[selectedGroup.value] || [];

  const votesMap = new Map(votesByTeam.map((team) => [team.name, team.votes]));

  const total = votesByTeam.reduce((sum, team) => sum + team.votes, 0);

  return teamsFromCatalog
    .map((teamName) => {
      const votes = votesMap.get(teamName) || 0;
      const flag = getFlagCode(teamName);

      return {
        code: flag,
        flag,
        name: teamName,
        votes,
        percentage: total ? Math.round((votes / total) * 100) : 0,
      };
    })
    .sort((a, b) => b.percentage - a.percentage);
});

const loadGroupCatalog = async () => {
  const eventId = getEventId();

  if (!eventId) return;

  const { data, error } = await supabase
    .from("matches")
    .select("group_name, home_team, away_team")
    .eq("event_id", eventId);

  if (error) {
    console.error("Error cargando catálogo de grupos:", error);
    return;
  }

  const grouped = {};

  (data || []).forEach((match) => {
    const group = match.group_name?.replace(/Grupo /i, "").trim();

    if (!group) return;

    if (!validGroups.includes(group)) return;

    if (!grouped[group]) grouped[group] = new Set();

    if (match.home_team) grouped[group].add(match.home_team);
    if (match.away_team) grouped[group].add(match.away_team);
  });

  groupCatalog.value = Object.fromEntries(
    Object.entries(grouped).map(([group, teams]) => [group, [...teams].sort()]),
  );

  if (groupCatalog.value.A) {
    selectedGroup.value = "A";
  } else if (availableGroups.value.length) {
    selectedGroup.value = availableGroups.value[0];
  }
};

const loadGroupWinnerVotes = async () => {
  const leagueId = getLeagueId();

  if (!leagueId) return;

  const { data, error } = await supabase
    .from("predictions")
    .select(
      `
      home_score,
      away_score,
      matches (
        group_name,
        home_team,
        away_team
      )
    `,
    )
    .eq("league_id", leagueId)
    .not("home_score", "is", null)
    .not("away_score", "is", null);

  if (error) {
    return;
  }

  const grouped = {};

  (data || []).forEach((prediction) => {
    const match = prediction.matches;

    if (!match) return;

    const group = match.group_name?.replace(/Grupo /i, "").trim();

    if (!group) return;

    const homeScore = Number(prediction.home_score);
    const awayScore = Number(prediction.away_score);

    if (homeScore === awayScore) return;

    const winnerName =
      homeScore > awayScore ? match.home_team : match.away_team;

    const flag = getFlagCode(winnerName);

    if (!grouped[group]) grouped[group] = {};

    if (!grouped[group][winnerName]) {
      grouped[group][winnerName] = {
        code: flag,
        flag,
        name: winnerName,
        votes: 0,
      };
    }
    grouped[group][winnerName].votes += 1;
  });

  groupWinnerVotes.value = Object.fromEntries(
    Object.entries(grouped).map(([group, teams]) => [
      group,
      Object.values(teams).sort((a, b) => b.votes - a.votes),
    ]),
  );
};
//////////////////PREDICTIONS/////////////////////////////////
const finishedMatchesAccuracy = computed(() =>
  matchAccuracy.value.filter((match) => match.total_predictions > 0),
);

const hardestMatch = computed(() => {
  return (
    [...finishedMatchesAccuracy.value].sort(
      (a, b) => a.accuracy - b.accuracy,
    )[0] || null
  );
});

const easiestMatch = computed(() => {
  return (
    [...finishedMatchesAccuracy.value].sort(
      (a, b) => b.accuracy - a.accuracy,
    )[0] || null
  );
});
//////////////////SURPRISE TEAM//////////////////////////////
const surpriseTeam = computed(() => surpriseMatches.value[0] || null);
const loadSurpriseTeam = async () => {
  const leagueId = getLeagueId();

  if (!leagueId) return;

  const { data, error } = await supabase
    .from("predictions")
    .select(
      `
      home_score,
      away_score,
      matches (
        id,
        group_name,
        home_team,
        away_team,
        home_score,
        away_score
      )
    `,
    )
    .eq("league_id", leagueId)
    .not("home_score", "is", null)
    .not("away_score", "is", null);

  if (error) {
    console.error("Error cargando equipo sorpresa:", error);
    return;
  }

  const grouped = {};

  (data || []).forEach((prediction) => {
    const match = prediction.matches;

    if (!match) return;
    if (match.home_score === null || match.away_score === null) return;

    const matchId = match.id;

    if (!grouped[matchId]) {
      grouped[matchId] = {
        match_id: matchId,
        group_name: match.group_name,
        home_team: match.home_team,
        away_team: match.away_team,
        home_flag: getFlagCode(match.home_team),
        away_flag: getFlagCode(match.away_team),
        real_home_score: Number(match.home_score),
        real_away_score: Number(match.away_score),
        total_predictions: 0,
        home_favorite_votes: 0,
        away_favorite_votes: 0,
        draw_votes: 0,
        exact_predictions: 0,
        result_predictions: 0,
      };
    }

    grouped[matchId].total_predictions += 1;

    const predictedHome = Number(prediction.home_score);
    const predictedAway = Number(prediction.away_score);

    const realHome = grouped[matchId].real_home_score;
    const realAway = grouped[matchId].real_away_score;

    const isExact = predictedHome === realHome && predictedAway === realAway;

    if (isExact) {
      grouped[matchId].exact_predictions += 1;
    }

    const predictedResult =
      predictedHome > predictedAway
        ? "HOME"
        : predictedAway > predictedHome
          ? "AWAY"
          : "DRAW";

    const realResult =
      realHome > realAway ? "HOME" : realAway > realHome ? "AWAY" : "DRAW";

    if (predictedResult === realResult) {
      grouped[matchId].result_predictions += 1;
    }

    if (predictedHome > predictedAway) {
      grouped[matchId].home_favorite_votes += 1;
    } else if (predictedAway > predictedHome) {
      grouped[matchId].away_favorite_votes += 1;
    } else {
      grouped[matchId].draw_votes += 1;
    }
  });
  const surprises = Object.values(grouped)
    .map((match) => {
      const homeWon = match.real_home_score > match.real_away_score;
      const awayWon = match.real_away_score > match.real_home_score;
      const draw = match.real_home_score === match.real_away_score;

      const total = match.total_predictions || 0;

      const resultVotes = homeWon
        ? match.home_favorite_votes
        : awayWon
          ? match.away_favorite_votes
          : match.draw_votes;

      const resultPercentage = total
        ? Math.round((resultVotes / total) * 100)
        : 0;

      const exactPercentage = total
        ? Math.round((match.exact_predictions / total) * 100)
        : 0;

      return {
        ...match,
        team: homeWon
          ? match.home_team
          : awayWon
            ? match.away_team
            : match.home_favorite_votes <= match.away_favorite_votes
              ? match.home_team
              : match.away_team,

        flag: homeWon
          ? match.home_flag
          : awayWon
            ? match.away_flag
            : match.home_favorite_votes <= match.away_favorite_votes
              ? match.home_flag
              : match.away_flag,

        type: draw ? "Empate inesperado" : "Victoria inesperada",

        result_predictions: resultVotes,
        result_percentage: resultPercentage,
        exact_percentage: exactPercentage,

        home_favorite_percentage: total
          ? Math.round((match.home_favorite_votes / total) * 100)
          : 0,

        away_favorite_percentage: total
          ? Math.round((match.away_favorite_votes / total) * 100)
          : 0,

        draw_percentage: total
          ? Math.round((match.draw_votes / total) * 100)
          : 0,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      return (
        a.result_percentage - b.result_percentage ||
        a.exact_percentage - b.exact_percentage ||
        a.result_predictions - b.result_predictions
      );
    });
  surpriseMatches.value = surprises;
};

//////////////////CHAMPIONSHIP///////////////////////////////
const loadChampionCountries = async () => {
  const leagueId = getLeagueId();

  if (!leagueId) return;

  const { data: picks, error } = await supabase
    .from("league_members")
    .select("user_id, champion_team")
    .eq("league_id", leagueId)
    .not("champion_team", "is", null);

  if (error) {
    console.error("Error cargando campeones:", error);
    return;
  }

  const grouped = {};

  (picks || []).forEach((item) => {
    const rawCode = item.champion_team?.toLowerCase();

    if (!rawCode) return;

    if (!grouped[rawCode]) {
      grouped[rawCode] = { votes: 0 };
    }

    grouped[rawCode].votes += 1;
  });

  championCountries.value = Object.entries(grouped).map(([rawCode, info]) => {
    const country = countryCatalog[rawCode];

    return {
      code: mapCodeOverrides[rawCode] || rawCode.toUpperCase(),
      rawCode,
      flag: rawCode,
      name: country?.name ?? rawCode.toUpperCase(),
      color: country?.color ?? "#64748b",
      votes: info.votes,
    };
  });
};

const totalVotes = computed(() =>
  championCountries.value.reduce((total, country) => total + country.votes, 0),
);

const countriesWithPercentages = computed(() =>
  championCountries.value
    .map((country) => ({
      ...country,
      percentage: totalVotes.value
        ? Math.round((country.votes / totalVotes.value) * 100)
        : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage),
);

const visibleChampionCountries = computed(() => {
  return showAllChampionCountries.value
    ? countriesWithPercentages.value
    : countriesWithPercentages.value.slice(0, 4);
});

const donutSlices = computed(() => {
  let offset = 25;

  return countriesWithPercentages.value.map((country) => {
    const slice = {
      ...country,
      offset,
    };

    offset -= country.percentage;

    return slice;
  });
});

const countryColors = computed(() =>
  championCountries.value.reduce((colors, country) => {
    if (country.votes > 0) {
      colors[country.code] = country.color;
    }

    return colors;
  }, {}),
);

//////////////////////////MAPA///////////////////////////

const getCountryRegions = (code) => {
  if (!mapRef.value) return [];

  return Array.from(mapRef.value.querySelectorAll(`path[data-code="${code}"]`));
};

const getMainRegion = (regions) => {
  return regions.reduce((largest, region) => {
    const regionBox = region.getBBox();
    const largestBox = largest.getBBox();

    const regionArea = regionBox.width * regionBox.height;
    const largestArea = largestBox.width * largestBox.height;

    return regionArea > largestArea ? region : largest;
  });
};

const resetRegions = (regions) => {
  regions.forEach((region) => {
    region.style.setProperty("fill", "#1f2b38", "important");
    region.style.setProperty("stroke", "#0f172a", "important");
    region.style.setProperty("stroke-width", "0.5", "important");
  });
};

const paintCountry = (code, color) => {
  const regions = getCountryRegions(code);

  if (!regions.length) return;

  resetRegions(regions);

  const regionToPaint = getMainRegion(regions);

  regionToPaint.style.setProperty("fill", color, "important");
  regionToPaint.style.setProperty(
    "stroke",
    "rgba(255, 255, 255, 0.45)",
    "important",
  );
  regionToPaint.style.setProperty("stroke-width", "1", "important");
};

const paintSelectedCountries = () => {
  Object.entries(countryColors.value).forEach(([code, color]) => {
    paintCountry(code, color);
  });
};

const initMap = async () => {
  await nextTick();

  if (!mapRef.value) return;

  mapInstance = new jsVectorMap({
    selector: mapRef.value,
    map: "world",
    backgroundColor: "transparent",
    zoomButtons: false,
    zoomOnScroll: false,

    regionStyle: {
      initial: {
        fill: "#1f2b38",
        stroke: "#0f172a",
        strokeWidth: 0.5,
      },
      hover: {
        fill: "#334155",
      },
    },

    onRegionTooltipShow(event, tooltip, code) {
      const country = countriesWithPercentages.value.find(
        (item) => item.code === code,
      );

      if (!country) return;

      tooltip.text(
        `${country.name}: ${country.votes} votos (${country.percentage}%)`,
      );
    },
  });

  setTimeout(paintSelectedCountries, 300);
  setTimeout(paintSelectedCountries, 800);
};

const loadMatchAccuracy = async () => {
  const leagueId = getLeagueId();

  if (!leagueId) return;

  const { data, error } = await supabase
    .from("predictions")
    .select(
      `
      home_score,
      away_score,
      matches (
        id,
        group_name,
        home_team,
        away_team,
        home_score,
        away_score
      )
    `,
    )
    .eq("league_id", leagueId)
    .not("home_score", "is", null)
    .not("away_score", "is", null);

  if (error) {
    console.error("Error cargando dificultad por partido:", error);
    return;
  }

  const grouped = {};

  (data || []).forEach((prediction) => {
    const match = prediction.matches;

    if (!match) return;
    if (match.home_score === null || match.away_score === null) return;

    const matchId = match.id;

    if (!grouped[matchId]) {
      grouped[matchId] = {
        match_id: matchId,
        group_name: match.group_name,
        home_team: match.home_team,
        away_team: match.away_team,
        home_flag: getFlagCode(match.home_team),
        away_flag: getFlagCode(match.away_team),
        real_home_score: Number(match.home_score),
        real_away_score: Number(match.away_score),
        total_predictions: 0,
        correct_predictions: 0,
      };
    }

    grouped[matchId].total_predictions += 1;

    const isExact =
      Number(prediction.home_score) === Number(match.home_score) &&
      Number(prediction.away_score) === Number(match.away_score);

    if (isExact) {
      grouped[matchId].correct_predictions += 1;
    }
  });

  matchAccuracy.value = Object.values(grouped).map((match) => ({
    ...match,
    accuracy: match.total_predictions
      ? Math.round((match.correct_predictions / match.total_predictions) * 100)
      : 0,
  }));
};

onMounted(async () => {
  await loadChampionCountries();
  await loadGroupCatalog();
  await loadGroupWinnerVotes();
  await loadMatchAccuracy();
  await loadSurpriseTeam();
  await initMap();
});

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.destroy();
    mapInstance = null;
  }
});
</script>
<style scoped>
.champion-card {
  background: rgba(25, 135, 84, 0.1);
  border: 1px solid rgba(25, 135, 84, 0.5) !important;
}

.champion-donut {
  width: 130px;
  height: 130px;
  position: relative;
  display: grid;
  place-items: center;
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(34, 197, 94, 0.12);
}

.champion-donut-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.champion-donut-slice {
  transition:
    opacity 0.2s ease,
    filter 0.2s ease;
}

.champion-donut-slice:hover {
  opacity: 0.95;
  filter: brightness(1.15);
}

.champion-donut-center {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: #000;
  display: grid;
  place-items: center;
  text-align: center;
  position: absolute;
  padding: 0.4rem;
}

.champion-donut-center h2 {
  font-size: 1.55rem;
  line-height: 1;
}

.champion-country-row {
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.04);
}

.world-map-wrapper {
  min-height: 300px;
  background: transparent;
}

:deep(.jvm-container) {
  background-color: transparent !important;
}

:deep(.jvm-region) {
  transition: fill 0.2s ease;
}

:deep(.jvm-tooltip) {
  background: #000;
  border: 1px solid rgba(25, 135, 84, 0.45);
  color: #fff;
  border-radius: 0.75rem;
  padding: 0.65rem 0.8rem;
  font-size: 0.8rem;
}

@media (max-width: 991.98px) {
  .world-map-wrapper {
    min-height: 280px;
  }

  .champion-donut {
    width: 150px;
    height: 150px;
  }

  .champion-donut-center {
    width: 70px;
    height: 70px;
  }

  .champion-donut-center h2 {
    font-size: 1.35rem;
  }
}

@media (max-width: 575.98px) {
  .world-map-wrapper {
    min-height: 230px;
  }

  .champion-donut {
    width: 140px;
    height: 140px;
  }

  .champion-donut-center {
    width: 64px;
    height: 64px;
  }

  .champion-donut-center h2 {
    font-size: 1.2rem;
  }
}
</style>
