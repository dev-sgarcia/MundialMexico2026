<template>
  <div v-if="user" class="d-md-none">
    <button
      class="btn p-0 rounded-circle border border-success border-2 overflow-hidden"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#mobileUserMenu"
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
      id="mobileUserMenu"
      class="offcanvas offcanvas-end bg-dark text-white border-start border-success border-opacity-25 shadow-lg mobile-user-menu"
      data-bs-backdrop="false"
      tabindex="-1"
    >
      <div class="offcanvas-header justify-content-end">
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Cerrar"
        ></button>
      </div>

      <div class="offcanvas-body d-flex flex-column text-center">
        <div class="mb-4">
          <img
            v-if="user.user_metadata?.avatar_url"
            :src="user.user_metadata.avatar_url"
            alt="Avatar"
            class="rounded-circle border border-success border-2 object-fit-cover mb-3 avatar-lg"
          />

          <div
            v-else
            class="rounded-circle bg-dark border border-success border-2 text-success fw-bold d-flex align-items-center justify-content-center mx-auto mb-3 fs-2 avatar-lg"
          >
            {{ initials }}
          </div>

          <h4 class="fw-bold mb-1">
            {{ user.user_metadata?.full_name || user.email }}
          </h4>

          <p class="text-white-50 mb-0">
            {{ user.email }}
          </p>
        </div>

        <hr class="border-success border-opacity-50" />

        <div class="d-flex flex-column gap-2">
          <button
            class="btn btn-outline-danger rounded-3 fw-semibold mt-3 mx-auto"
            type="button"
            @click="handleLogout"
          >
            Cerrar sesión
          </button>
        </div>

        <small class="text-white-50 mt-auto">Versión 1.0.0</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/supabaseClient";

const router = useRouter();
const user = ref(null);

onMounted(async () => {
  const { data } = await supabase.auth.getSession();
  user.value = data.session?.user || null;

  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user || null;
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
.avatar-sm {
  width: 42px;
  height: 42px;
}

.avatar-lg {
  width: 110px;
  height: 110px;
}

.mobile-user-menu {
  width: 250px;
  height: calc(100vh - 65px);
  bottom: 65px;
}

.mobile-user-menu.offcanvas-end {
  top: 0;
}

@media (min-width: 576px) {
  .mobile-user-menu {
    max-width: 380px;
  }
}
</style>
