<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="page-content">
    <section>
      <p class="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <p>
        <RouterLink to="/" class="button">Back to home</RouterLink>
        <RouterLink to="/blog" class="button">View publications</RouterLink>
      </p>
    </section>
  </main>
</template>

<style scoped>
@media (min-width: 641px) {
  section {
    padding-left: 10%;
  }
}

section p:last-child {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
</style>
