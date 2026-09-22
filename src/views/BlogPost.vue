<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { marked } from 'marked'

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
    return
  }

  const raw = await allPosts[key]()
  const { data, content } = parseFrontmatter(raw)
  const d = data.date ? new Date(`${data.date}T00:00:00`) : null
  const date = d
    ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''
  const html = await marked.parse(content)

  post.value = {
    title: String(data.title ?? slug),
    date,
    description: String(data.description ?? ''),
    html,
    pdf: String(data.pdf ?? ''),
  }
  loading.value = false
}

const printPost = () => {
  window.print()
}

watch(
  () => route.params.slug,
  (slug) => loadPost(slug as string),
  { immediate: true },
)
</script>

<template>
  <main class="page-content">
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
            <p v-if="post.description">{{ post.description }}</p>
          </header>

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
