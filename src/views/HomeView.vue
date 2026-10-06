<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const heroEl = ref<HTMLElement | null>(null)
const heroBgEl = ref<HTMLElement | null>(null)

let heroTop = 0
let heroHeight = 1
let maxOffset = 0
let ticking = false

// Measured once on mount/resize rather than on every scroll frame, so the
// scroll handler never forces a synchronous layout read.
function measureHero() {
  if (!heroEl.value) return
  heroTop = heroEl.value.offsetTop
  heroHeight = heroEl.value.offsetHeight || 1
  maxOffset = heroHeight * 0.3
}

function updateParallax() {
  ticking = false
  if (!heroBgEl.value) return
  // 0 while the hero sits at the top of the viewport, 1 once it has fully
  // scrolled past. A constant (linear) rate across that whole transit means
  // the background keeps visibly moving the entire time the hero is on
  // screen - it only ever reaches maxOffset right as the hero fully exits,
  // rather than easing off (and looking like it stalled) while still
  // partway visible.
  const progress = Math.max(0, Math.min(1, (window.scrollY - heroTop) / heroHeight))
  heroBgEl.value.style.transform = `translate3d(0, ${progress * maxOffset}px, 0)`
}

function onScroll() {
  if (ticking) return
  ticking = true
  window.requestAnimationFrame(updateParallax)
}

onMounted(() => {
  measureHero()
  updateParallax()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', measureHero)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', measureHero)
})

function parseFrontmatter(raw: string): Record<string, string> {
  const fence = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!fence) return {}

  const data: Record<string, string> = {}
  for (const line of (fence[1] ?? '').split('\n')) {
    const i = line.indexOf(':')
    if (i < 1) continue
    const key = line.slice(0, i).trim()
    const value = line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
    if (key) data[key] = value
  }
  return data
}

const featuredPostSlug =
  'to-support-nepal-waive-remittance-fees'
const featuredPostRaw = import.meta.glob('../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const featuredPostData = parseFrontmatter(
  featuredPostRaw[`../content/posts/${featuredPostSlug}.md`] ?? '',
)
const featuredPostDate = featuredPostData.date
  ? new Date(`${featuredPostData.date}T00:00:00`).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  : ''
</script>

