<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/navbar.vue'
import SiteFooter from './components/footer.vue'
import FrontmatterBar from './components/frontmatter-bar.vue'
import LeafIcon from './components/leaf-icon.vue'

const route = useRoute()
const isHome = computed(() => route.path === '/')

const mastheadEl = ref<HTMLElement | null>(null)
const frontmatterEl = ref<HTMLElement | null>(null)
const revealed = ref(true)
const mastheadHeight = ref(0)
const frontmatterHeight = ref(0)

const growthTrackEl = ref<HTMLElement | null>(null)
const growthFillHeight = ref(0)
const growthTrackHeight = ref(0)

const vineReachFraction = 0.75

// Three staggered "waves" of leaves: each uses its own viewport reach point
// (how far down the screen a leaf needs to be before it starts growing) and
// its own fractional offset along the vine, so the three series interleave
// between each other instead of stacking on the same spots. bonusMax/
// bonusWindow drive a second, much subtler growth that continues after the
// initial reveal - "grows a little more the longer it's been on screen",
// parameterized simply as extra scroll distance past the reveal window, with
// its own cap and pacing per series.
const sproutSeriesConfig = [
  { reachFraction: 0.5, offset: 0, bonusMax: 0.28, bonusWindow: 250 },
  // { reachFraction: 0.35, offset: 1 / 3, bonusMax: 0.22, bonusWindow: 350 },
  // { reachFraction: 0.25, offset: 2 / 3, bonusMax: 0.35, bonusWindow: 180 },
]
const sproutReaches = ref<number[]>(sproutSeriesConfig.map(() => 0))

const sproutCount = 10
// How much scroll distance (px) it takes a leaf to go from just-sprouted to
// full size.
const sproutRevealWindow = 70
const leafWidth = 20
// Section text starts at a 20% left padding; center the vine in that gutter
// (10%) so it scales proportionally with viewport width instead of using a
// fixed px/rem position that could drift into or away from the text.
const vineLeft = '10%'
const vineWidth = 2

// Each non-symmetric variant gets fully independent right/left settings
// (rotation in deg, mirror to flip artwork drawn facing the wrong way,
// xOffset in px = gap from the vine's near edge, negative overlaps it) so
// tuning one side never throws off the other. `symmetric` artwork (the
// two-lobed variant, which isn't a single directional leaf) instead renders
// centered on the vine, shifted by its own xOffset, with one fixed rotation.
//
// To flip a variant's artwork vertically without adding a new transform (and
// without disturbing the vine-attachment pivot), use the identity
// scaleY(-1)&rotate(deg) === rotate(180-deg)&scaleX(-1): set rotation to
// (180 - oldRotation) and toggle mirror, for both sides.
const leafConfig = [
  {
    // pointy (flipped vertically)
    symmetric: false,
    right: { rotation: 50, mirror: false, xOffset: 3 },
    left: { rotation: -50, mirror: true, xOffset: 15 },
  },
  {
    // double
    symmetric: true,
    xOffset: 12,
    rotation: 60,
  },
  {
    // round (flipped vertically)
    symmetric: false,
    right: { rotation: 130, mirror: true, xOffset: 6 },
    left: { rotation: -130, mirror: false, xOffset: 18 },
  },
]

// Build position/variant first, then assign side randomly per leaf, capping
// same-side runs at 2 in a row - pure coin flips still read as "clumpy" to
// the eye, and assigning side per-series index instead clustered 2-3
// same-side leaves at each position slot (every series' i=0 landed on the
// same side).
let lastSproutSide: 'right' | 'left' | null = null
let sproutSideRun = 0
function nextSproutSide(): 'right' | 'left' {
  const forced = sproutSideRun >= 2 ? (lastSproutSide === 'right' ? 'left' : 'right') : null
  const side = forced ?? (Math.random() < 0.5 ? 'right' : 'left')
  sproutSideRun = side === lastSproutSide ? sproutSideRun + 1 : 1
  lastSproutSide = side
  return side
}

const sprouts = sproutSeriesConfig
  .flatMap((series, seriesIndex) =>
    Array.from({ length: sproutCount }, (_, i) => ({
      fraction: (i + 1 + series.offset) / (sproutCount + 1),
      series: seriesIndex,
      variant: i % 3,
    })),
  )
  .sort((a, b) => a.fraction - b.fraction)
  .map((sprout) => {
    const side = nextSproutSide()
    const config = leafConfig[sprout.variant]
    const sideConfig = config?.symmetric
      ? null
      : (config?.[side] ?? { rotation: 0, mirror: false, xOffset: 0 })
    const rotation = config?.symmetric ? (config.rotation ?? 0) : sideConfig!.rotation
    const mirrored = config?.symmetric ? false : sideConfig!.mirror
    const left = config?.symmetric
      ? `calc(${vineLeft} - ${leafWidth / 2}px + ${config.xOffset ?? 0}px)`
      : side === 'right'
        ? `calc(${vineLeft} + ${vineWidth}px + ${sideConfig!.xOffset}px)`
        : `calc(${vineLeft} - ${leafWidth}px - ${sideConfig!.xOffset}px)`
    return {
      ...sprout,
      side,
      rotation,
      mirrored,
      left,
      symmetric: config?.symmetric ?? false,
    }
  })

