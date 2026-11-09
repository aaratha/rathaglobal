<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { marked } from 'marked'
import { setMeta } from '../composables/useMeta'
import { parseFrontmatter } from '../content/parseFrontmatter'

const route = useRoute()

interface PostData {
  title: string
  date: string
  description: string
  contributors: string
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

  const rawHtml = await marked.parse(content)

  // Wrap the first letter of the first paragraph (only if the paragraph starts with a letter)
  const html = rawHtml.replace(/<p>(\p{L})/u, '<p><span class="dropcap">$1</span>')

  const title = String(data.title ?? slug)
  const description = String(data.description ?? '')
  const contributors = String(data.contributors ?? '')
  const banner = String(data.banner ?? '')

  post.value = {
    title,
    date,
    description,
    contributors,
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
        <div class="post-banner-overlay" />
        <div class="post-banner-overlay-content">
          <div class="post-container">
            <div v-if="post.date || post.contributors" class="post-meta-line">
              <p v-if="post.date" class="eyebrow post-date">{{ post.date }}</p>
              <p v-if="post.contributors" class="post-contributors">By {{ post.contributors }}</p>
            </div>
            <h1>{{ post.title }}</h1>
            <p v-if="post.description" class="post-description">{{ post.description }}</p>
          </div>
        </div>
      </div>
      <figcaption v-if="post.bannerAlt || post.bannerCredit" class="post-banner-caption">
        <span v-if="post.bannerAlt" class="post-banner-description">{{ post.bannerAlt }}</span>
        <span v-if="post.bannerCredit" class="post-banner-credit">{{ post.bannerCredit }}</span>
      </figcaption>
    </figure>

    <section>
      <div class="post-container">
        <div class="post-meta">
          <p class="back-link">
            <RouterLink to="/blog">All publications</RouterLink>
          </p>

          <p v-if="post" class="post-actions">
            <a
              v-if="post.pdf"
              :href="post.pdf"
              target="_blank"
              rel="noopener"
              class="post-print-link"
              aria-label="Open the print-ready PDF of this publication"
            >Print</a>
            <button
              v-else
              type="button"
              class="post-print-link"
              aria-label="Print this publication"
              @click="printPost"
            >Print</button>
            <span class="post-actions-dot" aria-hidden="true" />
            <a href="mailto:dratha@rathaglobal.com" class="post-print-link">Contact</a>
          </p>
        </div>

        <div class="post-divider" aria-hidden="true">
          <span v-for="n in 5" :key="n" />
        </div>

        <p v-if="loading" aria-live="polite">Loading&hellip;</p>

        <div v-else-if="notFound">
          <h2>Post not found</h2>
          <p>This post may have been moved or removed.</p>
          <RouterLink to="/blog">Back to publications</RouterLink>
        </div>

        <article v-else-if="post">
          <header v-if="!post.banner">
            <div v-if="post.date || post.contributors" class="post-meta-line">
              <p v-if="post.date" class="eyebrow post-date">{{ post.date }}</p>
              <p v-if="post.contributors" class="post-contributors">By {{ post.contributors }}</p>
            </div>
            <h1>{{ post.title }}</h1>
            <p v-if="post.description" class="post-description">{{ post.description }}</p>
          </header>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <!-- eslint-disable-next-line vue/no-v-html -->
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
  width: 100vw;
  max-width: 100vw;
  margin-top: calc(-1rem - var(--nav-height, 0px));
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}

.post-banner-figure + section {
  padding-top: 2.5rem;
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
  z-index: 0;
  display: block;
  width: 100%;
  height: 130%;
  object-fit: cover;
  will-change: transform;
}

.post-banner-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    to top,
    rgba(17, 23, 22, 0.85) 0%,
    rgba(17, 23, 22, 0.4) 45%,
    rgba(17, 23, 22, 0.05) 100%
  );
}

.post-banner-overlay-content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 2rem 1.25rem;
}

@media (min-width: 641px) {
  .post-banner-overlay-content {
    padding: 2rem 10%;
  }
}

.post-banner-overlay-content .post-date {
  color: #fff;
}

.post-banner-overlay-content h1 {
  color: #fff;
}

.post-banner-overlay-content .post-description {
  color: #fff;
}

.post-banner-overlay-content .post-contributors {
  color: #fff;
}

.post-banner-caption {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  margin-top: 0.4rem;
  padding: 0 0.4rem;
}

.post-banner-description {
  color: var(--color-moss);
  font-size: 0.8rem;
  text-align: left;
}

.post-banner-credit {
  flex-shrink: 0;
  color: var(--color-moss);
  font-size: 0.8rem;
  text-align: right;
}

@media (max-width: 640px) {
  .post-banner-viewport {
    height: 50vh;
    max-height: 28rem;
  }

  .post-banner-overlay-content .post-meta-line {
    flex-direction: column;
    align-items: flex-start;
  }

  .post-banner-overlay-content .post-meta-line .post-contributors {
    text-align: left;
  }

  .post-banner-caption {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
    padding: 0 0.4rem;
  }

  .post-banner-credit {
    text-align: left;
  }

  .post-banner-overlay-content {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
}

.post-description {
  color: var(--color-moss);
}

.post-contributors {
  font-style: italic;
}

.post-meta-line {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.post-meta-line p {
  margin: 0;
}

.post-meta-line .post-contributors {
  text-align: right;
}

.post-date {
  color: var(--color-terracotta);
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

.post-divider {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.post-divider span {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-moss);
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
  align-items: center;
  justify-content: flex-end;
  gap: 0.6rem;
  margin: 0;
}

.post-actions-dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-moss);
}

.post-print-link {
  display: inline-block;
  padding: 0;
  border: none;
  background: none;
  color: var(--color-moss);
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.post-print-link:hover,
.post-print-link:focus-visible {
  color: var(--color-terracotta);
}

.prose :deep(h2),
.prose :deep(h3) {
  margin-top: 2rem;
}

.prose :deep(.dropcap) {
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.2em;            /* em is relative to this element's own font-size */
  aspect-ratio: 1;
  margin: 0.1em 0.5rem 0 0;
  font-family: 'Times New Roman', Times, serif;
  font-size: 2.6em;
  line-height: 1;
  color: var(--color-paper);
  background: var(--color-indigo);
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

.prose :deep(table) {
  width: 100%;
  margin: 1.5rem 0;
  border-collapse: collapse;
  font-size: 0.92rem;
}

.prose :deep(th),
.prose :deep(td) {
  padding: 0.55rem 0.75rem;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid rgba(168, 137, 88, 0.3);
}

.prose :deep(th) {
  color: var(--color-indigo);
  font-family: var(--font-serif);
  font-weight: 700;
  border-bottom: 2px solid var(--color-brass);
}

.prose :deep(tr:last-child td) {
  border-bottom: 2px solid var(--color-brass);
}

@media (max-width: 640px) {
  .prose :deep(table) {
    font-size: 0.82rem;
  }

  .prose :deep(th),
  .prose :deep(td) {
    padding: 0.45rem 0.5rem;
  }
}

.prose :deep(.post-figure) {
  margin: 2rem 0;
  text-align: center;
}

.prose :deep(.post-figure img) {
  width: 100%;
  border: 1px solid rgba(168, 137, 88, 0.3);
}

.prose :deep(.post-figure figcaption) {
  margin-top: 0.6rem;
  color: var(--color-moss);
  font-size: 0.85rem;
  font-style: italic;
}
</style>