<template>
  <main class="page-content">

    <section ref="heroEl" class="hero" aria-labelledby="hero-title">
      <div ref="heroBgEl" class="hero-bg" />
      <div class="hero-gradient" />
      <div class="hero-inner">
        <div class="hero-box hero-box-title">
          <h1 id="hero-title">Advice, Analytics, and Solutions for Global Development Finance</h1>
        </div>
        <div class="hero-box hero-box-text">
          <p>
            Ratha Global supports public and private sector clients on Remittances, Diaspora Finances, Credit Enhancement, and Innovative Capital Solutions
          </p>
        </div>
      </div>
    </section>


    <RouterLink
      :to="`/blog/${featuredPostSlug}`"
      class="card-link featured-post"
      aria-labelledby="featured-post-title"
    >
      <section class="featured-post-section">
        <div class="featured-post-card">
          <p class="eyebrow">
            Opinion
            <span v-if="featuredPostDate" class="eyebrow-divider">&middot;</span>
            {{ featuredPostDate }}
          </p>
          <h2 id="featured-post-title">{{ featuredPostData.title }}</h2>
          <p class="featured-post-description">{{ featuredPostData.description }}</p>
          <p v-if="featuredPostData.contributors" class="featured-post-contributors">
            By {{ featuredPostData.contributors }}
          </p>
          <span class="featured-post-cta">Read &rarr;</span>
        </div>
      </section>
    </RouterLink>

    <section class="split-section">
     <div class="split-column">
        <h2>SERVICES</h2>
        <p>Strategic, advisory, analytic, growth and partnership services on:</p>
        <ul>
          <li>Remittances, Payments, and Fintechs</li>
          <li>Diaspora Finances</li>
          <li>Credit Ratings</li>
          <li>Structured Finance & Guarantees</li>
          <li>Migration, Diasporas & Development</li>
        </ul>
      </div>

      <div class="split-column">
        <h2>CLIENTS</h2>
        <ul>
          <li>Governments</li>
          <li>Commercial banks and credit cooperatives </li>
          <li>Remittance and payments industry</li>
          <li>Investors</li>
          <li>Multilateral development banks and financial institutions </li>
          <li>UN agencies and international organizations</li>
        </ul>
      </div>
     </section>

    <section>
      <h2>HOW WE CAN HELP</h2>
      <div class="help-layout">
        <ul class="help-bullets">
          <li><strong>Capital market access:</strong> where, when and how to issue, register and list bonds</li>
          <li><strong>Stronger credit profiles:</strong> leveraging predictable cash flows such as remittances</li>
          <li><strong>Credit enhancement:</strong> diaspora bonds, future-flow securitization and guarantees, blended finance, and co-funding</li>
          <li><strong>Sovereign ratings:</strong> models to estimate shadow sovereign ratings where none exist or are outdated</li>
          <li><strong>Partnerships:</strong> a global network of central banks, money transfer operators, investors and fintechs</li>
        </ul>
        <div class="help-featured">
          <h3>Data and analytics</h3>
          <p>We provide authoritative datasets on remittance flows and diaspora savings, including time-series and bilateral data for 200 countries. We also produce Global Finance Factsheets for all countries, and prepare reports, projections, and policy briefs tailored to clients&rsquo; needs.</p>
        </div>
      </div>
    </section>

    <section>
      <h2>WHO WE ARE</h2>
      <div class="who-we-are-layout">
        <div class="who-we-are-text">
          <p>
            <!-- Ratha Global is a global development finance advisory and research firm dedicated to mobilizing finance for emerging and developing economies. We combine original research, authoritative global data, deep market experience, and a worldwide network to develop innovative financing solutions and partnerships for governments, financial institutions, development agencies, investors, and fintech companies. -->
            Ratha Global is an advisory and research firm dedicated to mobilizing financing for emerging and developing economies. We combine original research, authoritative data, deep market experience and a worldwide network to design innovative financing solutions and build effective partnerships.
          </p>

          <p>
            Ratha Global builds on the pioneering work of its founder, <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/dilipratha/">Dilip Ratha</a>,
            whose career spans more than three decades in the World Bank, MIGA,
            investment banking, and academia. He helped mainstream remittances in
            the global development agenda. He pioneered the implementation of
            diaspora bonds and advocated future-flow securitization as a
            market-based approach to mobilizing capital when conventional market
            access is constrained, and was among the first to systematically estimate
            South-South flows of foreign direct investment, remittances, and
            migration. Recognizing the role credit ratings play in capital market
            access, he has also built models to predict sovereign ratings for
            countries that lack them or have outdated ones. He draws on his extensive
            research on bond spreads to guide issuers where, when, and how to issue,
            register and list bonds.
          </p>

          <p>
            Building on this foundation, Ratha Global advises clients on
            remittances, diaspora bonds, structured finance, and guarantees. The firm
            maintains authoritative datasets on remittance flows and diaspora
            savings, including time-series and bilateral remittance data covering
            some 200 countries, helping clients leverage predictable cash flows,
            strengthen credit profiles, mitigate risk, and connect development
            priorities with the requirements of international capital markets.
          </p>

          <p>
            Ratha Global draws on an extensive global network of policymakers,
            central banks, money transfer operators, investment bankers, investors,
            development practitioners, and fintech innovators to bridge development
            policy and private finance, turning knowledge and innovative ideas into
            actionable financing and development solutions and international partnerships.
          </p>
        </div>

        <aside class="who-we-are-sidebar">
          <div class="who-we-are-portrait-wrap">
            <span class="who-we-are-portrait-caption">Founder & CEO Dilip Ratha</span>
            <img class="who-we-are-portrait" src="/dilip_ratha_portrait.png" alt="Dilip Ratha">
          </div>
          <a
            class="who-we-are-press"
            href="https://www.nytimes.com/2008/03/17/world/asia/17remit.html"
            target="_blank"
            rel="noopener"
          >
            <span class="who-we-are-press-header">
              <img class="who-we-are-press-logo" src="/nyt_logo.png" alt="The New York Times">
              <span class="who-we-are-press-title">World Banker and His Cash Return Home</span>
            </span>
            <span class="who-we-are-press-desc">
              Jason DeParle's March 2008 profile on his work bringing remittances into
              the global development agenda.
            </span>
          </a>
        </aside>
      </div>
    </section>

    <section>
      <h2>RESOURCES</h2>
      <div class="link-buttons">
        <a
          class="link-button"
          href="https://www.ted.com/talks/dilip_ratha_the_hidden_force_in_global_economics_sending_money_home"
          target="_blank"
          rel="noopener"
        >
          <img class="link-button-thumb" src="/ted_thumb.png" alt="TED">
          <span>TED Talk on Remittances and Diaspora Bonds</span>
        </a>
        <a
          class="link-button"
          href="https://www.miga.org/sites/default/files/2023-12/MarketFinance_MIGA.pdf"
          target="_blank"
          rel="noopener"
        >
          <img class="link-button-thumb" src="/miga_link.png" alt="MIGA">
          <span>Market Finance for Development</span>
        </a>
        <a
          class="link-button"
          href="https://documents1.worldbank.org/curated/en/202621468156251840/pdf/456450PUB0978010ONLY10Sept030102008.pdf"
          target="_blank"
          rel="noopener"
        >
          <img class="link-button-thumb" src="/innovative_financing.png" alt="">
          <span>Innovative Financing for Development</span>
        </a>
      </div>
      <div class="resources-more-link">
        <a
          class="resources-more-cta"
          href="https://scholar.google.com/citations?user=9Y4tm18AAAAJ&hl=en"
          target="_blank"
          rel="noopener"
        >
          <img class="resources-more-icon" src="/scholar_thumb.png" alt="">
          Research and Policy Resources
        </a>
        <RouterLink class="resources-more-cta" to="/blog">
          <img class="resources-more-icon" src="/ratha_global_new_no_border.png" alt="">
          Publications
        </RouterLink>
      </div>
    </section>


    <section id="contact">
      <h2>CONTACT</h2>
      <div class="contact-columns">
        <div class="contact-column">
          <h3>Book a consultation</h3>
          <p>Reach out for advisory work on remittances, diaspora bonds, structured finance, and guarantees.</p>
        </div>

        <div class="contact-column">
          <h3>Subscribe to data & reports</h3>
          <p>Regular and customized data, reports, analysis, projections and strategic briefs from Ratha Global.</p>
        </div>

        <div class="contact-column">
          <h3>Media and Speaking requests</h3>
          <p>Contact Dilip Ratha for keynote presentations or media interviews.</p>
        </div>
      </div>

      <p>
        For all of the above, email
        <a href="mailto:contact@rathaglobal.com">contact@rathaglobal.com</a>.
      </p>
    </section>
  </main>
