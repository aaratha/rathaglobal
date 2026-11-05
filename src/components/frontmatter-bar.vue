<script setup lang="ts">
import { parseFrontmatter } from '../content/parseFrontmatter'

// Same featured post as the homepage's highlights card (HomeView.vue) - kept
// as a matching hardcoded slug here too, since there's no shared "currently
// featured post" source to read from instead.
const featuredPostSlug = 'to-support-nepal-waive-remittance-fees'
const featuredPostRaw = import.meta.glob('../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const featuredPostTitle = parseFrontmatter(
  featuredPostRaw[`../content/posts/${featuredPostSlug}.md`] ?? '',
).data.title
</script>

<template>
  <div class="frontmatter-bar">
    <div class="frontmatter-top">
      <RouterLink to="/" class="site-title" aria-label="Ratha Global home">
        <img src="/ratha_global_new_no_border.png" alt="" class="site-title-logo" >
        <span class="site-title-text-group">
          <span class="site-title-text">RATHA GLOBAL</span>
          <span class="site-title-tagline">Remittances and Development Finance Advisory</span>
        </span>
      </RouterLink>

      <div class="masthead-columns">
        <nav class="solutions-links" aria-label="Solutions">
          <a href="/#services" class="column-label">Solutions</a>
          <RouterLink to="/solutions/remittances" class="masthead-detail-link"
            >Remittances, Payments, and Fintechs</RouterLink
          >
          <RouterLink to="/solutions/diaspora-finance" class="masthead-detail-link"
            >Diaspora Finances</RouterLink
          >
          <RouterLink to="/solutions/structured-finance" class="masthead-detail-link"
            >Structured Finance &amp; Guarantees</RouterLink
          >
        </nav>

        <nav class="featured-links" aria-label="Featured">
          <a href="/#highlights" class="column-label">Featured</a>
          <RouterLink to="/subscribe" class="masthead-detail-link"
            >Global Remittances Report &amp; Database</RouterLink
          >
          <RouterLink
            v-if="featuredPostTitle"
            :to="`/blog/${featuredPostSlug}`"
            class="masthead-detail-link"
            >{{ featuredPostTitle }}</RouterLink
          >
        </nav>
      </div>
    </div>

    <div class="eyebrow-marquee">
      <div class="eyebrow-track">
        <p v-for="n in 2" :key="n" class="eyebrow" :aria-hidden="n === 2 || undefined">
          Remittances
          <span class="eyebrow-divider">&middot;</span>
          Diaspora Bonds
          <span class="eyebrow-divider">&middot;</span>
          Structured Finance &amp; Guarantees
          <span class="eyebrow-divider">&middot;</span>
          Credit Ratings
          <span class="eyebrow-divider">&middot;</span>
          Migration &amp; Development
          <span class="eyebrow-divider">&middot;</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.frontmatter-bar {
  /* Column: the title+links row sits above the eyebrow marquee, which spans
     the bar's full width (flex column's default align-items: stretch)
     rather than being bounded to just the title's share of a row. */
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2rem 0rem 0rem 0rem;
}

.frontmatter-bar p {
  margin: 0;
}

.frontmatter-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.site-title {
  display: flex;
  /* Allowed to shrink (and, via min-width: 0 below, to actually wrap its
     text rather than stopping at its content's own minimum width) so that
     on narrower screens where the links beside it (see .masthead-columns)
     need room too, the title gives up space instead of pushing them
     off-screen entirely. Harmless at normal widths, where it never actually
     needs to shrink. */
  flex-shrink: 1;
  min-width: 0;
  align-items: center;
  gap: 0.75rem;
  margin-left: 2rem;
  font-family: var(--font-serif);
  font-size: 2.8rem;
  line-height: 1;
  color: #000;
  text-decoration: none;
}

/* Matches the combined height of the two stacked text lines next to it:
   title font-size (2.8rem) + the gap between lines (0.2rem) + tagline
   font-size (1.1rem), all at line-height: 1 so rem adds up directly to px. */
.site-title-logo {
  height: 4.1rem;
  width: auto;
}

/* The tagline stacks under the wordmark only (left-aligned with it), not
   the logo beside it. */
.site-title-text-group {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 0.2rem;
}

/* Fills out the title row with a bit more content/weight, rather than just
   logo + wordmark. */
