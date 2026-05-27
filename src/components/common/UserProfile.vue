<template>
  <div v-if="user" class="d-flex align-items-center gap-3 mt-3">
    <img
      v-if="user.user_metadata?.avatar_url"
      :src="user.user_metadata.avatar_url"
      alt="Avatar"
      class="rounded-circle border border-success object-fit-cover"
      width="46"
      height="46"
    />

    <div class="d-flex flex-column align-items-start">
      <span
        class="fw-bold lh-sm"
        :style="{ color: textColor }"
      >
      <!-- <span class="fw-bold text-white lh-sm"> -->
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
  const { data } = await supabase.auth.getSession();
  user.value = data.session?.user || null;

  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user || null;
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

defineProps({
  textColor: {
    type: String,
    default: '#ffffff'
  }
})

</script>
