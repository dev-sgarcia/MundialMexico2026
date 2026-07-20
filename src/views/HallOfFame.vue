<template>
  <div class="bg-black text-white pb-5 pb-lg-0 vip-page">
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
                <h2
                  class="fw-bold mb-1 d-flex align-items-center gap-2 text-warning"
                >
                  <PhStar weight="fill" />Salón de la Fama
                </h2>
                <p class="text-white-50 mb-0">
                  Ranking final de todas las quinielas para:
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

                <!-- NUEVO BANNER -->
                <div class="fase-banner">
                  <div class="fase-info">
                    <div class="fase-titulo">¡FELICIDADES CAMPEONES!</div>
                    <div class="fase-texto">
                      {{
                        faseActual == "grupos"
                          ? "."
                          : faseActual == "finalistas"
                            ? "Este es el espacio de los ganadores de la quiniela del Mundial México 2026. Queremos agradecerles por confiar, participar y vivir la pasión del fútbol con nosotros. ¡Los esperamos en la próxima quiniela!"
                            : "."
                      }}
                    </div>
                  </div>
                </div>
              </div>
              <PageHeader />
            </div>

            <!-- Inicio de la condición v-if para faseActual !== 'llaves' -->
            <div v-if="faseActual !== 'llaves'">
              <!--1 TOP 3 PODIO -->
              <section v-if="topGrupos.length" class="mb-4">
                <div
                  class="card bg-dark text-white border border-success border-opacity-25 rounded-4 shadow-sm overflow-hidden"
                >
                  <div class="card-body p-3 p-md-4">
                    <div
                      class="d-flex justify-content-between align-items-center mb-3"
                    >
                      <div class="d-flex align-items-center gap-2">
                        <span class="fs-4">🏆</span>
                        <h5
                          class="mb-0 fw-bold text-primary text-uppercase"
                          style="letter-spacing: 0.4px"
                        >
                          FASE DE GRUPOS
                        </h5>
                      </div>

                      <span class="hall-badge hall-badge-free"> 👁 Free </span>
                    </div>
                    <div
                      class="row g-2 align-items-end justify-content-center mx-auto top-three-row"
                    >
                      <div
                        v-for="jugador in topGrupos"
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

                            'top-player-second border border-light border-opacity-25':
                              jugador.posicion === 2,

                            'top-player-third border border-warning border-opacity-25':
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
                            :src="jugador.avatar_url || avatarNull"
                            :alt="jugador.nombre"
                            class="top-player-avatar rounded-circle border mb-2"
                            :class="{
                              'border-warning': jugador.posicion === 1,
                              'border-light': jugador.posicion === 2,
                              'border-warning border-opacity-25': jugador.posicion === 3,
                            }"
                            @error="avatarError"
                          />                          
                          
                          <h6 class="fw-bold mb-1 text-truncate text-white">
                            {{ jugador.nombre }}
                          </h6>

                          <div class="fw-bold">
                            <span
                              :class="{
                                'fs-4': jugador.posicion === 1,
                                'fs-5': jugador.posicion !== 1,
                              }"
                              class="score-blue"
                            >
                              {{ jugador.puntos }}
                            </span>
                            <small class="text-white-50 ms-1">pts</small>
                          </div>
                          <div class="top-player-stats">
                            <span>
                              Aciertos:
                              <strong>{{ jugador.aciertos }}</strong>
                            </span>
                            <span class="mx-2 text-white-50">|</span>
                            <span>
                              Exactos:
                              <strong>{{ jugador.exactos }}</strong>
                            </span>
                          </div>
                          <!-- <div class="fw-bold">
                            <span
                              :class="{
                                'fs-4': jugador.posicion === 1,
                                'fs-5': jugador.posicion !== 1,
                                'text-gold': jugador.has_paid,
                                'text-white': !jugador.has_paid,
                              }"
                            >
                              {{ jugador.puntos }}
                            </span>
                            <small class="text-white-50"> pts</small>
                          </div> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!--2 TOP 3 PODIO -->
              <section v-if="topFinalistas.length" class="mb-4">
                <!-- <div
                class="card bg-dark text-white border border-primary border-opacity-50 rounded-4 shadow-sm overflow-hidden"
                >                 -->
                <div
                  class="card bg-dark text-white border border-success border-opacity-25 rounded-4 shadow-sm overflow-hidden"
                >
                  <div class="card-body p-3 p-md-4">
                    <div
                      class="d-flex justify-content-between align-items-center mb-3"
                    >
                      <div class="d-flex align-items-center gap-2">
                        <span class="fs-4">🏆</span>
                        <h5
                          class="mb-0 fw-bold text-primary text-uppercase"
                          style="letter-spacing: 0.4px"
                        >
                          FASE FINALISTAS
                        </h5>
                      </div>
                      <span class="hall-badge hall-badge-free"> 👁 Free </span>
                    </div>

                    <div
                      class="row g-2 align-items-end justify-content-center mx-auto top-three-row"
                    >
                      <div
                        v-for="jugador in topFinalistas"
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

                            'top-player-second border border-light border-opacity-25':
                              jugador.posicion === 2,

                            'top-player-third border border-warning border-opacity-25':
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
                            :src="jugador.avatar_url || avatarNull"
                            :alt="jugador.nombre"
                            class="top-player-avatar rounded-circle border mb-2"
                            :class="{
                              'border-warning': jugador.posicion === 1,
                              'border-light': jugador.posicion === 2,
                              'border-warning border-opacity-25': jugador.posicion === 3,
                            }"
                            @error="avatarError"
                          />                          


                          <h6
                            class="fw-bold mb-1 text-truncate"
                            :class="
                              jugador.has_paid ? 'text-gold' : 'text-white'
                            "
                          >
                            {{ jugador.nombre }}
                          </h6>
                          <div class="mt-2 w-100 text-center">
                            <div class="hall-stat">
                              <div class="hall-stat-title">Pronósticos</div>
                              <div class="hall-stat-value">
                                {{ jugador.pronosticos_pts }} pts
                              </div>
                            </div>

                            <div class="hall-stat">
                              <div class="hall-stat-title">Bonus</div>
                              <div
                                class="hall-stat-value"
                                :class="
                                  jugador.bonus_campeon > 0
                                    ? 'text-success'
                                    : 'text-secondary'
                                "
                              >
                                +{{ jugador.bonus_campeon }}
                              </div>
                            </div>

                            <div class="hall-stat">
                              <div class="hall-stat-title">Campeón</div>
                              <div class="hall-stat-value">
                                {{ jugador.bonus_campeon > 0 ? "10" : "0" }}
                              </div>
                            </div>

                            <hr class="hall-divider my-2" />

                            <div class="hall-total-title">TOTAL</div>

                            <div
                              class="hall-total score-blue pb-2"
                              :class="{
                                'fs-3': jugador.posicion === 1,
                                'fs-4': jugador.posicion !== 1,
                              }"
                            >
                              {{ jugador.puntos }}
                              <small class="text-white-50 ms-1">pts</small>
                            </div>

                            <!-- <div
                              class="hall-total text-warning pb-2"
                              :class="{
                                'fs-3': jugador.posicion === 1,
                                'fs-4': jugador.posicion !== 1,
                              }"
                            >
                              {{ jugador.puntos }}
                              <small class="text-white-50 ms-1">pts</small>
                            </div> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!--3 TOP 3 PODIO -->
              <section v-if="soyVip && topVipGrupos.length" class="mb-4">
                <div
                  class="card hall-card-vip bg-dark text-white rounded-4 shadow-sm overflow-hidden"
                >
                  <div class="card-body p-3 p-md-4">
                    <div
                      class="d-flex justify-content-between align-items-center mb-3"
                    >
                      <div class="d-flex align-items-center gap-2">
                        <span class="fs-4">⭐</span>

                        <h5
                          class="mb-0 fw-bold text-warning text-uppercase"
                          style="letter-spacing: 0.4px"
                        >
                          FASE DE GRUPOS
                        </h5>
                      </div>
                      <span class="hall-badge hall-badge-vip">
                        <i class="bi bi-lock-fill me-1"></i>
                        <span>🔒 VIP</span>
                      </span>
                    </div>

                    <div
                      class="row g-2 align-items-end justify-content-center mx-auto top-three-row"
                    >
                      <div
                        v-for="jugador in topVipGrupos"
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

                            'top-player-second border border-light border-opacity-25':
                              jugador.posicion === 2,

                            'top-player-third border border-warning border-opacity-25':
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
                              'border-warning border-opacity-25':
                                jugador.posicion === 3,
                            }"
                          />
                          <img
                            v-else
                            src="@/assets/avatar-null.png"
                            :alt="jugador.nombre"
                            class="top-player-avatar rounded-circle border mx-auto mb-2 bg-dark p-1"
                            :class="{
                              'border-warning': jugador.posicion === 1,
                              'border-light': jugador.posicion === 2,
                              'border-warning border-opacity-25':
                                jugador.posicion === 3,
                            }"
                            style="object-fit: contain"
                          />

                          <h6 class="fw-bold mb-1 text-truncate text-white">
                            {{ jugador.nombre }}
                          </h6>

                          <div class="fw-bold">
                            <span
                              :class="{
                                'fs-4': jugador.posicion === 1,
                                'fs-5': jugador.posicion !== 1,
                              }"
                              class="text-gold"
                            >
                              {{ jugador.puntos }}
                            </span>

                            <small class="text-white-50 ms-1">pts</small>
                          </div>

                          <div class="top-player-stats">
                            <span>
                              Aciertos:
                              <strong>{{ jugador.aciertos }}</strong>
                            </span>

                            <span class="mx-2 text-white-50">|</span>

                            <span>
                              Exactos:
                              <strong>{{ jugador.exactos }}</strong>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!--4 TOP 3 PODIO -->
              <section v-if="soyVip && topVipFinalistas.length" class="mb-4">
                <!-- <div class="card bg-dark text-white border border-success border-opacity-25 rounded-4 shadow-sm overflow-hidden"> -->
                <div
                  class="card hall-card-vip bg-dark text-white rounded-4 shadow-sm overflow-hidden"
                >
                  <div class="card-body p-3 p-md-4">
                    <div
                      class="d-flex justify-content-between align-items-center mb-3"
                    >
                      <div class="d-flex align-items-center gap-2">
                        <span class="fs-4">⭐</span>
                        <h5
                          class="mb-0 fw-bold text-warning text-uppercase"
                          style="letter-spacing: 0.4px"
                        >
                          FASE FINALISTAS
                        </h5>
                      </div>

                      <span class="hall-badge hall-badge-vip">
                        <i class="bi bi-lock-fill me-1"></i>
                        <span>🔒 VIP</span>
                      </span>
                    </div>

                    <div
                      class="row g-2 align-items-end justify-content-center mx-auto top-three-row"
                    >
                      <div
                        v-for="jugador in topVipFinalistas"
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

                            'top-player-second border border-light border-opacity-25':
                              jugador.posicion === 2,

                            'top-player-third border border-warning border-opacity-25':
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
                              'border-warning border-opacity-25':
                                jugador.posicion === 3,
                            }"
                          />
                          <img
                            v-else
                            src="@/assets/avatar-null.png"
                            :alt="jugador.nombre"
                            class="top-player-avatar rounded-circle border mx-auto mb-2 bg-dark p-1"
                            :class="{
                              'border-warning': jugador.posicion === 1,
                              'border-light': jugador.posicion === 2,
                              'border-warning border-opacity-25':
                                jugador.posicion === 3,
                            }"
                            style="object-fit: contain"
                          />

                          <h6
                            class="fw-bold mb-1 text-truncate"
                            :class="
                              jugador.has_paid ? 'text-gold' : 'text-white'
                            "
                          >
                            {{ jugador.nombre }}
                          </h6>

                          <div class="mt-2 w-100 text-center">
                            <div class="hall-stat">
                              <div class="hall-stat-title">Pronósticos</div>
                              <div class="hall-stat-value">
                                {{ jugador.pronosticos_pts }} pts
                              </div>
                            </div>

                            <div class="hall-stat">
                              <div class="hall-stat-title">Bonus</div>
                              <div
                                class="hall-stat-value"
                                :class="
                                  jugador.bonus_campeon > 0
                                    ? 'text-success'
                                    : 'text-secondary'
                                "
                              >
                                +{{ jugador.bonus_campeon }}
                              </div>
                            </div>

                            <div class="hall-stat">
                              <div class="hall-stat-title">Campeón</div>
                              <div class="hall-stat-value">
                                {{ jugador.bonus_campeon > 0 ? "10" : "0" }}
                              </div>
                            </div>

                            <hr class="hall-divider mt-2 mb-3" />

                            <div class="hall-total-title">TOTAL</div>

                            <div
                              class="hall-total text-warning pb-2"
                              :class="{
                                'fs-3': jugador.posicion === 1,
                                'fs-4': jugador.posicion !== 1,
                              }"
                            >
                              {{ jugador.puntos }}
                              <small class="text-white-50 ms-1">pts</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!--5 TOP 3 LLAVES -->
              <section v-if="topGrupos.length" class="mb-4">
                <div
                  class="card hall-card-vip bg-dark text-white rounded-4 shadow-sm overflow-hidden"
                >
                  <div class="card-body p-3 p-md-4">
                    <div
                      class="d-flex justify-content-between align-items-center mb-3"
                    >
                      <div class="d-flex align-items-center gap-2">
                        <span class="fs-4">🏆</span>
                        <h5
                          class="mb-0 fw-bold text-warning text-uppercase"
                          style="letter-spacing: 0.4px"
                        >
                          GANADOR LLAVES
                        </h5>
                      </div>

                      <span class="hall-badge hall-badge-vip">
                        <i class="bi bi-lock-fill me-1"></i>
                        <span>🔒 VIP</span>
                      </span>
                    </div>

                    <div class="hall-of-fame-container">
                      <div
                        v-for="item in hallOfFameOrdenado"
                        :key="item.posicion"
                        class="hall-card border"
                        :class="{
                          'border-warning border-opacity-35':
                            item.posicion === 1,
                          'border-light border-opacity-25': item.posicion === 2,
                          'border-bronze': item.posicion === 3,
                        }"
                      >
                        <div class="mb-2 fs-2">
                          {{
                            item.posicion === 1
                              ? "🥇"
                              : item.posicion === 2
                                ? "🥈"
                                : "🥉"
                          }}
                        </div>

                        <div class="fw-bold text-warning mb-2">
                          {{
                            item.posicion === 1
                              ? "Campeón"
                              : item.posicion === 2
                                ? "Subcampeón"
                                : "3er Lugar"
                          }}
                        </div>

                        <template v-if="item.orden != 0">
                          <img
                            :src="`https://flagcdn.com/w80/${item.team_code}.png`"
                            class="hall-flag mb-2"
                          />
                        </template>

                        <template v-else>
                          <div class="display-5 mb-2">🏆</div>
                        </template>

                        <div class="fw-bold">
                          {{
                            item.orden == 0 ? "Por definirse" : item.team_name
                          }}
                        </div>

                        <img
                          v-if="item.orden != 0"
                          :src="item.avatar_url || avatarNull"
                          :alt="item.nombre"
                          class="hall-avatar mt-3 mb-2"
                          @error="avatarError"
                        />                        
                        <!-- <div class="small"> -->
                        <div class="hall-player-name">
                          {{ item.orden == 0 ? "" : item.nombre }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>

    <div class="share-export-hidden">
      <SharePositionImage
        ref="shareImageRef"
        :user-name="miNombre"
        :avatar-url="miAvatar"
        :points="misPuntos"
        :invite-code="codigoInvitacion"
        :league-name="nombreQuinielaActiva"
        :position="miPosicion"
        :total-players="totalParticipantes"
        :effectiveness="miEfectividad"
      />
    </div>
    <BottomNav />
  </div>


<SharePodium
  titulo="FASE DE GRUPOS"
  tipo="FREE"
  color="#3b82f6"
  :jugadores="topGrupos"
/>
<!-- <SharePodium
    titulo="FASE DE GRUPOS"
    tipo="FREE"
    :jugadores="topGrupos"
    style="position:relative;left:0;"
/> -->

<SharePodium
    titulo="FASE ELIMINATORIAS"
    tipo="VIP"
    color="#facc15"
    :jugadores="topFinalistas"
/>

<SharePodium
    titulo="GANADOR DE LLAVES"
    tipo="VIP"
    color="#22c55e"
    :jugadores="topLlaves"
/>

</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import BottomNav from "@/components/dashboard/BottomNav.vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import PageHeader from "@/components/common/PageHeader.vue";
import SharePositionImage from "@/components/common/SharePositionImage.vue";

import avatarNull from "@/assets/avatar-null.png";
const avatarError = (event) => {
  event.target.src = avatarNull;
};

import {
  PhCrown,
  PhLightning,
  PhMagnifyingGlass,
  PhMedal,
  PhShareFat,
  PhRanking,
  PhTarget,
  PhUser,
} from "@phosphor-icons/vue";

import { useRouter, useRoute } from "vue-router";
import { supabase } from "@/supabaseClient";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import SharePodium from "@/components/SharePodium.vue";

const topGrupos = ref([]);
const topFinalistas = ref([]);
const topVipGrupos = ref([]);
const topVipFinalistas = ref([]);
const hallOfFame = ref([]);

const shareImageRef = ref(null);

// Fase seleccionada
//const faseActual = ref("grupos");
const faseActual = ref("finalistas");

const router = useRouter();
const route = useRoute();

// Variables para filtrado y ordenamiento
const search = ref("");
const sortBy = ref("puntos"); // Por defecto ordenamos por puntos

const miCampeon = ref("");
const miCodigoCampeon = ref("");

const estadoCampeon = ref("activo");

const currentPage = ref(1);
const itemsPerPage = 7;

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

// Datos para compartir
const miNombre = ref("Participante");
const miAvatar = ref("");
const misPuntos = ref(0);
const codigoInvitacion = ref("");

const tablaPosiciones = ref([]);

const knockoutMatches = ref([]);
const soyVip = ref(false);

const hallOfFameOrdenado = computed(() => {
  return [
    hallOfFame.value.find((x) => x.posicion === 2),
    hallOfFame.value.find((x) => x.posicion === 1),
    hallOfFame.value.find((x) => x.posicion === 3),
  ].filter(Boolean);
});

const cargarSalonFama = async () => {
  if (!idLigaActiva.value || idLigaActiva.value === "null") return;
  try {
    // Obtener usuarios VIP
    const { data: vipUsers, error: errorVip } = await supabase
      .from("league_members")
      .select("user_id")
      .eq("league_id", idLigaActiva.value)
      .eq("is_vip", true);

    const vipIds = vipUsers.map((v) => v.user_id);

    const registroUsuario = vipUsers.find((x) => x.user_id === userId.value);
    soyVip.value = !!registroUsuario;

    //----------------------------------------
    // GENERAL FINALISTAS
    //----------------------------------------
    const { data, error } = await supabase
      .from("vw_hall_of_fame")
      .select("*")
      .eq("league_id", idLigaActiva.value)
      .order("categoria")
      .order("puntos", { ascending: false })
      .order("exactos", { ascending: false })
      .order("ultima_actualizacion", { ascending: true });

    if (error) throw error;

    const grupos = data.filter((j) => j.categoria === "GRUPOS");
    const finalistas = data.filter((j) => j.categoria === "FINALISTAS");
    //----------------------------------------
    // GENERAL GRUPOS
    //----------------------------------------
    topGrupos.value = grupos.slice(0, 3);

    //----------------------------------------
    // VIP GRUPOS
    //----------------------------------------
    topVipGrupos.value = grupos.filter((j) => j.is_vip).slice(0, 3);

    //----------------------------------------
    // GENERAL FINALISTAS
    //----------------------------------------
    topFinalistas.value = finalistas.slice(0, 3);

    //----------------------------------------
    // VIP FINALISTAS
    //----------------------------------------
    topVipFinalistas.value = finalistas.filter((j) => j.is_vip).slice(0, 3);
  } catch (err) {
    console.error("Error al cargar Salón de la Fama:", err);
  }
};

const cargarHallOfFameBracket = async () => {
  if (!idLigaActiva.value || idLigaActiva.value === "null") return;
  try {
    const { data, error } = await supabase
      .from("vw_hall_of_fame_bracket")
      .select("*")
      .eq("league_id", idLigaActiva.value);
    if (error) throw error;
    hallOfFame.value = data;
  } catch (err) {
    console.error("Error al cargar Hall Of Fame Bracket:", err);
  }
};

const cargarLlaves = async () => {
  try {
    const { data, error } = await supabase
      .from("vw_knockout_matches")
      .select("*")
      .order("id");
    if (error) throw error;
    knockoutMatches.value = data || [];
  } catch (error) {
    console.error("Error al cargar las llaves:", error);
  }
};

const cargarMiCampeon = async () => {
  const { data } = await supabase
    .from("league_members")
    .select("champion_team")
    .eq("league_id", idLigaActiva.value)
    .eq("user_id", userId.value)
    .single();

  if (!data) return;

  miCodigoCampeon.value = data.champion_team;
  miCampeon.value = equipos[data.champion_team] || data.champion_team;
};

const cargarEstadoCampeon = async () => {
  if (!miCampeon.value) return;
  const { data, error } = await supabase
    .from("vw_equipos_vivos")
    .select("team_name")
    .eq("team_name", miCampeon.value)
    .maybeSingle();
  if (error) {
    console.error(error);
    return;
  }
  estadoCampeon.value = data ? "activo" : "eliminado";
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

  miNombre.value =
    session.user.user_metadata?.full_name ||
    session.user.user_metadata?.name ||
    session.user.email ||
    "Participante";

  miAvatar.value = session.user.user_metadata?.avatar_url || "";

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

  await cargarSalonFama();
  await cargarHallOfFameBracket();
});

