<script setup lang="ts">
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()
</script>

<template>
  <footer>
    <hr>
    <img src="/ratha_global_new_no_border.png" alt="Ratha Global logo" width="32" height="32">
    <p class="brand-name">Ratha Global</p>
    <p>Advice, analytics, and solutions for global development finance.</p>

    <nav aria-label="Footer navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/blog">Publications</RouterLink>
      <a href="/#contact">Contact</a>
      <a href="mailto:contact@rathaglobal.com">contact@rathaglobal.com</a>
    </nav>

    <p class="copyright">&copy; {{ year }} Ratha Global. All rights reserved.</p>
  </footer>
</template>

<style scoped>
hr {
  border: none;
  border-top: 1px solid var(--color-brass);
}

nav a {
  color: var(--color-ink);
  text-decoration: none;
}

nav a:hover,
nav a:focus-visible {
  color: var(--color-terracotta);
}

.brand-name {
  font-family: var(--font-serif);
  font-weight: 700;
  color: var(--color-indigo);
}

.copyright {
  color: var(--color-moss);
  font-size: 0.85rem;
}
</style>