// Temporarily disabled - flip back to true to restore the subtle post-reveal
// growth.
const sproutBonusEnabled = false

const sproutVisuals = computed(() =>
  sprouts.map((sprout) => {
    const thresholdPx = growthTrackHeight.value * sprout.fraction
    const reach = sproutReaches.value[sprout.series] ?? 0
    const distance = reach - thresholdPx
    const progress = Math.max(0, Math.min(1, distance / sproutRevealWindow))
    const series = sproutSeriesConfig[sprout.series]
    const bonusDistance = Math.max(0, distance - sproutRevealWindow)
    const bonus =
      sproutBonusEnabled && series
        ? series.bonusMax * Math.max(0, Math.min(1, bonusDistance / series.bonusWindow))
        : 0
    return {
      opacity: progress,
      scale: 0.3 + 0.7 * progress + bonus,
    }
  }),
)

let lastScrollY = 0
let ticking = false
let resizeObserver: ResizeObserver | null = null
let growthResizeObserver: ResizeObserver | null = null

function measure() {
  mastheadHeight.value = mastheadEl.value?.offsetHeight ?? 0
  frontmatterHeight.value = frontmatterEl.value?.offsetHeight ?? 0
  document.documentElement.style.setProperty(
    '--frontmatter-height',
    `${frontmatterHeight.value}px`,
  )
}

function updateGrowthLine() {
  if (!growthTrackEl.value) return
  const rect = growthTrackEl.value.getBoundingClientRect()
  growthTrackHeight.value = rect.height
  const vineReach = window.innerHeight * vineReachFraction - rect.top
  growthFillHeight.value = Math.max(0, Math.min(rect.height, vineReach))
  sproutReaches.value = sproutSeriesConfig.map((series) => {
    const reachPx = window.innerHeight * series.reachFraction - rect.top
    return Math.max(0, Math.min(rect.height, reachPx))
  })
}

// Expand the underline on whichever section heading is closest to the
// viewport's vertical center - only ever one at a time, except headings that
// sit side by side on the same row (e.g. Clients/Services), which are
// grouped so they expand together as a pair.
function updateHeadingHighlights() {
  const viewportHeight = window.innerHeight
  const centerY = viewportHeight / 2
  const headings = Array.from(document.querySelectorAll<HTMLElement>('.page-content section h2'))

  const groups: HTMLElement[][] = []
  headings.forEach((h2) => {
    const top = h2.getBoundingClientRect().top
    const group = groups.find((g) => Math.abs(g[0]!.getBoundingClientRect().top - top) < 4)
    if (group) group.push(h2)
    else groups.push([h2])
  })

  let closestGroup: HTMLElement[] | null = null
  let closestDistance = Infinity
  groups.forEach((group) => {
    const rect = group[0]!.getBoundingClientRect()
    const distance = Math.abs(rect.top + rect.height / 2 - centerY)
    if (distance < closestDistance) {
      closestDistance = distance
      closestGroup = group
    }
  })

  groups.forEach((group) => {
    const isActive = group === closestGroup && closestDistance < viewportHeight * 0.5
    group.forEach((h2) => h2.classList.toggle('heading-centered', isActive))
  })
}

function handleScroll() {
  if (ticking) return
  ticking = true
  window.requestAnimationFrame(() => {
    const y = window.scrollY
    if (y <= 0 || y < lastScrollY) {
      revealed.value = true
    } else if (y > lastScrollY) {
      revealed.value = false
    }
    lastScrollY = y
    ticking = false
    updateGrowthLine()
    updateHeadingHighlights()
  })
}

onMounted(() => {
  lastScrollY = window.scrollY
  measure()
  updateGrowthLine()
  updateHeadingHighlights()
  resizeObserver = new ResizeObserver(measure)
  if (mastheadEl.value) resizeObserver.observe(mastheadEl.value)
  growthResizeObserver = new ResizeObserver(() => {
    updateGrowthLine()
    updateHeadingHighlights()
  })
  if (growthTrackEl.value) growthResizeObserver.observe(growthTrackEl.value)
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', measure)
  window.addEventListener('resize', updateGrowthLine)
  window.addEventListener('resize', updateHeadingHighlights)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', measure)
  window.removeEventListener('resize', updateHeadingHighlights)
  window.removeEventListener('resize', updateGrowthLine)
  resizeObserver?.disconnect()
  growthResizeObserver?.disconnect()
})
</script>

