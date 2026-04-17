<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import NavBar from './components/navbar.vue'

const pageContent = ref<HTMLElement | null>(null)

let animationFrame = 0
let mediaQuery: MediaQueryList | null = null

const updateFlagsOffset = () => {
  animationFrame = 0

  if (!pageContent.value) {
    return
  }

  if (mediaQuery?.matches) {
    pageContent.value.style.setProperty('--flags-offset', '0px')
    return
  }

  const scrollOffset = Math.min(window.scrollY * 0.48, 220)
  pageContent.value.style.setProperty('--flags-offset', `${scrollOffset.toFixed(1)}px`)
}

const requestFlagsUpdate = () => {
  if (animationFrame !== 0) {
    return
  }

  animationFrame = window.requestAnimationFrame(updateFlagsOffset)
}

onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  requestFlagsUpdate()
  window.addEventListener('scroll', requestFlagsUpdate, { passive: true })
  window.addEventListener('resize', requestFlagsUpdate)
  mediaQuery.addEventListener('change', requestFlagsUpdate)
})

onUnmounted(() => {
  window.removeEventListener('scroll', requestFlagsUpdate)
  window.removeEventListener('resize', requestFlagsUpdate)
  mediaQuery?.removeEventListener('change', requestFlagsUpdate)

  if (animationFrame !== 0) {
    window.cancelAnimationFrame(animationFrame)
  }
})
</script>

<template>
  <div class="page-shell">
    <NavBar />

    <main ref="pageContent" class="page-content">
      <section class="hero" aria-labelledby="hero-title">
        <p class="eyebrow">Remittances | Diaspora Bonds | Structured Finance</p>
        <h1 id="hero-title">Strategy, Advice, and Analytics on Global Development Finance</h1>
        <p class="hero-copy">
          Ratha Global supports governments, financial institutions, and fintech leaders
          with deep expertise in remittances, diaspora financing, sovereign ratings,
          structured finance, and investment risk guarantees.
        </p>
      </section>

      <section class="content-grid">
        <article class="card card-wide">
          <h2>Who we are</h2>
          <p>
            Ratha Global was founded by <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/dilipratha/">Dilip Ratha</a>. He advises governments,
            supranational institutions, banks, and fintechs on remittances,
            cross-border payments, migration, diaspora financing (diaspora bonds and
            remittance bonds), sovereign ratings, structured finance, and investment
            risk guarantees. His work with the World Bank Group (over three decades),
            regional development banks, and the United Nations helped integrate
            remittances and migration into global development policy, including
            monitoring the UN Sustainable Development Goals.
          </p>

          <p>
            He founded KNOMAD (a global brain trust on migration with 800+ expert
            network) and co-founded the Migrating out of Poverty Research Consortium
            (6 core universities and 40+ associate partner universities), the Global
            Remittances Working Group, and the African Institute for Remittances
            (securing funding from the EU, Germany, Sweden, Switzerland, UK,
            partnering with the African Union, U of Sussex, the OECD and the UN). His
            research and ideas on today's global challenges have been widely cited in
            policy circles, academic publications, and leading media outlets.
          </p>

          <p>
            After working at the World Bank Group for over 30 years, he founded
            Ratha Global, to continue this work and help fill any institutional gaps.
          </p>

          <p>
              A frequent keynote speaker, his <a target="_blank" href="https://www.ted.com/talks/dilip_ratha_the_hidden_force_in_global_economics_sending_money_home">TED Talk</a> has been viewed over 1.5 million
            times and has inspired 20+ fintech startups. He remains committed to
            lowering the cost of cross-border remittances and advising the next
            generation of innovators.
          </p>
        </article>

        <article class="card">
          <h2>Services</h2>
          <p>Strategic, advisory, and analytic services on:</p>
          <ul>
            <li>Remittances</li>
            <li>Cross-Border Payments</li>
            <li>Diaspora Bonds</li>
            <li>Sovereign Ratings</li>
            <li>Investment Risk Guarantees</li>
            <li>Structured Finance Solutions</li>
          </ul>
        </article>

        <article class="card">
          <h2>Who we work with</h2>
          <p>Global public and private sector clients including:</p>
          <ul>
            <li>Remittance and Payments Industry</li>
            <li>Fintechs</li>
            <li>Commercial Banks</li>
            <li>Governments</li>
            <li>Multilateral Development Banks</li>
            <li>International Financial Institutions</li>
          </ul>
        </article>

        <article class="card">
          <h2>Selected links</h2>
          <div class="link-card-list">
            <a
              class="link-card"
              href="https://www.ted.com/talks/dilip_ratha_the_hidden_force_in_global_economics_sending_money_home"
              target="_blank"
              rel="noopener"
            >
              <div class="link-thumb thumb-ted">
                <span class="visually-hidden">TED</span>
              </div>
              <div class="link-card-body">
                <h3>TED Talk</h3>
                <p>Migration and money.</p>
              </div>
            </a>

            <a
              class="link-card"
              href="https://nyti.ms/2moxI2P"
              target="_blank"
              rel="noopener"
            >
              <div class="link-thumb thumb-nyt">
                <span class="visually-hidden">New York Times</span>
              </div>
              <div class="link-card-body">
                <h3>New York Times</h3>
                <p>Feature coverage.</p>
              </div>
            </a>

            <a
              class="link-card"
              href="https://scholar.google.com/citations?user=9Y4tm18AAAAJ&hl=en"
              target="_blank"
              rel="noopener"
            >
              <div class="link-thumb thumb-scholar">
                <span class="visually-hidden">Scholar</span>
              </div>
              <div class="link-card-body">
                <h3>Academic resources</h3>
                <p>Research and citations.</p>
              </div>
            </a>
          </div>
        </article>

        <article id="contact" class="card card-wide contact-card">
          <div class="contact-card-inner">
            <h2>Get in touch</h2>
            <div class="contact-sections">
              <section class="contact-section">
                <div class="contact-section-inner">
                  <h3>Speaking engagements</h3>
                  <p>Invite Ratha Global for keynote talks, panels, and expert commentary.</p>
                </div>
              </section>

              <section class="contact-section">
                <div class="contact-section-inner">
                  <h3>Book a consultation</h3>
                  <p>Reach out for advisory work on remittances, diaspora bonds, and structured finance.</p>
                </div>
              </section>

              <section class="contact-section">
                <div class="contact-section-inner">
                  <h3>Subscribe to data and reports</h3>
                  <p> Semi-annual and monthly reports including data, analysis, and projections from Ratha Global.</p>
                </div>
              </section>
            </div>
            <p class="contact-callout">
              For all of the above, email 
              <a href="mailto:contact@rathaglobal.com">contact@rathaglobal.com</a>.
            </p>
          </div>
        </article>
      </section>
    </main>
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
  width: min(1100px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 0.75rem 0 4rem;
}

