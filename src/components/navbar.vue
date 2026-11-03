<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const menuOpen = ref(false)
const route = useRoute()

function closeMenu() {
  menuOpen.value = false
}

watch(
  () => route.fullPath,
  () => closeMenu(),
)
</script>

<template>
  <header>
    <nav class="nav-bar" aria-label="Site navigation">
      <RouterLink to="/" class="brand" aria-label="Ratha Global home">
        <!-- Kept in the DOM (not removed) so its box still reserves the
             brand's layout space and its position/size can be measured as
             the logo-morph target in App.vue - just not drawn itself, since
             the frontmatter bar's own logo animates in to occupy this exact
             spot on scroll (see frontmatter-bar.vue / App.vue measureLogoMorph). -->
        <img src="/ratha_global_new_no_border.png" alt="" aria-hidden="true" />
      </RouterLink>

      <div class="nav-right">
        <RouterLink to="/subscribe" class="button nav-subscribe">SUBSCRIBE</RouterLink>

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
        <RouterLink to="/" aria-label="home" @click="closeMenu">HOME</RouterLink>
        <RouterLink to="/blog" @click="closeMenu">PUBLICATIONS</RouterLink>
        <RouterLink to="/media" @click="closeMenu">MEDIA</RouterLink>
        <a href="/#contact" @click="closeMenu">CONTACT</a>
        <RouterLink to="/subscribe" class="nav-drawer-subscribe" @click="closeMenu"
          >SUBSCRIBE</RouterLink
        >
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
  padding: 0.5rem 1rem;
  border-bottom: 2px solid var(--color-moss);
}

.brand {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  text-decoration: none;
}

.brand img {
  height: 40px;
  width: auto;
  opacity: 0;
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

.nav-subscribe {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin: -0.5rem -1rem -0.5rem 0;
  border-color: var(--color-terracotta);
  background: var(--color-terracotta);
  color: var(--color-paper);
  font-weight: 700;
}

.nav-subscribe:hover,
.nav-subscribe:focus-visible {
  color: var(--color-paper);
  background: #a24e38;
  transform: none;
  box-shadow: none;
}

.nav-drawer-clip {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.nav-drawer {
  display: flex;
  gap: 1.5rem;
  pointer-events: auto;
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
    height: 32px;
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
