<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { setMeta } from '../composables/useMeta'
import { solutions } from '../content/solutions'

const route = useRoute()

const solution = computed(() => solutions[route.params.slug as string])

watch(
  solution,
  (page) => {
    if (!page) return
    setMeta({
      title: `${page.title} | Ratha Global`,
      description: page.description,
      path: `/solutions/${page.slug}`,
    })
  },
  { immediate: true },
)

function contactMailto(title: string) {
  const subject = `Inquiry – ${title}`
  return `mailto:contact@rathaglobal.com?subject=${encodeURIComponent(subject)}`
}
</script>

<template>
  <main class="page-content">
    <template v-if="solution">
      <section aria-labelledby="solution-title">
        <div class="content-container">
          <p class="eyebrow">Solutions</p>
          <h1 id="solution-title" class="solution-title">{{ solution.title }}</h1>
          <p>{{ solution.intro }}</p>
        </div>
      </section>

      <section aria-label="What we do">
        <div class="content-container">
          <div class="solution-categories">
            <div
              v-for="category in solution.categories"
              :key="category.heading"
              class="solution-category"
            >
              <h2>{{ category.heading }}</h2>
              <ul>
                <li v-for="bullet in category.bullets" :key="bullet.text">
                  <strong v-if="bullet.bold">{{ bullet.bold }}:</strong> {{ bullet.text }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="contact-section" aria-labelledby="solution-contact-title">
        <div class="content-container">
          <h2 id="solution-contact-title">Get in touch</h2>
          <p>Reach out to discuss how Ratha Global can support your work.</p>
          <a class="button solution-contact-button" :href="contactMailto(solution.title)"
            >Contact us</a
          >
        </div>
      </section>
    </template>

    <section v-else aria-labelledby="solution-not-found-title">
      <div class="content-container">
        <h1 id="solution-not-found-title">Solution not found</h1>
        <p>This page may have been moved or removed.</p>
        <RouterLink to="/">Back to home</RouterLink>
      </div>
    </section>
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

/* Matches SubscribeView's .content-container: a single centered reading
   column, rather than text filling this page's full (left-gutter-padded)
   section width. */
.content-container {
  max-width: 52rem;
  margin: 0 auto;
}

/* Mirrors the global `section h2` underline treatment (App.vue) - the h1
   itself isn't matched by that selector, so it's repeated here. A shared
   class (not an id, since this one component serves several slugs) is also
   added to App.vue's updateHeadingHighlights() query so it can still pick
   up .heading-centered on scroll. */
.solution-title {
  position: relative;
  display: inline-block;
  padding-bottom: 0.6rem;
  margin-bottom: 1.5rem;
  font-size: 2.6rem;
  line-height: 1.2;
  letter-spacing: 0.02em;
}

.solution-title::after {
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

.solution-title.heading-centered::after {
  width: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .solution-title::after {
    width: 100%;
    transition: none;
  }
}

@media (max-width: 640px) {
  .solution-title {
    font-size: 2rem;
  }
}

/* A two-column newspaper layout (not a grid) so categories fill the first
   column top-to-bottom before flowing into the second - matching the
   left-column-then-right-column reading order of the two-column tables in
   the source documents, rather than a row-by-row grid pairing that would
   scramble that order. */
.solution-categories {
  column-count: 2;
  column-gap: 2.5rem;
}

@media (max-width: 760px) {
  .solution-categories {
    column-count: 1;
  }
}

.solution-category {
  break-inside: avoid;
  margin-bottom: 2.5rem;
}

.solution-category h2 {
  font-size: 1.05rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  /* The global `section h2` rule reserves 0.6rem of padding-bottom for its
     underline bar - pointless here since that bar is hidden (see ::after
     below), so it's zeroed out rather than left as dead space. */
  padding-bottom: 0;
  margin-bottom: 0.5rem;
}

.solution-category h2::after {
  display: none;
}

.solution-category ul {
  margin: 0;
}

.solution-category li {
  margin-bottom: 0.45rem;
  line-height: 1.6;
}

.solution-category li::marker {
  color: var(--color-terracotta);
}

.solution-category strong {
  color: var(--color-indigo);
}

.contact-section {
  padding-top: 2.75rem;
  padding-bottom: 2.75rem;
}

.solution-contact-button {
  margin-top: 1rem;
  border-color: var(--color-terracotta);
  background: var(--color-terracotta);
  color: var(--color-paper);
  font-weight: 700;
}

.solution-contact-button:hover,
.solution-contact-button:focus-visible {
  color: var(--color-paper);
  background: #a24e38;
}
</style>
