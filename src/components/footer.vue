<script setup lang="ts">
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-brand">
        <img
          class="footer-logo"
          src="/ratha_global_new_no_border.png"
          alt="Ratha Global logo"
        >
        <div>
          <p class="footer-name">Ratha Global</p>
          <p class="footer-tagline">
            Advice, analytics, and solutions for global development finance.
          </p>
        </div>
      </div>

      <nav class="footer-links" aria-label="Footer navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/blog">Publications</RouterLink>
        <a href="/#contact">Contact</a>
        <a href="mailto:contact@rathaglobal.com">contact@rathaglobal.com</a>
      </nav>
    </div>

    <div class="footer-bottom">
      <p>&copy; {{ year }} Ratha Global. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  z-index: 1;
  margin-top: auto;
  border-top: 1px solid rgba(129, 104, 56, 0.18);
  background: rgba(247, 242, 232, 0.6);
  padding: 2.5rem 0 1.5rem;
}

.footer-content {
  width: min(1280px, calc(100% - 2.25rem));
  margin: 0 auto;
  padding: 0 3rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
}

.footer-brand {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  max-width: 380px;
}

.footer-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  flex: 0 0 auto;
}

.footer-name {
  margin: 0;
  font-family: 'Asul', sans-serif;
  font-weight: 500;
  font-size: 1.3rem;
  color: #11212d;
}

.footer-tagline {
  margin: 0.35rem 0 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: #4a4a4a;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1.5rem;
}

.footer-links a {
  color: #38393b;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.footer-links a:hover,
.footer-links a.router-link-active {
  color: #8a6a2f;
}

.footer-bottom {
  width: min(1280px, calc(100% - 2.25rem));
  margin: 2rem auto 0;
  padding: 1.25rem 3rem 0;
  border-top: 1px solid rgba(129, 104, 56, 0.14);
  text-align: center;
}

.footer-bottom p {
  margin: 0;
  font-size: 0.85rem;
  color: #6b6b6b;
}

@media (max-width: 640px) {
  .footer-content {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
    padding: 0 1.25rem;
  }

  .footer-bottom {
    padding: 1.25rem 1.25rem 0;
  }

  .footer-links {
    gap: 0.5rem 1.1rem;
  }
}
</style>
