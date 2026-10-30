<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { mediaItems } from '../content/media'

const items = [...mediaItems]
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((item) => ({
    ...item,
    internal: item.url.startsWith('/'),
    displayDate: new Date(`${item.date}T00:00:00`).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }))
</script>

<template>
  <main class="page-content">
    <section class="media-intro" aria-labelledby="media-title">
      <p class="eyebrow">Interviews &amp; Commentary</p>
      <h1 id="media-title">In the Media</h1>
      <p>Recent interviews and commentary by Dilip Ratha on remittances, migration, and development finance.</p>
    </section>

    <section class="media-section" aria-label="Media appearances">
      <ul>
        <li v-for="item in items" :key="item.url">
          <component
            :is="item.internal ? RouterLink : 'a'"
            v-bind="item.internal
              ? { to: item.url }
              : { href: item.url, target: '_blank', rel: 'noopener' }"
            class="card-link media-entry"
          >
            <p class="eyebrow">
              <span class="media-outlet">{{ item.outlet }}</span>
              <span class="eyebrow-divider">&middot;</span>
              {{ item.displayDate }}
            </p>
            <h2 v-if="item.title" class="media-title">{{ item.title }}</h2>
            <p v-if="item.description" class="media-description">{{ item.description }}</p>
            <span class="media-cta">{{ item.cta }}&nbsp;&rarr;</span>
          </component>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
@media (min-width: 641px) {
  section {
    padding-left: 10%;
  }
}

#media-title {
  font-size: 2.6rem;
}

.media-intro {
  padding-bottom: 1rem;
}

.media-section {
  padding-top: 0.5rem;
}

ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

li {
  margin-bottom: 0;
}

li + li {
  margin-top: 1.25rem;
}

.media-entry {
  padding: 1.75rem;
  background: rgba(36, 59, 83, 0.05);
  transition: background 0.3s ease;
}

.media-entry:hover,
.media-entry:focus-visible {
  background: rgba(36, 59, 83, 0.12);
}

.media-entry .eyebrow {
  margin: 0 0 0.6rem;
}

.media-outlet {
  color: var(--color-terracotta);
  font-weight: 700;
}

/* Titles here are plain card headings, not section headings - no underline. */
.media-title {
  display: block;
  padding-bottom: 0;
  margin-bottom: 0.4rem;
  font-size: 1.45rem;
  line-height: 1.3;
}

.media-title::after {
  display: none;
}

.media-description {
  margin: 0;
  color: var(--color-ink);
}

.media-cta {
  display: inline-block;
  margin-top: 1rem;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.media-entry:hover .media-cta,
.media-entry:focus-visible .media-cta {
  transform: translateX(6px);
}

@media (max-width: 640px) {
  .media-entry {
    padding: 1.5rem 1.25rem;
  }

  .media-title {
    font-size: 1.2rem;
  }
}
</style>
