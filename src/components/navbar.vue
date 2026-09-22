<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <nav aria-label="Site navigation">
      <RouterLink to="/" aria-label="home">HOME</RouterLink>
      <RouterLink to="/blog">PUBLICATIONS</RouterLink>
      <a href="/#contact">CONTACT</a>
    </nav>
  </header>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  border-bottom: 2px solid var(--color-moss);
}

nav a {
  display: inline-block;
  padding: 0.75rem 1.25rem;
  color: var(--color-ink);
  text-decoration: none;
  font-family: var(--font-serif);
  font-size: 1.5rem;
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

@media (max-width: 640px) {
  nav {
    gap: 0.5rem;
  }

  nav a {
    padding: 0.5rem 0.85rem;
    font-size: 1.1rem;
  }
}
</style>
