<template>
  <div class="bg-black min-vh-100 text-white overflow-hidden pb-5 pb-lg-0">
    <div class="container-fluid px-3 py-3">
      <div class="row g-0 h-100">
        <!-- <aside
          class="d-none d-lg-block col-lg-3 col-xl-2 vh-100 overflow-hidden"
        >
          <Sidebar />
        </aside> -->

        <aside class="d-none d-lg-block col-lg-3 col-xl-2">
          <div class="position-fixed top-0 start-0 p-3 sidebar-fixed">
            <Sidebar />
          </div>
        </aside>

        <!-- <main
          class="col-12 col-lg-9 col-xl-10 vh-100 overflow-hidden px-0 pt-3 pb-5 pb-lg-1"
        > -->
        <main class="col-12 col-lg-9 col-xl-10 offset-lg-3 offset-xl-2 position-relative">

          <section
            class="container-fluid h-100 d-flex flex-column overflow-hidden"
          >
            <div class="sticky-top bg-black z-3">
              <div
                class="d-flex justify-content-between align-items-start flex-wrap gap-3"
              >
                <div>
                  <h2 class="fw-bold mb-1">
                    Resultados :
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
                    Consulta los marcadores oficiales y sigue el torneo en
                    tiempo real.
                  </p>
                </div>
                <div class="mt-2 d-none d-md-block">
                  <UserProfile />
                </div>
              </div>

              <div
                class="d-flex justify-content-between align-items-center flex-wrap gap-3 pt-1 mb-4"
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

                <div
                  class="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2 ms-lg-auto w-100 w-lg-auto"
                >
                  <select
                    v-model="filterType"
                    class="form-select bg-dark text-white border-success w-100 w-md-auto"
                  >
                    <option value="group">Filtrar por grupo</option>
                    <option value="team">Filtrar por selección</option>
                  </select>

                  <select
                    v-if="filterType === 'group'"
                    v-model="selectedGroup"
                    class="form-select bg-dark text-white border-success w-100 w-md-auto"
                  >
                    <option value="Todos">Todos los grupos</option>
                    <option v-for="group in groups" :key="group" :value="group">
                      Grupo {{ group }}
                    </option>
                  </select>

                  <select
                    v-if="filterType === 'team'"
                    v-model="selectedTeam"
                    class="form-select bg-dark text-white border-success w-100 w-md-auto"
                  >
                    <option value="Todas">Todas las selecciones</option>
                    <option v-for="team in teams" :key="team" :value="team">
                      {{ team }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="card results-card text-white rounded-4 mb-4">
                <div class="card-body">
                  <div
                    class="d-flex justify-content-between align-items-center flex-wrap gap-3"
                  >
                    <div>
                      <strong>
                        Fase de Grupos
                        <span class="text-success">· Resultados Oficiales</span>
                      </strong>
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

            <div
              class="flex-grow-1 overflow-auto overflow-x-hidden pb-4 scroll-clean"
            >
              <div v-if="cargando" class="text-center py-5">
                <div class="spinner-border text-success" role="status"></div>
                <p class="mt-3 text-white-50">
                  Cargando marcadores oficiales...
                </p>
              </div>

              <div v-else class="row g-3">
                <!-- <div class="col-12 col-xl-8"> -->
                <div class="col-12">
                  <div
                    v-if="partidosAgrupados.length === 0"
                    class="text-center text-white-50 py-4"
                  >
                    No hay partidos que coincidan con los filtros seleccionados.
                  </div>

                  <!-- <div
                    v-for="grupo in partidosAgrupados"
                    :key="grupo.fecha"
                    class="mb-5"
                  > -->
                  <div
                    :id="'dia-' + grupo.fecha"
                    v-for="grupo in partidosAgrupados"
                    :key="grupo.fecha"
                    class="mb-5 grupo-scroll"
                  >
                    <h5
                      class="fw-bold mb-3 text-gold text-capitalize border-bottom border-success border-opacity-25 pb-2"
                    >
                      📅 {{ formatDateLong(grupo.fecha) }}
                    </h5>

                    <div class="row g-3">
                      <!-- <div
                        v-for="match in grupo.partidos"
                        :key="match.id"
                        class="col-12 col-md-6 col-xl-4"
                      > -->
                      <div
                        v-for="match in grupo.partidos"
                        :key="match.id"
                        class="col-12 col-md-6 col-xl-4"
                      >
                        <div
                          class="card results-card text-white rounded-4 h-100"
                          :class="{ 'admin-clickable': isAdmin }"
                          @click="abrirModalAdministrador(match)"
                        >
                          <div class="card-body">
                            <div class="text-center mb-3">
                              <small class="text-white-50 fw-semibold">
                                {{ match.time }} · Grupo {{ match.group }}
                              </small>
                            </div>

                            <div
                              class="d-flex align-items-center justify-content-center gap-4"
                            >
                              <div
                                class="d-flex align-items-center justify-content-end gap-2 team-side"
                              >
                                <span
                                  class="fw-bold text-end team-name text-truncate"
                                >
                                  {{ match.homeTeam }}
                                </span>
                                <img
                                  :src="`https://flagcdn.com/w80/${getFlagCode(match.homeTeam)}.png`"
                                  :alt="match.homeTeam"
                                  class="team-flag"
                                />
                              </div>

                              <div class="fw-bold fs-3 text-success score-box">
                                {{ formatScore(match.homeScore) }} -
                                {{ formatScore(match.awayScore) }}
                              </div>

                              <div
                                class="d-flex align-items-center justify-content-start gap-2 team-side"
                              >
                                <img
                                  :src="`https://flagcdn.com/w80/${getFlagCode(match.awayTeam)}.png`"
                                  :alt="match.awayTeam"
                                  class="team-flag"
                                />
                                <span
                                  class="fw-bold text-start team-name text-truncate"
                                >
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
                                {{ match.phase }} · {{ match.stadium }}
                                <span v-if="match.city"
                                  >· {{ match.city }}</span
                                >
                              </small>
                            </div>

                            <!-- ACERTANTES ACORDEÓN -->
                            <div
                              v-if="match.status === 'finished'"
                              class="mt-3 border-top border-success border-opacity-25 pt-2"
                            >
                              <button
                                class="btn btn-sm text-success w-100 d-flex justify-content-between align-items-center px-1"
                                style="box-shadow: none"
                                @click.stop="
                                  match.mostrarAcertantes =
                                    !match.mostrarAcertantes
                                "
                              >
                                <span class="small fw-bold">
                                  🎯
                                  {{
                                    obtenerAcertantes(match).length
                                  }}
                                  Acertaron
                                </span>
                                <span class="small fw-bold">{{
                                  match.mostrarAcertantes ? "▲" : "▼"
                                }}</span>
                              </button>

                              <!-- Lista desplegable -->
                              <div
                                v-show="match.mostrarAcertantes"
                                class="mt-2 bg-dark rounded-3 p-2 text-start shadow-sm border border-secondary border-opacity-25"
                              >
                                <div
                                  v-if="obtenerAcertantes(match).length === 0"
                                  class="small text-white-50 text-center py-2"
                                >
                                  Nadie acertó el marcador exacto.
                                </div>
                                <div v-else>
                                  <div
                                    v-for="(user, index) in obtenerAcertantes(
                                      match,
                                    )"
                                    :key="index"
                                    class="small d-flex justify-content-between align-items-center py-1 border-bottom border-secondary border-opacity-10"
                                  >
                                    <span
                                      class="text-white text-truncate"
                                      style="max-width: 70%"
                                      >{{ user.name }}</span
                                    >
                                    <span
                                      class="badge text-bg-success rounded-pill"
                                      >+3 pts</span
                                    >
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
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
    <bottom-nav />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { supabase } from "@/supabaseClient";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import UserProfile from "@/components/common/UserProfile.vue";
