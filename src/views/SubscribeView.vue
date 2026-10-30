<script setup lang="ts">
interface Offer {
  product: string
  detail: string
  // Paid offers show a "Request pricing" button instead of a price.
  paid: boolean
}

interface Tier {
  name: string
  audience: string
  offers: Offer[]
}

const tiers: Tier[] = [
  {
    name: 'Open Access',
    audience: 'Free for everyone*',
    offers: [
      { product: 'Report', detail: 'Free', paid: false },
      { product: 'Country time series', detail: 'Free, 2000–2024 only', paid: false },
      { product: 'Bilateral matrix', detail: 'Not included', paid: false },
      { product: 'Report & Data Bundle', detail: 'Not included', paid: false },
    ],
  },
  {
    name: 'Professional',
    audience: '1 named user · November edition',
    offers: [
      { product: 'Report', detail: 'Summary report†', paid: true },
      { product: 'Country time series', detail: '2000–2025 only', paid: true },
      { product: 'Bilateral matrix', detail: 'Not included', paid: false },
      { product: 'Report & Data Bundle', detail: '', paid: true },
    ],
  },
  {
    name: 'Enterprise',
    audience: 'Unlimited users · November and May editions',
    offers: [
      { product: 'Report', detail: 'Full report', paid: true },
      { product: 'Country time series', detail: '2000–2025, 2026 estimate, 2027 forecast', paid: true },
      { product: 'Bilateral matrix', detail: '10,600+ corridors', paid: true },
      { product: 'Report & Data Bundle', detail: '', paid: true },
    ],
  },
]

function pricingMailto(tier: string, product: string) {
  const subject = `Global Remittances Report pricing: ${tier} – ${product}`
  return `mailto:contact@rathaglobal.com?subject=${encodeURIComponent(subject)}`
}
</script>

<template>
  <main class="page-content">
    <section class="subscribe-intro" aria-labelledby="subscribe-title">
      <p class="eyebrow">First edition · November 2026</p>
      <h1 id="subscribe-title">Subscribe to the Global Remittances Report &amp; Database</h1>
      <p>
        Access to the November 2026 and May 2027 editions of the report, the country time series
        for about 200 countries, and the bilateral remittance matrix of more than 10,600 corridors.
      </p>
    </section>

    <section class="tiers-section" aria-label="Access tiers">
      <div class="tiers">
        <article v-for="tier in tiers" :key="tier.name" class="tier">
          <h2 class="tier-name">{{ tier.name }}</h2>
          <p class="tier-audience">{{ tier.audience }}</p>
          <dl class="tier-offers">
            <div v-for="offer in tier.offers" :key="offer.product" class="tier-offer">
              <dt>{{ offer.product }}</dt>
              <dd v-if="offer.detail" :class="{ 'not-included': offer.detail === 'Not included' }">
                {{ offer.detail }}
              </dd>
              <dd v-if="offer.paid">
                <a class="request-pricing" :href="pricingMailto(tier.name, offer.product)">
                  Request pricing
                </a>
              </dd>
            </div>
          </dl>
        </article>
      </div>

      <div class="tier-notes">
        <p>* Open Access: citation required when quoting from the report or data.</p>
        <p>† Summary report: executive summary, 5 key charts and 1 summary table.</p>
        <p>Nextera Global Association members receive a discount.</p>
        <p>
          <strong>Custom work, priced on request:</strong> specific country time series and
          remittance corridors, expert consultations, advance access up to 72 hours before public
          release, country and corridor studies, Global Finance Factsheets, projections and
          policy briefs.
        </p>
        <p>
          Subscribe or ask a question:
          <a href="mailto:contact@rathaglobal.com?subject=Global%20Remittances%20Report">contact@rathaglobal.com</a>
        </p>
        <p class="tier-disclaimer">
          Ratha Global is an independent firm. The Global Remittances Report is not affiliated with
          or endorsed by the World Bank or KNOMAD.
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped>
@media (min-width: 641px) {
  section {
    padding-left: 10%;
  }
}

#subscribe-title {
  font-size: 2.4rem;
  line-height: 1.2;
}

.subscribe-intro {
  padding-bottom: 1rem;
}

.subscribe-intro p:not(.eyebrow) {
  max-width: 44rem;
}

.tiers-section {
  padding-top: 0.5rem;
}

.tiers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.tier {
  padding: 1.75rem 1.5rem;
  background: rgba(36, 59, 83, 0.05);
  border-top: 3px solid var(--color-brass);
}

.tier:last-child {
  border-top-color: var(--color-terracotta);
}

/* Tier names are card headings, not section headings - no underline. */
.tier-name {
  display: block;
  padding-bottom: 0;
  margin-bottom: 0.25rem;
  font-size: 1.5rem;
}

.tier-name::after {
  display: none;
}

.tier .tier-audience {
  margin: 0 0 1.25rem;
  color: var(--color-moss);
  font-size: 0.92rem;
  line-height: 1.5;
}

.tier-offers {
  margin: 0;
}

.tier-offer {
  padding: 0.9rem 0;
  border-top: 1px solid rgba(168, 137, 88, 0.35);
}

.tier-offer dt {
  font-weight: 700;
  color: var(--color-indigo);
}

.tier-offer dd {
  margin: 0.2rem 0 0;
  line-height: 1.5;
}

.not-included {
  color: rgba(23, 33, 31, 0.45);
}

.request-pricing {
  display: inline-block;
  margin-top: 0.4rem;
  padding: 0.3rem 0.8rem;
  border: 1px solid var(--color-terracotta);
  color: var(--color-terracotta);
  font-size: 0.88rem;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
}

.request-pricing:hover,
.request-pricing:focus-visible {
  background: var(--color-terracotta);
  color: var(--color-paper);
}

.tier-notes {
  margin-top: 2rem;
  max-width: 48rem;
}

.tier-notes p {
  margin: 0 0 0.5rem;
  font-size: 0.92rem;
  line-height: 1.6;
}

.tier-notes .tier-disclaimer {
  margin-top: 1.25rem;
  color: var(--color-moss);
  font-size: 0.82rem;
}

@media (max-width: 900px) {
  .tiers {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  #subscribe-title {
    font-size: 1.9rem;
  }
}
</style>
