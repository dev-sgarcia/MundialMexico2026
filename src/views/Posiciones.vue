<template>
  <div class="bg-black min-vh-100 text-white pb-5 pb-lg-0">
    <div class="container-fluid px-3 pt-0 pb-3">
      <div class="row g-0">
        <aside class="d-none d-lg-block col-lg-3 col-xl-2">
          <div class="position-fixed top-0 start-0 p-3 sidebar-fixed">
            <Sidebar />
          </div>
        </aside>
        <!-- CONTENIDO -->
        <main
          class="col-12 col-lg-9 col-xl-10 offset-lg-3 offset-xl-2 px-0 pt-0 pb-5 pb-lg-1"
        >
          <section class="container-fluid px-3 px-md-4">
            <div
              class="d-flex justify-content-between align-items-start mb-4 mt-4"
            >
              <div>
                <h2 class="fw-bold mb-1">Tabla de posiciones general</h2>

                <p class="text-white-50 mb-0">
                  Ranking general de participantes de la quiniela
                  <span
                    v-if="
                      nombreQuinielaActiva &&
                      nombreQuinielaActiva !== 'Mi Quiniela'
                    "
                    class="text-gold"
                  >
                    {{ nombreQuinielaActiva }}
                  </span>
                </p>
              </div>

              <PageHeader />
            </div>
            <!-- CARDS SUPERIORES -->
            <div class="row g-3 mb-4">
              <!-- 1. LÍDER ACTUAL -->
              <div class="col-6 col-xl-3">
                <div
                  class="card bg-warning bg-opacity-10 text-white border border-warning border-opacity-50 rounded-4 shadow-sm h-100"
                >
                  <div
                    class="card-body p-3 text-center d-flex flex-column justify-content-center"
                  >
                    <!-- Título centrado -->
                    <div
                      class="d-flex justify-content-center align-items-center gap-1 mb-3"
                    >
                      <PhCrown
                        size="18"
                        weight="fill"
                        class="text-warning flex-shrink-0"
                      />
                      <small
                        class="text-white-50 fw-bold text-uppercase"
                        style="font-size: 0.75rem"
                        >Líder actual</small
                      >
                    </div>

                    <!-- Foto y Puntos centrados horizontalmente -->
                    <div
                      class="d-flex justify-content-center align-items-center gap-2 mb-2"
                    >
                      <img
                        v-if="hayPuntos && avatarLider"
                        :src="avatarLider"
                        :alt="nombreLider"
                        class="rounded-circle border border-warning"
                        width="42"
                        height="42"
                        style="object-fit: cover"
                      />
                      <div
                        v-else-if="hayPuntos"
                        class="rounded-circle border border-warning d-flex align-items-center justify-content-center bg-dark"
                        style="width: 42px; height: 42px"
                      >
                        <PhUser size="20" class="text-warning" />
                      </div>
                      <span v-if="hayPuntos" class="text-warning fw-bold fs-4">
                        {{ puntosLider }} <small class="fs-6">pts</small>
                      </span>

                      <span v-else class="text-white-50 fw-bold fs-5"> — </span>
                    </div>

                    <!-- Nombre truncado para que no salte de línea en móviles -->
                    <h6
                      v-if="hayPuntos"
                      class="fw-bold mb-0 text-truncate w-100"
                    >
                      {{ nombreLider }}
                    </h6>

                    <h6 v-else class="fw-bold mb-0 text-white-50">
                      Sin líder aún
                    </h6>
                    <small v-if="!hayPuntos" class="text-white-50 d-block mt-1">
                      Aún nadie ha sumado puntos
                    </small>
                  </div>
                </div>
              </div>

              <!-- 2. TU POSICIÓN -->
              <div class="col-6 col-xl-3">
                <div
                  class="card bg-primary bg-opacity-10 text-white border border-primary border-opacity-50 rounded-4 shadow-sm h-100"
                >
                  <div
                    class="card-body p-3 text-center d-flex flex-column justify-content-center"
                  >
                    <div
                      class="d-flex justify-content-center align-items-center gap-1 mb-3"
                    >
                      <PhMedal
                        size="18"
                        weight="fill"
                        class="text-primary flex-shrink-0"
                      />
                      <small
                        class="text-white-50 fw-bold text-uppercase"
                        style="font-size: 0.75rem"
                        >Tu posición</small
                      >
                    </div>

                    <h3 class="fw-bold mb-1 text-primary">
                      {{ hayPuntos ? `${miPosicion}°` : "—" }}
                    </h3>
                    <span class="text-white-50 small lh-sm d-block mt-1">
                      {{
                        hayPuntos
                          ? `de ${totalParticipantes} participantes`
                          : "Posición pendiente"
                      }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- 3. DISTANCIA DEL LÍDER -->
              <div class="col-6 col-xl-3">
                <div
                  class="card bg-success bg-opacity-10 text-white border border-success border-opacity-50 rounded-4 shadow-sm h-100"
                >
                  <div
                    class="card-body p-3 text-center d-flex flex-column justify-content-center"
                  >
                    <div
                      class="d-flex justify-content-center align-items-center gap-1 mb-3"
                    >
                      <PhTarget
                        size="18"
                        weight="fill"
                        class="text-success flex-shrink-0"
                      />
                      <small
                        class="text-white-50 fw-bold text-uppercase"
                        style="font-size: 0.75rem"
                        >Distancia al líder</small
                      >
                    </div>

                    <h3 class="fw-bold mb-1 text-success">
                      <template v-if="hayPuntos">
                        {{ distanciaLider }} <small class="fs-6">pts</small>
                      </template>
                      <template v-else>—</template>
                    </h3>

                    <span class="text-white-50 small lh-sm d-block mt-1">
                      <template v-if="hayPuntos">
                        No aflojes el paso.<br />¡Sigue así!
                      </template>
                      <template v-else> Sin líder definido </template>
                    </span>
                  </div>
                </div>
              </div>

              <!-- 4. EFECTIVIDAD -->
              <div class="col-6 col-xl-3">
                <div
                  class="card bg-info bg-opacity-10 text-white border border-info border-opacity-50 rounded-4 shadow-sm h-100"
                >
                  <div
                    class="card-body p-3 text-center d-flex flex-column justify-content-center"
                  >
                    <div
                      class="d-flex justify-content-center align-items-center gap-1 mb-3"
                    >
                      <PhLightning
                        size="18"
                        weight="fill"
                        class="text-info flex-shrink-0"
                      />
                      <small
                        class="text-white-50 fw-bold text-uppercase"
                        style="font-size: 0.75rem"
                        >Efectividad</small
                      >
                    </div>

                    <h3 class="fw-bold mb-1 text-info">
                      {{ hayPuntos ? miEfectividad : "—" }}
                    </h3>

                    <span class="text-white-50 small lh-sm d-block mt-1">
                      <template v-if="hayPuntos">
                        Cada punto te acerca.<br />¡Apuesta fuerte!
                      </template>
                      <template v-else> Esperando resultados </template>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- TOP 3 PODIO -->
            <section
              v-if="topTres.length && !search.trim() && sortBy === 'puntos'"
              class="mb-4"
            >
              <div
                class="card bg-dark text-white border border-success border-opacity-25 rounded-4 shadow-sm overflow-hidden"
              >
                <div class="card-body p-3 p-md-4">
                  <div class="d-flex align-items-center gap-2 mb-3">
                    <h5 class="mb-0 fw-bold text-white text-uppercase">
                      Top 3 de la quiniela
                    </h5>
                  </div>

                  <div
                    class="row g-2 align-items-end justify-content-center mx-auto top-three-row"
                  >
                    <div
                      v-for="jugador in topTres"
                      :key="jugador.user_id"
                      class="col-4 col-md-3"
                      :class="{
                        'order-2': jugador.posicion === 1,
                        'order-1': jugador.posicion === 2,
                        'order-3': jugador.posicion === 3,
                      }"
                    >
                      <div
                        class="text-center rounded-4 p-1 h-100"
                        :class="{
                          'top-player-first border border-warning shadow':
                            jugador.posicion === 1,

                          'top-player-second border border-light border-opacity-50':
                            jugador.posicion === 2,

                          'top-player-third border border-warning border-opacity-50':
                            jugador.posicion === 3,
                        }"
                      >
                        <div class="mb-2">
                          <PhCrown
                            v-if="jugador.posicion === 1"
                            size="24"
                            weight="fill"
                            class="text-warning"
                          />

                          <div
                            v-else
                            class="position-relative d-inline-flex align-items-center justify-content-center"
                          >
                            <PhMedal
                              size="28"
                              weight="fill"
                              :class="{
                                'text-light': jugador.posicion === 2,
                                'text-warning': jugador.posicion === 3,
                              }"
                            />

                            <span
                              class="podium-medal-number position-absolute fw-bold"
                            >
                              {{ jugador.posicion }}
                            </span>
                          </div>
                        </div>

                        <img
                          v-if="jugador.avatar_url"
                          :src="jugador.avatar_url"
                          :alt="jugador.nombre"
                          class="top-player-avatar rounded-circle border mb-2"
                          :class="{
                            'border-warning': jugador.posicion === 1,
                            'border-light': jugador.posicion === 2,
                            'border-warning border-opacity-50':
                              jugador.posicion === 3,
                          }"
                        />

                        <div
                          v-else
                          class="top-player-avatar rounded-circle border border-secondary mx-auto mb-2 d-flex align-items-center justify-content-center bg-dark"
                        >
                          <PhUser size="26" class="text-white-50" />
                        </div>

                        <h6 class="fw-bold mb-1 text-truncate">
                          {{ jugador.nombre }}
                        </h6>

                        <div class="fw-bold">
                          <span
                            :class="{
                              'text-warning fs-4': jugador.posicion === 1,
                              'text-white fs-5': jugador.posicion !== 1,
                            }"
                          >
                            {{ jugador.puntos }}
                          </span>
                          <small class="text-white-50"> pts</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- CONTENIDO -->
            <div class="row g-4 align-items-start">
              <!-- TABLA -->
              <div class="col-12 col-xl-12">
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
                            @input="resetPage"
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
                          @change="resetPage"
                          class="form-select form-select-sm bg-black text-white border-success"
                        >
                          <option value="puntos">Ordenar por: Puntos</option>
                          <option value="exactos">Marc. exactos</option>
                          <option value="aciertos">Aciertos</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="card bg-black border border-success border-opacity-25 rounded-4 overflow-hidden mb-4 shadow-sm"
                >
                  <div
                    class="card-header bg-dark border-bottom border-success border-opacity-25 py-3 px-4 d-flex align-items-center gap-2"
                  >
                    <PhRanking size="22" weight="fill" class="text-success" />
                    <h5
                      class="mb-0 fw-bold text-white text-uppercase"
                      style="letter-spacing: 0.5px"
                    >
                      Tabla General
                    </h5>
                  </div>

                  <div class="table-responsive">
                    <table
                      class="table table-dark table-hover mb-0 align-middle"
                    >
                      <thead class="bg-dark">
                        <tr>
                          <th
                            class="py-3 px-3 px-md-4 text-center text-white-50 font-monospace"
                            style="width: 60px"
                          >
                            #
                          </th>
                          <th
                            class="py-3 text-white-50 text-uppercase"
                            style="font-size: 0.85rem"
                          >
                            Participante
                          </th>
                          <th
                            class="py-3 text-center text-white-50 text-uppercase d-none d-md-table-cell"
                            style="font-size: 0.85rem"
                          >
                            Exactos (3pts)
                          </th>
                          <th
                            class="py-3 text-center text-white-50 text-uppercase d-none d-md-table-cell"
                            style="font-size: 0.85rem"
                          >
                            Aciertos (1pt)
                          </th>
                          <th
                            class="py-3 text-center text-white-50 text-uppercase d-none d-md-table-cell"
                            style="font-size: 0.85rem"
                          >
                            Efectividad
                          </th>
                          <th
                            class="py-3 px-3 px-md-4 text-center text-white text-uppercase"
                            style="font-size: 0.85rem"
                          >
                            Puntos
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(jugador, index) in posicionesTablaPaginadas"
                          :key="jugador.user_id"
                          :class="{
                            'bg-success bg-opacity-10':
                              jugador.user_id === userId,
                          }"
                        >
                          <td class="text-center px-3 px-md-4">
                            <div
                              v-if="
                                sortBy === 'puntos'
                                  ? jugador.posicion <= 3
                                  : (currentPage - 1) * itemsPerPage + index < 3
                              "
                              class="position-relative d-inline-flex align-items-center justify-content-center"
                            >
                              <PhMedal
                                size="32"
                                weight="fill"
                                :style="{
                                  color:
                                    (sortBy === 'puntos'
                                      ? jugador.posicion
                                      : (currentPage - 1) * itemsPerPage +
                                        index +
                                        1) === 1
                                      ? '#ffd700'
                                      : (sortBy === 'puntos'
                                            ? jugador.posicion
                                            : (currentPage - 1) * itemsPerPage +
                                              index +
                                              1) === 2
                                        ? '#c0c0c0'
                                        : '#cd7f32',
                                }"
                              />

                              <span
                                class="medal-position-number position-absolute fw-bold"
                              >
                                {{
                                  sortBy === "puntos"
                                    ? jugador.posicion
                                    : (currentPage - 1) * itemsPerPage +
                                      index +
                                      1
                                }}
                              </span>
                            </div>
                            <span v-else class="fw-bold text-white-50 fs-5">
                              {{
                                sortBy === "puntos"
                                  ? jugador.posicion
                                  : (currentPage - 1) * itemsPerPage + index + 1
                              }}
                            </span>
                          </td>

                          <td>
                            <div class="d-flex align-items-center gap-2 py-1">
                              <img
                                v-if="jugador.avatar_url"
                                :src="jugador.avatar_url"
                                :alt="jugador.nombre"
                                class="rounded-circle border border-secondary border-opacity-25"
                                width="38"
                                height="38"
                                style="object-fit: cover"
                              />
                              <!-- AGREGAR ESTA NUEVA IMAGEN -->
                              <img
                                v-else
                                src="@/assets/avatar-gmail.png"
                                :alt="jugador.nombre"
                                class="rounded-circle border border-success border-opacity-50 bg-dark p-1"
                                width="38"
                                height="38"
                                style="object-fit: contain"
                              />

                              <div class="d-flex flex-column">
                                <span
                                  class="fw-bold text-white text-truncate"
                                  style="max-width: 160px"
                                  >{{ jugador.nombre }}</span
                                >
                                <span
                                  v-if="jugador.user_id === userId"
                                  class="badge text-bg-success text-uppercase"
                                  style="font-size: 0.6rem; width: fit-content"
                                  >Tú</span
                                >
                              </div>
                            </div>

                            <!-- <div class="d-flex align-items-center gap-2 py-1">
                              <img
                                v-if="jugador.avatar_url"
                                :src="jugador.avatar_url"
                                :alt="jugador.nombre"
                                class="rounded-circle border border-secondary border-opacity-25"
                                width="38"
                                height="38"
                                style="object-fit: cover"
                              />
                              <div
                                v-else
                                class="rounded-circle border border-secondary border-opacity-25 d-flex align-items-center justify-content-center bg-dark"
                                style="width: 38px; height: 38px"
                              >
                                <PhUser size="20" class="text-white-50" />
                              </div>
                              <div class="d-flex flex-column">
                                <span
                                  class="fw-bold text-white text-truncate"
                                  style="max-width: 160px"
                                  >{{ jugador.nombre }}</span
                                >
                                <span
                                  v-if="jugador.user_id === userId"
                                  class="badge text-bg-success text-uppercase"
                                  style="font-size: 0.6rem; width: fit-content"
                                  >Tú</span
                                >
                              </div>
                            </div> -->
                          </td>

                          <td class="text-center d-none d-md-table-cell">
                            <span
                              class="badge bg-dark border border-success text-success fs-6 rounded-pill px-3"
                              >{{ jugador.exactos }}</span
                            >
                          </td>

                          <td class="text-center d-none d-md-table-cell">
                            <span
                              class="badge bg-dark border border-secondary text-white-50 fs-6 rounded-pill px-3"
                              >{{ jugador.aciertos }}</span
                            >
                          </td>

                          <td
                            class="text-center text-info fw-semibold d-none d-md-table-cell"
                          >
                            {{ jugador.efectividad }}
                          </td>

                          <td class="text-center px-3 px-md-4">
                            <span class="fs-4 fw-bold text-gold">{{
                              jugador.puntos
                            }}</span>
                          </td>
                        </tr>

                        <tr v-if="posicionesTabla.length === 0">
                          <td
                            colspan="6"
                            class="text-center py-5 text-white-50"
                          >
                            Aún no hay puntos registrados en esta liga.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <nav
                      v-if="totalPages > 1"
                      class="d-flex justify-content-center py-3 border-top border-success border-opacity-25"
                    >
                      <ul class="pagination pagination-sm mb-0">
                        <li
                          class="page-item"
                          :class="{ disabled: currentPage === 1 }"
                        >
                          <button
                            class="page-link bg-dark text-white border-success"
                            @click="currentPage--"
                          >
                            Anterior
                          </button>
                        </li>

                        <li
                          v-for="page in pages"
                          :key="page"
                          class="page-item"
                          :class="{ active: currentPage === page }"
                        >
                          <button
                            class="page-link"
                            :class="
                              currentPage === page
                                ? 'bg-success border-success text-dark'
                                : 'bg-dark text-white border-success'
                            "
                            @click="currentPage = page"
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
                            @click="currentPage++"
                          >
                            Siguiente
                          </button>
                        </li>
                      </ul>
                    </nav>
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
import { ref, computed, onMounted } from "vue";
import BottomNav from "@/components/dashboard/BottomNav.vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import PageHeader from "@/components/common/PageHeader.vue";