import BottomNav from "@/components/dashboard/BottomNav.vue";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();

// --- VARIABLES DE ADMINISTRADOR ---
const isAdmin = ref(false);
// Coloca aquí los correos de los administradores autorizados
const adminEmails = [
  "ingeniero.mx@gmail.com",
  "javiergonzalezr93@gmail.com",
  "rubencruz4052@gmail.com",
];

// --- VARIABLES SEGURAS DE SESIÓN Y LIGA ---
const userId = ref(null);
const idLigaActiva = ref(
  route.query.ligaId || localStorage.getItem("ligaIdActiva") || null,
);
const nombreLigaActiva = ref(
  route.query.ligaNombre ||
    localStorage.getItem("ligaNombreActiva") ||
    "Mi Quiniela",
);

const eventoIdActiva = ref(
  route.query.eventoId || localStorage.getItem("eventoIdActiva") || null,
);

// Caché al inicio
if (idLigaActiva.value && idLigaActiva.value !== "null") {
  localStorage.setItem("ligaIdActiva", idLigaActiva.value);
  localStorage.setItem("ligaNombreActiva", nombreLigaActiva.value);
}

if (eventoIdActiva.value && eventoIdActiva.value !== "null") {
  localStorage.setItem("eventoIdActiva", eventoIdActiva.value);
}

