<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const heroEl = ref<HTMLElement | null>(null)
const heroBgEl = ref<HTMLElement | null>(null)

let maxOffset = 0
let ticking = false

function measureHero() {
  maxOffset = heroEl.value ? heroEl.value.offsetHeight * 0.15 : 0
}

function updateParallax() {
  ticking = false
  if (!heroEl.value || !heroBgEl.value) return
  const offset = Math.max(-maxOffset, Math.min(maxOffset, -heroEl.value.getBoundingClientRect().top * 0.3))
  heroBgEl.value.style.transform = `translateY(${offset}px)`
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
  'an-appeal-to-money-transfer-operators-and-payment-service-providers-serving-nepal'
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
      <div class="hero-boxes">
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
      class="card-link"
      aria-labelledby="featured-post-title"
    >
      <section>
        <p class="eyebrow">Featured</p>
        <p v-if="featuredPostDate" class="eyebrow">{{ featuredPostDate }}</p>
        <h2 id="featured-post-title">{{ featuredPostData.title }}</h2>
        <p>{{ featuredPostData.description }}</p>
        <span>Read the post &rarr;</span>
      </section>
    </RouterLink>

    <section>
      <h2>Clients</h2>
      <ul>
        <li>Remittance and Payments Industry</li>
        <li>Commercial Banks</li>
        <li>Governments</li>
        <li>Multilateral Development Banks</li>
        <li>International Financial Institutions</li>
        <li>U.N. Agencies and International Organizations</li>
      </ul>
    </section>

    <section>
      <h2>Services</h2>
      <p>Strategic, advisory, and analytic services on:</p>
      <ul>
        <li>Remittances, Payments, and Fintechs</li>
        <li>Diaspora Finances</li>
        <li>Credit Ratings</li>
        <li>Structured Finance & Guarantees</li>
        <li>Migration, Diasporas & Development</li>
      </ul>
    </section>

    <section>
      <h2>Selected links</h2>
      <ul>
        <li>
          <a
            href="https://www.ted.com/talks/dilip_ratha_the_hidden_force_in_global_economics_sending_money_home"
            target="_blank"
            rel="noopener"
          >TED Talk on Remittances and Diaspora Bonds</a>
        </li>
        <li>
          <a
            href="https://www.miga.org/sites/default/files/2023-12/MarketFinance_MIGA.pdf"
            target="_blank"
            rel="noopener"
          >Market Finance for Development</a>
        </li>
        <li>
          <a
            href="https://scholar.google.com/citations?user=9Y4tm18AAAAJ&hl=en"
            target="_blank"
            rel="noopener"
          >Academic Resources</a>
        </li>
      </ul>
    </section>

    <section>
      <h2>Who We Are</h2>
      <p>
        Ratha Global is a global development finance advisory and research firm
        dedicated to mobilizing finance for emerging and developing economies. We
        combine original research, authoritative global data, deep market
        experience, and a worldwide network to develop innovative financing
        solutions for governments, financial institutions, development agencies,
        investors, and fintech companies.
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
        actionable financing and development solutions.
      </p>

      <img src="/dilip_ratha_portrait_web.jpg" alt="Dilip Ratha" width="240">
      <p>
        <a href="https://nyti.ms/2moxI2P" target="_blank" rel="noopener">
          New York Times Profile on Dilip Ratha
        </a>
      </p>
    </section>

    <section id="contact">
      <h2>Contact</h2>
      <div>
        <h3>Book a consultation</h3>
        <p>Reach out for advisory work on remittances, diaspora bonds, and structured finance.</p>
      </div>

      <div>
        <h3>Subscribe to data & reports</h3>
        <p>Regular and customized data, reports, analysis, projections and strategic briefs from Ratha Global.</p>
      </div>

      <div>
        <h3>Media and Speaking requests</h3>
        <p>Contact Dilip Ratha for keynote presentations or media interviews.</p>
      </div>

      <p>
        For all of the above, email
        <a href="mailto:contact@rathaglobal.com">contact@rathaglobal.com</a>.
      </p>
    </section>
  </main>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 70vh;
  padding: 1rem;
  color: var(--color-paper);
}

.hero-bg {
  position: absolute;
  top: -15%;
  bottom: -15%;
  left: 0;
  right: 0;
  z-index: 0;
  background: center / cover no-repeat url('/flags_on_sky.jpg');
  will-change: transform;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(
      to bottom,
      rgba(23, 33, 31, 0.3) 0%,
      rgba(23, 33, 31, 0.5) 40%,
      rgba(23, 33, 31, 0.80) 100%
    ),
    linear-gradient(
      to right,
      rgba(23, 33, 31, 0.6) 0%,
      rgba(23, 33, 31, 0.15) 50%,
      rgba(23, 33, 31, 0.6) 100%
    );
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  mask-image:
    linear-gradient(to bottom, transparent 0%, transparent 88%, black 100%),
    linear-gradient(to right, black 0%, transparent 10%, transparent 90%, black 100%);
  -webkit-mask-image:
    linear-gradient(to bottom, transparent 0%, transparent 88%, black 100%),
    linear-gradient(to right, black 0%, transparent 10%, transparent 90%, black 100%);
}

.hero h1,
.hero p {
  color: var(--color-paper);
}

.hero p {
  font-size: 1.4rem;
}

.hero-boxes {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.hero-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 280px;
  padding: 1.5rem;
}

.hero-box-title {
  text-align: left;
}

.hero-box-text {
  text-align: right;
}

.hero-box h1,
.hero-box p {
  margin: 0;
}
</style>
