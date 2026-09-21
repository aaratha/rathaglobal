<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import NavBar from './components/navbar.vue'
import SiteFooter from './components/footer.vue'
import FrontmatterBar from './components/frontmatter-bar.vue'

const mastheadEl = ref<HTMLElement | null>(null)
const frontmatterEl = ref<HTMLElement | null>(null)
const revealed = ref(true)
const mastheadHeight = ref(0)
const frontmatterHeight = ref(0)

let lastScrollY = 0
let ticking = false
let resizeObserver: ResizeObserver | null = null

function measure() {
  mastheadHeight.value = mastheadEl.value?.offsetHeight ?? 0
  frontmatterHeight.value = frontmatterEl.value?.offsetHeight ?? 0
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
  })
}

onMounted(() => {
  lastScrollY = window.scrollY
  measure()
  resizeObserver = new ResizeObserver(measure)
  if (mastheadEl.value) resizeObserver.observe(mastheadEl.value)
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', measure)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', measure)
  resizeObserver?.disconnect()
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
    <router-view />
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
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.85rem;
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
  padding: 0.4rem 0.9rem;
  border: 1.5px solid var(--color-terracotta);
  border-radius: 999px;
  background: none;
  color: var(--color-terracotta);
  font: inherit;
  text-decoration: none;
  cursor: pointer;
}

.button:hover,
.button:focus-visible {
  background: var(--color-terracotta);
  color: var(--color-paper);
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

section {
  border-top: 1px solid var(--color-ink);
  margin: 0;
  padding: 2rem 10rem 2rem 10rem;
}

.page-content > section:first-child {
  border-top: none;
}

ul {
    padding: 0;
    padding-left: 1.5rem;
  margin: 0;
}

</style>
