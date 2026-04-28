<template>
  <Header :simple="true" />

  <AccesoContent />
  <Footer />
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import AccesoContent from '@/components/AccesoContent.vue'
</script>