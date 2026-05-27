<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabaseClient'

const router = useRouter()

onMounted(async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  // Limpiar hash OAuth
  if (window.location.hash) {
    window.history.replaceState(
      null,
      null,
      window.location.pathname
    )
  }

  // Si ya hay sesión
  if (session) {
    const redirectPath =
      localStorage.getItem('redirectAfterLogin')

    // Si existe ruta guardada
    if (redirectPath) {
      localStorage.removeItem('redirectAfterLogin')
      // Ir a la ruta original
      router.replace(redirectPath)
    } else {
      // Mantener ruta actual al refrescar
      router.replace(window.location.pathname)
    }
  }
})
</script>

<template>
  <router-view />
</template>