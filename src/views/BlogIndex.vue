<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

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

const rawPosts = import.meta.glob('../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

interface Post {
  slug: string
  title: string
  date: string
  rawDate: number
  description: string
}

const posts = computed<Post[]>(() =>
  Object.entries(rawPosts)
    .map(([path, raw]) => {
      const slug = path.replace('../content/posts/', '').replace('.md', '')
      const { data } = parseFrontmatter(raw)
      const d = data.date ? new Date(`${data.date}T00:00:00`) : null
      return {
        slug,
        title: String(data.title ?? slug),
        rawDate: d?.getTime() ?? 0,
        date: d
          ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
          : '',
        description: String(data.description ?? ''),
      }
    })
    .sort((a, b) => b.rawDate - a.rawDate),
)
</script>

<template>
  <main class="page-content">
    <section aria-labelledby="publications-title">
      <p>Insights &amp; Analysis</p>
      <h1 id="publications-title">Publications</h1>
      <p>
        Briefs, reports, and blog posts on remittances, diaspora finance, sovereign ratings,
        and global development from Ratha Global.
      </p>
    </section>

    <section aria-label="Publications">
      <p v-if="posts.length === 0">No posts yet. Check back soon.</p>

      <ul v-else>
        <li v-for="post in posts" :key="post.slug">
          <RouterLink :to="`/blog/${post.slug}`">
            <p v-if="post.date">{{ post.date }}</p>
            <h2>{{ post.title }}</h2>
            <p v-if="post.description">{{ post.description }}</p>
            <span>Read&nbsp;&rarr;</span>
          </RouterLink>
        </li>
      </ul>
    </section>
  </main>
</template>
