<script setup lang="ts">
interface Column {
  name: string
  audience: string
  // One entry per row in featureRows, aligned by index. '—' means not included.
  features: string[]
  // Bundles are priced as a whole: one "Request pricing" button for the tier.
  // Open Access has none (it's free).
  requestPricingName?: string
}

const featureRows = ['Report', 'Country time series', 'Bilateral matrix']

const columns: Column[] = [
  {
    name: 'Open Access',
    audience: 'Free for everyone*',
    features: ['Summary report†', '2000–2024', '—'],
  },
  {
    name: 'Professional',
    audience: '1 named user · November edition',
    features: ['Full report', '2000–2025, 2026 estimate, 2027 forecast', '—'],
    requestPricingName: 'Professional Bundle',
  },
  {
    name: 'Enterprise',
    audience: 'Unlimited users · November and May editions',
    features: ['Full report', '2000–2025, 2026 estimate, 2027 forecast', '10,600+ corridors'],
    requestPricingName: 'Enterprise Bundle',
  },
]

interface OneTimePurchase {
  label: string
  detail: string
  quoteName: string
}

const oneTimePurchases: OneTimePurchase[] = [
  { label: 'Report', detail: 'Full report', quoteName: 'Full report (one-time purchase)' },
  {
    label: 'Country time series',
    detail: '2000–2025',
    quoteName: 'Country time series 2000–2025 (one-time purchase)',
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
      <p class="eyebrow">
        First edition
        <span class="eyebrow-divider">&middot;</span>
        November 2026
      </p>
      <h1 id="subscribe-title">Subscribe to the Global Remittances Report &amp; Database</h1>
      <p>
        Access to the November 2026 and May 2027 editions of the report, the country time series
        for about 200 countries, and the bilateral remittance matrix of more than 10,600 corridors.
      </p>
    </section>

    <section class="tiers-section" aria-label="Access tiers">
      <div class="feature-chart-wrap">
        <table class="feature-chart">
          <thead>
            <tr>
              <th scope="col" />
              <th v-for="column in columns" :key="column.name" scope="col">
                <span class="tier-name">{{ column.name }}</span>
                <span class="tier-audience">{{ column.audience }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in featureRows" :key="row">
              <th scope="row">{{ row }}</th>
              <td v-for="column in columns" :key="column.name">{{ column.features[i] }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td v-for="column in columns" :key="column.name">
                <a
                  v-if="column.requestPricingName"
                  class="button request-pricing"
                  :href="pricingMailto(column.requestPricingName)"
                >Request pricing</a>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="one-time-note">
        <p class="one-time-note-label">
          Prefer to buy once?
          <span class="eyebrow-divider">&middot;</span>
          November edition
        </p>
        <div class="one-time-buttons">
          <a
            v-for="item in oneTimePurchases"
            :key="item.label"
            class="button request-pricing"
            :href="pricingMailto(item.quoteName)"
          >{{ item.label }} ({{ item.detail }})</a>
        </div>
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
  font-size: 2.6rem;
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

.feature-chart-wrap {
  overflow-x: auto;
}

.feature-chart {
  width: 100%;
  min-width: 36rem;
  border-collapse: collapse;
  background: rgba(36, 59, 83, 0.05);
}

.feature-chart th,
.feature-chart td {
  padding: 1rem 1.25rem;
  text-align: left;
  vertical-align: top;
  font-weight: 400;
}

.feature-chart thead th {
  padding-bottom: 1.25rem;
  border-bottom: 2px solid var(--color-brass);
}

.feature-chart tbody tr,
.feature-chart tfoot tr {
  border-top: 1px solid rgba(168, 137, 88, 0.35);
}

.feature-chart tbody th {
  font-weight: 700;
  color: var(--color-indigo);
}

/* The row-label column (feature names, top-left corner) isn't a tier - keep
   it narrow and let the three tier columns share the rest evenly. */
.feature-chart th:first-child,
.feature-chart td:first-child {
  width: 11rem;
}

.feature-chart .tier-name {
  display: block;
  font-family: var(--font-serif);
  font-size: 1.3rem;
  color: var(--color-indigo);
}

.feature-chart .tier-audience {
  display: block;
  margin-top: 0.3rem;
  font-size: 0.85rem;
  color: var(--color-ink);
}

/* Enterprise (the last column) is the premium tier - give it the same
   terracotta accent the old card design used to flag the top tier. */
.feature-chart tr > :last-child {
  background: rgba(184, 92, 69, 0.07);
}

.feature-chart thead tr > :last-child {
  border-bottom-color: var(--color-terracotta);
}

.feature-chart tfoot td {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}

.one-time-note {
  margin-top: 1.75rem;
  padding-top: 1.75rem;
  border-top: 1px solid rgba(168, 137, 88, 0.35);
  text-align: center;
}

.one-time-note-label {
  margin: 0 0 0.9rem;
  color: var(--color-moss);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.85rem;
}

.one-time-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.request-pricing {
  margin-top: 0.6rem;
  border-color: var(--color-terracotta);
  background: var(--color-terracotta);
  color: var(--color-paper);
  font-weight: 700;
}

.one-time-buttons .request-pricing {
  margin-top: 0;
}

.request-pricing:hover,
.request-pricing:focus-visible {
  color: var(--color-paper);
  background: #a24e38;
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
  color: var(--color-brass);
  font-size: 0.95rem;
}

@media (max-width: 640px) {
  #subscribe-title {
    font-size: 2rem;
  }
}
</style>
