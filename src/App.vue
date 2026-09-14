<script setup lang="ts">
import NavBar from './components/navbar.vue'
</script>

<template>
  <div class="page-shell">
    <NavBar />
    <router-view />
  </div>
</template>

<style>
:root {
  color-scheme: light;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background:
    radial-gradient(ellipse 140% 56% at 50% 0%, rgba(196, 169, 116, 0.22), transparent 68%),
    linear-gradient(180deg, #f7f2e8 0%, #fffdf8 35%, #f3eee2 100%);
  color: #1f2933;
  scroll-behavior: smooth;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  background: transparent;
  overflow-x: clip;
}

a {
  color: inherit;
}

#app {
  min-height: 100vh;
}

.page-shell {
  min-height: 100vh;
  overflow-x: clip;
}

.page-content {
  --flags-offset: 0px;
  position: relative;
  isolation: isolate;
  width: min(1050px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 0.75rem 0 4rem;
}

.page-content::before {
  content: '';
  position: absolute;
  inset: 0 min(50% - 50vw, -3rem) 0;
  background: top center / calc(140% + 10rem) auto repeat-y url('/flags_grid.png');
  opacity: 0.1;
  filter: grayscale(1) blur(1.5px);
  pointer-events: none;
  z-index: 0;
  transform: translate3d(0, var(--flags-offset), 0);
  will-change: transform;
  -webkit-mask-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.48) 34%,
    rgba(0, 0, 0, 0.14) 66%,
    transparent 100%
  );
  mask-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.20) 0%,
    rgba(0, 0, 0, 0.48) 34%,
    rgba(0, 0, 0, 0.48) 66%,
    transparent 100%
  );
}

.page-content > * {
  position: relative;
  z-index: 1;
}

.hero {
  --hero-title-size: clamp(1.9rem, 4.6vw, 3.5rem);
  max-width: 889px;
  margin: 0 auto;
  padding: 1.75rem 0 2.5rem;
}

.hero-top {
  position: relative;
  padding-left: calc(var(--hero-title-size) * 3.24 + 1.87rem + 1.5rem);
}

.hero-logo {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: auto;
  max-width: calc(var(--hero-title-size) * 3.24 + 1.87rem);
  object-fit: contain;
}

.hero-heading {
  min-width: 0;
}

.eyebrow {
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
  letter-spacing: 0.18em;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #184e74;
  font-weight: 700;
}

.hero h1 {
  margin: 0;
  font-size: var(--hero-title-size);
  line-height: 1.08;
  font-family: 'Asul', sans-serif;
  color: #11212d;
}

.hero-copy {
  margin: 1.5rem 0 0;
  font-size: 1.6rem;
  line-height: 1.8;
  color: #4a4a4a;
}

.featured-post {
  display: block;
  width: 100%;
  margin: 0 0 1.25rem;
  padding: 1.75rem 2rem;
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.featured-post:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 36px rgba(84, 69, 39, 0.14);
}

.featured-post .eyebrow {
  margin-bottom: 0.65rem;
}

.card .featured-post-date {
  margin: 0 0 0.35rem;
  color: #184e74;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.card.featured-post h2 {
  margin-bottom: 0.35rem;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
}

.card .featured-post-description {
  margin-bottom: 0.75rem;
}

.featured-post-link {
  display: inline-flex;
  gap: 0.35rem;
  align-items: center;
  color: #8a6a2f;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.featured-post:hover .featured-post-link,
.featured-post:focus-visible .featured-post-link {
  color: #11212d;
  transform: translateX(2px);
}

.featured-post:focus-visible {
  outline: 2px solid #11212d;
  outline-offset: 3px;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1.25rem;
}

.card {
  grid-column: span 4;
  padding: 1.5rem;
  border: 1px solid rgba(129, 104, 56, 0.16);
  border-radius: 22px;
  background: rgba(255, 252, 245, 0.82);
  box-shadow: 0 18px 40px rgba(84, 69, 39, 0.08);
}

.card-wide {
  grid-column: span 12;
}

.about-card {
  padding: 3rem;
}

#contact {
  scroll-margin-top: 7rem;
}

.contact-card-inner {
  max-width: 72rem;
  margin: 0 auto;
}

.contact-card-inner > h2 {
  text-align: center;
}

.contact-card .contact-callout {
  margin: 0;
  padding-top: 2rem;
  text-align: center;
}

.contact-sections {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
}

.contact-section {
  position: relative;
  width: 100%;
  padding-inline: 1.1rem;
}

.contact-section + .contact-section {
  border-left: 1px solid rgba(129, 104, 56, 0.18);
}

.contact-section-inner {
  width: 100%;
  margin: 0;
}

.contact-section h3 {
  margin: 0 0 0.6rem;
  font-size: 1.42rem;
  font-family: 'Asul', sans-serif;
  font-weight: 500;
  color: #11212d;
}

.contact-section p {
  margin-bottom: 0.75rem;
}

.card h2 {
  margin: 0 0 1rem;
  font-size: 2.12rem;
  font-family: 'Asul', sans-serif;
  font-weight: 500;
  color: #11212d;
}

.about-card h3 {
  margin: 2rem 0 1rem;
  font-size: 1.3rem;
  font-family: 'Asul', sans-serif;
  font-weight: 500;
  color: #11212d;
}

.card-half {
  grid-column: span 6;
}

