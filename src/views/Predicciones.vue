<template>
  <div class="bg-black min-vh-100 text-white overflow-hidden pb-5 pb-lg-0">
    <Header />    
    <div class="container-fluid px-3 py-3">
      <div class="row g-0 h-100">
        <aside
          class="d-none d-lg-block col-lg-3 col-xl-2 vh-100 overflow-hidden"
        >
          <Sidebar />
        </aside>

        <main
          class="col-12 col-lg-9 col-xl-10 vh-100 overflow-hidden px-0 pt-3 pb-5 pb-lg-1"
        >
          <section
            class="container-fluid h-100 d-flex flex-column overflow-hidden"
          >
            <div class="sticky-top bg-black z-3">
              <div
                class="d-flex justify-content-between align-items-start flex-wrap gap-3"
              >
                <div>
                  <h2 class="fw-bold mb-1">
                    Mis predicciones :
                    <span
                      v-if="
                        nombreLigaActiva && nombreLigaActiva !== 'Mi Quiniela'
                      "
                      class="text-gold ms-2"
                    >
                      {{ nombreLigaActiva }}
                    </span>
                  </h2>
                  <p class="text-white-50 mb-0">
                    Realiza tus predicciones para sumar puntos y escalar
                    posiciones.
                  </p>
                </div>
                <div class="mt-2 d-none d-md-block">
                  <UserProfile />
                </div>
              </div>

              <div
                class="d-flex justify-content-between align-items-center gap-3 mb-4"
              >
                <div
                  class="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2 ms-lg-auto"
                >
                  <select
                    v-model="filterType"
                    class="form-select bg-dark text-white border-success w-auto"
                  >
                    <option value="group">Filtrar por grupo</option>
                    <option value="team">Filtrar por selección</option>
                  </select>

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

              <div class="card prediction-card text-white rounded-4 mb-4">
                <div class="card-body">
                  <div
                    class="d-flex justify-content-between align-items-center flex-wrap gap-3"
                  >
                    <div>
                      <strong
                        >Primera fase
                        <span class="text-success"
                          >· {{ nombreLigaActiva }}</span
                        ></strong
                      >
                      <p class="text-white-50 mb-0">
                        <strong>Recuerda:</strong> Solo se contabilizan las
                        predicciones realizadas con al menos 10 minutos antes del
                        inicio de cada partido.
                      </p>
                    </div>

                    <div class="d-flex align-items-center gap-3">
                      <div class="progress" style="width: 180px; height: 8px">
                        <div
                          class="progress-bar bg-success"
                          :style="{ width: progressPercentage + '%' }"
                        ></div>
                      </div>
                      <strong
                        >{{ savedMatches.length }}/{{
                          filteredMatches.length
                        }}</strong
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="flex-grow-1 overflow-auto overflow-x-hidden pb-4 scroll-clean"
            >
              <div v-if="cargando" class="text-center py-5">
                <div class="spinner-border text-success" role="status"></div>
                <p class="mt-2 text-white-50">Cargando partidos...</p>
              </div>

              <div
                v-else
                v-for="grupo in partidosAgrupados"
                :key="grupo.fecha"
                class="mb-5"
              >
                <h4
                  class="text-white mb-3 fw-bold border-start border-success border-4 ps-2 ms-1"
                >
                  📅 {{ formatDate(grupo.fecha) }}
                </h4>

                <div class="row g-3">
                  <div
                    v-for="match in grupo.partidos"
                    :key="match.id"
                    class="col-12 col-lg-6"
                  >
                    <div
                      class="card prediction-card text-white rounded-4 h-100"
                      :class="{ 'card-locked': esPartidoBloqueado(match) }"
                    >
                      <div class="card-body">
                        <div class="text-center mb-3">
                          <small class="text-white-50 fw-semibold"
                            >Grupo {{ match.group }}</small
                          >
                        </div>

                        <div
                          class="d-flex align-items-center justify-content-center gap-4"
                        >
                          <div class="d-flex align-items-center gap-2">
                            <div
                              class="d-flex align-items-center justify-content-end gap-2"
                            >
                              <span class="fw-bold text-end team-name">{{
                                match.homeTeam
                              }}</span>
                              <img
                                :src="`https://flagcdn.com/w80/${getFlagCode(match.homeTeam)}.png`"
                                :alt="match.homeTeam"
                                class="team-flag"
                              />

                              <input
                                v-model="match.homeScore"
                                type="number"
                                min="0"
                                max="15"
                                class="form-control bg-dark border-success text-center fw-bold score-input"
                                :class="
                                  match.saved ? 'text-success' : 'text-warning'
                                "
                                placeholder="-"
                                :disabled="esPartidoBloqueado(match)"
                                @change="guardarPronostico(match)"
                              />
                            </div>
                          </div>

                          <div
                            class="fw-bold fs-3"
                            :class="{
                              'text-white-50': esPartidoBloqueado(match),
                            }"
                          >
                            {{ match.time }}
                          </div>

                          <div
                            class="d-flex align-items-center justify-content-start gap-2"
                          >
                            <input
                              v-model="match.awayScore"
                              type="number"
                              min="0"
                              max="15"
                              class="form-control bg-dark border-success text-center fw-bold score-input"
                              :class="
                                match.saved ? 'text-success' : 'text-warning'
                              "
                              placeholder="-"
                              :disabled="esPartidoBloqueado(match)"
                              @change="guardarPronostico(match)"
                            />
                            <img
                              :src="`https://flagcdn.com/w80/${getFlagCode(match.awayTeam)}.png`"
                              :alt="match.awayTeam"
                              class="team-flag"
                            />
                            <span class="fw-bold text-start team-name">{{
                              match.awayTeam
                            }}</span>
                          </div>
                        </div>

                        <div class="text-center mt-3">
                          <span
                            class="badge"
                            :class="
                              esPartidoBloqueado(match)
                                ? 'bg-danger-subtle text-danger border border-danger'
                                : match.saved
                                  ? 'text-bg-success'
                                  : 'text-bg-warning'
                            "
                          >
                            {{
                              esPartidoBloqueado(match)
                                ? "Bloqueado 🔒"
                                : match.saved
                                  ? "Guardada ✓"
                                  : "Pendiente"
                            }}
                          </span>
                        </div>

                        <div class="text-center mt-2">
                          <small class="text-white-50"
                            >{{ match.stadium }} · {{ match.city }}</small
                          >
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
import { computed, ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "@/supabaseClient";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import UserProfile from "@/components/common/UserProfile.vue";
import BottomNav from "@/components/dashboard/BottomNav.vue";

const route = useRoute();
const filterType = ref("group");
const selectedGroup = ref("Todos");
const selectedTeam = ref("Todas");
const cargando = ref(true);

const userId = ref(null);

const idLigaActiva = ref(route.query.ligaId || localStorage.getItem("ligaIdActiva") || null);
const nombreLigaActiva = ref(route.query.ligaNombre || localStorage.getItem("ligaNombreActiva") || "Mi Quiniela");
// 1. Atrapamos el eventoId de la URL o la caché
const eventoIdActiva = ref(
  route.query.eventoId || localStorage.getItem("eventoIdActiva") || null
);

// 2. Lo guardamos en caché junto con los otros
if (eventoIdActiva.value && eventoIdActiva.value !== "null") {
  localStorage.setItem("eventoIdActiva", eventoIdActiva.value);
}

if (idLigaActiva.value && idLigaActiva.value !== "null") {
  localStorage.setItem("ligaIdActiva", idLigaActiva.value);
  localStorage.setItem("ligaNombreActiva", nombreLigaActiva.value);
}

const matches = ref([]);

// --- NUEVA VARIABLE: Desfase de tiempo ---
const timeOffset = ref(0);

// --- NUEVA FUNCIÓN: Obtener la hora real de internet ---
const sincronizarHoraReal = async () => {
  try {
    // Consultamos un servidor de tiempo confiable (WorldTimeAPI)
    const response = await fetch("https://worldtimeapi.org/api/timezone/America/Mexico_City");
    const data = await response.json();
    
    // Hora real del servidor vs Hora tramposa/local de la PC
    const horaReal = new Date(data.datetime).getTime();
    const horaLocal = new Date().getTime();
    
    // Guardamos la diferencia
    timeOffset.value = horaReal - horaLocal;
  } catch (error) {
    console.warn("No se pudo sincronizar con el servidor de tiempo, usando hora local.", error);
  }
};

const normalizarFecha = (fechaTexto) => {
  if (!fechaTexto) return "9999-99-99";
  const partes = fechaTexto.includes("/")
    ? fechaTexto.split("/")
    : fechaTexto.split("-");
  if (partes.length === 3 && partes[0].length <= 2) {
    return `${partes[2]}-${partes[1].padStart(2, "0")}-${partes[0].padStart(2, "0")}`;
  }
  return fechaTexto;
};

const cargarPartidosYPredicciones = async () => {
  cargando.value = true;
  try {
    if (!userId.value) {
      console.warn("No hay sesión activa.");
      return;
    }

    // const { data: dbMatches, error: errMatches } = await supabase
    //   .from("matches")
    //   .select("*");
    // if (errMatches) throw errMatches;

    const { data: dbMatches, error: errMatches } = await supabase
      .from("matches")
      .select("*")
      .eq("event_id", eventoIdActiva.value); 

    if (errMatches) throw errMatches;    

    dbMatches.sort((a, b) => {
      const fechaNormalA = normalizarFecha(a.match_date);
      const fechaNormalB = normalizarFecha(b.match_date);

      if (fechaNormalA === "9999-99-99") return 1;
      if (fechaNormalB === "9999-99-99") return -1;

      const dateA = new Date(`${fechaNormalA}T${a.match_time || "00:00"}`).getTime();
      const dateB = new Date(`${fechaNormalB}T${b.match_time || "00:00"}`).getTime();

      return dateA - dateB;
    });

    let misPredicciones = [];
    if (idLigaActiva.value && idLigaActiva.value !== "null") {
      const { data: preds, error: errPreds } = await supabase
        .from("predictions")
        .select("*")
        .eq("user_id", userId.value)
        .eq("league_id", idLigaActiva.value);

      if (errPreds) throw errPreds;
      misPredicciones = preds || [];
    }

    matches.value = dbMatches.map((partidoBD) => {
      const pronosticoGuardado = misPredicciones.find(
        (p) => p.match_id === partidoBD.id,
      );

      let nombreGrupo = partidoBD.group_name || "";
      nombreGrupo = nombreGrupo.replace(/Grupo /i, "").trim();

      let fechaLimpia = normalizarFecha(partidoBD.match_date);

      return {
        id: partidoBD.id,
        date: fechaLimpia !== "9999-99-99" ? fechaLimpia : "Fecha por definir",
        time: partidoBD.match_time || "00:00",
        homeTeam: partidoBD.home_team,
        awayTeam: partidoBD.away_team,
        group: nombreGrupo,
        stadium: partidoBD.stadium,
        city: partidoBD.city || "",
        homeScore: pronosticoGuardado ? pronosticoGuardado.home_score : "",
        awayScore: pronosticoGuardado ? pronosticoGuardado.away_score : "",
        saved: !!pronosticoGuardado,
      };
    });
  } catch (error) {
    console.error("Error al cargar datos:", error);
  } finally {
    cargando.value = false;
  }
};

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    userId.value = session.user.id;
  }

  // 1. Sincronizamos la hora apenas entra a la pantalla
  await sincronizarHoraReal();

  if (userId.value && idLigaActiva.value && idLigaActiva.value !== "null") {
    await cargarPartidosYPredicciones();
  } else {
    cargando.value = false;
  }
});