.page-content::before {
  content: '';
  position: absolute;
  inset: 0 min(50% - 50vw, -3rem) auto;
  height: min(78rem, 100%);
  background: top center / calc(100% + 10rem) auto no-repeat url('/flags_grid.png');
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
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.48) 34%,
    rgba(0, 0, 0, 0.14) 66%,
    transparent 100%
  );
}

.page-content > * {
  position: relative;
  z-index: 1;
}

.hero {
  padding: 1.75rem 1.25rem 2.5rem;
  max-width: 860px;
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
  font-size: clamp(2.35rem, 5.6vw, 4.3rem);
  line-height: 0.98;
  font-family: Georgia, 'Times New Roman', serif;
  color: #11212d;
}

.hero-copy {
  margin: 1.5rem 0 0;
  max-width: 680px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a4a4a;
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
  gap: 1rem;
}

.contact-section {
  position: relative;
  width: 100%;
}

.contact-section-inner {
  max-width: 18rem;
  margin: 0 auto;
}

.contact-section:not(:first-child)::before {
  content: '';
  position: absolute;
  top: 0.3rem;
  bottom: 0.3rem;
  left: -0.5rem;
  width: 1px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(129, 104, 56, 0.18) 18%,
    rgba(129, 104, 56, 0.18) 82%,
    transparent 100%
  );
}

.contact-section h3 {
  margin: 0 0 0.6rem;
  font-size: 1.42rem;
  font-family: Garamond, Baskerville, 'Times New Roman', serif;
  font-weight: 500;
  color: #11212d;
}

.contact-section p {
  margin-bottom: 0.75rem;
}

.card h2 {
  margin: 0 0 1rem;
  font-size: 1.7rem;
  font-family: Garamond, Baskerville, 'Times New Roman', serif;
  font-weight: 500;
  color: #11212d;
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

.link-card-body h3 {
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
  font-family: Garamond, Baskerville, 'Times New Roman', serif;
  font-weight: 500;
  color: #11212d;
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

.link-card:hover .link-card-body h3,
.link-card:hover .link-card-body p,
.link-card:hover .link-thumb,
.contact-card a:hover {
  color: inherit;
}

.link-card:hover .link-card-body h3 {
  text-decoration: underline;
}

@media (max-width: 900px) {
  .hero {
    max-width: 640px;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .card,
  .card-wide {
    grid-column: span 12;
  }

  .contact-sections {
    grid-template-columns: 1fr;
  }

  .contact-section {
    width: 100%;
  }

  .contact-section-inner {
    max-width: none;
  }

  .contact-section:not(:first-child)::before {
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
    max-width: none;
    padding: 1.25rem 1rem 1.5rem;
  }

  .card {
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