</template>

<style scoped>
.featured-post-section {
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding: 0;
}

.featured-post-card {
  padding: 2.75rem 10% 2.75rem 20%;
  background: rgba(36, 59, 83, 0.05);
  transition: background 0.3s ease;
}

.featured-post:hover .featured-post-card,
.featured-post:focus-visible .featured-post-card {
  background: rgba(36, 59, 83, 0.12);
}

.featured-post-card h2 {
  margin-bottom: 0.4rem;
}

.featured-post-description,
.featured-post:hover .featured-post-description,
.featured-post:focus-visible .featured-post-description {
  margin-top: 0.4rem;
  margin-bottom: 0;
  color: var(--color-ink);
}

.featured-post-contributors {
  margin-top: 0.4rem;
  margin-bottom: 0;
  font-style: italic;
}

.featured-post-contributors + .featured-post-cta {
  margin-top: 2rem;
}

.featured-post-cta {
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.featured-post:hover .featured-post-cta,
.featured-post:focus-visible .featured-post-cta {
  transform: translateX(6px);
}

.help-layout {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 2.5rem;
  align-items: stretch;
}

.help-bullets {
  margin: 0;
}

.help-bullets li {
  margin-bottom: 1.1rem;
  line-height: 1.6;
  color: var(--color-ink);
}

.help-bullets strong {
  color: var(--color-indigo);
}

.help-featured {
  padding: 1.75rem 2rem;
  background: rgba(36, 59, 83, 0.05);
}

.help-featured h3 {
  margin: 0 0 0.5rem;
}

.help-featured p {
  margin: 0;
  color: var(--color-ink);
  line-height: 1.6;
}

@media (max-width: 640px) {
  .help-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.who-we-are-layout {
  display: flex;
  align-items: flex-start;
  gap: 1.75rem;
}

.who-we-are-text {
  flex: 1 1 auto;
  min-width: 0;
}

.who-we-are-sidebar {
  position: sticky;
  top: 6rem;
  flex: 0 0 auto;
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.who-we-are-portrait {
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border: 1px solid rgba(168, 137, 88, 0.35);
}

.who-we-are-portrait-caption {
  display: block;
  margin-bottom: 0.2rem;
  color: var(--color-moss);
  font-size: 0.82rem;
  text-align: right;
}

.who-we-are-press {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  text-decoration: none;
  line-height: 1.4;
}

.who-we-are-press-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.who-we-are-press-logo {
  height: 32px;
  width: auto;
  flex-shrink: 0;
  opacity: 0.82;
}

.who-we-are-press-title {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-indigo);
  transition: color 0.2s ease;
}

.who-we-are-press-desc {
  color: var(--color-moss);
  font-size: 0.82rem;
}

.who-we-are-press:hover .who-we-are-press-title,
.who-we-are-press:focus-visible .who-we-are-press-title {
  color: var(--color-terracotta);
}

@media (max-width: 640px) {
  .who-we-are-layout {
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }

  .who-we-are-sidebar {
    position: static;
    width: 100%;
    max-width: 260px;
    margin: 0 auto;
  }

  .featured-post-card {
    padding: 2.75rem 1.25rem;
  }
}

.split-section {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  padding-top: 4.5rem;
  border-top: 1px solid rgba(168, 137, 88, 0.35);
}

.split-column {
  flex: 0 1 auto;
  max-width: 46%;
  min-width: 220px;
}

@media (max-width: 640px) {
  .split-section {
    flex-direction: column;
    gap: 2.5rem;
  }

  .split-column {
    max-width: none;
  }
}

.link-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.resources-more-link {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.75rem;
}

.resources-more-cta {
  display: flex;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.1rem 1.5rem;
  color: var(--color-indigo);
  text-decoration: none;
  background: rgba(36, 59, 83, 0.05);
  transition: background 0.3s ease, color 0.2s ease;
}

.resources-more-icon {
  height: 1.5rem;
  width: auto;
}

.resources-more-cta:hover,
.resources-more-cta:focus-visible {
  background: rgba(36, 59, 83, 0.12);
  color: var(--color-terracotta);
}

.resources-more-cta::after {
  content: '\2192';
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.resources-more-cta:hover::after,
.resources-more-cta:focus-visible::after {
  transform: translateX(4px);
}

.link-button {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  aspect-ratio: 1;
  padding: 1.5rem;
  border: 1px solid rgba(168, 137, 88, 0.35);
  border-radius: 0;
  color: #fff;
  text-decoration: none;
  text-align: center;
  font-weight: 400;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.link-button::before,
.link-button::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.link-button::before {
  background: linear-gradient(
    135deg,
    rgba(36, 59, 83, 0.4) 0%,
    rgba(23, 41, 52, 0.44) 25%,
    rgba(17, 23, 22, 0.52) 55%,
    rgba(17, 23, 22, 0.6) 80%,
    rgba(17, 23, 22, 0.68) 100%
  );
  backdrop-filter: saturate(150%);
  -webkit-backdrop-filter: saturate(150%);
}

.link-button::after {
  background: linear-gradient(
    135deg,
    rgba(36, 59, 83, 0.35) 0%,
    rgba(23, 41, 52, 0.4) 25%,
    rgba(17, 23, 22, 0.55) 55%,
    rgba(17, 23, 22, 0.68) 80%,
    rgba(17, 23, 22, 0.8) 100%
  );
  backdrop-filter: blur(0.5px) saturate(70%);
  -webkit-backdrop-filter: blur(0.5px) saturate(70%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.link-button span {
  position: relative;
  z-index: 2;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.link-button:focus-visible {
  transform: translateY(-4px);
}

.link-button:focus-visible::after {
  opacity: 1;
}

.link-button:focus-visible span {
  transform: translateY(-2px);
  color: color-mix(in srgb, var(--color-saffron) 55%, white);
}

.link-button:focus-visible .link-button-thumb {
  transform: scale(1.06);
}

@media (hover: hover) {
  .link-button:hover {
    transform: translateY(-4px);
  }

  .link-button:hover::after {
    opacity: 1;
  }

  .link-button:hover span {
    transform: translateY(-2px);
    color: color-mix(in srgb, var(--color-saffron) 55%, white);
  }

  .link-button:hover .link-button-thumb {
    transform: scale(1.06);
  }
}

.link-button-thumb {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 0;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.link-button-thumb-books {
  object-position: center 30%;
}

.contact-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 3rem;
}

#contact > p {
  text-align: center;
}

.contact-column {
  padding: 0 2rem;
}

.contact-column h3 {
  margin-bottom: 0.35rem;
}

.contact-column:first-child {
  padding-left: 0;
}

.contact-column:last-child {
  padding-right: 0;
}

.contact-column + .contact-column {
  border-left: 1px solid rgba(168, 137, 88, 0.35);
}

@media (max-width: 900px) {
  .link-buttons {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .resources-more-link {
    flex-direction: column;
    gap: 0.75rem;
  }

  .link-button {
    aspect-ratio: auto;
    height: 110px;
    width: 100%;
    align-items: flex-end;
    justify-content: center;
    padding: 1rem;
    text-align: center;
  }

  .contact-columns {
    grid-template-columns: 1fr;
  }

  .contact-column {
    padding: 1.5rem 0 0;
  }

  .contact-column:first-child {
    padding-top: 0;
  }

  .contact-column + .contact-column {
    border-left: none;
    border-top: 1px solid rgba(168, 137, 88, 0.35);
  }
}

.hero {
  position: relative;
  overflow: hidden;
  width: 100vw;
  max-width: 100vw;
  margin-top: calc(-1rem - var(--frontmatter-height, 0px));
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  min-height: calc(62vh + 1rem + var(--frontmatter-height, 0px));
  padding: 0;
  color: var(--color-paper);
  --hero-text-width: 680px;
  --hero-left-inset: 2.5rem;
}

.hero-inner {
  position: absolute;
  top: calc(1rem + var(--frontmatter-height, 0px));
  right: 1rem;
  bottom: 1rem;
  left: var(--hero-left-inset);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1.75rem;
  max-width: 90rem;
  margin: 0 auto;
}

.hero-bg {
  position: absolute;
  top: -32%;
  bottom: -32%;
  left: 0;
  right: 0;
  z-index: 0;
  background-image: url('/flags_on_sky.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  will-change: transform;
}

.hero-gradient {
  /* A flat baseline tint covers the entire banner (second background,
     underneath) so no part of the photo is left uncovered. Layered on top
     of it, a stronger fade - sized and anchored the same way the text
     starts flush at the hero's true left edge, reaching past wherever the
     text actually ends up - darkens specifically behind the text, easing
     down to exactly the baseline tint so the handoff between the two
     layers is invisible. */
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background-image:
    linear-gradient(
      90deg,
      rgba(23, 33, 31, 0.80) 0%,
      rgba(23, 33, 31, 0.50) 55%,
      rgba(23, 33, 31, 0.0) 100%
    ),
    linear-gradient(rgba(23, 33, 31, 0.3), rgba(23, 33, 31, 0.3));
  background-repeat: no-repeat, no-repeat;
  background-size:
    min(
      100%,
      calc(
        max(var(--hero-left-inset), (100vw - 1rem - 90rem + var(--hero-left-inset)) / 2) +
          var(--hero-text-width) + 5rem
      )
    )
    100%,
    100% 100%;
}

.hero h1,
.hero p {
  color: var(--color-paper);
}

.hero-box {
  width: 100%;
  max-width: var(--hero-text-width);
  text-align: left;
}

.hero-box h1,
.hero-box p {
  margin: 0;
}

.hero-box-title h1 {
  font-size: 3.1rem;
  line-height: 1.15;
}

.hero-box-text {
  margin-left: 2.5rem;
  max-width: calc(var(--hero-text-width) - 2.5rem);
}

.hero-box-text p {
  font-size: 1.55rem;
  line-height: 1.35;
}

@media (min-width: 1440px) {
  .hero {
    --hero-text-width: 820px;
  }

  .hero-box-title h1 {
    font-size: 3.6rem;
  }

  .hero-box-text p {
    font-size: 1.8rem;
  }
}

@media (max-width: 640px) {
  .hero {
    --hero-text-width: min(90vw, 480px);
    --hero-left-inset: 0.85rem;
    min-height: calc(66vh + 1rem + var(--frontmatter-height, 0px));
  }

  .hero-inner {
    right: 0.85rem;
    bottom: 0.5rem;
    align-items: center;
    gap: 0.5rem;
  }

  .hero-box-title h1 {
    font-size: clamp(2.4rem, 1.9rem + 2.5vw, 2.9rem);
  }

  .hero-box-text {
    margin-left: 0;
    max-width: var(--hero-text-width);
  }

  .hero-box-text p {
    font-size: clamp(1.2rem, 0.9rem + 1.5vw, 1.5rem);
  }
}
</style>
