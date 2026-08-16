// Loads all work configs from /configs/work/*.json
// Uses Vite's import.meta.glob for static analysis at build time.

const modules = import.meta.glob('/configs/work/*.json', { eager: true })

/**
 * Returns an array of ALL work items sorted by filename.
 * Each item is the parsed JSON from configs/work/<name>.json
 */
export function loadWorkItems() {
  return Object.keys(modules)
    .sort()
    .map(key => modules[key].default ?? modules[key])
}

/**
 * Returns a random subset of `count` items from `items` (Fisher–Yates
 * partial shuffle). If items.length <= count, returns them all (in
 * their original order, no need to shuffle a subset that isn't one).
 */
export function pickRandom(items, count) {
  if (items.length <= count) return items
  const pool = items.slice()
  for (let i = pool.length - 1; i > pool.length - 1 - count; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(pool.length - count)
}

/**
 * Convenience: the set of work items to show in the homepage carousel.
 * Once the work/ folder grows past `max`, a random `max`-sized subset
 * is chosen instead of showing everything.
 */
export function loadCarouselItems(max = 10) {
  return pickRandom(loadWorkItems(), max)
}

/**
 * Filters `items` by a free-text query, case-insensitive, matched
 * against the project name, its type (Website / Software / ...),
 * and each of its languages. A blank/whitespace query returns every
 * item unchanged. Matching is "includes", not exact — "novex" finds
 * a project titled "NoVex", "java" finds "JavaScript", etc.
 */
export function searchWorkItems(items, query) {
  const q = (query ?? '').trim().toLowerCase()
  if (!q) return items

  return items.filter(p => {
    if (p.title?.toLowerCase().includes(q)) return true
    if (p.type?.toLowerCase().includes(q)) return true
    if (p.language?.some(l => l.toLowerCase().includes(q))) return true
    return false
  })
}
