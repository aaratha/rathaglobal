<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const props = defineProps<{ logoReveal?: number }>()

const menuOpen = ref(false)
const route = useRoute()
const { user } = useAuth()

function closeMenu() {
  menuOpen.value = false
}

watch(
  () => route.fullPath,
  () => closeMenu(),
)

// The nav links are left-aligned at the same spot the (currently invisible)
// logo sits, so they need to slide right out of its way as the logo fades in
// on scroll - by exactly the logo's own rendered width, not a guessed
// constant, so it tracks however wide the logo actually ends up.
const logoImgEl = ref<HTMLImageElement | null>(null)
const logoWidth = ref(0)
const logoShiftGap = 32

function measureLogoWidth() {
  logoWidth.value = logoImgEl.value?.offsetWidth ?? 0
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  measureLogoWidth()
  resizeObserver = new ResizeObserver(measureLogoWidth)
  if (logoImgEl.value) resizeObserver.observe(logoImgEl.value)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})

const navShiftStyle = computed(() => ({
  '--nav-logo-shift': `${(logoWidth.value + logoShiftGap) * (props.logoReveal ?? 0)}px`,
}))

// SUBSCRIBE reads as a plain link (like PUBLICATIONS/MEDIA/CONTACT) until
// scrolling starts, then eases into the full-bleed terracotta CTA treatment
// - at rest, that solid color block sat flush against the bar's edges while
// everything else in the masthead above it (title, links) was inset, which
// read as lopsided. Triggers a little after the logo starts fading in
// (rather than at the very first pixel of scroll) - it's still a timed CSS
// transition rather than tracking scroll position directly like the logo,
// so starting it slightly later keeps the two reading as roughly in step
// without the button visibly jumping the gun.
const isSticky = computed(() => (props.logoReveal ?? 0) > 0.15)

// Once logged in, ACCOUNT takes over the CTA slot SUBSCRIBE occupies when
// logged out - there's no reason to ask an existing account holder to
// subscribe, and ACCOUNT is the more useful destination for them.
const ctaTo = computed(() => (user.value ? '/account' : '/subscribe'))
const ctaLabel = computed(() => (user.value ? 'ACCOUNT' : 'SUBSCRIBE'))
</script>

<template>
  <header :style="navShiftStyle">
    <nav class="nav-bar" aria-label="Site navigation">
      <RouterLink to="/" class="brand" aria-label="Ratha Global home">
        <img
          ref="logoImgEl"
          src="/ratha_global_new_no_border.png"
          alt=""
          aria-hidden="true"
          :style="{ opacity: logoReveal ?? 0 }"
        />
      </RouterLink>

      <div class="nav-right">
        <RouterLink :to="ctaTo" class="nav-subscribe" :class="{ 'nav-subscribe-sticky': isSticky }"
          >{{ ctaLabel }}</RouterLink
        >

        <button
          type="button"
          class="nav-toggle"
          :aria-expanded="menuOpen"
          aria-controls="primary-nav"
          aria-label="Toggle navigation menu"
          @click="menuOpen = !menuOpen"
        >
          <span class="nav-toggle-bar" />
          <span class="nav-toggle-bar" />
          <span class="nav-toggle-bar" />
        </button>
      </div>
    </nav>

    <div class="nav-drawer-clip">
      <nav
        id="primary-nav"
        class="nav-drawer"
        :class="{ 'nav-drawer-open': menuOpen }"
        aria-label="Primary navigation"
      >
        <RouterLink to="/blog" @click="closeMenu">PUBLICATIONS</RouterLink>
        <RouterLink to="/media" @click="closeMenu">MEDIA</RouterLink>
        <a href="/#contact" @click="closeMenu">CONTACT</a>
        <RouterLink v-if="!user" to="/login" @click="closeMenu">LOG IN</RouterLink>
        <RouterLink :to="ctaTo" class="nav-drawer-subscribe" @click="closeMenu">{{
          ctaLabel
        }}</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  position: relative;
  isolation: isolate;
}

.nav-bar {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 1rem;
  /* Left inset matches the frontmatter bar's own logo margin (.site-title in
     frontmatter-bar.vue) so the logo doesn't jump sideways when it morphs
     from the frontmatter bar into this one on scroll. */
  padding: 0.9rem 1rem 0.9rem 2rem;
  border-bottom: 2px solid var(--color-moss);
}

.brand {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  text-decoration: none;
}

.brand img {
  height: 38px;
  width: auto;
}

/* Logo is a flat black PNG, not text, so it can't take a `color` change
   like the other nav links (.nav-drawer a below) do. Instead this masks the
   same image into a terracotta-filled overlay, sized to match the img
   exactly (.brand has no padding, so its box equals the img's box), and
   snaps it in on hover with no transition - same instant swap as those
   links, which also have none. */
.brand::after {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--color-terracotta);
  -webkit-mask-image: url('/ratha_global_new_no_border.png');
  mask-image: url('/ratha_global_new_no_border.png');
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  opacity: 0;
  pointer-events: none;
}

.brand:hover::after,
.brand:focus-visible::after {
  opacity: 1;
}

.nav-right {
  display: flex;
  align-items: stretch;
  gap: 0.75rem;
  margin-left: auto;
}

.nav-toggle {
  align-self: center;
}

