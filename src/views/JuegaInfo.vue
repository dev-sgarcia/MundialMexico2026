<template>
  <Header></Header>
  <section class="packages-section py-5">

    <div class="overlay"></div>

    <div class="container position-relative z-1">
      <div class="row g-4 align-items-start mb-5">

        <div class="col-12 col-lg-4">
          <div class="d-flex flex-column flex-sm-row gap-3 align-items-start">
            <div class="section-icon">
              <PhUsersThree class="people-icon" :size="32" weight="fill" />
            </div>
            <div>
              <h2 class="section-title">1. PAQUETES DE ACCESO</h2>
              <p class="section-description">
                A continuación se detallan los paquetes y el proceso para la
                creación de ligas privadas (empresariales o de amigos)
                dentro de la plataforma.
              </p>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-8">
          <div class="row g-4">
            <div
              v-for="pkg in packages"
              :key="pkg.users"
              class="col-12 col-md-6 col-xl-4"
            >
              <div class="package-card h-100">
                <div class="users-icon">
                  <i class="bi bi-people-fill"></i>
                </div>
                <h3 class="users-title">{{ pkg.users }} USUARIOS</h3>
                <div class="divider"></div>
                <p class="price-label">COSTO TOTAL (MXN)</p>
                <h2 class="price">${{ pkg.price.toLocaleString() }}.00</h2>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="payment-section py-5">
        <div class="row g-4 align-items-center">

          <div class="col-12 col-lg-4">
            <div class="d-flex flex-column flex-sm-row gap-3 align-items-start">
              <div class="section-icon">
                <PhCreditCard :size="32" class="credit-icon" weight="fill" />
              </div>
              <div>
                <h2 class="section-title">2. INFORMACIÓN PARA PAGO</h2>
                <p class="section-description">
                  Para activar su liga, realice la transferencia
                  electrónica a la siguiente cuenta:
                </p>
              </div>
            </div>

            <div class="d-flex flex-column flex-sm-row gap-3 mt-4">
              <a
                href="https://wa.me/525547214435?text=Hola,%20necesito%20ayuda%20con%20la%20quiniela%20en%20FansLeague."
                target="_blank"
                rel="noopener noreferrer"
                class="contact-btn whatsapp-btn text-decoration-none"
              >
                <PhWhatsappLogo :size="32" weight="fill" class="whats-icon" />
                <div class="text-start">
                  <div class="fw-bold">WhatsApp</div>
                  <small>Chatear ahora</small>
                </div>
              </a>

              <a
                href="mailto:ingeniero.mx@gmail.com?subject=Soporte%20Quiniela%20Mundial%202026"
                class="contact-btn email-btn text-decoration-none"
              >
                <i class="bi bi-envelope-fill" style="font-size: 32px;"></i>
                <div class="text-start">
                  <div class="fw-bold">Correo electrónico</div>
                  <small>Enviar correo</small>
                </div>
              </a>
            </div>
          </div>

          <div class="col-12 col-lg-8">
            <div class="bank-card d-flex flex-column flex-lg-row align-items-center gap-4">
              <div class="bank-logo text-center">
                BBVA
                <span>México</span>
              </div>

              <div class="bank-divider"></div>

              <div class="flex-grow-1 w-100">
                <div class="bank-row d-flex flex-column flex-md-row justify-content-between gap-2">
                  <span class="bank-label">
                    <i class="bi bi-bank"></i> BANCO:
                  </span>
                  <strong>BBVA México</strong>
                </div>
                <div class="bank-row d-flex flex-column flex-md-row justify-content-between gap-2">
                  <span class="bank-label">
                    <i class="bi bi-person-fill"></i> TITULAR:
                  </span>
                  <strong>Samuel Arturo García Sánchez</strong>
                </div>
                <div class="bank-row d-flex flex-column flex-md-row justify-content-between gap-2 border-0">
                  <span class="bank-label">
                    <i class="bi bi-credit-card"></i> CLABE INTERBANCARIA:
                  </span>
                  <strong>0121 8001 5009 6141 70</strong>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

<div class="row g-4 align-items-start">
  <div class="col-12">
    <div class="d-flex flex-column flex-sm-row gap-3 align-items-start">
      <div class="section-icon">
        <PhListChecks :size="32" weight="fill" class="list-icon" />
      </div>
      <div>
        <h2 class="section-title">
          3. PROCESO DE CONTRATACIÓN
        </h2>
      </div>
    </div>
  </div>

  <div class="col-12">
    <div class="row g-4">
      <div
        v-for="(step, index) in processSteps"
        :key="step.title"
        class="col-12 col-md-6 col-xl-3"
      >
        <div class="process-card h-100">
          <div class="step-icon">
            <i :class="step.icon"></i>
          </div>
          <h5 class="step-title">{{ step.title }}</h5>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </div>

