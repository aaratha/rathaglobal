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
    <section class="publications-intro" aria-labelledby="publications-title">
      <p class="eyebrow">Insights &amp; Analysis</p>
      <h1 id="publications-title">Publications</h1>
      <p>
        Briefs, reports, and blog posts on remittances, diaspora finance, sovereign ratings,
        and global development.
      </p>
    </section>

    <section class="featured-section" aria-label="Featured publication">
      <p v-if="posts.length === 0">No posts yet. Check back soon.</p>

      <ul v-else>
        <li v-for="(post, index) in posts" :key="post.slug">
          <RouterLink
            :to="`/blog/${post.slug}`"
            class="card-link"
            :class="{ 'featured-entry': index === 0 }"
          >
            <p class="eyebrow">
              <span v-if="index === 0" class="featured-tag">Featured</span>
              <span v-if="index === 0 && post.date" class="eyebrow-divider">&middot;</span>
              <template v-if="post.date">{{ post.date }}</template>
            </p>
            <h2 class="publication-title">{{ post.title }}</h2>
            <p v-if="post.description">{{ post.description }}</p>
            <span class="featured-entry-cta">Read&nbsp;&rarr;</span>
          </RouterLink>
        </li>
      </ul>
    </section>

    <section class="more-section" aria-labelledby="more-title">
      <h2 id="more-title">More Resources</h2>
      <ul class="featured-list">
        <li><a class="featured-link" href="https://documents1.worldbank.org/curated/en/099740408142422676/pdf/IDU184dfd61b1e135142421a20213728b2e8fa86.pdf" target="_blank" rel="noopener">Leveraging Diaspora Finances for Private Capital Mobilization</a></li>
        <li><a class="featured-link" href="https://foreignpolicy.com/2011/05/24/a-bond-for-the-homeland/" target="_blank" rel="noopener">A Bond for the Homeland</a></li>
        <li><a class="featured-link" href="https://dilipratha.com/AppData/Roaming/Microsoft/AppData/Roaming/Microsoft/Word/index_files/DiasporaBonds-JICEP.pdf" target="_blank" rel="noopener">Diaspora bonds: Tapping the diaspora during difficult times.</a></li>
        <li><a class="featured-link" href="https://documents1.worldbank.org/curated/en/202621468156251840/pdf/456450PUB0978010ONLY10Sept030102008.pdf" target="_blank" rel="noopener">Innovative Financing for Development</a></li>
        <li><a class="featured-link" href="https://dilipratha.com/AppData/Roaming/Microsoft/AppData/Roaming/Microsoft/Word/index_files/EP63.pdf" target="_blank" rel="noopener">Shadow Sovereign Ratings</a></li>
        <li><a class="featured-link" href="https://openknowledge.worldbank.org/handle/10986/25308" target="_blank" rel="noopener">Does it cost more to issue a bond under the English law?</a></li>
        <li><a class="featured-link" href="https://dilipratha.com/index_files/Beyond%20Aid.pdf" target="_blank" rel="noopener">Beyond Aid: New Sources and Innovative Mechanisms for Financing Development in Sub-Saharan Africa</a></li>
        <li><a class="featured-link" href="https://www.imf.org/external/pubs/ft/fandd/2001/03/ketkar.htm" target="_blank" rel="noopener">Securitization of Future Flow Receivables: A Useful Tool for Developing Countries</a></li>
        <li><a class="featured-link" href="https://openknowledge.worldbank.org/server/api/core/bitstreams/1645dd9e-ab89-5718-9a63-34d6045fa2df/content" target="_blank" rel="noopener">Migration and Remittances Factbook 2016</a></li>
        <li><a class="featured-link" href="https://documents1.worldbank.org/curated/en/721621468194077795/pdf/616360PUB0REPL0d0EPI009780821382578.pdf" target="_blank" rel="noopener">Leveraging Migration for Africa: Remittances, Skills, and Investments</a></li>
        <li><a class="featured-link" href="https://documents1.worldbank.org/curated/en/461021574155945177/pdf/Leveraging-Economic-Migration-for-Development-A-Briefing-for-the-World-Bank-Board.pdf" target="_blank" rel="noopener">Leveraging Economic Migration for Development</a></li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
@media (min-width: 641px) {
  section {
    padding-left: 10%;
  }
}

#publications-title {
  font-size: 2.6rem;
}

.publications-intro {
  padding-bottom: 1rem;
}

.featured-section {
  padding-top: 0.5rem;
  padding-bottom: 2rem;
}

.more-section {
  padding-top: 0.5rem;
}

#more-title {
  font-size: 1.6rem;
}

.featured-tag {
  color: var(--color-terracotta);
  font-weight: 700;
}

.featured-entry {
  display: block;
  padding: 2rem 1.75rem;
  background: rgba(36, 59, 83, 0.05);
  transition: background 0.3s ease;
}

.featured-entry:hover,
.featured-entry:focus-visible {
  background: rgba(36, 59, 83, 0.12);
}

.featured-entry-cta {
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.featured-entry:hover .featured-entry-cta,
.featured-entry:focus-visible .featured-entry-cta {
  transform: translateX(6px);
}

ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

li {
  margin-bottom: 0;
}

li + li {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(168, 137, 88, 0.35);
}

.publication-title.heading-centered::after {
  width: 3rem;
}

.featured-list {
  border-top: 1px solid rgba(168, 137, 88, 0.35);
}

.featured-list li + li {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}

.featured-link {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.1rem 0 1.1rem 1.25rem;
  border-bottom: 1px solid rgba(168, 137, 88, 0.35);
  color: var(--color-ink);
  text-decoration: none;
  font-family: var(--font-serif);
  font-size: 1.15rem;
  line-height: 1.4;
  transition: color 0.2s ease, padding-left 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.featured-link::after {
  content: '\2192';
  flex-shrink: 0;
  color: var(--color-terracotta);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.featured-link:hover,
.featured-link:focus-visible {
  color: var(--color-terracotta);
  padding-left: 1.75rem;
}

.featured-link:hover::after,
.featured-link:focus-visible::after {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 640px) {
  .featured-link {
    font-size: 1.02rem;
  }
}
</style>
