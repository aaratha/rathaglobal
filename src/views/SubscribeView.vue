<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

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
  detail?: string
  quoteName: string
}

const oneTimePurchases: OneTimePurchase[] = [
  { label: 'Full report', quoteName: 'Full report (one-time purchase)' },
  {
    label: 'Country time series',
    detail: '2000–2025‡',
    quoteName: 'Country time series 2000–2025 (one-time purchase)',
  },
]

function pricingMailto(item: string) {
  const subject = `Requesting price quote for ${item} – Global Remittances Report`
  const body = `Hi Ratha Global team,\n\nI'm interested in the ${item} for the Global Remittances Report & Database. Could you send pricing and access details?\n\nThanks,`
  return `mailto:contact@rathaglobal.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

// The FAB's job is to jump the reader down to pricing. Once that section is
// actually on screen, a fixed bottom-right button has nothing left to do and,
// on narrow viewports where content runs edge to edge, sits on top of the
// section's own trailing text (e.g. the disclaimer) instead - so it hides
// itself once #pricing-title is in view.
const pricingTitleEl = ref<HTMLElement | null>(null)
const showPricingFab = ref(true)
let pricingTitleObserver: IntersectionObserver | null = null

onMounted(() => {
  if (!pricingTitleEl.value) return
  pricingTitleObserver = new IntersectionObserver(
    ([entry]) => {
      showPricingFab.value = !entry!.isIntersecting
    },
    { threshold: 0 },
  )
  pricingTitleObserver.observe(pricingTitleEl.value)
})

onUnmounted(() => {
  pricingTitleObserver?.disconnect()
})
</script>

<template>
  <main class="page-content">
    <section class="subscribe-intro" aria-labelledby="subscribe-title">
      <div class="content-container">
        <p class="eyebrow">
          First edition
          <span class="eyebrow-divider">&middot;</span>
          November 2026
        </p>
        <h1 id="subscribe-title">Global Remittances Report &amp; Database</h1>
        <p>
          The Global Remittances Report (GRR) provides, twice a year in May and November, an
          independent and authoritative account of remittance flows worldwide. Each edition updates
          the latest estimates for every country, reviews the developments that have shaped flows
          since the previous edition, and presents a nowcast for the current year and a forecast for
          the next. The first edition, in November 2026, covers flows through 2025, a nowcast for
          2026 and a forecast for 2027.
        </p>
        <p>
          Remittances to low- and middle-income countries are larger than foreign direct investment
          and official development assistance in many economies, and for a significant number of
          countries they are the largest source of foreign exchange. The forces acting on them are
          shifting quickly: new taxes on remittances, tighter migration policies and deportations,
          cuts in official aid, trade tensions, conflicts, and the rapid spread of digital channels,
          including stablecoins. Policymakers and markets need a current, independent reading of
          what these developments mean for remittance flows. The GRR provides it, tracking outward
          as well as inward flows, in high-income as well as low- and middle-income countries.
        </p>
      </div>
    </section>

    <section aria-labelledby="outline-title">
      <div class="content-container">
        <h2 id="outline-title">The Report</h2>
        <p>
          Each edition runs to about 30 to 40 pages in three parts. The first presents
          <strong>global and regional trends</strong>, with estimates of inward and outward flows
          for the current year and a forecast for the next, a discussion of the main drivers, from
          growth and labor markets in host economies to exchange rates, oil prices and migration,
          and the upside and downside risks for remittance-dependent countries. The second looks at
          <strong>corridors</strong>, the <strong>cost of sending money</strong> and the shift from
          cash to digital <strong>channels</strong>. The third is a
          <strong>policy and regulatory watch</strong> covering taxes and exchange controls, visa
          policies and deportations, aid cuts, conflicts and the regulation of payment service
          providers.
        </p>
      </div>
    </section>

    <section aria-labelledby="database-title">
      <div class="content-container">
        <h2 id="database-title">The Global Remittances Database</h2>
        <p>
          The Global Remittances Database (GRD) provides the numbers behind the report in
          ready-to-use files, on consistent definitions across years and editions. Its country time
          series covers annual inward and outward remittances and remittances-to-GDP ratios for
          about 200 countries from 2000 to 2025, together with the nowcast and forecast, and is
          refreshed with every edition, months before official balance-of-payments data for the most
          recent year become available. Its bilateral remittance matrix estimates flows for more
          than 10,600 corridors across 214 countries and territories and is updated once a year with
          the November edition, giving the most detailed picture available of where remittances come
          from and where they go.
        </p>
      </div>
    </section>

    <section aria-labelledby="audience-title">
      <div class="content-container">
        <h2 id="audience-title">Audience</h2>
        <p>
          The report and database are designed for readers who need reliable numbers on remittances
          for decisions, analysis and policy:
          <strong>remittance companies and fintechs</strong> sizing markets and choosing corridors;
          <strong>governments, central banks and debt managers</strong> monitoring the balance of
          payments; <strong>investors, banks and rating agencies</strong> assessing sovereign risk;
          <strong>international organizations</strong> working on surveillance and development
          finance; and <strong>researchers, foundations and diaspora organizations</strong>.
        </p>
        <p>
          The first edition will be released in November 2026 with the country time series, and the
          bilateral matrix will follow in December 2026. Subsequent editions will appear every May
          and November, each with a launch webinar and publication on rathaglobal.com.
        </p>
        <p>
          Access ranges from a free open-access tier to enterprise licenses &mdash; see pricing
          below, or contact
          <a href="mailto:contact@rathaglobal.com">contact@rathaglobal.com</a> for details.
        </p>
      </div>
    </section>

    <section class="author-section" aria-labelledby="author-title">
      <div class="content-container">
        <h2 id="author-title">About the lead author</h2>
        <div class="author-layout">
          <img
            class="author-portrait"
            src="/dilip_ratha_portrait_web.jpg"
            alt="Dilip Ratha, Founder and CEO of Ratha Global"
          />
          <div class="author-text">
            <p>
              Dilip Ratha, Founder and CEO of Ratha Global, brings three decades of experience
              spanning the World Bank, MIGA, investment banking and academia. He compiled the first
              global tally of remittance flows, proposed the definition of remittances that led to
              the revision of the IMF's Balance of Payments Manual, and developed the bilateral
              remittance matrix in 2007, publishing every edition through 2021. He led 40 editions
              of the World Bank's Migration and Development Brief and founded KNOMAD and the African
              Institute for Remittances. Data from the series he produced have been used by the IMF
              and the World Bank in debt sustainability analysis and by Moody's, Fitch and S&amp;P
              in sovereign credit ratings.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="tiers-section" aria-labelledby="pricing-title">
      <div class="content-container">
        <h2 id="pricing-title" ref="pricingTitleEl">Pricing and access</h2>
        <p>
          Access to the November 2026 and May 2027 editions of the report, the country time series
          for about 200 countries, and the bilateral remittance matrix of more than 10,600
          corridors.
        </p>

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
                    >Request pricing</a
                  >
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
              >{{ item.label }}<template v-if="item.detail"> ({{ item.detail }})</template></a
            >
          </div>
        </div>

        <div class="tier-notes">
          <div class="tier-footnotes">
            <p>* Open Access: citation required when quoting from the report or data.</p>
            <p>† Summary report: executive summary, 5 key charts and 1 summary table.</p>
            <p>‡ Country time series: includes the 2026 estimate and 2027 forecast.</p>
            <p>
              <a href="https://nexteraglobal.io/" target="_blank" rel="noopener"
                >Nextera Global Association</a
              >
              members receive a discount.
            </p>
          </div>

          <div class="tier-custom-work">
            <p>
              <strong>Custom work, priced on request:</strong> specific country time series and
              remittance corridors, expert consultations, advance access up to 72 hours before
              public release, country and corridor studies, Global Finance Factsheets, projections
              and policy briefs.
            </p>
          </div>

          <p class="tier-contact">
            Subscribe or ask a question:
            <a href="mailto:contact@rathaglobal.com?subject=Global%20Remittances%20Report"
              >contact@rathaglobal.com</a
            >
          </p>

          <p class="tier-disclaimer">
            Ratha Global is an independent firm with no affiliation with any government,
            international organization or remittance company. It supports public and private sector
            clients in the areas of remittances, diaspora finance, credit enhancement, and
            innovative capital solutions.
          </p>
        </div>
      </div>
    </section>

    <a
      v-if="showPricingFab"
      href="#pricing-title"
      class="pricing-fab"
      aria-label="Jump to pricing and access"
    >
      Pricing <span aria-hidden="true">&darr;</span>
    </a>
  </main>
</template>

<style scoped>
section {
  padding-top: 1.1rem;
  padding-bottom: 1.1rem;
}

@media (min-width: 641px) {
  section {
    padding-left: 3%;
    padding-right: 3%;
  }
}

/* Matches BlogPost's .post-container: a single centered reading column,
   rather than text filling this page's full (left-gutter-padded) section
   width. */
.content-container {
  max-width: 52rem;
  margin: 0 auto;
}

/* Mirrors the global `section h2` underline treatment (App.vue) - the h1
   itself isn't matched by that selector, so it's repeated here and the h1
   is added to App.vue's updateHeadingHighlights() query by id so it can
   still pick up .heading-centered on scroll. */
#subscribe-title {
  position: relative;
  display: inline-block;
  padding-bottom: 0.6rem;
  margin-bottom: 1.5rem;
  font-size: 2.6rem;
  line-height: 1.2;
  letter-spacing: 0.02em;
}

#subscribe-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 3rem;
  height: 3px;
  border-radius: 2px;
  background: var(--color-terracotta);
  transition: width 0.6s ease;
}

#subscribe-title.heading-centered::after {
  width: 100%;
}

@media (prefers-reduced-motion: reduce) {
  #subscribe-title::after {
    width: 100%;
    transition: none;
  }
}

.subscribe-intro {
  padding-bottom: 1rem;
}

.author-layout {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

.author-portrait {
  flex: 0 0 auto;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(168, 137, 88, 0.35);
}

.author-text {
  flex: 1 1 auto;
  min-width: 0;
}

@media (max-width: 640px) {
  .author-layout {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }
}

.tiers-section {
  padding-top: 2.75rem;
}

/* Scroll-shadow trick: two "cover" gradients (attachment: local, so they
   scroll along with the table itself) sit exactly over two "shadow"
   gradients (attachment: scroll, so they stay pinned to the wrap's own
   edges). At rest, scrolled to the start, the left cover exactly hides the
   left shadow - nothing to indicate, since there's nothing to scroll back
   to. Scroll right and the cover moves away with the content while the
   shadow stays docked at the edge, revealing it - a cue that there's more
   off to that side. Same in reverse for the right edge. No JS needed; it
   falls out of how the two attachment modes interact. */
.feature-chart-wrap {
  overflow-x: auto;
  margin-top: 1.5rem;
  background-image:
    linear-gradient(to right, var(--color-paper), rgba(243, 239, 230, 0)),
    linear-gradient(to left, var(--color-paper), rgba(243, 239, 230, 0)),
    radial-gradient(farthest-side at 0% 50%, rgba(23, 33, 31, 0.2), rgba(23, 33, 31, 0)),
    radial-gradient(farthest-side at 100% 50%, rgba(23, 33, 31, 0.2), rgba(23, 33, 31, 0));
  background-repeat: no-repeat;
  background-size:
    2.5rem 100%,
    2.5rem 100%,
    1rem 100%,
    1rem 100%;
  background-position:
    left top,
    right top,
    left top,
    right top;
  background-attachment: local, local, scroll, scroll;
}

.feature-chart {
  width: 100%;
  min-width: 52rem;
  border-collapse: collapse;
  /* Fixed layout: the label column keeps its explicit 11rem, and the three
     tier columns (left unset) split the remaining width evenly - auto
     layout only ever used width as a hint, which is why Open Access kept
     drifting narrower or needed a hand-tuned width. */
  table-layout: fixed;
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
  margin-top: 2.5rem;
  padding-top: 1.75rem;
  border-top: 1px solid rgba(168, 137, 88, 0.35);
}

/* Actual footnotes (the * and † markers, plus the discount note) stay
   small and quiet - they're asides, not content to read on their own. */
.tier-footnotes p {
  margin: 0 0 0.4rem;
  color: var(--color-moss);
  font-size: 0.85rem;
  line-height: 1.5;
}

.tier-footnotes p:last-child {
  margin-bottom: 0;
}

/* "Custom work" is a real offering, not a footnote - a tinted panel (same
   treatment as .help-featured on the homepage) gives it the weight of
   actual content instead of burying it in the small print. */
.tier-custom-work {
  margin-top: 1.5rem;
  padding: 1.1rem 1.25rem;
  background: rgba(36, 59, 83, 0.05);
}

.tier-custom-work p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
}

.tier-contact {
  margin-top: 1.5rem;
  margin-bottom: 0;
  color: var(--color-moss);
  font-size: 0.85rem;
  line-height: 1.5;
}

.tier-disclaimer {
  margin-top: 1.25rem;
  margin-bottom: 0;
  color: var(--color-brass);
  font-size: 0.85rem;
  line-height: 1.5;
}

@media (max-width: 640px) {
  #subscribe-title {
    font-size: 2rem;
  }
}

/* Offsets the jump target so the fixed nav/frontmatter bars don't cover the
   heading when the pricing FAB scrolls it to the top of the viewport. */
#pricing-title {
  scroll-margin-top: 6rem;
}

.pricing-fab {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 15;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--color-terracotta);
  border-radius: 999px;
  background: var(--color-terracotta);
  color: var(--color-paper);
  font-weight: 700;
  text-decoration: none;
  box-shadow:
    0 4px 14px rgba(0, 0, 0, 0.18),
    0 1px 3px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.2s ease;
}

.pricing-fab:hover,
.pricing-fab:focus-visible {
  color: var(--color-paper);
  background: #a24e38;
  transform: translateY(-2px);
  box-shadow:
    0 6px 18px rgba(0, 0, 0, 0.22),
    0 2px 6px rgba(0, 0, 0, 0.12);
}

@media (min-width: 1024px) {
  .pricing-fab {
    right: 4rem;
  }
}

@media (max-width: 640px) {
  .pricing-fab {
    right: 1rem;
    bottom: 1rem;
    padding: 0.65rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
