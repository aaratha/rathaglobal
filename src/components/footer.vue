<script setup lang="ts">
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()
</script>

<template>
  <footer>
    <div class="footer-content">
      <div class="footer-brand">
        <img src="/ratha_global_new_no_border.png" alt="Ratha Global logo">
        <div>
          <p class="brand-name">RATHA GLOBAL</p>
          <p class="tagline">Advice, analytics, and solutions for global development finance.</p>
        </div>
      </div>

      <nav aria-label="Footer navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/blog">Publications</RouterLink>
        <RouterLink to="/media">Media</RouterLink>
        <a href="/#contact">Contact</a>
        <a href="mailto:contact@rathaglobal.com">contact@rathaglobal.com</a>
      </nav>
    </div>

    <p class="copyright">&copy; {{ year }} Ratha Global. All rights reserved.</p>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid rgba(168, 137, 88, 0.35);
  padding: 3rem 3rem 1.75rem;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  max-width: 72rem;
  margin: 0 auto;
}

.footer-brand {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  max-width: 26rem;
}

.footer-brand img {
  height: 40px;
  width: auto;
  flex: 0 0 auto;
}

.brand-name {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-indigo);
}

.tagline {
  margin: 0.3rem 0 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--color-ink);
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
}

nav a {
  color: var(--color-ink);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
}

nav a:hover,
nav a:focus-visible {
  color: var(--color-terracotta);
}

.copyright {
  max-width: 72rem;
  margin: 2.25rem auto 0;
  padding-top: 1.25rem;
  color: var(--color-moss);
  font-size: 0.82rem;
  text-align: center;
}

@media (max-width: 640px) {
  footer {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .footer-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .footer-brand {
    max-width: none;
  }

  nav {
    flex-direction: column;
    align-items: flex-start;
    margin-left: calc(36px + 0.85rem);
    gap: 0.75rem;
  }

  nav a {
    overflow-wrap: anywhere;
  }
}
</style>
