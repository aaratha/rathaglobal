<script setup lang="ts">
import NavBar from './components/navbar.vue'
import SiteFooter from './components/footer.vue'
</script>

<template>
  <div class="page-shell">
    <NavBar />
    <router-view />
    <SiteFooter />
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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: clip;
}

.page-content {
  --flags-offset: 0px;
  position: relative;
  isolation: isolate;
  flex: 1;
  width: min(1050px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 0.75rem 0 4rem;
}

.page-content::before {
  content: '';
  position: absolute;
  inset: 0 min(50% - 50vw, -3rem) 0;
  background: top center / calc(100% + 10rem) auto repeat-y url('/flags_grid.png');
  filter: grayscale(1) blur(1.5px);
  pointer-events: none;
  z-index: 0;
  transform: translate3d(0, var(--flags-offset), 0);
  will-change: transform;
  -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0, rgba(0, 0, 0, 0.03) 28rem);
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0, rgba(0, 0, 0, 0.03) 28rem);
}

.page-content > * {
  position: relative;
  z-index: 1;
}

.hero {
  --hero-title-size: clamp(1.9rem, 4.6vw, 3.5rem);
  --hero-logo-size: calc(var(--hero-title-size) * 3.24 + 1.87rem);
  margin: 0 0 1.5rem;
  padding: 1.75rem 2rem 1.75rem;
  border: 1px solid rgba(129, 104, 56, 0.16);
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255, 253, 249, 0.4) 0%, rgba(255, 253, 249, 0) 100%);
  backdrop-filter: blur(4px);
  box-shadow: 0 14px 32px rgba(84, 69, 39, 0.1);
}

.hero-inner {
  max-width: 889px;
  margin: 0 auto;
}

.hero-top {
  position: relative;
  padding-left: calc(var(--hero-logo-size) + 1.5rem);
}

.hero-logo-frame {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: var(--hero-logo-size);
  height: var(--hero-logo-size);
  box-sizing: border-box;
  padding: calc(var(--hero-logo-size) * 0.12);
  border: 4px solid #111111;
  border-radius: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-logo {
  width: 100%;
  height: 100%;
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

.card.featured-post {
  display: block;
  width: 100%;
  margin: 0 0 1.25rem;
  padding: 3rem;
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
  border: 1px solid rgba(129, 104, 56, 0.22);
  border-radius: 22px;
  background: rgba(255, 253, 249, 0.97);
  box-shadow: 0 18px 40px rgba(84, 69, 39, 0.14);
}

.card-wide {
  grid-column: span 12;
}

.about-card {
  padding: 3rem;
}

.about-card-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2.5rem;
  align-items: start;
}

.about-card-sidebar {
  position: sticky;
  top: 6rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.85rem;
  border: 1px solid rgba(129, 104, 56, 0.22);
  border-radius: 18px;
  background: rgba(255, 253, 249, 0.97);
  box-shadow: 0 6px 16px rgba(84, 69, 39, 0.07);
  transition:
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.about-card-sidebar.is-stuck {
  box-shadow: 0 12px 26px rgba(84, 69, 39, 0.14);
  transform: translateY(2px);
}

.about-card-sidebar-sentinel {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}

.about-card-portrait {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 12px;
}

.about-card-sidebar .link-card {
  padding: 0;
  border: none;
  border-radius: 0;
  background: none;
}

.about-card-sidebar .link-card-body p {
  font-size: 1.12rem;
  line-height: 1.4;
}

.about-card-sidebar .link-card:hover {
  transform: none;
  box-shadow: none;
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

.card p,
.card li,
.contact-card a {
  font-size: 1.08rem;
  line-height: 1.75;
  color: #38393b;
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

.thumb-pdf {
  background: center / cover no-repeat url('/miga_link.png');
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
  color: #38393b;
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
  color: #38393b;
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

  .hero-logo-frame {
    display: none;
  }

  .hero-copy {
    margin-top: 0.85rem;
    font-size: 1.15rem;
    line-height: 1.6;
  }

  .about-card-grid {
    grid-template-columns: 1fr;
  }

  .about-card-sidebar {
    position: relative;
    top: auto;
    order: -1;
  }

  .about-card-sidebar.is-stuck {
    box-shadow: 0 6px 16px rgba(84, 69, 39, 0.07);
    transform: none;
  }

  .card {
    padding: 1.2rem;
  }

  .card.featured-post {
    padding: 1.2rem;
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
