<template>
  <div class="page-header d-none d-lg-flex">
    <div class="profile-card">
      <UserProfile />
    </div>
  </div>
</template>

<script setup>
import UserProfile from "@/components/common/UserProfile.vue";
</script>

<style scoped>
.page-header {
  justify-content: flex-end;
  align-items: center;
  min-height: 56px;
  margin-bottom: 1rem;
}
</style>
