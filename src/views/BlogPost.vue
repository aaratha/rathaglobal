<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { marked } from 'marked'
import { setMeta } from '../composables/useMeta'

// Lightweight browser-safe frontmatter parser (no Node.js Buffer needed)
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const fence = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!fence) return { data: {}, content: raw }
  const [, yaml = '', content = ''] = fence
  const data: Record<string, string> = {}
  for (const line of yaml.split('\n')) {
    const i = line.indexOf(':')
    if (i < 1) continue
    const key = line.slice(0, i).trim()
    const val = line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
    if (key) data[key] = val
  }
  return { data, content }
}

const route = useRoute()

interface PostData {
  title: string
  date: string
  description: string
  html: string
  pdf: string
  banner: string
  bannerAlt: string
  bannerCredit: string
}

const post = ref<PostData | null>(null)
const notFound = ref(false)
const loading = ref(true)

const allPosts = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

const loadPost = async (slug: string) => {
  loading.value = true
  post.value = null
  notFound.value = false

  const key = `../content/posts/${slug}.md`
  if (!allPosts[key]) {
    notFound.value = true
    loading.value = false
    setMeta({
      title: 'Post Not Found | Ratha Global',
      description: 'This post may have been moved or removed.',
      path: `/blog/${slug}`,
      noindex: true,
    })
    return
  }

  const raw = await allPosts[key]()
  const { data, content } = parseFrontmatter(raw)
  const d = data.date ? new Date(`${data.date}T00:00:00`) : null
  const date = d
    ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''
  const html = await marked.parse(content)

  const title = String(data.title ?? slug)
  const description = String(data.description ?? '')
  const banner = String(data.banner ?? '')

  post.value = {
    title,
    date,
    description,
    html,
    pdf: String(data.pdf ?? ''),
    banner,
    bannerAlt: String(data.banner_alt ?? ''),
    bannerCredit: String(data.banner_credit ?? ''),
  }
  loading.value = false

  setMeta({
    title: `${title} | Ratha Global`,
    description: description || 'A publication from Ratha Global.',
    path: `/blog/${slug}`,
    ...(banner ? { image: `https://www.rathaglobal.com${banner}` } : {}),
  })

  await nextTick()
  measureBanner()
  updateBannerParallax()
}

const printPost = () => {
  window.print()
}

const bannerViewportEl = ref<HTMLElement | null>(null)
const bannerImgEl = ref<HTMLElement | null>(null)

let bannerMaxOffset = 0
let bannerTicking = false

function measureBanner() {
  bannerMaxOffset = bannerViewportEl.value ? bannerViewportEl.value.offsetHeight * 0.3 : 0
}

function updateBannerParallax() {
  bannerTicking = false
  if (!bannerViewportEl.value || !bannerImgEl.value) return
  const rect = bannerViewportEl.value.getBoundingClientRect()
  // Ramp continuously across the banner's entire time on screen - from fully
  // in view (progress 0) to fully scrolled past the top of the viewport
  // (progress 1) - instead of saturating at a fixed offset after a small
  // amount of scroll.
  const progress = Math.max(0, Math.min(1, -rect.top / (rect.height || 1)))
  const offset = progress * bannerMaxOffset
  bannerImgEl.value.style.transform = `translateY(${offset}px)`
}

function onBannerScroll() {
  if (bannerTicking) return
  bannerTicking = true
  window.requestAnimationFrame(updateBannerParallax)
}

onMounted(() => {
  measureBanner()
  updateBannerParallax()
  window.addEventListener('scroll', onBannerScroll, { passive: true })
  window.addEventListener('resize', measureBanner)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onBannerScroll)
  window.removeEventListener('resize', measureBanner)
})

watch(
  () => route.params.slug,
  (slug) => loadPost(slug as string),
  { immediate: true },
)
</script>

<template>
  <main class="page-content">
    <figure v-if="post?.banner" class="post-banner-figure">
      <div ref="bannerViewportEl" class="post-banner-viewport">
        <img ref="bannerImgEl" class="post-banner" :src="post.banner" :alt="post.bannerAlt || post.title">
      </div>
      <figcaption v-if="post.bannerCredit" class="post-banner-credit">{{ post.bannerCredit }}</figcaption>
    </figure>

    <section>
      <div class="post-container">
        <div class="post-meta">
          <p class="back-link">
            <RouterLink to="/blog">&larr; All publications</RouterLink>
          </p>

          <p v-if="post" class="post-actions">
            <a
              v-if="post.pdf"
              :href="post.pdf"
              target="_blank"
              rel="noopener"
              class="button"
              aria-label="Open the print-ready PDF of this publication"
            >Print</a>
            <button
              v-else
              type="button"
              class="button"
              aria-label="Print this publication"
              @click="printPost"
            >Print</button>
            <a href="mailto:dratha@rathaglobal.com" class="button">Contact the editor</a>
          </p>
        </div>

        <p v-if="loading" aria-live="polite">Loading&hellip;</p>

        <div v-else-if="notFound">
          <h2>Post not found</h2>
          <p>This post may have been moved or removed.</p>
          <RouterLink to="/blog">Back to publications</RouterLink>
        </div>

        <article v-else-if="post">
          <header>
            <p v-if="post.date" class="eyebrow">{{ post.date }}</p>
            <h1>{{ post.title }}</h1>
            <p v-if="post.description" class="post-description">{{ post.description }}</p>
          </header>

          <div class="post-divider" aria-hidden="true">
            <span v-for="n in 5" :key="n" />
          </div>

          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="prose" v-html="post.html" />
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
@media (min-width: 641px) {
  section {
    padding-left: 10%;
  }
}

.post-banner-figure {
  margin: calc(-1rem - var(--frontmatter-height, 0px)) 0 0;
}

.post-banner-figure + section {
  padding-top: 3rem;
}

.post-banner-viewport {
  position: relative;
  overflow: hidden;
  height: 60vh;
  max-height: 44rem;
}

.post-banner {
  position: absolute;
  top: -30%;
  left: 0;
  right: 0;
  display: block;
  width: 100%;
  height: 130%;
  object-fit: cover;
  will-change: transform;
}

.post-banner-credit {
  display: block;
  margin-top: 0.4rem;
  padding: 0 1rem;
  color: var(--color-moss);
  font-size: 0.8rem;
  text-align: right;
}

.post-divider {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0;
}

.post-divider span {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-moss);
}

.post-description {
  color: var(--color-moss);
}

.post-container {
  max-width: 42rem;
  margin: 0 auto;
}

.post-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.back-link {
  margin: 0;
  font-size: 0.9rem;
}

.back-link a {
  color: var(--color-moss);
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.back-link a:hover,
.back-link a:focus-visible {
  color: var(--color-terracotta);
}

.post-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 0;
}

.prose :deep(h2),
.prose :deep(h3) {
  margin-top: 2rem;
}

.prose :deep(a) {
  color: var(--color-terracotta);
}

.prose :deep(a:hover),
.prose :deep(a:focus-visible) {
  color: var(--color-brass);
}

.prose :deep(blockquote) {
  margin: 1.25rem 0;
  padding: 0.75rem 1.1rem;
  border-left: 3px solid var(--color-brass);
  background: rgba(185, 130, 122, 0.14);
}

.prose :deep(code) {
  background: rgba(23, 33, 31, 0.08);
  padding: 0.15em 0.4em;
  border-radius: 4px;
}

.prose :deep(pre) {
  background: rgba(23, 33, 31, 0.06);
  padding: 1rem;
  overflow-x: auto;
}

.prose :deep(pre code) {
  background: none;
  padding: 0;
}

.prose :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-brass);
}
</style>