.card p,
.card li,
.contact-card a {
  font-size: 1.08rem;
  line-height: 1.75;
  color: #4a4a4a;
}

.card p {
  margin: 0 0 1rem;
}

.card p:last-child {
  margin-bottom: 0;
}

.card p + ul {
  margin-top: -0.6rem;
}

.card ul {
  margin: 0;
  padding-left: 1.2rem;
}

.link-card-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.9rem;
}

.link-card {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 0.7rem;
  align-items: center;
  padding: 0.55rem 0.65rem;
  border: 1px solid rgba(129, 104, 56, 0.14);
  border-radius: 16px;
  background: rgba(255, 250, 242, 0.66);
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.link-card:hover {
  transform: translateY(-1px);
  border-color: rgba(129, 104, 56, 0.28);
  background: rgba(255, 251, 245, 0.88);
  box-shadow: 0 14px 30px rgba(84, 69, 39, 0.08);
}

.link-thumb {
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  overflow: hidden;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #fffdf8;
}

.thumb-ted {
  background:
    center / cover no-repeat url('/ted_thumb.png');
}

.thumb-nyt {
  background: center / contain no-repeat url('/nyt_thumb.png');
}

.thumb-scholar {
  background: center / cover no-repeat url('/scholar_thumb.png');
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.link-card-body p {
  margin: 0;
  font-size: 0.96rem;
  line-height: 1.3;
}

.contact-card a {
  color: #8a6a2f;
  font-weight: 700;
}

.link-card {
  color: #8a6a2f;
}

.link-card:hover .link-card-body p,
.link-card:hover .link-thumb,
.contact-card a:hover {
  color: inherit;
}

.link-card:hover .link-card-body p {
  text-decoration: underline;
}

/* ── Blog prose styles ─────────────────────────────────────── */

.post-body {
  font-size: 1.08rem;
  line-height: 1.8;
  color: #4a4a4a;
}

.post-body > *:first-child {
  margin-top: 0;
}

.post-body > *:last-child {
  margin-bottom: 0;
}

.post-body h1,
.post-body h2,
.post-body h3,
.post-body h4 {
  font-family: 'Asul', sans-serif;
  font-weight: 500;
  color: #11212d;
  line-height: 1.2;
  margin: 2rem 0 0.75rem;
}

.post-body h1 { font-size: 2rem; }
.post-body h2 { font-size: 1.6rem; }
.post-body h3 { font-size: 1.42rem; }
.post-body h4 { font-size: 1.1rem; }

.post-body p {
  margin: 0 0 1.1rem;
}

.post-body ul,
.post-body ol {
  margin: 0 0 1.1rem;
  padding-left: 1.4rem;
}

.post-body li {
  margin-bottom: 0.35rem;
}

.post-body a {
  color: #8a6a2f;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.post-body a:hover {
  color: #11212d;
}

.post-body strong {
  font-weight: 700;
  color: #11212d;
}

.post-body blockquote {
  margin: 1.5rem 0;
  padding: 0.85rem 1.25rem;
  border-left: 3px solid rgba(129, 104, 56, 0.35);
  background: rgba(255, 250, 242, 0.6);
  border-radius: 0 12px 12px 0;
  font-style: italic;
  color: #4a4a4a;
}

.post-body blockquote p {
  margin: 0;
}

.post-body code {
  font-family: 'SF Mono', 'Fira Code', 'Fira Mono', monospace;
  font-size: 0.9em;
  background: rgba(129, 104, 56, 0.1);
  padding: 0.15em 0.4em;
  border-radius: 5px;
}

.post-body pre {
  background: rgba(17, 33, 45, 0.06);
  border: 1px solid rgba(129, 104, 56, 0.14);
  border-radius: 14px;
  padding: 1.1rem 1.3rem;
  overflow-x: auto;
  margin: 0 0 1.1rem;
}

.post-body pre code {
  background: none;
  padding: 0;
  font-size: 0.92rem;
}

.post-body hr {
  border: none;
  border-top: 1px solid rgba(129, 104, 56, 0.18);
  margin: 2rem 0;
}

/* ─────────────────────────────────────────────────────────── */

@media (max-width: 900px) {

  .card,
  .card-wide {
    grid-column: span 12;
  }

  .contact-sections {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .contact-section {
    width: 100%;
    padding-inline: 0;
  }

  .contact-section + .contact-section {
    border-left: 0;
  }

  .contact-section-inner {
    max-width: none;
  }

  .contact-section:not(:first-child)::before {
    content: '';
    position: absolute;
    top: -0.5rem;
    right: 0;
    bottom: auto;
    left: 0;
    width: auto;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(129, 104, 56, 0.18) 16%,
      rgba(129, 104, 56, 0.18) 84%,
      transparent 100%
    );
  }

  .link-card {
    grid-template-columns: 56px minmax(0, 1fr);
  }

  .link-thumb {
    width: 56px;
    height: 56px;
  }
}

@media (max-width: 640px) {
  .page-content {
    width: min(100% - 1rem, 1100px);
    padding-top: 0.5rem;
  }

  .hero {
    padding: 1.25rem 1.2rem 1.5rem;
  }

  .hero-top {
    padding-left: 0;
  }

  .hero-logo {
    display: none;
  }

  .card {
    padding: 1.2rem;
  }

  .link-card-list {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  :root {
    scroll-behavior: auto;
  }

  .page-content::before {
    transform: none;
    will-change: auto;
  }
}
</style>
