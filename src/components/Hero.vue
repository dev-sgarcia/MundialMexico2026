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
          Únete a la mejor quiniela del Mundial 2026.
          Compite con tu liga, demuestra tus conocimientos
          y vive cada partido al máximo.
        </p>

        <div class="info">
          <span>📅 11 JUN - 19 JUL 2026</span>
          <span>📍 MÉXICO, EE.UU. Y CANADÁ</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 520px;
  background: url('/src/assets/hero-bg.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  color: white;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 50, 30, 0.9) 30%,
    rgba(0, 0, 0, 0.3) 100%
  );
}

.hero-content {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-top: 120px; /* 🔥 empuja el contenido hacia abajo */
}

.left {
  max-width: 550px;
  margin-top: 20px; /* micro ajuste visual */
}

h1 {
  font-size: 28px;
  font-weight: 600;
}

h2 {
  font-size: 42px;
  font-weight: 800;
  margin-top: 10px;
}

h2 span {
  color: #ff2e2e;
}

p {
  margin-top: 15px;
  line-height: 1.5;
}

.info {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  font-size: 14px;
}

.right img {
  width: 260px;
  transform: rotate(-10deg);
}

/* Responsive */
@media (max-width: 768px) {    
  .hero {
    height: auto;
    padding: 40px 0;
  }

  .hero-content {
    flex-direction: column;
    text-align: center;
    padding-top: 100px;
  }  

  .info {
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .right img {
    margin-top: 20px;
    width: 180px;
  }

  h2 {
    font-size: 28px;
  }

  .left {
    max-width: 100%;
    padding: 0 15px;
  }  
}

.hero {
  position: relative;
  height: 520px;
  padding-bottom: 120px; /* 🔥 espacio para que las cards se monten */
}

.hero::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 100px;
  background: white;
  border-top-left-radius: 50% 40px;
  border-top-right-radius: 50% 40px;
}

h1 {
  font-size: clamp(18px, 4vw, 26px);
  font-weight: 500;
}

h2 {
  font-size: clamp(26px, 7vw, 44px);
  font-weight: 800;
  line-height: 1.1;
  word-break: break-word;  
}

h2 span {
  color: #ff2e2e;
}

p {
  font-size: 15px;
  opacity: 0.9;
}

</style>