.site-title-tagline {
  /* The serif "R"'s own left side-bearing makes the wordmark read as
     starting left of the tagline's true glyph edge even though both boxes
     start at the same x - nudge the tagline right slightly to compensate. */
  padding-left: 0.2rem;
  color: var(--color-moss);
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.02em;
}

.site-title:hover,
.site-title:focus-visible {
  color: var(--color-terracotta);
}

.masthead-columns {
  display: flex;
  flex-shrink: 0;
  gap: 2.5rem;
  margin-right: 2rem;
}

.solutions-links,
.featured-links {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: flex-start;
  gap: 0.35rem;
  /* Caps each column's width so the longer labels wrap to a second line
     instead of each column claiming as much width as its longest label
     needs. */
  max-width: 13rem;
}

/* Quiet, light-weight labels (not styled as buttons) - same muted moss tone
   used for .eyebrow and other secondary labels elsewhere on the site, so
   they read as a quick reference list rather than competing for attention
   with the logo or the real nav below. A dedicated class (rather than
   ".solutions-links a") so it doesn't also catch .column-label, which is
   now a real link too and needs its own, different styling below. */
.masthead-detail-link {
  color: var(--color-moss);
  font-weight: 300;
  font-size: 0.85rem;
  line-height: 1.3;
  text-decoration: none;
  transition: color 0.2s ease;
}

.masthead-detail-link:hover,
.masthead-detail-link:focus-visible {
  color: var(--color-terracotta);
}

/* Mirrors the site's .eyebrow convention (uppercase, letter-spaced, moss)
   at a smaller scale, so each column reads as its own labeled group instead
   of two unlabeled lists that look like more navigation. Also a real link
   (to the homepage's services/highlights sections), so it gets its own
   hover treatment like the detail links above. */
.column-label {
  display: inline-block;
  margin-bottom: 0.15rem;
  color: var(--color-moss);
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.7rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.column-label:hover,
.column-label:focus-visible {
  color: var(--color-terracotta);
}

.eyebrow-marquee {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    black 2rem,
    black calc(100% - 2rem),
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0,
    black 2rem,
    black calc(100% - 2rem),
    transparent 100%
  );
}

.eyebrow-track {
  display: flex;
  width: max-content;
  animation: eyebrow-scroll 22s linear infinite;
}

.eyebrow-track .eyebrow {
  white-space: nowrap;
  flex-shrink: 0;
}

@keyframes eyebrow-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .eyebrow-track {
    animation: none;
  }
}

/* The title and the full links list stop fitting on one line somewhere in
   the 950-1000px range (depending on how long the featured post's title
   ends up being) - rather than dropping the links outright, keep just the
   two section labels (now real links to the homepage's services/highlights
   sections) laid out side by side, and drop the detail links under them.
   That's light enough to stay all the way down through phone widths too -
   see the 640px tier below, which only adds typography scaling on top of
   this, not a different treatment. */
@media (max-width: 1000px) {
  .masthead-columns {
    gap: 1rem;
  }

  .masthead-detail-link {
    display: none;
  }

  .column-label {
    /* The sole remaining content for each section once the detail links
       are gone - sized up from the small label-above-a-list treatment it
       has at full width, so it reads as its own link rather than an
       orphaned caption. */
    margin-bottom: 0;
    font-size: 1rem;
  }
}

/* Even just the two short labels (previous tier) start forcing the title
   and tagline to wrap somewhere in the 750-800px range, and badly by the
   time you reach the 640px tier below (where the title itself also starts
   wrapping) - the exact point moves around depending on how long the
   featured post's title ends up being, so this drops the links with a
   buffer well above where that wrapping actually starts, rather than
   fine-tuning against one specific piece of dynamic content. */
@media (max-width: 800px) {
  .masthead-columns {
    display: none;
  }
}

@media (max-width: 640px) {
  .masthead-columns {
    /* No room for extra nav columns on a phone-width header; PUBLICATIONS /
       MEDIA / CONTACT in the drawer below already cover primary navigation. */
    display: none;
  }

  .site-title {
    font-size: 2.1rem;
    gap: 0.5rem;
  }

  /* Same logic as desktop: mobile title (2.1rem) + text-group gap (0.2rem)
     + mobile tagline (0.85rem). */
  .site-title-logo {
    height: 3.15rem;
  }

  .site-title-tagline {
    font-size: 0.85rem;
  }

  .frontmatter-bar .eyebrow {
    font-size: 0.7rem;
  }
}
</style>