// --- ESTADOS DE LA PANTALLA ---
const cargando = ref(true);
const filterType = ref("group");
const selectedGroup = ref("Todos");
const selectedTeam = ref("Todas");
const selectedStatus = ref("all");
const matches = ref([]);

// Variable para almacenar todas las predicciones de la liga
const prediccionesLiga = ref([]);

// --- VARIABLES ESTÁTICAS (A REEMPLAZAR LUEGO CON CONSULTAS DE RANKING) ---
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

// --- FUNCIONES DE UTILIDAD ---
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

// --- CONSULTA A SUPABASE ---
const cargarResultados = async () => {
  cargando.value = true;
  try {
    const { data: dbMatches, error: errMatches } = await supabase
      .from("matches")
      .select("*")
      .eq("event_id", eventoIdActiva.value);

    if (errMatches) throw errMatches;

    // Normalizar y Mapear los datos de Supabase a la estructura del frontend
    matches.value = dbMatches.map((partidoBD) => {
      let nombreGrupo = partidoBD.group_name || partidoBD.group || "";
      nombreGrupo = nombreGrupo.replace(/Grupo /i, "").trim();

      let fechaLimpia = normalizarFecha(partidoBD.match_date || partidoBD.date);

      return {
        id: partidoBD.id,
        date: fechaLimpia !== "9999-99-99" ? fechaLimpia : "Fecha por definir",
        time: partidoBD.match_time || partidoBD.time || "00:00",
        homeTeam: partidoBD.home_team || partidoBD.homeTeam,
        awayTeam: partidoBD.away_team || partidoBD.awayTeam,
        group: nombreGrupo,
        stadium: partidoBD.stadium,
        city: partidoBD.city || "",
        homeScore:
          partidoBD.home_score !== null && partidoBD.home_score !== undefined
            ? partidoBD.home_score
            : null,
        awayScore:
          partidoBD.away_score !== null && partidoBD.away_score !== undefined
            ? partidoBD.away_score
            : null,
        status: partidoBD.status || "pending", // Asume que la columna se llama "status"
        phase: partidoBD.phase || "Primera fase",
        mostrarAcertantes: false,
      };
    });

    await cargarPrediccionesReales();
  } catch (error) {
    console.error("Error al cargar marcadores oficiales:", error);
  } finally {
    cargando.value = false;

    // Esperamos a que la vista quite el spinner y dibuje los partidos
    await nextTick();
    // Hacemos el scroll automático
    ubicarDiaActual();
  }
};

// Función para descargar las predicciones y los nombres de los usuarios
const cargarPrediccionesReales = async () => {
  if (!idLigaActiva.value) return;

  try {
    // IMPORTANTE: Ajusta "usuarios ( nombre )" al nombre exacto de tu tabla
    // de perfiles y la columna donde guardas el nombre de la persona.
    // Puede que se llame "profiles ( name )", "users ( nombre_completo )", etc.

    const { data, error } = await supabase
      .from("predictions")
      .select(
        `
      match_id,
      home_score,
      away_score,
      perfiles ( nombre ) 
    `,
      )
      .eq("league_id", idLigaActiva.value);
    if (error) throw error;
    prediccionesLiga.value = data || [];
  } catch (error) {
    console.error("Error al cargar predicciones:", error);
  }
};

