<template>
  <div class="bg-black min-vh-100 text-white">
    <div class="container-fluid px-3 px-md-4 py-3 content-with-bottom-nav">
      <div class="row g-3 align-items-start">

        <aside class="d-none d-lg-block col-lg-3 col-xl-2">
          <div class="position-fixed top-0 start-0 p-3 sidebar-fixed">
            <Sidebar />
          </div>
        </aside>

        <!-- <main class="col-12 col-lg-9 col-xl-10 position-relative"> -->
        <main class="col-12 col-lg-9 col-xl-10 offset-lg-3 offset-xl-2 position-relative">
          <div
            class="d-none d-lg-flex position-absolute top-0 end-0 mt-3 me-4 z-3"
          >
            <UserProfile />
          </div>
          <section class="d-flex flex-column gap-3">
            <!-- HEADER -->
            <div class="bg-black">
              <div
                class="d-flex justify-content-between align-items-start flex-wrap gap-3"
              >
                <div class="pe-lg-5 me-lg-5">
                  <h2 class="fw-bold mb-1">Mis Quinielas</h2>
                  <p class="text-white-50 mb-0">
                    Administra las ligas en las que estás participando.
                  </p>
                </div>
              </div>
            </div>

            <!-- BODY -->
            <div class="row g-3 align-items-start">
              <!-- IZQUIERDA -->
              <div class="col-12 col-xl-6">
                <!-- ACCIONES -->
                <div class="row g-3 mb-3">
                  <div class="col-12">
                    <div
                      class="card bg-dark bg-opacity-75 border border-success border-opacity-25 text-white rounded-4"
                    >
                      <div class="card-body p-3">
                        <h4 class="fw-bold mb-2">Únete a una liga</h4>

                        <p class="text-white-50 small mb-3">
                          Ingresa un código o crea una nueva liga.
                        </p>

                        <div class="row g-2 align-items-stretch">
                          <!-- INPUT + UNIRME -->
                          <div class="col-7">
                            <div class="row g-2 h-100">
                              <div class="col-7">
                                <input
                                  v-model="codigoInvitacion"
                                  type="text"
                                  class="form-control bg-dark text-white border-secondary h-100"
                                  placeholder="Código"
                                  @input="
                                    codigoInvitacion =
                                      codigoInvitacion.toUpperCase()
                                  "
                                />
                              </div>

                              <div class="col-5">
                                <button
                                  class="btn btn-outline-success fw-bold w-100 h-100 d-flex align-items-center justify-content-center gap-1"
                                  @click="unirseLiga"
                                >
                                  <PhArrowRight size="16" weight="bold" />
                                  Unirme
                                </button>
                              </div>
                            </div>
                          </div>

                          <!-- CREAR LIGA -->
                          <div class="col-5">
                            <button
                              class="btn btn-outline-primary fw-bold w-100 h-100 d-flex align-items-center justify-content-center gap-2"
                              @click="crearQuiniela"
                            >
                              <PhPlus size="18" weight="bold" />
                              Crear liga
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- MIS LIGAS -->
                <div
                  class="card bg-dark bg-opacity-75 border border-secondary border-opacity-25 text-white rounded-4"
                >
                  <div class="card-body p-3 p-md-4">
                    <div
                      class="d-flex align-items-center justify-content-between mb-3"
                    >
                      <div>
                        <h4 class="fw-bold mb-1">Mis ligas activas</h4>
                        <p class="text-white-50 small mb-0">
                          Selecciona una liga para ver su información.
                        </p>
                      </div>
                    </div>

                    <div class="d-flex flex-column gap-3">
                      <div
                        v-for="quiniela in quinielas"
                        :key="quiniela.id"
                        class="card bg-black bg-opacity-25 border rounded-4 cursor-pointer"
                        :class="
                          quinielaSeleccionada?.id === quiniela.id
                            ? 'border-success'
                            : 'border-secondary border-opacity-25'
                        "
                        @click="seleccionarQuiniela(quiniela)"
                        data-bs-toggle="modal"
                        data-bs-target="#leagueDetailMobile"
                      >
                        <div class="card-body p-3">
                          <div class="d-flex align-items-center gap-3">
                            <img
                              :src="quiniela.imagen"
                              :alt="quiniela.nombre"
                              class="league-img border border-success border-2"
                            />

                            <div class="flex-grow-1">
                              <div
                                class="d-flex align-items-center gap-2 flex-wrap mb-1"
                              >
                                <h5 class="fw-bold mb-0 text-white">
                                  {{ quiniela.nombre }}
                                </h5>

                                <span class="badge text-bg-success">
                                  {{ quiniela.rol }}
                                </span>
                              </div>

                              <p class="text-white-50 small mb-2">
                                {{ quiniela.descripcionCorta }} ·
                                {{ quiniela.tipo }}
                              </p>

                              <div class="d-flex gap-2 flex-wrap">
                                <span
                                  class="badge text-bg-dark border border-secondary"
                                >
                                  {{ quiniela.participantes }} participantes
                                </span>

                                <span
                                  class="badge bg-warning text-dark fw-bold"
                                >
                                  {{ quiniela.codigo }}
                                </span>

                                <span class="badge text-bg-primary">
                                  {{ quiniela.puntos }} pts
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- DETALLE DESKTOP -->
              <div class="col-12 col-xl-6 d-none d-xl-block">
                <div
                  v-if="quinielaSeleccionada"
                  class="card bg-dark bg-opacity-75 border border-secondary border-opacity-25 text-white rounded-4 sticky-xl-top detail-panel"
                >
                  <div class="card-body p-4">
                    <div class="d-flex align-items-start gap-3 mb-4">
                      <img
                        :src="quinielaSeleccionada.imagen"
                        :alt="quinielaSeleccionada.nombre"
                        class="detail-img border border-success border-2"
                      />

                      <div>
                        <div
                          class="d-flex align-items-center gap-2 flex-wrap mb-1"
                        >
                          <h4 class="fw-bold mb-0">
                            {{ quinielaSeleccionada.nombre }}
                          </h4>

                          <span class="badge text-bg-success">
                            {{ quinielaSeleccionada.rol }}
                          </span>
                        </div>

                        <p class="text-white-50 mb-0">
                          {{ quinielaSeleccionada.descripcionCorta }} ·
                          {{ quinielaSeleccionada.tipo }}
                        </p>
                      </div>
                    </div>

                    <div class="row g-3 mb-3">
                      <div class="col-6">
                        <div
                          class="bg-black bg-opacity-25 border border-secondary border-opacity-25 rounded-4 p-3 h-100"
                        >
                          <small
                            class="text-white-50 d-flex align-items-center gap-2 mb-1"
                          >
                            <PhUsers
                              size="18"
                              weight="fill"
                              class="text-success"
                            />
                            Participantes
                          </small>
                          <h5 class="fw-bold mb-0">
                            {{ quinielaSeleccionada.participantes }}
                          </h5>
                        </div>
                      </div>

                      <div class="col-6">
                        <div
                          class="bg-black bg-opacity-25 border border-secondary border-opacity-25 rounded-4 p-3 h-100"
                        >
                          <small
                            class="text-white-50 d-flex align-items-center gap-2 mb-1"
                          >
                            <PhShieldCheck
                              size="18"
                              weight="fill"
                              class="text-danger"
                            />
                            Tipo
                          </small>
                          <h5 class="fw-bold mb-0">
                            {{ quinielaSeleccionada.tipo }}
                          </h5>
                        </div>
                      </div>

                      <div class="col-6">
                        <div
                          class="bg-black bg-opacity-25 border border-secondary border-opacity-25 rounded-4 p-3 h-100"
                        >
                          <small
                            class="text-white-50 d-flex align-items-center gap-2 mb-1"
                          >
                            <PhKey
                              size="18"
                              weight="fill"
                              class="text-warning"
                            />
                            Código
                          </small>
                          <h5 class="fw-bold mb-0">
                            {{ quinielaSeleccionada.codigo }}
                          </h5>
                        </div>
                      </div>

                      <div class="col-6">
                        <div
                          class="bg-black bg-opacity-25 border border-secondary border-opacity-25 rounded-4 p-3 h-100"
                        >
                          <small
                            class="text-white-50 d-flex align-items-center gap-2 mb-1"
                          >
                            <PhCalendarBlank
                              size="18"
                              weight="fill"
                              class="text-info"
                            />
                            Creación
                          </small>
                          <h6 class="fw-bold mb-0">
                            {{ quinielaSeleccionada.fechaCreacion }}
                          </h6>
                        </div>
                      </div>
                    </div>

                    <div
                      class="bg-black bg-opacity-25 border border-secondary border-opacity-25 rounded-4 p-3 mb-3"
                    >
                      <h5 class="fw-bold d-flex align-items-center gap-2">
                        <PhFileText
                          size="20"
                          weight="fill"
                          class="text-primary"
                        />
                        Descripción
                      </h5>
                      <p class="text-white-50 mb-0">
                        {{ quinielaSeleccionada.descripcion }}
                      </p>
                    </div>

                    <div class="row g-3 mb-3">
                      <div class="col-6">
                        <div
                          class="bg-black bg-opacity-25 border border-secondary border-opacity-25 rounded-4 p-3 h-100"
                        >
                          <small
                            class="text-white-50 d-flex align-items-center gap-2 mb-1"
                          >
                            <PhTrophy
                              size="18"
                              weight="fill"
                              class="text-warning"
                            />
                            Posición
                          </small>
                          <h4 class="fw-bold mb-0">
                            {{ quinielaSeleccionada.posicion }}
                          </h4>
                        </div>
                      </div>

                      <div class="col-6">
                        <div
                          class="bg-black bg-opacity-25 border border-secondary border-opacity-25 rounded-4 p-3 h-100"
                        >
                          <small
                            class="text-white-50 d-flex align-items-center gap-2 mb-1"
                          >
                            <PhStar
                              size="18"
                              weight="fill"
                              class="text-primary"
                            />
                            Puntos
                          </small>
                          <h4 class="fw-bold mb-0">
                            {{ quinielaSeleccionada.puntos }} pts
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div
                      class="bg-black bg-opacity-25 border border-secondary border-opacity-25 rounded-4 p-3 mb-3"
                    >
                      <h5 class="fw-bold mb-3 d-flex align-items-center gap-2">
                        <PhCrown size="21" weight="fill" class="text-warning" />
                        Campeón del Mundial
                      </h5>

                      <div v-if="quinielaSeleccionada.campeonElegido">
                        <p class="mb-1">
                          Tu campeón elegido:
                          <span class="badge text-bg-success fs-6 ms-1">
                            <img
                              v-if="quinielaSeleccionada.bandera"
                              :src="`https://flagcdn.com/w40/${quinielaSeleccionada.bandera}.png`"
                              :alt="quinielaSeleccionada.campeonElegido"
                              class="flag-icon me-1"
                            />
                            {{ quinielaSeleccionada.campeonElegido }}
                          </span>
                        </p>

                        <small class="text-white-50">
                          Esta elección ya fue registrada y no puede
                          modificarse.
                        </small>
                      </div>

                      <div v-else>
                        <select
                          v-model="campeonSeleccionado"
                          class="form-select bg-dark text-white border-success mb-2"
                        >
                          <option value="">Selecciona tu campeón</option>
                          <option
                            v-for="pais in paises"
                            :key="pais"
                            :value="pais"
                          >
                            {{ pais }}
                          </option>
                        </select>

                        <button
                          class="btn btn-success fw-bold w-100 d-flex align-items-center justify-content-center gap-2"
                          @click="guardarCampeon"
                        >
                          <PhCheckCircle size="18" weight="fill" />
                          Guardar campeón
                        </button>
                      </div>
                    </div>

                    <div class="row g-2">
                      <div class="col-12 col-md-6">
                        <button
                          class="btn btn-outline-success fw-bold w-100 d-flex align-items-center justify-content-center gap-2"
                          @click="irPredicciones(quinielaSeleccionada)"
                        >
                          <PhSoccerBall size="18" weight="fill" />
                          Predicciones
                        </button>
                      </div>

                      <div class="col-12 col-md-6">
                        <button
                          class="btn btn-outline-primary fw-bold w-100 d-flex align-items-center justify-content-center gap-2"
                          @click="irPosiciones(quinielaSeleccionada)"
                        >
                          <PhChartBar size="18" weight="fill" />
                          Posiciones
                        </button>
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

    <!-- DETALLE MOBILE -->
    <div
      class="modal fade d-xl-none"
      id="leagueDetailMobile"
      tabindex="-1"
      data-bs-backdrop="false"
    >
      <div class="modal-dialog modal-fullscreen league-detail-mobile">
        <div class="modal-content bg-black text-white border-0">
          <div
            class="modal-header border-bottom border-secondary border-opacity-25"
          >
            <div>
              <h5 class="modal-title fw-bold mb-0 text-white">
                {{ quinielaSeleccionada?.nombre }}
              </h5>
              <small class="text-white-50">
                {{ quinielaSeleccionada?.descripcionCorta }}
              </small>
            </div>

            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <div v-if="quinielaSeleccionada" class="d-flex flex-column gap-3">
              <div
                class="card bg-dark bg-opacity-75 border border-success border-opacity-25 rounded-4"
              >
                <div class="card-body text-center text-white">
                  <img
                    :src="quinielaSeleccionada.imagen"
                    :alt="quinielaSeleccionada.nombre"
                    class="detail-img border border-success border-2 mb-3"
                  />

                  <h4 class="fw-bold mb-2">
                    {{ quinielaSeleccionada.nombre }}
                  </h4>

                  <div class="d-flex justify-content-center gap-2 flex-wrap">
                    <span class="badge text-bg-success">
                      {{ quinielaSeleccionada.rol }}
                    </span>

                    <span class="badge text-bg-dark border border-secondary">
                      {{ quinielaSeleccionada.tipo }}
                    </span>

                    <span class="badge bg-warning text-dark fw-bold">
                      {{ quinielaSeleccionada.codigo }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="row g-2">
                <div class="col-6">
                  <div
                    class="card bg-dark border-secondary border-opacity-25 rounded-4 h-100"
                  >
                    <div class="card-body p-3">
                      <small
                        class="text-white-50 d-flex align-items-center gap-2 mb-1"
                      >
                        <PhUsers size="18" weight="fill" class="text-success" />
                        Participantes
                      </small>

                      <h5 class="fw-bold mb-0 text-white">
                        {{ quinielaSeleccionada.participantes }}
                      </h5>
                    </div>
                  </div>
                </div>

                <div class="col-6">
                  <div
                    class="card bg-dark border-secondary border-opacity-25 rounded-4 h-100"
                  >
                    <div class="card-body p-3">
                      <small
                        class="text-white-50 d-flex align-items-center gap-2 mb-1"
                      >
                        <PhCalendarBlank
                          size="18"
                          weight="fill"
                          class="text-info"
                        />
                        Creación
                      </small>

                      <h6 class="fw-bold mb-0 text-white">
                        {{ quinielaSeleccionada.fechaCreacion }}
                      </h6>
                    </div>
                  </div>
                </div>

                <div class="col-6">
                  <div
                    class="card bg-dark border-secondary border-opacity-25 rounded-4 h-100"
                  >
                    <div class="card-body p-3">
                      <small
                        class="text-white-50 d-flex align-items-center gap-2 mb-1"
                      >
                        <PhTrophy
                          size="18"
                          weight="fill"
                          class="text-warning"
                        />
                        Posición
                      </small>

                      <h5 class="fw-bold mb-0 text-white">
                        {{ quinielaSeleccionada.posicion }}
                      </h5>
                    </div>
                  </div>
                </div>

                <div class="col-6">
                  <div
                    class="card bg-dark border-secondary border-opacity-25 rounded-4 h-100"
                  >
                    <div class="card-body p-3">
                      <small
                        class="text-white-50 d-flex align-items-center gap-2 mb-1"
                      >
                        <PhStar size="18" weight="fill" class="text-primary" />
                        Puntos
                      </small>

                      <h5 class="fw-bold mb-0 text-white">
                        {{ quinielaSeleccionada.puntos }} pts
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="card bg-dark border-secondary border-opacity-25 rounded-4"
              >
                <div class="card-body">
                  <h6
                    class="fw-bold mb-2 text-white d-flex align-items-center gap-2"
                  >
                    <PhFileText size="18" weight="fill" class="text-primary" />
                    Descripción
                  </h6>
                  <p class="text-white-50 mb-0">
                    {{ quinielaSeleccionada.descripcion }}
                  </p>
                </div>
              </div>

              <div
                class="card bg-dark border-secondary border-opacity-25 rounded-4"
              >
                <div class="card-body">
                  <h6
                    class="fw-bold mb-3 text-white d-flex align-items-center gap-2"
                  >
                    <PhCrown size="18" weight="fill" class="text-warning" />
                    Campeón del Mundial
                  </h6>
                  <div v-if="quinielaSeleccionada.campeonElegido">
                    <span class="badge text-bg-success fs-6">
                      <img
                        v-if="quinielaSeleccionada.bandera"
                        :src="`https://flagcdn.com/w40/${quinielaSeleccionada.bandera}.png`"
                        :alt="quinielaSeleccionada.campeonElegido"
                        class="flag-icon me-1"
                      />
                      {{ quinielaSeleccionada.campeonElegido }}
                    </span>

                    <p class="text-white-50 small mt-2 mb-0">
                      Esta elección ya fue registrada y no puede modificarse.
                    </p>
                  </div>

                  <div v-else>
                    <select
                      v-model="campeonSeleccionado"
                      class="form-select bg-dark text-white border-success mb-2"
                    >
                      <option value="">Selecciona tu campeón</option>
                      <option v-for="pais in paises" :key="pais" :value="pais">
                        {{ pais }}
                      </option>
                    </select>

                    <button
                      class="btn btn-success fw-bold w-100"
                      @click="guardarCampeon"
                    >
                      Guardar campeón
                    </button>
                  </div>
                </div>
              </div>

              <div class="row g-2">
                <div class="col-6">
                  <button
                    class="btn btn-outline-success fw-bold w-100"
                    data-bs-dismiss="modal"
                    @click="irPredicciones(quinielaSeleccionada)"
                  >
                    Predicciones
                  </button>
                </div>

                <div class="col-6">
                  <button
                    class="btn btn-outline-primary fw-bold w-100"
                    data-bs-dismiss="modal"
                    @click="irPosiciones(quinielaSeleccionada)"
                  >
                    Posiciones
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import Sidebar from "@/components/dashboard/Sidebar.vue";
import UserProfile from "@/components/common/UserProfile.vue";
import BottomNav from "@/components/dashboard/BottomNav.vue";

import {
  PhArrowRight,
  PhCalendarBlank,
  PhChartBar,
  PhCheckCircle,
  PhCrown,
  PhFileText,
  PhKey,
  PhPlus,
  PhShieldCheck,
  PhSoccerBall,
  PhStar,
  PhTrophy,
  PhUsers,
} from "@phosphor-icons/vue";

const router = useRouter();
const toast = useToast();

const codigoInvitacion = ref("");
const quinielaSeleccionada = ref(null);
const campeonSeleccionado = ref("");

const paises = [
  "México",
  "Francia",
  "Brasil",
  "Argentina",
  "España",
  "Alemania",
  "Portugal",
  "Inglaterra",
];

const quinielas = ref([
  {
    id: "1",
    nombre: "Mundialito RA",
    rol: "Administrador",
    descripcionCorta: "Copa Mundial 2026",
    descripcion:
      "Quiniela oficial de amigos para el Mundial 2026. Que gane el mejor.",
    tipo: "Privada",
    codigo: "MRA2026",
    fechaCreacion: "5 de mayo de 2025",
    participantes: 12,
    posicion: "1° lugar",
    puntos: 245,
    campeonElegido: "Francia",
    bandera: "fr",
    imagen:
      "https://media.admagazine.com/photos/68d61f6167c9727d65c37b3d/16:9/w_2560%2Cc_limit/Mascotas%2520Mundial%25202026.jpg",
  },
  {
    id: "2",
    nombre: "La Quiniela del 26",
    rol: "Participante",
    descripcionCorta: "Predicciones para el Mundial 2026",
    descripcion:
      "Liga de pronósticos para el Mundial. ¡Únete y demuestra que eres el mejor analista!",
    tipo: "Pública",
    codigo: "LQ26PUBLICA",
    fechaCreacion: "10 de junio de 2025",
    participantes: 48,
    posicion: "5° lugar",
    puntos: 190,
    campeonElegido: "",
    bandera: "",
    imagen:
      "https://media.admagazine.com/photos/68d61f6167c9727d65c37b3d/16:9/w_2560%2Cc_limit/Mascotas%2520Mundial%25202026.jpg",
  },
]);

onMounted(() => {
  if (quinielas.value.length) {
    quinielaSeleccionada.value = quinielas.value[0];
  }
});

const seleccionarQuiniela = (quiniela) => {
  quinielaSeleccionada.value = quiniela;
  campeonSeleccionado.value = "";
};

const crearQuiniela = () => {
  toast.warning("Actualmente no se pueden crear nuevas ligas.", {
    timeout: 4000,
  });
};

const unirseLiga = () => {
  if (!codigoInvitacion.value.trim()) return;

  console.log("Unirse con código:", codigoInvitacion.value);
};

const irPredicciones = (quiniela) => {
  router.push({
    path: "/predicciones",
    query: {
      ligaId: quiniela.id,
      ligaNombre: quiniela.nombre,
    },
  });
};

const irPosiciones = (quiniela) => {
  router.push({
    path: "/posiciones",
    query: {
      ligaId: quiniela.id,
      ligaNombre: quiniela.nombre,
    },
  });
};

const guardarCampeon = () => {
  if (!campeonSeleccionado.value || !quinielaSeleccionada.value) return;

  quinielaSeleccionada.value.campeonElegido = campeonSeleccionado.value;
  quinielaSeleccionada.value.bandera = obtenerBandera(
    campeonSeleccionado.value,
  );
  campeonSeleccionado.value = "";
};

const obtenerBandera = (pais) => {
  const banderas = {
    México: "mx",
    Francia: "fr",
    Brasil: "br",
    Argentina: "ar",
    España: "es",
    Alemania: "de",
    Portugal: "pt",
    Inglaterra: "gb-eng",
  };

  return banderas[pais] || "un";
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.content-with-bottom-nav {
  padding-bottom: 7rem !important;
}

.league-img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 50%;
}

.flag-icon {
  width: 24px;
  height: 16px;
  object-fit: cover;
  border-radius: 2px;
}

.detail-img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 50%;
}

.detail-panel {
  top: 1rem;
}

.league-detail-mobile {
  padding-bottom: 5.5rem;
}

/* Clase para mantener el ancho exacto del sidebar cuando es fixed */
.sidebar-fixed {
  width: 16.66666667%;
  max-width: 280px;
}

@media (min-width: 768px) {
  .league-img {
    width: 95px;
    height: 95px;
  }
}

@media (min-width: 992px) {
  .content-with-bottom-nav {
    padding-bottom: 1rem !important;
  }
}
</style>
