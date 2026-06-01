<template>
  <div class="bg-black min-vh-100 text-white overflow-hidden pb-5 pb-lg-0">
    <div class="container-fluid px-0 h-100">
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
            <!-- HEADER -->
            <div class="sticky-top bg-black z-3">
              <div
                class="d-flex justify-content-between align-items-start flex-wrap gap-3"
              >
                <div>
                  <h2 class="fw-bold mb-1">Mis Quinielas</h2>
                  <p class="text-white-50">
                    Administra las ligas en las que estás participando.
                  </p>
                </div>
                <div class="mt-2 d-none d-md-block">
                  <UserProfile />
                </div>
              </div>
            </div>
            <!-- BODY -->
            <div
              class="flex-grow-1 overflow-auto overflow-x-hidden scroll-clean"
            >
              <div class="row g-3 align-items-start">
                <!-- IZQUIERDA -->
                <div class="col-12 col-xl-6">
                  <!-- UNIRSE / CREAR -->
                  <div class="row g-3 mb-3">
                    <div class="col-12 col-lg-6">
                      <div
                        class="card bg-dark bg-opacity-75 border border-success border-opacity-25 text-white rounded-4 h-100"
                      >
                        <div class="card-body d-flex flex-column h-100">
                          <div class="d-flex align-items-center gap-2 mb-2">
                            <h5 class="fw-bold mb-0">Únete a una liga</h5>
                          </div>

                          <p class="text-white-50 mb-3">
                            ¿Tienes un código de invitación? Úsalo para unirte a
                            una nueva liga.
                          </p>

                          <div class="row g-2 mt-auto">
                            <div class="col-12 col-md">
                              <input
                                v-model="codigoInvitacion"
                                type="text"
                                class="form-control bg-dark text-white border-secondary"
                                @input="
                                  codigoInvitacion = codigoInvitacion
                                    .toUpperCase()
                                    .replace(/[^A-Z0-9]/g, '')
                                "
                              />
                            </div>

                            <div class="col-12 col-md-auto">
                              <button
                                class="btn btn-outline-success fw-bold w-100 px-4 d-flex align-items-center justify-content-center gap-2"
                                @click="unirseLiga"
                              >
                                <PhArrowRight size="18" weight="bold" />
                                Unirme
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-lg-6">
                      <div
                        class="card bg-dark bg-opacity-75 border border-primary border-opacity-25 text-white rounded-4 h-100"
                      >
                        <div class="card-body d-flex flex-column h-100">
                          <h5 class="fw-bold mb-3">Crear nueva quiniela</h5>

                          <p class="text-white-50 mb-4">
                            Crea tu propia liga e invita a tus amigos.
                          </p>

                          <button
                            class="btn btn-outline-primary fw-bold d-flex align-items-center justify-content-center gap-2 mt-auto"
                            @click="crearQuiniela"
                          >
                            <PhPlus size="16" weight="bold" />
                            Crear liga
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- QUINIELAS -->
                  <h4 class="fw-bold mb-3">Quinielas activas</h4>

                  <div class="d-flex flex-column gap-3">
                    <div
                      v-for="quiniela in quinielas"
                      :key="quiniela.id"
                      class="card bg-dark bg-opacity-75 border border-secondary border-opacity-25 text-white rounded-4 cursor-pointer"
                      :class="{
                        'border-success border-opacity-75 shadow':
                          quinielaSeleccionada?.id === quiniela.id,
                      }"
                      @click="seleccionarQuiniela(quiniela)"
                    >
                      <div class="card-body">
                        <div class="row g-3 align-items-center">
                          <div class="col-12 col-md-auto text-center">
                            <img
                              :src="quiniela.imagen"
                              :alt="quiniela.nombre"
                              class="league-img border border-success border-2"
                            />
                          </div>

                          <div class="col">
                            <div
                              class="d-flex align-items-center gap-2 mb-1 flex-wrap"
                            >
                              <h5 class="fw-bold mb-0">
                                {{ quiniela.nombre }}
                              </h5>

                              <span class="badge text-bg-success">
                                {{ quiniela.rol }}
                              </span>
                            </div>

                            <p class="text-white-50 mb-2">
                              {{ quiniela.descripcionCorta }} ·
                              {{ quiniela.tipo }}
                            </p>

                            <div
                              class="d-flex flex-wrap gap-3 text-white-50 small mb-3"
                            >
                              <span class="d-flex align-items-center gap-1">
                                <PhUsers
                                  size="17"
                                  weight="fill"
                                  class="text-primary"
                                />
                                {{ quiniela.participantes }} participantes
                              </span>

                              <span class="d-flex align-items-center gap-1">
                                <PhCalendarBlank
                                  size="17"
                                  weight="fill"
                                  class="text-info"
                                />
                                {{ quiniela.fechaCreacion }}
                              </span>

                              <span class="d-flex align-items-center gap-1">
                                <PhKey
                                  size="17"
                                  weight="fill"
                                  class="text-warning"
                                />
                                {{ quiniela.codigo }}
                              </span>
                            </div>

                            <div
                              class="bg-black bg-opacity-25 border border-secondary border-opacity-25 rounded-3 p-3"
                            >
                              <div
                                v-if="quiniela.campeonElegido"
                                class="d-flex align-items-center gap-2 flex-wrap"
                              >
                                <PhCrown
                                  size="18"
                                  weight="fill"
                                  class="text-warning"
                                />
                                <span class="text-white-50"
                                  >Campeón elegido:</span
                                >
                                <strong>{{ quiniela.campeonElegido }}</strong>
                                <img
                                  v-if="quiniela.bandera"
                                  :src="`https://flagcdn.com/w40/${quiniela.bandera}.png`"
                                  :alt="quiniela.campeonElegido"
                                  class="flag-icon"
                                />
                              </div>

                              <div
                                v-else
                                class="d-flex align-items-center gap-2 text-warning"
                              >
                                <PhWarningCircle size="18" weight="fill" />
                                Aún no has elegido campeón
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- DERECHA -->
                <div class="col-12 col-xl-6">
                  <div
                    v-if="quinielaSeleccionada"
                    class="card bg-dark bg-opacity-75 border border-secondary border-opacity-25 text-white rounded-4 sticky-xl-top detail-panel"
                  >
                    <div class="card-body">
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
                                class="text-primary"
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
                              Tipo de liga
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
                              Posición actual
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
                                class="text-success"
                              />
                              Puntos actuales
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
                        <h5
                          class="fw-bold mb-3 d-flex align-items-center gap-2"
                        >
                          <PhCrown
                            size="21"
                            weight="fill"
                            class="text-warning"
                          />
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

                  <div
                    v-else
                    class="card bg-dark bg-opacity-75 border border-secondary border-opacity-25 text-white rounded-4"
                  >
                    <div class="card-body text-center py-5">
                      <p class="text-white-50 mb-0">
                        Selecciona una quiniela para ver su información.
                      </p>
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import UserProfile from "@/components/common/UserProfile.vue";
import { useToast } from "vue-toastification";
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
  PhPlusCircle,
  PhShieldCheck,
  PhSignIn,
  PhSoccerBall,
  PhStar,
  PhTrophy,
  PhUsers,
  PhUsersThree,
  PhWarningCircle,
} from "@phosphor-icons/vue";

const router = useRouter();

const codigoInvitacion = ref("");
const quinielaSeleccionada = ref(null);
const campeonSeleccionado = ref("");

const toast = useToast();

const crearQuiniela = () => {
  toast.warning("Actualmente no se pueden crear nuevas ligas.", {
    timeout: 4000,
  });
};

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

.league-img {
  width: 95px;
  height: 95px;
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

.scroll-clean {
  scrollbar-width: none;
}

.scroll-clean::-webkit-scrollbar {
  display: none;
}
</style>
