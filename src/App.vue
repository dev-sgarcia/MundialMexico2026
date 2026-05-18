<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabaseClient'

const router = useRouter()

onMounted(() => {
  // Escuchamos activamente cuando el estado de autenticación cambie
  supabase.auth.onAuthStateChange((event, session) => {
    // Si el evento es el inicio de sesión y tenemos los datos de la sesión
    if (event === 'SIGNED_IN' && session) {
      console.log('¡Inicio de sesión exitoso con Google!', session.user)
      
      // Limpiamos los parámetros/tokens que Supabase deja en la URL para que se vea limpia
      if (window.location.hash) {
        window.history.replaceState(null, null, window.location.pathname)
      }
      
      // Redirigimos automáticamente al usuario a la vista de la quiniela
      router.push('/juega')
    }
  })
})

</script>

<template>
  <router-view />
</template>

<!-- <template>
  <Home />
</template> -->
