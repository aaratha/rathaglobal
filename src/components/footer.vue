<script setup lang="ts">
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()
</script>

<template>
  <footer>
    <hr>
    <img src="/ratha_global_new_no_border.png" alt="Ratha Global logo" width="32" height="32">
    <p>Ratha Global</p>
    <p>Advice, analytics, and solutions for global development finance.</p>

    <nav aria-label="Footer navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/blog">Publications</RouterLink>
      <a href="/#contact">Contact</a>
      <a href="mailto:contact@rathaglobal.com">contact@rathaglobal.com</a>
    </nav>

    <p>&copy; {{ year }} Ratha Global. All rights reserved.</p>
  </footer>
</template>
