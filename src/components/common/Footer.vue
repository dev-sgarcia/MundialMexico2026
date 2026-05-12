<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="brand">
        <h2>QUINIELA 2026</h2>
        <p>
          Predice resultados
          <span class="brand-dot">•</span>
          compite
          <span class="brand-dot">•</span>
          vive cada partido
        </p>
      </div>

      <div class="host-strip">
        <span class="host-label">TRES PAÍSES UNA SOLA PASIÓN</span>

        <div class="flag-cards">
          <div class="flag-card mexico">
            <img src="https://flagcdn.com/mx.svg" alt="México" />
            <span>México</span>
          </div>

          <div class="flag-card usa">
            <img src="https://flagcdn.com/us.svg" alt="Estados Unidos" />
            <span>Estados Unidos</span>
          </div>

          <div class="flag-card canada">
            <img src="https://flagcdn.com/ca.svg" alt="Canadá" />
            <span>Canadá</span>
          </div>
        </div>
      </div>

      <div class="social">
        <div class="social-icon">
          <i class="fab fa-facebook-f"></i>
        </div>

        <div class="social-icon">
          <i class="fab fa-instagram"></i>
        </div>

        <div class="social-icon">
          <i class="fab fa-x-twitter"></i>
        </div>

        <div class="social-icon">
          <i class="fas fa-envelope"></i>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="footer-bottom">
      <span>© 2026 Quiniela Mundial</span>
      <span class="footer-dot">•</span>
      <span>3 países, 16 ciudades, 1 pasión</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 30px 40px 20px;
  color: white;
  font-family: "Segoe UI", sans-serif;
  background: linear-gradient(180deg, #0b1f1a, #071411);
}

.footer-main {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: start;
  gap: 32px;
}

.brand {
  justify-self: start;
  max-width: 360px;
  padding-top: 22px;
}

.brand h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 1.2px;
}

.brand p {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: 7px 0 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 13px;
  line-height: 1.45;
}

.brand-dot {
  color: #00ff9c;
  opacity: 0.85;
}

.host-strip {
  justify-self: center;
  width: 100%;
  max-width: 430px;
  text-align: center;
}

.host-label {
  display: inline-block;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.45);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 3px;
}

.flag-cards {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.flag-card {
  position: relative;
  min-width: 74px;
  padding: 10px 8px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.flag-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.flag-card img,
.flag-card span {
  position: relative;
  z-index: 1;
}

.flag-card img {
  width: 38px;
  height: 26px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.28);
}

.flag-card span {
  color: white;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  letter-spacing: 0.5px;
}

.flag-card:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.35);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
}

.flag-card:hover::before {
  opacity: 1;
}

.flag-card.mexico::before {
  background: radial-gradient(
    circle at top,
    rgba(0, 255, 156, 0.28),
    transparent 65%
  );
}

.flag-card.usa::before {
  background: radial-gradient(
    circle at top,
    rgba(77, 171, 255, 0.28),
    transparent 65%
  );
}

.flag-card.canada::before {
  background: radial-gradient(
    circle at top,
    rgba(255, 77, 77, 0.28),
    transparent 65%
  );
}

.social {
  justify-self: end;
  padding-top: 28px;
  display: flex;
  gap: 12px;
}

.social-icon {
  width: 36px;
  height: 36px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-icon i {
  font-size: 14px;
}

.social-icon:hover {
  color: #0b1f1a;
  background: white;
  transform: translateY(-2px);
}

.divider {
  height: 1px;
  margin: 25px 0 15px;
  background: rgba(255, 255, 255, 0.1);
}

.footer-bottom {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
}

.footer-dot {
  opacity: 0.4;
}

@media (max-width: 900px) {
  .footer {
    padding: 28px 20px 18px;
  }

  .footer-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 26px;
    text-align: center;
  }

  .brand,
  .social {
    padding-top: 0;
  }

  .brand p {
    justify-content: center;
  }

  .flag-cards {
    flex-wrap: wrap;
  }

  .social {
    justify-content: center;
  }
}
</style>