// --- LÓGICA DE ACERTANTES ---
// --- LÓGICA DE ACERTANTES ---
const obtenerAcertantes = (match) => {
  // 1. Si el partido no ha terminado o no tiene marcador oficial, nadie acierta aún.
  if (
    match.status !== "finished" ||
    match.homeScore === null ||
    match.awayScore === null
  ) {
    return [];
  }

  // 2. Filtramos la lista asegurándonos de convertir todo a los mismos tipos de datos
  const ganadores = prediccionesLiga.value.filter((pred) => {
    return (
      String(pred.match_id) === String(match.id) &&
      Number(pred.home_score) === Number(match.homeScore) &&
      Number(pred.away_score) === Number(match.awayScore)
    );
  });

  // 3. Mapeamos para obtener el nombre
  return ganadores.map((pred) => {
    // Si la base de datos devolvió el perfil como un arreglo (a veces pasa en joins), tomamos el primero
    const perfil = Array.isArray(pred.perfiles) ? pred.perfiles[0] : pred.perfiles;
    const nombreUsuario = perfil?.nombre || "Usuario Desconocido";
    
    return { name: nombreUsuario };
  });
};

const validarAccesoALiga = async (uId, lId) => {
  if (!uId || !lId) return false;
  try {
    const { data, error } = await supabase
      .from("league_members")
      .select("user_id") // Campo que sí existe en tu tabla
      .eq("user_id", String(uId))
      .eq("league_id", String(lId))
      .maybeSingle();

    return !!data;
  } catch (err) {
    console.error("Error en validación:", err);
    return false;
  }
};

// --- AUTO SCROLL A LA JORNADA ACTUAL ---
const ubicarDiaActual = () => {
  if (!partidosAgrupados.value.length) return;

  // 1. Obtener la fecha actual en formato YYYY-MM-DD
  const hoy = new Date();
  const hoyStr =
    hoy.getFullYear() +
    "-" +
    String(hoy.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(hoy.getDate()).padStart(2, "0");

  // 2. Buscar el primer grupo que sea hoy o en el futuro
  const grupoDestino = partidosAgrupados.value.find(
    (g) => g.fecha !== "Fecha por definir" && g.fecha >= hoyStr,
  );

  // 3. Hacer scroll hacia ese elemento si existe
  if (grupoDestino) {
    const elemento = document.getElementById("dia-" + grupoDestino.fecha);
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};

onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    router.push("/acceso");
    return;
  }

  userId.value = session.user.id;
  // Validar si es administrador
  if (adminEmails.includes(session.user.email)) {
    isAdmin.value = true;
  }

  // Validamos antes de cargar resultados
  if (idLigaActiva.value && idLigaActiva.value !== "null") {
    const tieneAcceso = await validarAccesoALiga(
      userId.value,
      idLigaActiva.value,
    );

    if (!tieneAcceso) {
      Swal.fire({
        title: "Acceso Denegado",
        text: "No tienes permisos para ver esta liga.",
        icon: "error",
        background: "#1a1d20",
        color: "#fff",
      });
      router.push("/juega");
      return;
    }

    await cargarResultados();
  } else {
    router.push("/juega");
  }

  cargando.value = false;
});

const abrirModalAdministrador = async (match) => {
  if (!isAdmin.value) return;

  const { value: formValues } = await Swal.fire({
    title: `<span class="text-gold">Actualizar Partido</span>`,
    html: `
      <div class="mb-4 text-white fs-5">
        <strong>${match.homeTeam}</strong> vs <strong>${match.awayTeam}</strong>
      </div>
      <div class="d-flex justify-content-center align-items-center gap-3 mb-4">
        <input id="swal-input-home" type="number" min="0" max="15" 
               class="form-control text-center fs-4 bg-dark text-white border-success" 
               style="width: 70px; height: 60px;"
               value="${match.homeScore !== null ? match.homeScore : ""}" placeholder="-">
        
        <span class="fs-3 text-white-50">-</span>
        
        <input id="swal-input-away" type="number" min="0" max="15" 
               class="form-control text-center fs-4 bg-dark text-white border-success" 
               style="width: 70px; height: 60px;"
               value="${match.awayScore !== null ? match.awayScore : ""}" placeholder="-">
      </div>
      <div class="form-group text-start px-3">
        <label class="text-white-50 mb-2">Estado del partido:</label>
        <select id="swal-input-status" class="form-select bg-dark text-white border-success">
          <option value="pending" ${match.status === "pending" ? "selected" : ""}>Pendiente</option>
          <option value="live" ${match.status === "live" ? "selected" : ""}>En vivo</option>
          <option value="finished" ${match.status === "finished" ? "selected" : ""}>Finalizado</option>
        </select>
      </div>
    `,
    background: "#1a1d20",
    color: "#fff",
    showCancelButton: true,
    confirmButtonText: "Guardar Resultado",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#198754",
    focusConfirm: false,
    preConfirm: () => {
      const homeVal = document.getElementById("swal-input-home").value;
      const awayVal = document.getElementById("swal-input-away").value;
      const statusVal = document.getElementById("swal-input-status").value;

      return {
        homeScore: homeVal === "" ? null : parseInt(homeVal),
        awayScore: awayVal === "" ? null : parseInt(awayVal),
        status: statusVal,
      };
    },
  });

  if (formValues) {
    await guardarMarcadorReal(match.id, formValues);
  }
};

