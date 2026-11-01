<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

// Clicking the card itself acts as a shortcut to Subscribe, same as the
// featured post card - but clicks on an actual link inside (Subscribe
// itself, or Concept note) must keep their own behavior, not be hijacked.
function onCardClick(event: MouseEvent) {
  if ((event.target as HTMLElement).closest('a')) return
  router.push('/subscribe')
}
</script>

<template>
  <div id="grr" class="grr-card" aria-labelledby="grr-title" @click="onCardClick">
    <p class="eyebrow grr-eyebrow">
      Coming November 2026
      <span class="eyebrow-divider">&middot;</span>
      First edition
    </p>
    <h2 id="grr-title" data-heading-group="highlights">Global Remittances Report &amp; Database</h2>
    <p class="grr-lede">
      An independent, authoritative account of remittance flows worldwide, published every
      May and November: the latest estimates for every country, a nowcast for 2026 and a
      forecast for 2027.
    </p>
    <p class="grr-author">
      Led by Dilip Ratha, who compiled the first global tally of remittances and created the
      bilateral remittance matrix.
    </p>

    <div class="grr-actions">
      <RouterLink class="button grr-button" to="/subscribe">Subscribe</RouterLink>
      <a
        class="grr-concept-note"
        href="/documents/grr-concept-note.pdf"
        target="_blank"
        rel="noopener"
      >Concept note &rarr;</a>
    </div>

    <p class="grr-disclaimer">
      Ratha Global is an independent firm. The Global Remittances Report is not affiliated
      with or endorsed by the World Bank or KNOMAD.
    </p>
  </div>
</template>

<style scoped>
.grr-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 2rem 1.75rem;
  background: transparent;
  transition: background 0.3s ease;
}

.grr-card:hover,
.grr-card:focus-within {
  background: rgba(36, 59, 83, 0.12);
}

/* Flex items stretch to the container's full width by default; without this
   the underline's active width:100% (see App.vue) would match that
   stretched box instead of the heading's own text. */
.grr-card h2 {
  align-self: flex-start;
}

.grr-eyebrow {
  margin: 0 0 0.6rem;
  color: var(--color-terracotta);
  font-weight: 700;
}

.grr-lede {
  margin: 0.4rem 0 0;
}

.grr-author {
  margin: 0.4rem 0 0;
  font-size: 1rem;
  font-style: italic;
  color: var(--color-ink);
}

.grr-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  margin-top: auto;
  padding-top: 2rem;
}

.grr-button {
  border-color: var(--color-terracotta);
  background: var(--color-terracotta);
  color: var(--color-paper);
  font-weight: 700;
}

.grr-button:hover,
.grr-button:focus-visible,
.grr-card:hover .grr-button,
.grr-card:focus-within .grr-button {
  color: var(--color-paper);
  background: #a24e38;
  transform: translateY(-2px);
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.02),
    0 3px 8px rgba(0, 0, 0, 0.04),
    0 10px 20px rgba(0, 0, 0, 0.05);
}

.grr-concept-note {
  color: var(--color-ink);
  font-weight: 600;
  text-decoration: none;
}

.grr-concept-note:hover,
.grr-concept-note:focus-visible {
  color: var(--color-terracotta);
}

.grr-disclaimer {
  margin: 1rem 0 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--color-brass);
}
</style>
