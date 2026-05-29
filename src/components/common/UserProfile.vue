<template>
  <div v-if="user" class="d-flex align-items-center gap-3">
    <img
      v-if="user.user_metadata?.avatar_url"
      :src="user.user_metadata.avatar_url"
      alt="Avatar"
      class="rounded-circle border-light border-opacity-25 object-fit-cover"
      width="46"
      height="46"
    />

    <div class="d-flex flex-column align-items-start">
      <span class="fw-bold lh-sm text-white">
        {{ user.user_metadata?.full_name || user.email }}
      </span>
      <button
        class="btn btn-link btn-sm text-danger p-0 m-0 d-inline-flex text-decoration-none align-right logout-btn"
        @click="handleLogout"
      >
        Cerrar sesión
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/supabaseClient";

const router = useRouter();
const user = ref(null);

onMounted(async () => {
  // 1. Obtener la sesión inicial (esto se ejecuta al volver de Google)
  const { data } = await supabase.auth.getSession();
  user.value = data.session?.user || null;

  // 2. Revisar INMEDIATAMENTE si tenemos usuario y venimos del flujo de login
  const isLoggingIn = localStorage.getItem("isLoggingIn");

  if (user.value && isLoggingIn === "true") {
    // Limpiamos la bandera para evitar el bug de las pestañas
    localStorage.removeItem("isLoggingIn");
    // Redireccionamos
    router.push("/juega");
  }

  // 3. Mantener el listener para otros cambios de estado
  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user || null;

    // Por si acaso el evento SIGNED_IN se dispara un milisegundo después
    if (event === "SIGNED_IN") {
      const isLoggingInEvent = localStorage.getItem("isLoggingIn");
      if (isLoggingInEvent === "true") {
        localStorage.removeItem("isLoggingIn");
        router.push("/juega");
      }
    }
  });
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