const compartirPosicion = async () => {
  if (!shareImageRef.value) return;

  if (miAvatar.value?.includes("googleusercontent")) {
    miAvatar.value = "";
  }

  const element = shareImageRef.value.$el;

  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 1.5,
    useCORS: true,
    width: 1080,
    height: 1350,
    windowWidth: 1080,
    windowHeight: 1350,
  });

  canvas.toBlob(
    async (blob) => {
      if (!blob) return;

      const file = new File([blob], "mi-posicion-fansleague.jpg", {
        type: "image/jpeg",
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Mi posición en FansLeague",
          text: `🏆 Voy ${miPosicion.value}° de ${totalParticipantes.value} en ${nombreQuinielaActiva.value}. ⚽ ¿Crees poder alcanzarme? Únete a mi *QUINIELA* en 👉 https://fansleague.com.mx usando el código ${codigoInvitacion.value}`,
        });
      } else {
        const link = document.createElement("a");
        link.download = "mi-posicion-fansleague.jpg";
        link.href = URL.createObjectURL(blob);
        link.click();
      }
    },
    "image/jpeg",
    0.7,
  );
};
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

.share-export-hidden {
  position: fixed;
  left: -99999px;
  top: -99999px;
  pointer-events: none;
}

.text-gold {
  color: #ffd700 !important; /* Tono dorado. Puedes usar #ffc107 si prefieres el de Bootstrap */
}

