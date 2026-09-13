<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

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
  <main ref="pageContent" class="page-content">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-top">
        <img
          class="hero-logo"
          src="/ratha_global_new_transparent.png"
          alt="Ratha Global logo"
        >
        <div class="hero-heading">
          <p class="eyebrow">Remittances | Diaspora Bonds | Structured Finance</p>
          <h1 id="hero-title">Advice, Analytics, and Solutions for Global Development Finance</h1>
        </div>
      </div>
      <p class="hero-copy">
        Ratha Global supports public and private sector clients on Remittances, Diaspora Finances, Credit Enhancement, and Innovative Capital Solutions
      </p>
    </section>

    <RouterLink
      :to="`/blog/${featuredPostSlug}`"
      class="featured-post card"
      aria-labelledby="featured-post-title"
    >
      <div class="featured-post-copy">
        <p class="eyebrow">Featured</p>
        <p v-if="featuredPostDate" class="featured-post-date">{{ featuredPostDate }}</p>
        <h2 id="featured-post-title">{{ featuredPostData.title }}</h2>
        <p class="featured-post-description">{{ featuredPostData.description }}</p>
        <span class="featured-post-link">
          Read the post <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </RouterLink>

    <section class="content-grid">

      <article class="card">
        <h2>Clients</h2>
        <ul>
          <li>Remittance and Payments Industry</li>
          <li>Commercial Banks</li>
          <li>Governments</li>
          <li>Multilateral Development Banks</li>
          <li>International Financial Institutions</li>
          <li>U.N. Agencies and International Organizations</li>
        </ul>
      </article>

      <article class="card">
        <h2>Services</h2>
        <p>Strategic, advisory, and analytic services on:</p>
        <ul>
          <li>Remittances, Payments, and Fintechs</li>
          <li>Diaspora Finances</li>
          <li>Credit Ratings</li>
          <li>Structured Finance & Guarantees</li>
          <li>Investment Outreach and Transactions</li>
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
              <p>Remittances and diaspora bonds</p>
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
              <h3>New York Times Article</h3>
              <p>Profile on Dilip Ratha</p>
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
              <h3>Academic Resources</h3>
              <p>Research and citations.</p>
            </div>
          </a>
        </div>
      </article>

      <article class="card card-wide about-card">
        <h2>Who We Are</h2>
        <p>
          Ratha Global is a global development finance advisory and research firm
          dedicated to mobilizing finance for emerging and developing economies. We
          combine original research, authoritative global data, deep market
          experience, and a worldwide network to develop innovative financing
          solutions where conventional approaches fall short — helping governments,
          financial institutions, development agencies, investors, and fintech
          companies turn financial innovation, cross-border flows, and underutilized
          sources of capital into practical financing and development solutions.
        </p>

        <p>
          Ratha Global builds on the pioneering work of its founder, <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/dilipratha/">Dilip Ratha</a>,
          whose career spans more than three decades in the World Bank, MIGA,
          investment banking, and academia. He pioneered the implementation of
          diaspora bonds and established future-flow securitization as a
          market-based approach to mobilizing capital when conventional market
          access is constrained, and was among the first to systematically estimate
          South-South flows of foreign direct investment, remittances, and
          migration. His research has also shown that seemingly technical features
          of sovereign borrowing — such as the governing law of a bond — can
          meaningfully affect sovereign spreads, underscoring the importance of
          where sovereign debt is issued, registered, and listed.
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
          Our work is supported by an extensive global network of policymakers,
          central banks, money transfer operators, investment bankers, investors,
          development practitioners, and fintech innovators — enabling Ratha
          Global to bridge development policy and private finance, turning
          knowledge and innovative ideas into actionable financing solutions.
        </p>
      </article>

      <article id="contact" class="card card-wide contact-card">
        <div class="contact-card-inner">
          <div class="contact-sections">
            <section class="contact-section">
              <div class="contact-section-inner">
                <h3><a href="mailto:contact@rathaglobal.com">Book a consultation</a></h3>
                <p>Reach out for advisory work on remittances, diaspora bonds, and structured finance.</p>
              </div>
            </section>

            <section class="contact-section">
              <div class="contact-section-inner">
                <h3><a href="mailto:contact@rathaglobal.com">Subscribe to data & reports</a></h3>
                <p>Regular and customized data, reports, analysis, projections and strategic briefs from Ratha Global.</p>
              </div>
            </section>

            <section class="contact-section">
              <div class="contact-section-inner">
                <h3><a href="mailto:contact@rathaglobal.com">Media and Speaking requests</a></h3>
                <p>Contact Dilip Ratha for keynote presentations or media interviews.</p>
              </div>
            </section>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>