// watch(
//   () => route.query.ligaId,
//   async (newId) => {
//     if (newId && newId !== "null") {
//       idLigaActiva.value = newId;

//       nombreLigaActiva.value = route.query.ligaNombre || localStorage.getItem("ligaNombreActiva") || "Mi Quiniela";

//       localStorage.setItem("ligaIdActiva", newId);
//       localStorage.setItem("ligaNombreActiva", nombreLigaActiva.value);

//       if (userId.value) {
//         await cargarPartidosYPredicciones();
//       }
//     }
//   },
//   { immediate: false },
// );

watch(
  () => route.query.ligaId,
  async (newId) => {
    if (newId && newId !== "null") {
      idLigaActiva.value = newId;
      nombreLigaActiva.value = route.query.ligaNombre || localStorage.getItem("ligaNombreActiva") || "Mi Quiniela";
      
      // 👇 Actualizamos el evento en el watch
      eventoIdActiva.value = route.query.eventoId || localStorage.getItem("eventoIdActiva") || null;

      localStorage.setItem("ligaIdActiva", newId);
      localStorage.setItem("ligaNombreActiva", nombreLigaActiva.value);
      if (eventoIdActiva.value) localStorage.setItem("eventoIdActiva", eventoIdActiva.value);

      if (userId.value) {
        await cargarPartidosYPredicciones();
      }
    }
  },
  { immediate: false },
);

