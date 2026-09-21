<script setup lang="ts">
import NavBar from './components/navbar.vue'
import SiteFooter from './components/footer.vue'
</script>

<template>
  <div class="page-shell">
    <NavBar />
    <router-view />
    <SiteFooter />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

img {
  max-width: 100%;
}

.page-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-content {
  flex: 1;
  width: min(900px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 1rem 0 3rem;
}
</style>
