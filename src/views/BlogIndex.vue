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
    <section class="hero" aria-labelledby="publications-title">
      <p class="eyebrow">Insights &amp; Analysis</p>
      <h1 id="publications-title">Publications</h1>
      <p class="hero-copy">
        Briefs, reports, and blog posts on remittances, diaspora finance, sovereign ratings,
        and global development from Ratha Global.
      </p>
    </section>

    <section class="content-grid" aria-label="Publications">
      <p v-if="posts.length === 0" class="card card-wide no-posts">
        No posts yet. Check back soon.
      </p>

      <article v-for="post in posts" :key="post.slug" class="post-card card">
        <p v-if="post.date" class="post-card-date eyebrow-small">{{ post.date }}</p>
        <h2 class="post-card-title">{{ post.title }}</h2>
        <p v-if="post.description" class="post-card-desc">{{ post.description }}</p>
        <RouterLink :to="`/blog/${post.slug}`" class="post-card-link">
          Read&nbsp;<span aria-hidden="true">&rarr;</span>
        </RouterLink>
      </article>
    </section>
  </main>
</template>

<style scoped>
.post-card {
  grid-column: span 6;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.post-card-date {
  margin: 0;
  font-size: 0.88rem;
  letter-spacing: 0.12em;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #184e74;
  font-weight: 700;
  text-transform: uppercase;
}

.post-card-title {
  margin: 0;
  width: 100%;
  font-size: 1.52rem;
  font-family: Garamond, Baskerville, 'Times New Roman', serif;
  font-weight: 500;
  color: #11212d;
  line-height: 1.2;
}

.post-card-desc {
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.7;
  color: #4a4a4a;
  flex: 1;
}

.post-card-link {
  display: inline-flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.97rem;
  font-weight: 700;
  color: #8a6a2f;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.post-card-link:hover {
  color: #11212d;
  transform: translateX(2px);
}

.no-posts {
  color: #4a4a4a;
  font-size: 1.08rem;
}

@media (max-width: 700px) {
  .post-card {
    grid-column: span 12;
  }
}
</style>
