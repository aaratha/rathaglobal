<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const menuOpen = ref(false)
const route = useRoute()

function closeMenu() {
  menuOpen.value = false
}

watch(
  () => route.fullPath,
  () => closeMenu(),
)
</script>

<template>
  <header>
    <nav class="nav-bar" aria-label="Site navigation">
      <RouterLink to="/" class="brand" aria-label="Ratha Global home">
        <img src="/ratha_global_new_no_border.png" alt="Ratha Global logo" >
      </RouterLink>

      <button
        type="button"
        class="nav-toggle"
        :aria-expanded="menuOpen"
        aria-controls="primary-nav"
        aria-label="Toggle navigation menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="nav-toggle-bar" />
        <span class="nav-toggle-bar" />
        <span class="nav-toggle-bar" />
      </button>
    </nav>

    <div class="nav-drawer-clip">
      <nav
        id="primary-nav"
        class="nav-drawer"
        :class="{ 'nav-drawer-open': menuOpen }"
        aria-label="Primary navigation"
      >
        <RouterLink to="/" aria-label="home" @click="closeMenu">HOME</RouterLink>
        <RouterLink to="/blog" @click="closeMenu">PUBLICATIONS</RouterLink>
        <RouterLink to="/media" @click="closeMenu">MEDIA</RouterLink>
        <a href="/#contact" @click="closeMenu">CONTACT</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  position: relative;
  isolation: isolate;
}

.nav-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid var(--color-moss);
}

.brand {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  text-decoration: none;
}

.brand img {
  height: 40px;
  width: auto;
}

.nav-drawer-clip {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.nav-drawer {
  display: flex;
  gap: 1.5rem;
  pointer-events: auto;
}

.nav-drawer a {
  display: inline-block;
  padding: 0.75rem 1.25rem;
  color: var(--color-ink);
  text-decoration: none;
  font-family: var(--font-serif);
  font-size: 1.5rem;
}

.nav-drawer a:hover,
.nav-drawer a:focus-visible {
  color: var(--color-terracotta);
}

.nav-toggle {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 0;
  margin-left: auto;
  border: none;
  background: transparent;
  cursor: pointer;
}

.nav-toggle-bar {
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 2px;
  background: var(--color-ink);
  transition: transform 0.25s ease, opacity 0.2s ease;
}

.nav-toggle[aria-expanded='true'] .nav-toggle-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.nav-toggle[aria-expanded='true'] .nav-toggle-bar:nth-child(2) {
  opacity: 0;
}

.nav-toggle[aria-expanded='true'] .nav-toggle-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 640px) {
  .nav-bar {
    padding: 0.5rem 0.75rem;
    border-bottom: none;
  }

  .brand img {
    height: 32px;
    width: auto;
  }

  .nav-toggle {
    display: flex;
  }

  .nav-drawer-clip {
    top: 100%;
    bottom: auto;
    display: block;
    overflow: hidden;
    z-index: -1;
    pointer-events: none;
  }

  .nav-drawer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 0.25rem;
    padding: 0.5rem 0 0.75rem;
    background: var(--color-paper);
    border-bottom: 2px solid var(--color-moss);
    transform: translateY(calc(-100% + 2px));
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
  }

  .nav-drawer-open {
    transform: translateY(0);
    pointer-events: auto;
  }

  .nav-drawer a {
    padding: 0.5rem 1rem;
    font-size: 1.3rem;
  }
}
</style>
