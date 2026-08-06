<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="nav-shell">
    <div class="nav-content">
      <RouterLink to="/" class="brand-block" aria-label="Ratha Global home">
        <img
          class="brand-logo"
          src="/ratha_global_new_no_border.png"
          alt="Ratha Global logo"
        >
        <p class="nav-kicker">Ratha Global</p>
      </RouterLink>

      <nav class="nav-links" aria-label="Site navigation">
        <a href="/#contact" class="nav-button">Contact</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-shell {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(14px);
  background: rgba(255, 250, 242, 0.78);
  border-bottom: 1px solid rgba(129, 104, 56, 0.12);
}

.nav-content {
  width: min(1280px, calc(100% - 2.25rem));
  margin: 0 auto;
  padding: 0.55rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.28rem 0.55rem;
  border: 1px solid transparent;
  border-radius: 12px;
  text-decoration: none;
  background: rgba(255, 250, 242, 0.18);
  box-shadow: 0 0 0 rgba(75, 60, 26, 0);
  transition:
    background-color 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease,
    transform 0.22s ease;
}

.brand-block:hover {
  background: rgba(255, 251, 245, 0.62);
  border-color: rgba(129, 104, 56, 0.22);
  box-shadow: 0 12px 28px rgba(75, 60, 26, 0.12);
  transform: translateY(-1px);
}

.brand-block:focus-visible {
  outline: 2px solid rgba(17, 17, 17, 0.72);
  outline-offset: 3px;
  background: rgba(255, 251, 245, 0.72);
  border-color: rgba(129, 104, 56, 0.24);
  box-shadow: 0 12px 28px rgba(75, 60, 26, 0.14);
}

.brand-logo {
  width: 42px;
  height: 42px;
  object-fit: contain;
  flex: 0 0 auto;
  border-right: 1px solid rgba(0, 0, 0, 0.4);
  padding-right: 10px;
}

.nav-kicker {
             margin: 0;
             font-size: 2rem;
             font-family: 'Asul', sans-serif;
             font-weight: 500;
             line-height: 1.1;
             color: #111111;
             transform: translateY(0.04em);
             }

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-link {
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  color: #4a4a4a;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #11212d;
  background: rgba(129, 104, 56, 0.08);
}

.nav-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  border-radius: 999px;
  border: 2.5px solid #111111;
  background: transparent;
  color: #111111;
  text-decoration: none;
  font-weight: 700;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
}

.nav-button:hover {
  background: #111111;
  color: #fdf9f1;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .nav-content {
    width: min(100% - 1.25rem, 1280px);
    align-items: center;
  }

  .brand-logo {
    width: 36px;
    height: 36px;
  }

  .nav-kicker {
    font-size: 1.6rem;
  }

  .nav-button {
    padding: 0.7rem 1rem;
    white-space: nowrap;
  }
}
</style>
