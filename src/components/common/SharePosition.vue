<template>
  <div
    id="share-card"
    class="card border-0 shadow-lg overflow-hidden share-card"
  >
    <div class="card-body text-center text-white d-flex flex-column">
      <div class="share-header">
        <h5 class="fw-bold text-uppercase mb-0">FansLeague</h5>
        <small class="text-white-50">Quiniela Mundial 2026</small>
      </div>

      <div class="share-position">
        <div class="share-medal">{{ medal }}</div>

        <h2 class="fw-bold mb-0">{{ position }}°</h2>
        <p class="text-white-50 mb-0">de {{ totalPlayers }} participantes</p>
      </div>

      <div class="share-user">
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          alt="Avatar"
          class="rounded-circle border border-3 border-warning object-fit-cover share-avatar"
        />

        <div
          v-else
          class="rounded-circle bg-secondary d-inline-flex align-items-center justify-content-center fw-bold share-avatar"
        >
          {{ initials }}
        </div>

        <h4 class="fw-bold mb-1 mt-3">{{ userName }}</h4>
        <p class="text-white-50 mb-0">{{ leagueName }}</p>
      </div>

      <div class="row g-2 share-stats">
        <div class="col-6">
          <div class="bg-dark bg-opacity-50 rounded-4 p-3">
            <div class="small text-white-50">Puntos</div>
            <div class="fw-bold text-warning share-stat-number">
              {{ points }}
            </div>
          </div>
        </div>

        <div class="col-6">
          <div class="bg-dark bg-opacity-50 rounded-4 p-3">
            <div class="small text-white-50">Efectividad</div>
            <div class="fw-bold text-success share-stat-number">
              {{ effectiveness }}
            </div>
          </div>
        </div>
      </div>

      <div class="share-cta border-top border-light border-opacity-25">
        <h6 class="fw-bold mb-1">⚽ ¿Podrás superarme?</h6>

        <div
          v-if="inviteCode"
          class="badge bg-warning text-dark px-3 py-2 mb-2 share-code"
        >
          Código: {{ inviteCode }}
        </div>

        <div class="fw-bold text-success small">fansleague.com.mx</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  userName: {
    type: String,
    default: "",
  },
  avatarUrl: {
    type: String,
    default: "",
  },
  leagueName: {
    type: String,
    default: "",
  },
  position: {
    type: Number,
    default: 0,
  },
  totalPlayers: {
    type: Number,
    default: 0,
  },
  points: {
    type: Number,
    default: 0,
  },
  effectiveness: {
    type: String,
    default: "0%",
  },
  inviteCode: {
    type: String,
    default: "",
  },
});

const initials = computed(() => {
  return props.userName
    ?.split(" ")
    ?.map((n) => n[0])
    ?.join("")
    ?.substring(0, 2)
    ?.toUpperCase();
});

const medal = computed(() => {
  if (props.position === 1) return "🥇";
  if (props.position === 2) return "🥈";
  if (props.position === 3) return "🥉";
  return "🏆";
});
</script>

<style scoped>
.share-card .card-body {
  height: 100%;
  padding: 0.85rem;
  gap: 0.35rem;
}

.share-header h5 {
  font-size: 0.9rem;
}

.share-header small,
.share-position p,
.share-user p {
  font-size: 0.72rem;
}

.share-medal {
  font-size: 2.6rem;
  line-height: 1;
}

.share-position h2 {
  font-size: 1.7rem;
}

.share-avatar {
  width: 62px;
  height: 62px;
  font-size: 1.4rem;
}

.share-user h4 {
  font-size: 1rem;
}

.share-stat-number {
  font-size: 1.25rem;
}

.share-cta {
  padding-top: 0.55rem;
  margin-top: auto;
}

.share-cta h6 {
  font-size: 0.9rem;
}

.share-code {
  font-size: 0.75rem;
}
</style>
