<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <nav aria-label="Site navigation">
      <RouterLink to="/" aria-label="home">Home</RouterLink>
      <RouterLink to="/blog">Publications</RouterLink>
      <a href="/#contact">Contact</a>
    </nav>
  </header>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

nav a {
  color: var(--color-ink);
  text-decoration: none;
  font-family: var(--font-serif);
  font-size: 1.25rem;
}

nav a:hover,
nav a:focus-visible {
  color: var(--color-terracotta);
}

.brand {
  font-family: var(--font-serif);
  font-weight: 700;
  color: var(--color-indigo);
}

.brand:hover,
.brand:focus-visible {
  color: var(--color-terracotta);
}
</style>