/* Base state mirrors .nav-drawer a (the other nav links) exactly - same
   font, size, color, hover - so at rest it reads as one more link, not a
   button. Geometry (margin/padding/border-width) is identical between this
   and .nav-subscribe-sticky and never transitions - only colors do - so the
   box doesn't also resize/reposition while its background fades in, which
   read as inconsistent sizing mid-transition. At rest the background and
   border are just transparent, so the full-bleed box is there but invisible. */
.nav-subscribe {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin: -0.9rem -1rem -0.9rem 0;
  padding: 0.6rem 1.25rem;
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-ink);
  text-decoration: none;
  font-family: var(--font-serif);
  font-size: 1.5rem;
  transition:
    background-color 0.35s ease,
    border-color 0.35s ease,
    color 0.35s ease,
    font-size 0.35s ease;
}

.nav-subscribe:hover,
.nav-subscribe:focus-visible {
  color: var(--color-terracotta);
}

.nav-subscribe-sticky {
  border-color: var(--color-terracotta);
  background: var(--color-terracotta);
  color: var(--color-paper);
  font-size: 1.2rem;
}

.nav-subscribe-sticky:hover,
.nav-subscribe-sticky:focus-visible {
  color: var(--color-paper);
  background: #a24e38;
}

.nav-drawer-clip {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* .nav-bar's own left padding (2rem), minus the first link's own left
     padding (1.25rem, from .nav-drawer a below) - so it's the link's *text*
     that lines up flush with the logo's left edge, not just its hit box. */
  padding-left: 0.75rem;
  pointer-events: none;
}

.nav-drawer {
  display: flex;
  gap: 1.5rem;
  pointer-events: auto;
  /* Slides right in step with the logo fading in on scroll (see
     navShiftStyle in the script), so the links clear the logo instead of
     sitting underneath it. --nav-logo-shift is 0 at rest, since the logo
     starts invisible in the same spot the links already occupy. */
  transform: translateX(var(--nav-logo-shift, 0px));
}

.nav-drawer a {
  display: inline-block;
  padding: 0.75rem 1.25rem;
  color: var(--color-ink);
  text-decoration: none;
  font-family: var(--font-serif);
  font-size: 1.5rem;
}

.nav-drawer a:hover,
.nav-drawer a:focus-visible {
  color: var(--color-terracotta);
}

/* Hidden outside the mobile drawer - the .nav-subscribe button in the top
   bar already covers desktop/tablet, where .nav-drawer renders as the
   always-visible horizontal nav rather than a collapsible dropdown.
   Selector is qualified with `a` (not just the class) so it outranks the
   shared `.nav-drawer a` rule's own specificity - otherwise that rule's
   `display: inline-block` would win and the button would stay visible. */
.nav-drawer a.nav-drawer-subscribe {
  display: none;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.nav-toggle-bar {
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 2px;
  background: var(--color-ink);
  transition:
    transform 0.25s ease,
    opacity 0.2s ease;
}

.nav-toggle[aria-expanded='true'] .nav-toggle-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.nav-toggle[aria-expanded='true'] .nav-toggle-bar:nth-child(2) {
  opacity: 0;
}

.nav-toggle[aria-expanded='true'] .nav-toggle-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 640px) {
  .nav-bar {
    padding: 0.5rem 0.75rem;
    border-bottom: none;
  }

  .brand img {
    height: 28px;
    width: auto;
  }

  .nav-right {
    gap: 0.5rem;
  }

  /* Hidden outright on mobile, not just while the drawer is open - the
     drawer has its own SUBSCRIBE button at the bottom, so this is the only
     place to find it on mobile at any time. Qualified with the ancestor
     class (not `.nav-subscribe` alone) because the global `.button` rule
     (App.vue) sets `display` too, at equal specificity, and is emitted
     later in the final stylesheet than this component's scoped styles -
     an unqualified `.nav-subscribe { display: none }` here was silently
     losing that tie and the button never actually disappeared. */
  .nav-right .nav-subscribe {
    display: none;
  }

  .nav-toggle {
    display: flex;
  }

  .nav-drawer-clip {
    top: 100%;
    bottom: auto;
    display: block;
    padding-left: 0;
    overflow: hidden;
    z-index: -1;
    pointer-events: none;
  }

  .nav-drawer {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    gap: 0.25rem;
    padding: 0.5rem 0 0;
    background: var(--color-paper);
    border-bottom: 2px solid var(--color-moss);
    transform: translateY(calc(-100% + 2px));
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
  }

  .nav-drawer-open {
    transform: translateY(0);
    pointer-events: auto;
  }

  .nav-drawer a {
    padding: 0.75rem 1.25rem 0.75rem 2rem;
    text-align: left;
    font-size: 1.3rem;
  }

  .nav-drawer a.nav-drawer-subscribe {
    display: block;
    margin-top: 0.25rem;
    padding: 0.9rem 1.25rem 0.9rem 2rem;
    background: var(--color-terracotta);
    color: var(--color-paper);
    font-weight: 700;
  }

  .nav-drawer a.nav-drawer-subscribe:hover,
  .nav-drawer a.nav-drawer-subscribe:focus-visible {
    color: var(--color-paper);
    background: #a24e38;
  }
}
</style>