const guardarMarcadorReal = async (matchId, valores) => {
  try {
    // Nota: Asegúrate de que los nombres de las columnas coincidan con tu base de datos
    const { error } = await supabase
      .from("matches")
      .update({
        home_score: valores.homeScore,
        away_score: valores.awayScore,
        status: valores.status,
      })
      .eq("id", matchId);

    if (error) throw error;

    Swal.fire({
      icon: "success",
      title: "¡Guardado!",
      text: "El marcador oficial ha sido actualizado.",
      background: "#1a1d20",
      color: "#fff",
      timer: 1500,
      showConfirmButton: false,
    });

    // Refrescamos la vista para que los cambios se reflejen
    await cargarResultados();
  } catch (error) {
    console.error("Error al actualizar marcador oficial:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al guardar el marcador.",
      background: "#1a1d20",
      color: "#fff",
    });
  }
};

watch(
  () => route.query.ligaId,
  async (newId) => {
    if (newId && newId !== "null") {
      idLigaActiva.value = newId;
      nombreLigaActiva.value =
        route.query.ligaNombre ||
        localStorage.getItem("ligaNombreActiva") ||
        "Mi Quiniela";

      localStorage.setItem("ligaIdActiva", newId);
      localStorage.setItem("ligaNombreActiva", nombreLigaActiva.value);

      if (eventoIdActiva.value) {
        localStorage.setItem("eventoIdActiva", eventoIdActiva.value);
      }

      if (userId.value) {
        await cargarResultados();
      }
    }
  },
  { immediate: false },
);

// --- COMPUTADOS Y FILTROS ---
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
  return [...new Set(matches.value.map((match) => match.group))].sort(
    (a, b) => {
      // localeCompare con 'numeric: true' entiende que el 10 es mayor que el 9
      return String(a).localeCompare(String(b), undefined, { numeric: true });
    },
  );
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

// AGRUPACIÓN DINÁMICA POR FECHA
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
      // Se ordenan los partidos de ese día por hora
      partidos: gruposObj[fecha].sort((p1, p2) =>
        p1.time.localeCompare(p2.time),
      ),
    }));
});

// INDICADORES DE BANDERAS
const finishedMatches = computed(() =>
  matches.value.filter((m) => m.status === "finished"),
);
const liveMatches = computed(() =>
  matches.value.filter((m) => m.status === "live"),
);
const pendingMatches = computed(() =>
  matches.value.filter((m) => m.status === "pending"),
);

// --- FORMATOS Y CLASES VISUALES ---
const formatScore = (score) => {
  return score === null || score === undefined ? "-" : score;
};

const formatDateLong = (date) => {
  if (!date || date === "Fecha por definir") return "Fecha por definir";
  const parsedDate = new Date(`${date}T00:00:00`);
  if (isNaN(parsedDate)) return date;

  return parsedDate.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
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
  return "text-bg-warning text-dark"; // El pendiente lo ponemos oscuro para mejor lectura
};

const getFlagCode = (team) => {
  const flagCodes = {
    México: "mx",
    Sudáfrica: "za",
    "Corea del Sur": "kr",
    "República Checa": "cz",
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

.text-gold {
  color: #d4af37;
}

.admin-clickable {
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.admin-clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(25, 135, 84, 0.4);
}

/* Margen superior dinámico para compensar el sticky-top al hacer scroll automático */
.grupo-scroll {
  scroll-margin-top: 240px;
}

.sidebar-fixed {
  width: 16.66666667%;
  max-width: 280px;
}
</style>