/*==================================
    BANNER DE LA FASE
===================================*/
.fase-banner {
  margin-top: 20px;
  padding: 18px;
  border-radius: 18px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.02)
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.fase-titulo {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
}

.fase-texto {
  margin-top: 8px;
  color: #cfcfcf;
  line-height: 1.5;
}

.vip-page {
  background: #000;
  min-height: 100dvh;
  min-height: 100vh;
}

.bracket-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}

.hall-badge {
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
}

.hall-badge-free {
  background: rgba(33, 150, 243, 0.15);
  color: #6bb8ff;
  border: 1px solid rgba(33, 150, 243, 0.35);
}

.hall-badge-vip {
  background: rgba(255, 193, 7, 0.15);
  color: #ffd54a;
  border: 1px solid rgba(255, 193, 7, 0.35);
}

.hall-card-vip {
  border: 1px solid rgba(255, 193, 7, 0.3);
  background: linear-gradient(
    180deg,
    rgba(255, 193, 7, 0.05),
    rgba(18, 18, 18, 1) 35%
  );
  transition: 0.25s;
}

/* Para el hover de los VIP*/
.hall-card-vip:hover {
  border-color: #d4af37;
  box-shadow: 0 0 28px rgba(212, 175, 55, 0.22);
}

.hall-divider {
  border-color: rgba(255, 255, 255, 0.08);
  margin-top: 1.4rem;
  margin-bottom: 1rem;
}

