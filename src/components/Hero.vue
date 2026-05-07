<template>
  <section class="hero">
    <div class="overlay"></div>
    <div class="container hero-content">
      <div class="left">
        <h1>LA PASIÓN NOS UNE,</h1>
        <h2>
          LA QUINIELA NOS HACE
          <span>CAMPEONES</span>
        </h2>
        <p>
          Únete a la mejor quiniela del Mundial 2026. Compite con tu liga,
          demuestra tus conocimientos y vive cada partido al máximo.
        </p>
        <div class="info">
          <span>📅 11 JUN - 19 JUL 2026</span>
          <span>📍 MÉXICO, EE.UU. Y CANADÁ</span>
        </div>
      </div>

      <div class="countdown-card">
        <div class="countdown-header">
          <div>
            <!-- <span>MUNDIAL 2026</span> -->
            <strong>COMIENZA EN</strong>
          </div>
        </div>

        <div class="countdown-grid">
          <div class="countdown-item">
            <strong>{{ timeLeft.days }}</strong>
            <small>Días</small>
          </div>

          <div class="countdown-item">
            <strong>{{ timeLeft.hours }}</strong>
            <small>Horas</small>
          </div>

          <div class="countdown-item">
            <strong>{{ timeLeft.minutes }}</strong>
            <small>Minutos</small>
          </div>

          <div class="countdown-item">
            <strong>{{ timeLeft.seconds }}</strong>
            <small>Segundos</small>
          </div>
        </div>

        <div class="countdown-footer">
          <span>📅 11 JUNIO 2026</span>
          <span>🕐 13:00 HRS</span>
          <span>📍 MÉXICO, EE.UU. Y CANADÁ</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const timeLeft = ref({
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
});

let intervalId = null;

const updateCountdown = () => {
  const targetDate = new Date("2026-06-11T13:00:00-06:00").getTime();
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    timeLeft.value = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    clearInterval(intervalId);
    return;
  }

  timeLeft.value = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, "0"),

    hours: Math.floor((distance / (1000 * 60 * 60)) % 24)
      .toString()
      .padStart(2, "0"),

    minutes: Math.floor((distance / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0"),

    seconds: Math.floor((distance / 1000) % 60)
      .toString()
      .padStart(2, "0"),
  };
};

onMounted(() => {
  updateCountdown();
  intervalId = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.hero {
  position: relative;
  height: 520px;
  padding-bottom: 120px;
  background: url("/src/assets/hero-bg.jpg") center/cover no-repeat;
  display: flex;
  align-items: center;
  color: white;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 50, 30, 0.92) 26%,
    rgba(0, 0, 0, 0.34) 58%,
    rgba(0, 0, 0, 0.15) 100%
  );
}

.hero::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 100px;
  background: white;
  border-top-left-radius: 50% 40px;
  border-top-right-radius: 50% 40px;
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: minmax(320px, 540px) minmax(300px, 400px);
  align-items: center;
  justify-content: space-between;
  gap: 42px;
  width: 100%;
}

.left {
  max-width: 550px;
  margin-top: 20px;
}

h1 {
  font-size: clamp(18px, 4vw, 26px);
  font-weight: 500;
}

h2 {
  font-size: clamp(32px, 4.8vw, 52px);
  font-weight: 900;
  line-height: 1.05;
  margin-top: 10px;
  word-break: break-word;
}

h2 span {
  display: block;
  color: #ff2e2e;
}

p {
  margin-top: 15px;
  font-size: 15px;
  line-height: 1.5;
  opacity: 0.9;
}

.info {
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  font-size: 14px;
}
.countdown-card {
  position: relative;
  width: 100%;
  max-width: 390px;
  padding: 20px 20px 18px;
  border-radius: 22px;
  background:
    radial-gradient(
      circle at top left,
      rgba(0, 255, 166, 0.2),
      transparent 38%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(255, 46, 46, 0.18),
      transparent 36%
    ),
    linear-gradient(135deg, rgba(2, 15, 26, 0.78), rgba(0, 50, 34, 0.62));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 255, 166, 0.32);
  box-shadow:
    0 18px 42px rgba(0, 0, 0, 0.45),
    0 0 30px rgba(0, 255, 166, 0.18),
    0 0 22px rgba(255, 46, 46, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  overflow: hidden;
}

