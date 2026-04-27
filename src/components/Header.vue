<template>
  <header class="header">
    <div class="container nav">

     <div class="logo">
      <img src="/src/assets/logo.png" alt="Mundial 2026" />
      <div class="logo-text">
          <span class="title">MUNDIAL</span>
          <span class="subtitle">MÉXICO <b>2026</b></span>
      </div>
      </div>
<nav class="menu">
  <a class="menu-item">
    <img src="/src/assets/home.png" />
    <span>INICIO</span>
  </a>

  <a class="menu-item">
    <img src="/src/assets/results.png" />
    <span>RESULTADOS</span>
  </a>

  <a class="menu-item">
    <img src="/src/assets/rules.png" />
    <span>REGLAS</span>
  </a>

  <a class="menu-item">
    <img src="/src/assets/play.png" />
    <span>JUEGA</span>
  </a>

  <a class="menu-item">
    <img src="/src/assets/donate.png" />
    <span>DONACIÓN</span>
  </a>
</nav>
      <button class="btn btn-green google-btn">
        <img src="/src/assets/google.png" alt="Google" class="google-icon" />
        <span>ACCEDER CON GOOGLE</span>
      </button>
    </div>
  </header>
</template>



<style scoped>
.header {
  position: absolute;
  top: 15px;
  width: 100%;
  z-index: 10;
}

.nav {
  background: white;
  border-radius: 50px;
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 38px;  
}

/* Imagen del logo */
.logo img {
  height: 45px; /* 🔥 controla el tamaño */
  width: auto;
}

/* Texto */
.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.title {
  font-weight: 700;
  color: #0f5132;
  font-size: 16px;
}

.subtitle {
  font-size: 13px;
  color: #198754;
}

.subtitle b {
  color: #dc3545;
}

.logo span {
  color: #0f5132;      
}

nav a {
  margin: 0 10px;
  font-size: 14px;
  cursor: pointer;
}

.login-btn {
  background: #1e7f3f;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
}

.google-btn {
  display: flex;
  align-items: center;
  gap: 10px; /* espacio entre icono y texto */
  padding: 10px 18px;
}

/* Icono */
.google-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;

  background: white;
  border-radius: 25%;
  padding: 2px;
}

.menu {
  display: flex;
  align-items: center;
  gap: 30px;
}

/* ITEM */
.menu-item {
  display: flex;
  flex-direction: column; /* icono arriba, texto abajo */
  align-items: center;
  text-decoration: none;
  font-size: 12px;
  color: #1b3d2f;
  font-weight: 500;
  cursor: pointer;
  gap: 5px;
  transition: all 0.2s ease;
}

/* ICONO */
.menu-item img {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

/* HOVER */
.menu-item:hover {
  color: #1f6f4a;
  transform: translateY(-2px);
}

/* ACTIVO (línea abajo tipo tu imagen) */
.menu-item.active::after {
  content: "";
  margin-top: 5px;
  width: 20px;
  height: 3px;
  background: #1f6f4a;
  border-radius: 2px;
}

/* Mobile */
@media (max-width: 768px) {
  .menu {
    display: none;
  }

  .logo img {
    height: 35px;
  }

  .title {
    font-size: 14px;
  }

  .subtitle {
    font-size: 11px;
  }
 
}
</style>