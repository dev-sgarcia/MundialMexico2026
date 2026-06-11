<template>
  <div v-if="user" class="dropup d-md-none">
    <button
      class="btn p-0 rounded-circle border border-success border-2 overflow-hidden"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <img
        v-if="user.user_metadata?.avatar_url"
        :src="user.user_metadata.avatar_url"
        alt="Avatar"
        class="rounded-circle object-fit-cover avatar-sm"
      />

      <span
        v-else
        class="rounded-circle bg-dark text-success fw-bold d-flex align-items-center justify-content-center avatar-sm"
      >
        {{ initials }}
      </span>
    </button>

    <div
      class="dropdown-menu dropdown-menu-end bg-dark text-white border border-success border-opacity-25 shadow-lg rounded-4 p-3 mb-1 mobile-user-menu"
    >
      <div class="text-center mb-3">
        <img
          v-if="user.user_metadata?.avatar_url"
          :src="user.user_metadata.avatar_url"
          alt="Avatar"
          class="rounded-circle border border-success border-2 object-fit-cover mb-2 avatar-lg"
        />

        <div
          v-else
          class="rounded-circle bg-dark border border-success border-2 text-success fw-bold d-flex align-items-center justify-content-center mx-auto mb-2 fs-2 avatar-lg"
        >
          {{ initials }}
        </div>

        <h6 class="fw-bold mb-1 text-truncate">
          {{ user.user_metadata?.full_name || user.email }}
        </h6>

        <small class="text-white-50 d-block text-truncate">
          {{ user.email }}
        </small>
      </div>

      <hr class="border-success border-opacity-50 my-3" />

      <nav class="nav flex-column gap-2">
        <RouterLink
          to="/bases"
          class="nav-link d-flex align-items-center gap-2 rounded-4 px-3 py-2 fw-semibold text-white-50"
          active-class="text-white bg-success bg-opacity-25"
        >
          <PhCalendarCheck size="18" weight="fill" />
          <span>Reglas</span>
        </RouterLink>

        <RouterLink
          v-if="isAdmin"
          to="/quinielas"
          class="nav-link d-flex align-items-center gap-2 rounded-4 px-3 py-2 fw-semibold text-white-50"
          active-class="text-white bg-success bg-opacity-25"
        >
          <PhTrophy size="18" weight="fill" />
          <span>Mis Quinielas</span>
        </RouterLink>
      </nav>

      <hr class="border-success border-opacity-50 my-3" />

      <button
        class="btn btn-outline-danger rounded-3 fw-semibold w-100"
        type="button"
        @click="handleLogout"
      >
        Cerrar sesión
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { supabase } from "@/supabaseClient";
import { PhCalendarCheck, PhTrophy } from "@phosphor-icons/vue";
const router = useRouter();
const user = ref(null);
const isAdmin = ref(false);

const adminEmails = [
  "ingeniero.mx@gmail.com",
  "javiergonzalezr93@gmail.com",
  "rubencruz4052@gmail.com",
];

const setAdminStatus = (currentUser) => {
  isAdmin.value =
    !!currentUser?.email && adminEmails.includes(currentUser.email);
};

onMounted(async () => {
  const { data } = await supabase.auth.getSession();

  user.value = data.session?.user || null;
  setAdminStatus(user.value);

  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user || null;
    setAdminStatus(user.value);
  });
});

const initials = computed(() => {
  const name = user.value?.user_metadata?.full_name || user.value?.email || "";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
});

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error.message);
    return;
  }

  router.push("/");
};
</script>

<style scoped>
.mobile-user-menu {
  width: 280px;
}

.avatar-sm {
  width: 28px;
  height: 28px;
}

.avatar-lg {
  width: 82px;
  height: 82px;
}
</style>
