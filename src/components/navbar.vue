<template>
  <header class="nav-shell">
    <div class="nav-content">
      <div class="brand-block">
        <img
          class="brand-logo"
          src="/ratha_global_rounded.png"
          alt="Ratha Global logo"
        >
        <p class="nav-kicker">Ratha Global</p>
      </div>

      <a href="#contact" class="nav-button">Contact</a>
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
  padding: 0.8rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.brand-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
  flex: 0 0 auto;
}

.nav-kicker {
  margin: 0;
  font-size: 1.55rem;
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 800;
  line-height: 1.1;
  color: #184e74;
}

.nav-tagline {
  margin: 0.2rem 0 0;
  font-size: 0.95rem;
  color: #5b6875;
}

.nav-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  border-radius: 999px;
  background: #184e74;
  color: #fdf9f1;
  text-decoration: none;
  font-weight: 700;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}

.nav-button:hover {
  background: #8a6a2f;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .nav-content {
    width: min(100% - 1.25rem, 1280px);
    align-items: center;
  }

  .brand-logo {
    width: 42px;
    height: 42px;
  }

  .nav-kicker {
    font-size: 1.3rem;
  }

  .nav-button {
    padding: 0.7rem 1rem;
    white-space: nowrap;
  }
}
</style>
