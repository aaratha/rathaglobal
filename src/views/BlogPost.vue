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
  const d = data.date ? new Date(data.date) : null
  const date = d
    ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''
  const html = await marked.parse(content)

  post.value = {
    title: String(data.title ?? slug),
    date,
    description: String(data.description ?? ''),
    html,
  }
  loading.value = false
}

watch(
  () => route.params.slug,
  (slug) => loadPost(slug as string),
  { immediate: true },
)
</script>

<template>
  <main class="page-content">
    <div class="post-nav">
      <RouterLink to="/blog" class="back-link">
        <span aria-hidden="true">&larr;</span>&nbsp;All publications
      </RouterLink>
    </div>

    <div v-if="loading" class="card card-wide post-loading" aria-live="polite">
      Loading&hellip;
    </div>

    <div v-else-if="notFound" class="card card-wide post-not-found">
      <h2>Post not found</h2>
      <p>This post may have been moved or removed.</p>
      <RouterLink to="/blog" class="back-link">Back to publications</RouterLink>
    </div>

    <template v-else-if="post">
      <article class="card card-wide post-article">
        <header class="post-header">
          <p v-if="post.date" class="eyebrow">{{ post.date }}</p>
          <h1 class="post-title">{{ post.title }}</h1>
          <p v-if="post.description" class="post-description">{{ post.description }}</p>
        </header>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="post-body" v-html="post.html" />
      </article>
    </template>
  </main>
</template>

<style scoped>
.post-nav {
  padding: 1rem 0 1.25rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.97rem;
  font-weight: 700;
  color: #8a6a2f;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.back-link:hover {
  color: #11212d;
  transform: translateX(-2px);
}

.post-header {
  padding: 0 0 1.5rem;
  width: 100%;
}

.post-title {
  margin: 0.5rem 0 0;
  font-size: clamp(1.8rem, 3.6vw, 2.8rem);
  line-height: 1.05;
  font-family: 'Asul', sans-serif;
  color: #11212d;
}

.post-description {
  margin: 1rem 0 0;
  font-size: 1.12rem;
  line-height: 1.7;
  color: #4a4a4a;
  max-width: 680px;
}

.post-article {
  padding: 2rem 2.25rem;
}

.post-loading,
.post-not-found {
  color: #4a4a4a;
  font-size: 1.08rem;
}

@media (max-width: 640px) {
  .post-article {
    padding: 1.25rem;
  }
}
</style>