.hall-summary {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.hall-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  color: #d7d7d7;
}

.hall-total {
  margin-top: 0.4rem;
  padding-top: 0.75rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.15);
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
}

.hall-player-stats {
  margin-top: 14px;
  font-size: 0.82rem;
}

.hall-stat-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
  color: #d7d7d7;
}

.hall-player-divider {
  border-color: rgba(255, 255, 255, 0.1);
  margin: 0.45rem 0;
}

.hall-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
}

.hall-of-fame-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 18px;
}

.hall-card {
  width: 220px;
  min-height: 360px;
  padding: 18px;
  border-radius: 16px;
  background: #2a2a2a;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hall-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.15);
}

.hall-flag {
  width: 64px;
  height: 44px;
  object-fit: cover;
  border-radius: 4px;
}

.champion-card {
  min-height: 385px;
  border: 2px solid #ffc107;
  box-shadow: 0 0 18px rgba(255, 193, 7, 0.25);
}

.hall-player-name {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.9rem;
  line-height: 1.2;
}

@media (max-width: 576px) {
  .hall-of-fame-container {
    justify-content: center;
    gap: 8px;
  }

  .vip-desktop {
    display: none;
  }

  .vip-mobile {
    display: inline;
  }

  .hall-card {
    width: 105px;
    padding: 10px 6px;
  }

  .champion-card {
    width: 115px;
  }

  .hall-flag {
    width: 42px;
    height: 28px;
  }

  .hall-avatar {
    width: 52px;
    height: 52px;
  }

  .hall-player-name {
    font-size: 0.78rem;
    line-height: 1.1;
    word-break: break-word;
  }

  .hall-card .fw-bold {
    font-size: 0.9rem;
  }

  .hall-card .small {
    font-size: 0.72rem;
  }

  .hall-badge-vip {
    font-size: 0.75rem;
    padding: 0.35rem 0.6rem;
  }
}

.hall-player-name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
}

.hall-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
}

.hall-player-name {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: 34px;

  text-align: center;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .solo-para {
    display: none;
  }
}

.hall-total {
  white-space: nowrap;
  font-size: 2rem;
  font-weight: bold;
}

.hall-stat {
  text-align: center;
  margin-bottom: 0.7rem;
}

.hall-stat-title {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.hall-stat-value {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.hall-total-title {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}

.hall-total {
  text-align: center;
  font-weight: 800;
  line-height: 1;
}

.border-bronze {
  border-color: rgba(205, 127, 50, 0.25) !important;
}

.top-player-stats {
  margin-top: 6px;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.75);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.top-player-stats strong {
  color: #fff;
  font-weight: 700;
}

.score-blue {
  color: #3b82f6;
}





</style>
