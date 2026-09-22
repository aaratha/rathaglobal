<template>
  <div class="frontmatter-bar">
    <RouterLink to="/" class="brand" aria-label="Ratha Global home">
    <img src="/ratha_global_new_no_border.png" alt="Ratha Global logo" width="48" height="48">
    <span class="brand-name">RATHA GLOBAL</span>
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

.eyebrow-marquee {
  width: 100%;
  margin-top: 0.5rem;
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

.brand {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  margin-left: 2rem;
  gap: 0.5rem;
  text-decoration: none;
}

.brand-name {
  font-family: var(--font-serif);
  font-size: 3rem;
  translate: 0 -0.25rem;
  line-height: 1;
  color: #000;
}

.brand:hover .brand-name,
.brand:focus-visible .brand-name {
  color: var(--color-terracotta);
}

@media (max-width: 640px) {
  .brand img {
    width: 32px;
    height: 32px;
  }

  .brand-name {
    font-size: 1.3rem;
  }

  .frontmatter-bar .eyebrow {
    font-size: 0.7rem;
  }
}
</style>
