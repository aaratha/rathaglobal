<template>
  <div class="frontmatter-bar">
    <RouterLink to="/" class="site-title" aria-label="Ratha Global home">
      <img src="/ratha_global_new_no_border.png" alt="" class="site-title-logo" >
      <span class="site-title-text">RATHA GLOBAL</span>
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
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 2rem 0rem 1rem 0rem;
}

.frontmatter-bar p {
  margin: 0;
}

.site-title {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.75rem;
  margin-left: 2rem;
  font-family: var(--font-serif);
  font-size: 2.8rem;
  line-height: 1;
  color: #000;
  text-decoration: none;
}

.site-title-logo {
  height: 3.6rem;
  width: auto;
  transform-origin: top left;
  transform: translate(var(--logo-dx, 0px), var(--logo-dy, 0px)) scale(var(--logo-scale, 1));
}

.site-title-text {
  opacity: var(--logo-text-opacity, 1);
}

.site-title:hover,
.site-title:focus-visible {
  color: var(--color-terracotta);
}

.eyebrow-marquee {
  flex: 1 1 auto;
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
  .frontmatter-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 0.35rem;
  }

  .site-title {
    justify-content: center;
    margin-left: 0;
    font-size: 2.1rem;
    gap: 0.5rem;
  }

  .site-title-logo {
    height: 2.6rem;
  }

  .eyebrow-marquee {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .frontmatter-bar .eyebrow {
    font-size: 0.7rem;
  }
}
</style>
