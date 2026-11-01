<script setup lang="ts">
interface Offer {
  product: string
  detail: string
  // Individually priced offers show their own "Request pricing" button;
  // quoteName names the product in the request email's subject line.
  quoteName?: string
}

interface Tier {
  name: string
  audience: string
  offers: Offer[]
  // Bundles are priced as a whole: one "Request pricing" button for the tier.
  bundle?: boolean
}

const tiers: Tier[] = [
  {
    name: 'Open Access',
    audience: 'Free for everyone*',
    offers: [
      { product: 'Report', detail: 'Summary report†' },
      { product: 'Country time series', detail: '2000–2024' },
    ],
  },
  {
    name: 'One-Time Purchases',
    audience: 'Buy individually · November edition',
    offers: [
      { product: 'Report', detail: 'Full report', quoteName: 'Full report (one-time purchase)' },
      {
        product: 'Country time series',
        detail: '2000–2025',
        quoteName: 'Country time series 2000–2025 (one-time purchase)',
      },
    ],
  },
  {
    name: 'Professional Bundle',
    audience: '1 named user · November edition',
    bundle: true,
    offers: [
      { product: 'Report', detail: 'Full report' },
      { product: 'Country time series', detail: '2000–2025, 2026 estimate, 2027 forecast' },
    ],
  },
  {
    name: 'Enterprise Bundle',
    audience: 'Unlimited users · November and May editions',
    bundle: true,
    offers: [
      { product: 'Report', detail: 'Full report' },
      { product: 'Country time series', detail: '2000–2025, 2026 estimate, 2027 forecast' },
      { product: 'Bilateral matrix', detail: '10,600+ corridors' },
    ],
  },
]

function pricingMailto(item: string) {
  const subject = `Requesting price quote for ${item} – Global Remittances Report`
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
              <dd>{{ offer.detail }}</dd>
              <dd v-if="offer.quoteName">
                <a class="request-pricing" :href="pricingMailto(offer.quoteName)">
                  Request pricing
                </a>
              </dd>
            </div>
          </dl>
          <a v-if="tier.bundle" class="request-pricing" :href="pricingMailto(tier.name)">
            Request pricing
          </a>
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
  grid-template-columns: repeat(4, 1fr);
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

@media (max-width: 1200px) {
  .tiers {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
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
