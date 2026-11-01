// Lightweight browser-safe frontmatter parser (no Node.js Buffer needed)
export function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
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
