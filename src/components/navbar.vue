<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <nav aria-label="Site navigation">
      <RouterLink to="/" aria-label="Ratha Global home">
        <img src="/ratha_global_new_no_border.png" alt="Ratha Global logo" width="32" height="32">
        Ratha Global
      </RouterLink>
      <RouterLink to="/blog">Publications</RouterLink>
      <a href="/#contact">Contact</a>
    </nav>
  </header>
</template>
