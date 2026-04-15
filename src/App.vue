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

  const { top } = pageContent.value.getBoundingClientRect()
  const scrollOffset = Math.min(Math.max(-top * 0.48, 0), 220)
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
      <section class="hero">
        <p class="eyebrow">Remittances | Diaspora Bonds | Structured Finance</p>
        <h1>Strategy, Advice, and Analytics on Global Development Finance</h1>
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
            Ratha Global was founded by <a target="_blank" href="https://www.linkedin.com/in/dilipratha/">Dilip Ratha</a>. He advises governments,
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
          <ul class="link-list">
           <li>
              <a href="https://www.ted.com/talks/dilip_ratha_the_hidden_force_in_global_economics_sending_money_home" target="_blank" rel="noopener">
                TED Talk
              </a>
            </li>
            <li>
              <a href="https://nyti.ms/2moxI2P" target="_blank" rel="noopener">
                New York Times article
              </a>
            </li>
             <li>
              <a
                href="https://scholar.google.com/citations?user=9Y4tm18AAAAJ&hl=en"
                target="_blank"
                rel="noopener"
              >
                Academic citations
              </a>
            </li>
          </ul>
        </article>

        <article id="contact" class="card contact-card">
          <h2>Contact</h2>
          <p>For advisory inquiries and speaking engagements:</p>
          <a href="mailto:contact@rathaglobal.com">contact@rathaglobal.com</a>
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
}

a {
  color: inherit;
}

#app {
  min-height: 100vh;
}

.page-shell {
  min-height: 100vh;
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
  opacity: 0.08;
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

.card h2 {
  margin: 0 0 1rem;
  font-size: 1.45rem;
  font-family: Georgia, 'Times New Roman', serif;
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

.card ul {
  margin: 0;
  padding-left: 1.2rem;
}

.link-list {
  list-style: disc;
  padding-left: 1.2rem;
}

.link-list li + li {
  margin-top: 0.85rem;
}

.link-list a,
.contact-card a {
  color: #8a6a2f;
  text-decoration: none;
  font-weight: 700;
}

.link-list a:hover,
.contact-card a:hover {
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
