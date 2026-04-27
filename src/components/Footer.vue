<!-- <template>
  <footer class="footer">
    <div class="container">
      <p>Mundial 2026 - 3 países, 1 pasión</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 40px;
  padding: 20px;
  background: #0a3d2c;
  color: white;
  text-align: center;
}
</style> -->

<template>
  <footer class="footer">
    <div class="footer-content">
      
      <!-- Lado izquierdo -->
      <div class="left">
        <div class="text">
          <h2>MÉXICO 2026</h2>
          <p>EL MUNDIAL DE NUESTRA HISTORIA</p>
        </div>
      </div>

      <!-- Centro -->
      <div class="center">
        <p>3 PAÍSES, 16 CIUDADES, 1 MISMA PASIÓN</p>
      </div>

      <!-- Lado derecho -->
      <div class="right">
      <div class="social-icon">
        <i class="fab fa-facebook-f"></i>
      </div>
      <div class="social-icon">
          <i class="fab fa-instagram"></i>
      </div>
      <div class="social-icon">
          <i class="fas fa-envelope"></i>
      </div>
      </div>      



    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  /*background: linear-gradient(90deg, #0a3d2c, #0f5132);*/
  background: url('/src/assets/footer.png') center/cover no-repeat;
  color: white;
  padding: 15px 30px;
  font-family: Arial, sans-serif;

  min-height: 180px;
  display: grid;
  align-items: center;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* IZQUIERDA */
.left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  width: 50px;
}

.text h2 {
  font-size: 18px;
  margin: 0;
  font-weight: bold;
}

.text p {
  margin: 0;
  font-size: 12px;
}

/* CENTRO */
.center {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 13px;
}

.divider {
  width: 2px;
  height: 30px;
  background: white;
}

/* DERECHA */
.right {
  display: flex;
  gap: 15px;
}

.icon {
  font-size: 16px;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 50%;
  padding: 8px;
  transition: 0.3s;
}

.icon:hover {
  background: white;
  color: #0a3d2c;
}

.right {
  display: flex;
  gap: 12px;
}

/* CÍRCULO */
.social-icon {
  width: 36px;
  height: 36px;
  border: 1.5px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.3s ease;
  cursor: pointer;
}

/* ICONO */
.social-icon i {
  font-size: 14px;
  color: white;
  line-height: 1;
}

/* HOVER */
.social-icon:hover {
  background: white;
}

.social-icon:hover i {
  color: #0a3d2c;
}

.social-icon {
  width: 34px;
  height: 34px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

/* MOBILE */
@media (max-width: 600px) {
  .left {
    text-align: center;
  }

  .right {
    gap: 35px; /* más espacio entre iconos */
    justify-content: center; /* opcional: los centra */
    margin-top: 10px;    
  }

  .social-icon {
    width: 40px;
    height: 40px;
  }

  .social-icon i {
    font-size: 16px;
  }

  .footer-content {
    flex-direction: column;
    gap: 15px;
  } 

}

</style>