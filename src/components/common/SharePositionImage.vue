<template>
  <div
    class="share-image text-white overflow-hidden"
    :style="{ backgroundImage: `url(${shareBg})` }"
  >
    <div class="share-border h-100 d-flex flex-column">
      <header class="text-center share-header">
        <div class="brand mb-2">
          <span>FANS<span>LEAGUE</span></span>
        </div>

        <h2 class="league-title mb-2">COPA DEL MUNDO 2026</h2>
        <p class="league-subtitle">
          {{ leagueName }}
        </p>
        <div class="quiniela-title">
          <span></span>
          <strong>QUINIELA</strong>
          <span></span>
        </div>
      </header>

      <main class="share-main flex-grow-1">
        <section class="position-side text-center">
          <p class="label-main mb-2">ESTOY EN</p>

          <div class="position-number">{{ position }}°</div>

          <p class="participants mb-4">DE {{ totalPlayers }} PARTICIPANTES</p>

          <div class="stat-box mb-3">
            <div class="stat-icon">⭐</div>
            <div>
              <div class="stat-label text-center">PUNTOS</div>
              <div class="stat-value gold text-center">{{ points }}</div>
            </div>
          </div>

          <div class="stat-box">
            <div class="stat-icon green">🎯</div>
            <div>
              <div class="stat-label text-center">EFECTIVIDAD</div>
              <div class="stat-value green-text text-center">
                {{ effectiveness }}
              </div>
            </div>
          </div>

          <div class="slogan mt-5">
            <div>¡CADA PUNTO</div>
            <strong>TE ACERCA!</strong>
          </div>
        </section>

        <section class="profile-card">
          <div class="medal-badge" :class="medalClass">
            <span>{{ medalIcon }}</span>
            <strong>#{{ position }}</strong>
          </div>
          <div class="avatar-ring">
            <img
              v-if="avatarUrl"
              :src="avatarUrl"
              class="avatar-img"
              crossorigin="anonymous"
            />

            <div v-else class="avatar-fallback">
              {{ initials }}
            </div>
          </div>

          <h1 class="user-name">{{ userName || "Participante" }}</h1>
          <p class="league-subtitle">
            {{ leagueName }}
          </p>
          <div class="profile-divider"></div>

          <div class="profile-position-label">POSICIÓN</div>
          <div class="profile-position">
            {{ position }}° de {{ totalPlayers }}
          </div>
        </section>
      </main>

      <footer class="share-footer">
        <div class="footer-copy">
          <h2>¿PODRÁS SUPERARME? 😉</h2>
          <p>DEMUESTRA QUE ERES EL MEJOR</p>
        </div>

        <div class="invite-area">
          <div v-if="inviteCode" class="invite-code">
            <span>ÚNETE USANDO EL CÓDIGO DE INVITACIÓN</span>
            <strong>{{ inviteCode }}</strong>
          </div>

          <div class="site-pill">
            <span>ÚNETE EN</span>
            <strong>fansleague.com.mx</strong>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import shareBg from "@/assets/share-bg.jpg";
const props = defineProps({
  userName: { type: String, default: "Participante" },
  avatarUrl: { type: String, default: "" },
  leagueName: { type: String, default: "Mundial RA" },
  position: { type: Number, default: 0 },
  totalPlayers: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  effectiveness: { type: String, default: "0%" },
  inviteCode: { type: String, default: "" },
});

const initials = computed(() => {
  return props.userName
    ?.split(" ")
    ?.map((n) => n[0])
    ?.join("")
    ?.substring(0, 2)
    ?.toUpperCase();
});

const medalIcon = computed(() => {
  if (props.position === 1) return "🥇";
  if (props.position === 2) return "🥈";
  if (props.position === 3) return "🥉";
  return "🏆";
});

const medalClass = computed(() => {
  if (props.position === 1) return "gold-medal";
  if (props.position === 2) return "silver-medal";
  if (props.position === 3) return "bronze-medal";
  return "default-medal";
});
</script>

<style scoped>
.share-image {
  width: 1080px;
  height: 1350px;
  position: relative;
  overflow: hidden;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.share-image::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
}

.share-border {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 2px solid rgba(242, 213, 107, 0.75);
  border-radius: 0;
  padding: 46px 54px 34px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.04), transparent 30%),
    rgba(0, 0, 0, 0.38);
  box-shadow:
    0 0 28px rgba(242, 213, 107, 0.35),
    inset 0 0 32px rgba(242, 213, 107, 0.1);
}

.share-header {
  min-height: 150px;
}

.brand {
  font-size: 46px;
  font-weight: 900;
  letter-spacing: 1px;
  font-style: italic;
}

.brand span span {
  color: #18c66a;
}

.brand-icon {
  font-style: normal;
  margin-right: 12px;
}

.league-title {
  color: #18c66a;
  font-size: 34px;
  font-weight: 900;
  letter-spacing: 4px;
  text-transform: uppercase;
}

.quiniela-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  font-size: 28px;
  letter-spacing: 18px;
}