import {
  PhCrown,
  PhLightning,
  PhMagnifyingGlass,
  PhMedal,
  PhRanking,
  PhTarget,
  PhUser,
} from "@phosphor-icons/vue";

import { useRouter, useRoute } from "vue-router";
import { supabase } from "@/supabaseClient";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();

// Variables para filtrado y ordenamiento
const search = ref("");
const sortBy = ref("puntos"); // Por defecto ordenamos por puntos

const currentPage = ref(1);
const itemsPerPage = 10;

const totalPages = computed(() =>
  Math.ceil(posicionesTabla.value.length / itemsPerPage),
);

const pages = computed(() =>
  Array.from({ length: totalPages.value }, (_, i) => i + 1),
);

const posicionesTablaPaginadas = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return posicionesTabla.value.slice(start, end);
});

const resetPage = () => {
  currentPage.value = 1;
};

const posicionesFiltradas = computed(() => {
  let filtrados = [...tablaPosiciones.value];

  if (search.value.trim()) {
    const query = search.value.trim().toLowerCase();

    filtrados = filtrados.filter((jugador) =>
      jugador.nombre?.toLowerCase().includes(query),
    );
  }

  filtrados.sort((a, b) => {
    if (sortBy.value === "puntos") {
      return b.puntos - a.puntos || b.exactos - a.exactos;
    }

    if (sortBy.value === "exactos") {
      return b.exactos - a.exactos || b.puntos - a.puntos;
    }

    if (sortBy.value === "aciertos") {
      return b.aciertos - a.aciertos || b.puntos - a.puntos;
    }

    return 0;
  });

  return filtrados;
});

