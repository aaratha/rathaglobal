<script setup lang="ts">
import NavBar from './components/navbar.vue'
</script>

<template>
  <div class="page-shell">
    <NavBar />

    <main class="page-content">
      <section class="hero">
        <p class="eyebrow">Global Capital for Human Development</p>
        <h1>Strategic advice on migration, remittances, and cross-border finance.</h1>
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
            Ratha Global was founded by Dilip Ratha. He advises governments,
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
            Rathanomics*, to continue his work and help fill any institutional gaps.
          </p>

          <p>
            A frequent keynote speaker, his TED Talk has been viewed over 1.5 million
            times and has inspired 20+ fintech startups. He remains committed to
            lowering the cost of cross-border remittances and mentoring the next
            generation of innovators.
          </p>
        </article>

        <article class="card">
          <h2>Services</h2>
          <p>Advisory and analytic services on:</p>
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
              <a href="https://nyti.ms/2moxI2P" target="_blank" rel="noopener">
                New York Times article
              </a>
            </li>
            <li>
              <a href="http://go.ted.com/CnGd" target="_blank" rel="noopener">
                TED Talk
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
  font-family: Georgia, 'Times New Roman', serif;
  background:
    radial-gradient(circle at top, rgba(196, 169, 116, 0.28), transparent 30%),
    linear-gradient(180deg, #f7f2e8 0%, #fffdf8 35%, #f3eee2 100%);
  color: #1f2933;
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
  width: min(1100px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 0.75rem 0 4rem;
}

.hero {
  padding: 1.75rem 0 2.5rem;
  max-width: 760px;
}

.eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #8a6a2f;
  font-weight: 700;
}

.hero h1 {
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 4.6rem);
  line-height: 0.98;
  color: #11212d;
}

.hero-copy {
  margin: 1.5rem 0 0;
  max-width: 680px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #425466;
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
  backdrop-filter: blur(8px);
}

.card-wide {
  grid-column: span 12;
}

.card h2 {
  margin: 0 0 1rem;
  font-size: 1.45rem;
  color: #11212d;
}

.card p,
.card li,
.contact-card a {
  font-size: 1rem;
  line-height: 1.75;
  color: #425466;
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
  list-style: none;
  padding: 0;
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
  .card,
  .card-wide {
    grid-column: span 12;
  }

  .hero {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}

@media (max-width: 640px) {
  .page-content {
    width: min(100% - 1rem, 1100px);
    padding-top: 0.5rem;
  }

  .hero {
    padding: 1.25rem 0.75rem 1.5rem;
  }

  .card {
    padding: 1.2rem;
  }
}
</style>
