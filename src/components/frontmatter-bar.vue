<template>
  <div class="frontmatter-bar">
    <RouterLink to="/" class="brand" aria-label="Ratha Global home">
    <img src="/ratha_global_new_no_border.png" alt="Ratha Global logo" width="48" height="48">
    <span class="brand-name">Ratha Global</span>
    </RouterLink>
    <p class="eyebrow">Remittances&nbsp;|&nbsp;Diaspora Bonds&nbsp;|&nbsp;Structured Finance</p>
  </div>
</template>

<style scoped>
.frontmatter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.35rem 1rem;
}

.frontmatter-bar p {
  margin: 0;
  font-family: var(--font-serif);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.brand-name {
  font-family: var(--font-serif);
  font-size: 1.9rem;
  line-height: 1;
  color: #000;
}
</style>