</div>
    </div>

  </section>
  <Footer></Footer>
</template>

<script setup>
import Footer from '@/components/common/Footer.vue';
import Header from '@/components/common/Header.vue';
import { PhUsersThree, PhCreditCard, PhListChecks, PhWhatsappLogo } from '@phosphor-icons/vue';

const packages = [
  { users: 25,  price: 250  },
  { users: 50,  price: 500  },
  { users: 100, price: 1000 },
];

const processSteps = [
  {
    title: 'SELECCIÓN',
    icon: 'bi bi-clipboard-check-fill',
    description: 'El responsable del grupo define el paquete según el número de participantes.'
  },
  {
    title: 'PAGO',
    icon: 'bi bi-bank',
    description: 'Realizar la transferencia bancaria por el monto del paquete elegido.'
  },
  {
    title: 'REGISTRO',
    icon: 'bi bi-chat-left-text-fill',
    description: 'Enviar comprobante de pago indicando nombre de liga y torneo.'
  },
  {
    title: 'ACTIVACIÓN',
    icon: 'bi bi-key-fill',
    description: 'Recibirá la confirmación de usuarios y clave de acceso.'
  }
];
</script>

<style scoped>
.packages-section {
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(
      90deg,
      rgba(3, 10, 9, 0.97) 0%,
      rgba(4, 24, 28, 0.92) 50%,
      rgba(2, 14, 10, 0.96) 100%
    ),
    url("/src/assets/fifa-world-cup.png") center/cover no-repeat;
}

.overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(72, 255, 133, 0.12), transparent 60%);
}

.section-icon {
  width: 72px;
  height: 72px;
  border-radius: 18px;
  border: 1px solid rgba(212, 175, 55, 0.4);
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.section-icon i {
  color: #d4af37;
  font-size: 2rem;
}

.section-title {
  color: #d4af37;
  font-size: clamp(1.2rem, 2.5vw, 2rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.section-description {
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.8;
  font-size: 1rem;
}

.package-card {
  padding: 2rem 1.5rem;
  border-radius: 22px;
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(212, 175, 55, 0.25);
  text-align: center;
  transition: all 0.3s ease;
}

.package-card:hover {
  transform: translateY(-6px);
  border-color: rgba(212, 175, 55, 0.7);
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.12);
  cursor: pointer;
}

.users-icon {
  margin-bottom: 1rem;
}

.users-icon i {
  font-size: 3rem;
  color: #73ff73;
}

.users-title {
  color: white;
  font-weight: 800;
}

.divider {
  width: 100%;
  height: 1px;
  background: rgba(212, 175, 55, 0.35);
  margin: 1rem 0;
}

.price-label {
  color: rgba(255, 255, 255, 0.72);
  margin-bottom: 0.5rem;
}

.price {
  color: #d4af37;
  font-size: clamp(1.6rem, 3vw, 2.3rem);
  font-weight: 900;
}

.payment-section {
  border-top: 1px solid rgba(212, 175, 55, 0.18);
  border-bottom: 1px solid rgba(212, 175, 55, 0.18);
}

.contact-btn {
  border: none;
  border-radius: 18px;
  padding: 1rem 1.3rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  transform: translateY(-3px);
}

.contact-btn i {
  font-size: 2rem;
}

.whatsapp-btn {
  background: #1db954;
}

.email-btn {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.bank-card {
  padding: 2rem;
  border-radius: 24px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(212, 175, 55, 0.22);
}

.bank-logo {
  color: white;
  font-size: 4rem;
  font-weight: 300;
  line-height: 1;
  flex-shrink: 0;
}

.bank-logo span {
  display: block;
  color: #2db8ff;
  font-size: 1.5rem;
}

.bank-divider {
  background: rgba(212, 175, 55, 0.2);
  align-self: stretch;
  width: 100%;
  height: 1px;
  min-height: 1px;
}

.bank-card.flex-lg-row .bank-divider {
  width: 1px;
  height: auto;
  min-height: 60px;
}

.bank-row {
  padding: 1rem 0;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.bank-label {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: rgba(255, 255, 255, 0.72);
}

.process-card {
  position: relative;
  padding: 1.5rem;
  border-radius: 22px;
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(212, 175, 55, 0.22);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
}

.process-card:hover {
  transform: translateY(-5px);
  border-color: rgba(115, 255, 115, 0.45);
  box-shadow: 0 0 20px rgba(115, 255, 115, 0.12);
}

.step-icon {
  margin-bottom: 1rem;
}

.step-icon i {
  color: #73ff73;
  font-size: 2.8rem;
}

.step-title {
  color: white;
  font-weight: 800;
  margin-bottom: 1rem;
}

.step-description {
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.8;
  margin-bottom: 0;
}
</style>