const hayPuntos = computed(() =>
  tablaPosiciones.value.some((jugador) => jugador.puntos > 0),
);

const topTres = computed(() =>
  tablaPosiciones.value.filter((jugador) => jugador.puntos > 0).slice(0, 3),
);

const posicionesTabla = computed(() => {
  if (search.value.trim() || sortBy.value !== "puntos") {
    return posicionesFiltradas.value;
  }

  const idsTopTres = topTres.value.map((jugador) => jugador.user_id);

  return posicionesFiltradas.value.filter(
    (jugador) => !idsTopTres.includes(jugador.user_id),
  );
});

// Variables de estado
const userId = ref(null);
const idLigaActiva = ref(
  route.query.ligaId || localStorage.getItem("ligaIdActiva") || null,
);

const nombreQuinielaActiva = ref(
  route.query.ligaNombre || localStorage.getItem("ligaNombreActiva") || "Liga",
);

// Variables para las 4 Cards
const nombreLider = ref("-");
const avatarLider = ref("");
const puntosLider = ref(0);
const miPosicion = ref(0);
const totalParticipantes = ref(0);
const distanciaLider = ref(0);
const miEfectividad = ref("0%");

const tablaPosiciones = ref([]);

const cargarPosiciones = async () => {
  if (!idLigaActiva.value || idLigaActiva.value === "null") return;

  try {
    const { data, error } = await supabase
      .from("vw_posiciones")
      .select("*")
      .eq("league_id", idLigaActiva.value)
      .order("puntos", { ascending: false })
      .order("exactos", { ascending: false })
      .order("ultima_actualizacion", { ascending: true }); // <--- CRITERIO DE DESEMPATE
    if (error) throw error;

    // Mapeamos los datos para inyectar la posición y la efectividad a toda la tabla
    tablaPosiciones.value = (data || []).map((jugador, index) => {
      let efectividad = "0%";
      
      if (jugador.jugados > 0) {
        // 1. Calculamos el máximo de puntos posibles (3 puntos por cada partido jugado)
        const puntosPosibles = jugador.jugados * 3;
        
        // 2. Calculamos los puntos reales obtenidos en esos partidos
        const puntosObtenidos = (jugador.exactos * 3) + (jugador.aciertos * 1);
        
        // 3. Sacamos el porcentaje real de efectividad
        efectividad = ((puntosObtenidos / puntosPosibles) * 100).toFixed(1) + "%";
      }

      return {
        ...jugador,
        posicion: index + 1,
        efectividad,
      };
    });

    totalParticipantes.value = tablaPosiciones.value.length;

    // 2. Llenamos las 4 Cards superiores reutilizando los datos mapeados
    if (tablaPosiciones.value.length > 0) {
      // Card 1: LÍDER ACTUAL
      nombreLider.value = tablaPosiciones.value[0].nombre;
      avatarLider.value = tablaPosiciones.value[0].avatar_url;
      puntosLider.value = tablaPosiciones.value[0].puntos;

      // Buscar mis métricas
      const miIndice = tablaPosiciones.value.findIndex(
        (p) => p.user_id === userId.value,
      );

      if (miIndice !== -1) {
        const misDatos = tablaPosiciones.value[miIndice];

        // Card 2: TU POSICIÓN
        miPosicion.value = misDatos.posicion;

        // Card 3: DISTANCIA DEL LÍDER
        distanciaLider.value = puntosLider.value - misDatos.puntos;

        // Card 4: EFECTIVIDAD (%)
        miEfectividad.value = misDatos.efectividad;
      }
    }
  } catch (error) {
    console.error("Error al cargar posiciones:", error);
  }
};