// --- VALIDACIÓN BLINDADA CONTRA TRAMPAS ---
const esPartidoBloqueado = (match) => {
  if (!match.date || !match.time || match.date === "Fecha por definir") return false;

  const fechaPartido = new Date(`${match.date}T${match.time}`);
  
  // Le sumamos a su reloj local la diferencia real que sacamos de internet
  const ahoraReal = new Date(new Date().getTime() + timeOffset.value);

  const limiteDeApuesta = fechaPartido.getTime() - 10 * 60 * 1000;

  return ahoraReal.getTime() >= limiteDeApuesta;
};

const guardarPronostico = async (match) => {
  if (!idLigaActiva.value || idLigaActiva.value === "null") {
    alert("Error: No se detectó la liga. Por favor regresa a 'Mis Ligas' y vuelve a entrar.");
    match.saved = false;
    return;
  }

  if (!userId.value) {
    alert("Error: Usuario no autenticado.");
    match.saved = false;
    return;
  }

  // Validamos nuevamente antes de ir a base de datos usando la hora sincronizada
  if (esPartidoBloqueado(match)) {
    alert("¡Estás intentando hacer trampa! Este partido ya está bloqueado según la hora oficial.");
    await cargarPartidosYPredicciones();
    return;
  }

  if (
    match.homeScore === "" ||
    match.homeScore === null ||
    match.awayScore === "" ||
    match.awayScore === null
  ) {
    match.saved = false;
    return;
  }

  try {
    const { error } = await supabase.from("predictions").upsert(
      {
        user_id: userId.value,
        match_id: match.id,
        league_id: idLigaActiva.value,
        home_score: parseInt(match.homeScore),
        away_score: parseInt(match.awayScore),
      },
      {
        onConflict: "user_id, match_id, league_id",
      },
    );

    if (error) {
      console.error("Error al guardar pronóstico:", error);
      match.saved = false;
    } else {
      match.saved = true;
    }
  } catch (error) {
    console.error("Error inesperado:", error);
    match.saved = false;
  }
};