<template>
  <div class="page-shell">
    <div
      ref="mastheadEl"
      class="masthead"
      :style="{ transform: `translateY(${revealed ? 0 : -frontmatterHeight}px)` }"
    >
      <div ref="frontmatterEl">
        <FrontmatterBar />
      </div>
      <NavBar />
    </div>
    <div class="masthead-spacer" :style="{ height: `${mastheadHeight}px` }" />
    <div ref="growthTrackEl" class="growth-track">
      <template v-if="isHome">
        <div class="growth-line-fill" :style="{ height: `${growthFillHeight}px` }" />
        <div
          v-for="(sprout, i) in sprouts"
          :key="i"
          class="growth-sprout"
          :class="`growth-sprout-${sprout.side}`"
          :style="{
            top: `${sprout.fraction * 100}%`,
            left: sprout.left,
            opacity: sproutVisuals[i]?.opacity ?? 0,
            transformOrigin: sprout.symmetric ? 'center' : undefined,
            transform: `rotate(${sprout.rotation}deg) scale(${(sproutVisuals[i]?.scale ?? 0.3).toFixed(3)})${sprout.mirrored ? ' scaleX(-1)' : ''}`,
          }"
        >
          <LeafIcon :variant="sprout.variant" />
        </div>
      </template>
      <router-view />
    </div>
    <SiteFooter />
  </div>
</template>

<style>
:root {
  --color-paper: #f3efe6;
  --color-ink: #17211f;
  --color-indigo: #243b53;
  --color-terracotta: #b85c45;
  --color-saffron: #d39a3a;
  --color-moss: #66735a;
  --color-muted-rose: #b9827a;
  --color-brass: #a88958;
  --font-serif: 'Asul', Georgia, 'Times New Roman', serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

img {
  max-width: 100%;
}

h1,
h2,
h3,
h4 {
  font-family: var(--font-serif);
  color: var(--color-indigo);
    margin: 0 0 0.5rem 0;
  padding: 0;
}

a {
  color: var(--color-terracotta);
}

a:hover,
a:focus-visible {
  color: var(--color-brass);
}

.eyebrow {
  color: var(--color-moss);
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 1.05rem;
}

.eyebrow-divider {
  margin: 0 0.4em;
  color: rgba(102, 115, 90, 0.4);
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  text-transform: none;
}

.card-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.card-link:hover,
.card-link:focus-visible {
  color: var(--color-terracotta);
}

.button {
  display: inline-block;
  padding: 0.6rem 1.25rem;
  margin: 0;
  border: 1px solid rgba(168, 137, 88, 0.35);
  border-radius: 0;
  background: var(--color-paper);
  color: var(--color-indigo);
  font: inherit;
  font-weight: 400;
  line-height: 1.4;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition: box-shadow 0.25s ease, transform 0.25s ease, color 0.2s ease;
}

.button:hover,
.button:focus-visible {
  color: var(--color-moss);
  transform: translateY(-2px);
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.02),
    0 3px 8px rgba(0, 0, 0, 0.04),
    0 10px 20px rgba(0, 0, 0, 0.05);
}

.page-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.masthead {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background: var(--color-paper);
  transition: transform 0.25s ease;
}

.page-content {
  flex: 1;
  margin: 0 auto;
  padding: 1rem 0 3rem;
}

.growth-track {
  position: relative;
}

.growth-line-fill {
  position: absolute;
  top: 0;
  left: 10%;
  width: 2px;
  pointer-events: none;
  z-index: 0;
  background: var(--color-moss);
  transition: height 0.15s linear;
  will-change: height;
}

.growth-sprout {
  position: absolute;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  color: var(--color-moss);
  transition: opacity 0.15s linear, transform 0.15s linear;
  pointer-events: none;
  z-index: 0;
}

.growth-sprout-right {
  transform-origin: left center;
}

.growth-sprout-left {
  transform-origin: right center;
}

section {
  border-top: 1px solid rgba(168, 137, 88, 0.35);
  margin: 0;
  padding: 3.5rem 10% 3.5rem 20%;
}

section h2 {
  position: relative;
  display: inline-block;
  padding-bottom: 0.6rem;
  margin-bottom: 1.5rem;
  letter-spacing: 0.02em;
}

section h2::after {
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

section h2.heading-centered::after {
  width: 100%;
}

/* Featured post heading sits in its own unique card layout, not a regular
   section heading - keep its short underline static instead of expanding. */
#featured-post-title.heading-centered::after {
  width: 3rem;
}

@media (prefers-reduced-motion: reduce) {
  section h2::after {
    width: 100%;
    transition: none;
  }

  html {
    scroll-behavior: auto;
  }
}

#contact {
  scroll-margin-top: 6rem;
}

section p {
  margin-top: 0;
  line-height: 1.75;
}

section p + p {
  margin-top: 1rem;
}

.page-content > section:first-child {
  border-top: none;
}

ul {
    padding: 0;
    padding-left: 1.75rem;
  margin: 0;
}

li {
  margin-bottom: 0.4rem;
}

li::marker {
  font-size: 1.4em;
  color: var(--color-indigo);
}

@media (max-width: 640px) {
  section {
    padding: 2.75rem 1.25rem;
  }

  .growth-line-fill {
    display: none;
  }

  .growth-sprout {
    display: none;
  }
}
</style>