.quiniela-title span {
  width: 58px;
  height: 2px;
  background: #18c66a;
}

.share-main {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 42px;
  align-items: center;
  margin-top: 40px;
}

.label-main {
  font-size: 33px;
  font-weight: 900;
}

.position-number {
  font-size: 180px;
  letter-spacing: -8px;
  line-height: 0.9;
  font-weight: 900;
  color: #f6c000;
  text-shadow:
    0 8px 0 #8f6500,
    0 0 22px rgba(255, 221, 77, 0.6);
}

.participants {
  font-size: 29px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.78);
}

.stat-box {
  height: 118px;
  border: 1px solid rgba(242, 213, 107, 0.25);
  border-radius: 22px;
  padding: 20px 28px;
  display: flex;
  align-items: center;
  gap: 24px;
  background: rgba(0, 0, 0, 0.42);
}

.stat-icon {
  width: 74px;
  height: 74px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 38px;
  background: rgba(242, 213, 107, 0.12);
}

.stat-icon.green {
  background: rgba(24, 198, 106, 0.14);
}

.stat-label {
  font-size: 25px;
  font-weight: 900;
}

.stat-value {
  font-size: 52px;
  font-weight: 900;
  line-height: 1;
}

.gold {
  color: #f6c000;
}

.green-text {
  color: #18c66a;
}

.slogan {
  font-size: 24px;
  font-weight: 900;
}

.slogan strong {
  display: block;
  color: #18c66a;
  font-size: 30px;
  font-style: italic;
}

.profile-card {
  min-height: 560px;
  border: 4px solid #d9b94d;
  border-radius: 46px;
  padding: 90px 38px 42px;
  text-align: center;
  position: relative;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(8px);
  box-shadow: 0 0 24px rgba(242, 213, 107, 0.25);
}

.medal-badge {
  position: absolute;
  top: -48px;
  left: 50%;
  transform: translateX(-50%);
  width: 126px;
  height: 126px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border: 6px solid rgba(255, 255, 255, 0.5);
}

.medal-badge span {
  font-size: 38px;
  line-height: 1;
}

.medal-badge strong {
  font-size: 40px;
  line-height: 1;
  font-weight: 900;
  color: #fff;
}

.gold-medal {
  background: linear-gradient(180deg, #ffd84d, #9c6b00);
  border-color: #ffe58a;
}

.silver-medal {
  background: linear-gradient(180deg, #e8e8e8, #6f7780);
  border-color: #f5f5f5;
}

.bronze-medal {
  background: linear-gradient(180deg, #d58a4a, #6f351d);
  border-color: #f4b47a;
}

.default-medal {
  background: linear-gradient(180deg, #198754, #063c27);
  border-color: #18c66a;
}

.avatar-ring {
  width: 220px;
  height: 220px;
  margin: 0 auto 32px;
  border-radius: 50%;
  border: 6px solid #e0bf55;
  padding: 6px;
  background: #111;
}

.avatar-img,
.avatar-fallback {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.avatar-img {
  object-fit: cover;
}

.avatar-fallback {
  display: grid;
  place-items: center;
  background: #198754;
  font-size: 70px;
  font-weight: 900;
}

.user-name {
  font-size: 40px;
  letter-spacing: 1px;
  line-height: 1.08;
  font-weight: 900;
  text-transform: uppercase;
}

.profile-divider {
  height: 1px;
  background: rgba(242, 213, 107, 0.42);
  margin: 32px 30px 24px;
}

.profile-position-label {
  font-size: 24px;
  color: #18c66a;
  font-weight: 900;
}

.profile-position {
  font-size: 32px;
  font-weight: 900;
}

.share-footer {
  border-top: 1px solid rgba(242, 213, 107, 0.45);
  padding-top: 28px;
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 28px;
  align-items: center;
}

.footer-copy h2 {
  font-size: 31px;
  font-weight: 900;
  margin: 0 0 8px;
}

.footer-copy p {
  color: #18c66a;
  font-size: 20px;
  font-weight: 900;
  margin: 0;
}

.invite-area {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: stretch;
}

.invite-code {
  border: none;
  border-left: 6px solid #f2d56b;
  padding: 10px 18px;
  color: #f2d56b;
  text-align: center;
  background: rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 25px rgba(242, 213, 107, 0.18);
}

.invite-code span,
.site-pill span {
  display: block;
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.72);
}

.invite-code strong {
  display: block;
  font-size: 56px;
  line-height: 1.05;
  font-weight: 900;
  letter-spacing: 2px;
}

.site-pill {
  border: 2px solid #18c66a;
  padding: 12px 22px;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
}

.site-pill strong {
  display: block;
  color: #18c66a;
  font-size: 26px;
  line-height: 1.1;
  font-weight: 900;
}

.league-subtitle {
  color: #18c66a;
  font-size: 24px;
  font-weight: 700;
  margin: -6px 0 20px;
  text-transform: uppercase;
}
</style>
