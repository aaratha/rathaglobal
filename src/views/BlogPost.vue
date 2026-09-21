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
    <p>
      <RouterLink to="/blog">&larr; All publications</RouterLink>
    </p>

    <p v-if="loading" aria-live="polite">Loading&hellip;</p>

    <div v-else-if="notFound">
      <h2>Post not found</h2>
      <p>This post may have been moved or removed.</p>
      <RouterLink to="/blog">Back to publications</RouterLink>
    </div>

    <template v-else-if="post">
      <article>
        <p>
          <a
            v-if="post.pdf"
            :href="post.pdf"
            target="_blank"
            rel="noopener"
            aria-label="Open the print-ready PDF of this publication"
          >Print</a>
          <button
            v-else
            type="button"
            aria-label="Print this publication"
            @click="printPost"
          >Print</button>
          <a href="mailto:dratha@rathaglobal.com">Contact the editor</a>
        </p>
        <header>
          <p v-if="post.date">{{ post.date }}</p>
          <h1>{{ post.title }}</h1>
          <p v-if="post.description">{{ post.description }}</p>
        </header>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="post.html" />
      </article>
    </template>
  </main>
</template>
