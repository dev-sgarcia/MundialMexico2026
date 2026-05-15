<template>
  <div class="admin-wrapper d-flex">
    <nav class="admin-sidebar p-3 d-flex flex-column shadow-lg">
      <div class="brand mb-5 px-3">
        <h5 class="text-gold fw-bold m-0">WC 2026 ADMIN</h5>
      </div>
      
      <ul class="nav nav-pills flex-column mb-auto gap-2">
        <li class="nav-item" v-for="item in menuItems" :key="item.id">
          <a href="#" class="nav-link text-white d-flex align-items-center gap-3" 
             :class="{ active: currentTab === item.id }" @click="currentTab = item.id">
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </a>
        </li>
      </ul>

      <div class="user-footer border-top border-secondary pt-3 px-2">
        <button class="btn btn-outline-danger btn-sm w-100">Cerrar Sesión</button>
      </div>
    </nav>

    <main class="flex-grow-1 p-4 overflow-auto">
      <header class="row g-3 mb-4">
        <div class="col-md-3" v-for="stat in quickStats" :key="stat.label">
          <div class="card stat-card text-white border-0 shadow-sm">
            <div class="card-body">
              <p class="small text-white-50 mb-1 text-uppercase">{{ stat.label }}</p>
              <h3 class="fw-bold">{{ stat.value }}</h3>
            </div>
          </div>
        </div>
      </header>

      <section class="card admin-data-card border-0 shadow">
        <div class="card-header bg-transparent border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
          <h5 class="text-white fw-bold m-0">{{ menuItems.find(i => i.id === currentTab)?.label }}</h5>
          <button class="btn btn-gold btn-sm">+ Nuevo Registro</button>
        </div>
        
        <div class="card-body px-4">
          <div class="table-responsive">
            <table class="table table-dark table-hover align-middle custom-admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Partido</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th class="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="match in dummyMatches" :key="match.id">
                  <td class="text-white-50">#{{ match.id }}</td>
                  <td>{{ match.home }} vs {{ match.away }}</td>
                  <td>{{ match.date }}</td>
                  <td><span class="badge" :class="match.status === 'Finalizado' ? 'bg-success' : 'bg-warning'">{{ match.status }}</span></td>
                  <td class="text-end">
                    <button class="btn btn-link text-gold p-0 me-3"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-link text-danger p-0"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentTab = ref('matches');

const menuItems = [
/*   
    Nota: En dado caso de que se requiera otra opción en la sección de administraciíon, esta es la forma de implementarlo
{ id: 'matches', label: 'Partidos', icon: 'bi bi-calendar-event' },
 */  { id: 'leagues', label: 'Ligas', icon: 'bi bi-trophy' },
];

const quickStats = [
  { label: 'Usuarios', value: '1,250' },
  { label: 'Ligas Activas', value: '45' },
  { label: 'Pronósticos', value: '8,432' },
  { label: 'Tickets Soporte', value: '12' },
];

const dummyMatches = ref([
  { id: 101, home: 'México', away: 'USA', date: '11 Jun 2026', status: 'Pendiente' },
  { id: 102, home: 'Argentina', away: 'Brasil', date: '12 Jun 2026', status: 'Finalizado' },
]);
</script>

<style scoped>
.admin-wrapper {
  background-color: #e1e1e2;
  min-height: auto;
  color: white;
   background:
    linear-gradient(rgba(0, 50, 30, 0.7), rgba(0, 0, 0, 0.8)),
    url("/src/assets/bg-rules.jpg") center/cover no-repeat;
}

/* Sidebar */
.admin-sidebar {
  width: 260px;
  background-color: #0d1425;
  height: 625px;
  position: sticky;
  top: 0;
   background:
    linear-gradient(rgba(115, 117, 109, 0.7), rgba(0, 0, 0, 0.8)),
    url("/src/assets/fifa-world-cup.png") center/cover no-repeat;
}

.nav-link { transition: 0.3s; font-size: 0.95rem; border-radius: 8px !important; }
.nav-link:hover { background: rgba(212, 175, 55, 0.1); color: #d4af37 !important; }
.nav-link.active { background: #d4af37 !important; color: #060b18 !important; font-weight: bold; }

/* Stats Cards */
.stat-card { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); }
.text-gold { color: #d4af37; }
.btn-gold { background: #d4af37; color: #060b18; border: none; font-weight: bold; }

/* Table Styling */
.admin-data-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); }
.custom-admin-table { background: transparent !important; --bs-table-bg: transparent; }
.table thead th { color: #d4af37; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
.table tbody td { padding: 1rem 0.5rem; font-size: 0.9rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
</style>