<template>
  <div class="frontmatter-bar">
    <RouterLink to="/" class="site-title" aria-label="Ratha Global home">
      <img src="/ratha_global_new_no_border.png" alt="" class="site-title-logo" >
      RATHA GLOBAL
    </RouterLink>
    <div class="eyebrow-marquee">
      <div class="eyebrow-track">
        <p v-for="n in 2" :key="n" class="eyebrow" :aria-hidden="n === 2 || undefined">
          Remittances
          <span class="eyebrow-divider">&middot;</span>
          Diaspora Bonds
          <span class="eyebrow-divider">&middot;</span>
          Structured Finance &amp; Guarantees
          <span class="eyebrow-divider">&middot;</span>
          Credit Ratings
          <span class="eyebrow-divider">&middot;</span>
          Migration &amp; Development
          <span class="eyebrow-divider">&middot;</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.frontmatter-bar {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.35rem;
  padding: 2rem 0rem 0rem 0rem;
}

.frontmatter-bar p {
  margin: 0;
}

.site-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-family: var(--font-serif);
  font-size: 2.8rem;
  line-height: 1;
  color: #000;
  text-decoration: none;
  text-align: center;
}

.site-title-logo {
  height: 3.6rem;
  width: auto;
}

.site-title:hover,
.site-title:focus-visible {
  color: var(--color-terracotta);
}

.eyebrow-marquee {
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  min-width: 0;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    black 2rem,
    black calc(100% - 2rem),
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0,
    black 2rem,
    black calc(100% - 2rem),
    transparent 100%
  );
}

.eyebrow-track {
  display: flex;
  width: max-content;
  animation: eyebrow-scroll 22s linear infinite;
}

.eyebrow-track .eyebrow {
  white-space: nowrap;
  flex-shrink: 0;
}

@keyframes eyebrow-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .eyebrow-track {
    animation: none;
  }
}

@media (max-width: 640px) {
  .site-title {
    font-size: 2.1rem;
    gap: 0.5rem;
  }

  .site-title-logo {
    height: 2.6rem;
  }

  .frontmatter-bar .eyebrow {
    font-size: 0.7rem;
  }
}
</style>