const teams = computed(() => {
  const allTeams = matches.value.flatMap((match) => [
    match.homeTeam,
    match.awayTeam,
  ]);
  return [...new Set(allTeams)].sort();
});

// const groups = computed(() => {
//   return [...new Set(matches.value.map((match) => match.group))].sort();
// });

const groups = computed(() => {
  return [...new Set(matches.value.map((match) => match.group))].sort((a, b) => {
    // localeCompare con 'numeric: true' entiende que el 10 es mayor que el 9
    return String(a).localeCompare(String(b), undefined, { numeric: true });
  });
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

const partidosAgrupados = computed(() => {
  const gruposObj = filteredMatches.value.reduce((grupos, match) => {
    const fecha = match.date;
    if (!grupos[fecha]) {
      grupos[fecha] = [];
    }
    grupos[fecha].push(match);
    return grupos;
  }, {});

  return Object.keys(gruposObj)
    .sort((a, b) => {
      if (a === "Fecha por definir") return 1;
      if (b === "Fecha por definir") return -1;
      return (
        new Date(`${a}T00:00:00`).getTime() -
        new Date(`${b}T00:00:00`).getTime()
      );
    })
    .map((fecha) => ({
      fecha: fecha,
      partidos: gruposObj[fecha],
    }));
});

const savedMatches = computed(() => {
  return filteredMatches.value.filter((match) => match.saved);
});

const progressPercentage = computed(() => {
  if (!filteredMatches.value.length) return 0;
  return Math.round(
    (savedMatches.value.length / filteredMatches.value.length) * 100,
  );
});

const formatDate = (date) => {
  if (!date || date === "Fecha por definir") return "Fecha por definir";
  const parsedDate = new Date(`${date}T00:00:00`);
  if (isNaN(parsedDate)) return date;
  return parsedDate.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
};

const getFlagCode = (team) => {
  const flagCodes = {
    México: "mx", Sudáfrica: "za", "Corea del Sur": "kr", "República Checa": "cz",
    Canadá: "ca", "Bosnia y Herzegovina": "ba", "Estados Unidos": "us",
    Paraguay: "py", Qatar: "qa", Suiza: "ch", Brasil: "br", Marruecos: "ma",
    Haití: "ht", Escocia: "gb-sct", Australia: "au", Turquía: "tr", Alemania: "de",
    Curacao: "cw", "Países Bajos": "nl", Japón: "jp", "Costa de Marfil": "ci",
    Ecuador: "ec", Suecia: "se", Túnez: "tn", España: "es", "Cabo Verde": "cv",
    Bélgica: "be", Egipto: "eg", "Arabia Saudita": "sa", Uruguay: "uy",
    "Irán": "ir", "Nueva Zelanda": "nz", Francia: "fr", Senegal: "sn",
    Irak: "iq", Noruega: "no", Argentina: "ar", Argelia: "dz", Austria: "at",
    Jordania: "jo", Portugal: "pt", "RD del Congo": "cd", Inglaterra: "gb-eng",
    Croacia: "hr", Ghana: "gh", Panamá: "pa", Uzbekistán: "uz", Colombia: "co",
  };
  return flagCodes[team] || "un";
};
</script>

<style scoped>
.prediction-card {
  background: #061a16;
  border: 1px solid rgba(25, 135, 84, 0.35);
  transition: all 0.3s ease;
}

/* Estilo visual opaco sutil para tarjetas bloqueadas */
.card-locked {
  background: #0b0f0e !important;
  border-color: rgba(220, 53, 69, 0.2) !important;
}

.team-flag {
  width: 34px;
  height: 24px;
  object-fit: contain;
}

.score-input {
  width: 45px;
  height: 40px;
}

/* Evitamos que puedan usar las flechas internas del navegador */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

/* Estilo cuando el input queda deshabilitado por bloqueo */
input:disabled {
  background-color: #1a1a1a !important;
  border-color: #333 !important;
  color: #6c757d !important;
  cursor: not-allowed;
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

.text-gold {
  color: #d4af37;
}
</style>
