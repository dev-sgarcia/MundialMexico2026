<template>
  <Header :simple="true" />

  <AccesoContent />
  <Footer />
</template>

<script setup>
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
import AccesoContent from "@/components/auth/AccesoContent.vue";
</script>