// Función cadenero
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

// El onMounted blindado
onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    router.push("/");
    return;
  }

  userId.value = session.user.id;

  // await cargarPosiciones();

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

  if (!idLigaActiva.value || idLigaActiva.value === "null") {
    router.push("/juega");
    return;
  }

  await cargarPosiciones();
});
</script>

<style scoped>
.search-input::placeholder {
  color: rgba(226, 226, 226, 0.8);
  opacity: 1;
}

/* Sidebar */
.sidebar-fixed {
  width: 16.66666667%;
  max-width: 280px;
}

/* Medallas tabla */
.medal-position-number {
  top: 39%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.95rem;
  font-weight: 800;
  line-height: 1;
  color: #111;
}

/* Medallas podio */
.podium-medal-number {
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  line-height: 1;
  color: #111;
}

/* Podio */
.top-three-row {
  max-width: 950px;
}

.top-player-avatar {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.top-player-first {
  transform: translateY(-12px);
  min-height: 210px;
  background: rgba(255, 193, 7, 0.08);
}

.top-player-second {
  background: rgba(255, 255, 255, 0.05);
}

.top-player-third {
  background: rgba(205, 127, 50, 0.08);
}

/* Mobile */
@media (max-width: 575.98px) {
  .top-player-second,
  .top-player-third {
    min-height: 95px;
  }

  .top-player-first {
    min-height: 125px;
    transform: translateY(-10px);
  }

  .top-player-avatar {
    width: 34px;
    height: 34px;
  }

  .top-player-first .top-player-avatar {
    width: 42px;
    height: 42px;
  }

  .top-player-first h6,
  .top-player-second h6,
  .top-player-third h6 {
    font-size: 0.75rem;
    line-height: 1.1;
    margin-bottom: 0;
  }

  .top-player-first .fs-4 {
    font-size: 1.3rem !important;
  }

  .top-player-second .fs-5,
  .top-player-third .fs-5 {
    font-size: 1rem !important;
  }
}
</style>