.countdown-card::before {
  content: "WORLD CUP 2026";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 16px;
  border-radius: 0 0 12px 12px;
  background: linear-gradient(135deg, #00ffa6, #ffffff);
  color: #012016;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: 0.8px;
  box-shadow:
    0 6px 14px rgba(0, 0, 0, 0.26),
    0 0 14px rgba(0, 255, 166, 0.25);

  z-index: 3;
}

.countdown-header {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 18px;
}

.countdown-header span {
  display: block;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.2px;
  color: #ff2e2e;
  text-shadow: 0 0 10px rgba(255, 46, 46, 0.35);
}

.countdown-header strong {
  display: block;
  margin-top: 6px;
  font-size: clamp(20px, 2vw, 30px);
  font-weight: 950;
  line-height: 1;
  color: #ffffff;
  letter-spacing: -0.5px;
  text-shadow:
    0 0 16px rgba(255, 255, 255, 0.14),
    0 8px 24px rgba(0, 0, 0, 0.4);
}

.countdown-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.countdown-item {
  position: relative;
  text-align: center;
  padding: 12px 6px 11px;
  border-radius: 14px;
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.12),
      rgba(255, 255, 255, 0.035)
    ),
    rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(255, 59, 59, 0.18);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 10px 20px rgba(0, 0, 0, 0.25);
}

.countdown-item:nth-child(2)::after,
.countdown-item:nth-child(3)::after {
  content: ":";
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-58%);
  font-size: 34px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
  z-index: 5;
}

.countdown-item strong {
  display: block;
  font-size: clamp(22px, 2.5vw, 34px);
  font-weight: 950;
  line-height: 0.95;
  letter-spacing: -1.2px;
  color: #ffffff;
  text-shadow:
    0 0 12px rgba(255, 255, 255, 0.18),
    0 4px 10px rgba(0, 0, 0, 0.5);
}

.countdown-item small {
  display: block;
  margin-top: 6px;
  color: #2aaa55;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.7px;
}

.countdown-footer {
  position: relative;
  z-index: 2;
  margin-top: 16px;
  padding: 11px;
  border-radius: 14px;
  border: 1px solid rgba(0, 255, 166, 0.16);
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 10px;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.3px;
  color: rgba(255, 255, 255, 0.94);
}

@media (max-width: 1000px) {
  .hero {
    height: auto;
    min-height: 720px;
    padding: 70px 0 180px;
    align-items: flex-start;
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .countdown-card {
    order: -1;
    margin: 0 auto;
  }

  .left {
    order: 1;
    text-align: center;
    margin: 0 auto;
  }

  .info {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 760px;
    padding: 36px 0 210px;
  }

  .hero-content {
    padding: 0 16px;
    gap: 18px;
  }

  .countdown-card {
    max-width: 370px;
    padding: 18px 16px;
    border-radius: 20px;
  }

  .countdown-header {
    justify-content: center;
    text-align: center;
  }

  .left {
    max-width: 100%;
  }

  .left h1 {
    font-size: 18px;
  }

  .left h2 {
    font-size: clamp(28px, 8vw, 38px);
  }

  .left p {
    margin-top: 10px;
    font-size: 14px;
  }

  .info {
    margin-top: 14px;
    gap: 10px;
  }

  .countdown-grid {
    gap: 8px;
  }

  .countdown-footer {
    justify-content: center;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .hero {
    min-height: 760px;
    padding: 24px 0 230px;
  }

  .hero-content {
    gap: 16px;
  }

  .countdown-card {
    width: calc(100% - 28px);
    max-width: 340px;
    padding: 16px 14px;
    border-radius: 20px;
  }

  .countdown-header {
    margin-bottom: 14px;
    text-align: center;
  }

  .countdown-header span {
    font-size: 9px;
    letter-spacing: 0.8px;
  }

  .countdown-header strong {
    font-size: 18px;
  }

  .countdown-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }

  .countdown-item {
    padding: 10px 4px;
    border-radius: 12px;
  }

  .countdown-item:not(:last-child)::after {
    right: -7px;
    font-size: 24px;
  }

  .countdown-item strong {
    font-size: 22px;
  }

  .countdown-item small {
    margin-top: 5px;
    font-size: 8px;
  }

  .countdown-footer {
    margin-top: 12px;
    padding: 10px;
    gap: 8px;
    font-size: 9px;
  }
}
</style>
