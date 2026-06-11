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

                    <div class="row g-4 align-items-start">
                      <!-- Dona + lista -->
                      <div class="col-12 col-lg-4">
                        <div class="text-center mb-4">
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
                            v-for="country in countriesWithPercentages"
                            :key="country.rawCode"
                            class="champion-country-row rounded-3 p-2"
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
                    class="card champion-card text-white rounded-4 border border-success border-opacity-25 p-3 p-md-4 h-100"
                  >
                    <div class="mb-4">
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
                      class="d-flex flex-column gap-3"
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

const countryCatalog = {
  mx: { name: "México", color: "#16a34a" },
  za: { name: "Sudáfrica", color: "#16a34a" },
  kr: { name: "Corea del Sur", color: "#ef4444" },
  cz: { name: "Chequia", color: "#2563eb" },
  ca: { name: "Canadá", color: "#dc2626" },
  ba: { name: "Bosnia y Herzegovina", color: "#2563eb" },
  qa: { name: "Qatar", color: "#7f1d1d" },
  ch: { name: "Suiza", color: "#dc2626" },
  br: { name: "Brasil", color: "#22c55e" },
  ma: { name: "Marruecos", color: "#dc2626" },
  ht: { name: "Haití", color: "#2563eb" },
  "gb-sct": { name: "Escocia", color: "#2563eb" },
  us: { name: "Estados Unidos", color: "#2563eb" },
  py: { name: "Paraguay", color: "#dc2626" },
  au: { name: "Australia", color: "#1d4ed8" },
  tr: { name: "Turquía", color: "#dc2626" },
  de: { name: "Alemania", color: "#111827" },
  cw: { name: "Curazao", color: "#2563eb" },
  ci: { name: "Costa de Marfil", color: "#ea580c" },
  ec: { name: "Ecuador", color: "#eab308" },
  nl: { name: "Países Bajos", color: "#ea580c" },
  jp: { name: "Japón", color: "#dc2626" },
  se: { name: "Suecia", color: "#eab308" },
  tn: { name: "Túnez", color: "#dc2626" },
  be: { name: "Bélgica", color: "#facc15" },
  eg: { name: "Egipto", color: "#111827" },
  ir: { name: "Irán", color: "#16a34a" },
  nz: { name: "Nueva Zelanda", color: "#111827" },
  es: { name: "España", color: "#facc15" },
  cv: { name: "Cabo Verde", color: "#2563eb" },
  sa: { name: "Arabia Saudita", color: "#16a34a" },
  uy: { name: "Uruguay", color: "#06b6d4" },
  fr: { name: "Francia", color: "#2563eb" },
  sn: { name: "Senegal", color: "#16a34a" },
  iq: { name: "Irak", color: "#dc2626" },
  no: { name: "Noruega", color: "#dc2626" },
  ar: { name: "Argentina", color: "#38bdf8" },
  dz: { name: "Argelia", color: "#16a34a" },
  at: { name: "Austria", color: "#dc2626" },
  jo: { name: "Jordania", color: "#111827" },
  pt: { name: "Portugal", color: "#16a34a" },
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

onMounted(async () => {
  await loadChampionCountries();
  await loadGroupCatalog();
  await loadGroupWinnerVotes();
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
  width: 165px;
  height: 165px;
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
  background: rgba(255, 255, 255, 0.04);
}

.world-map-wrapper {
  min-height: 360px;
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
