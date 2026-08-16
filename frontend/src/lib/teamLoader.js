// Loads all team member configs from /configs/teams/*.json
// Uses Vite's import.meta.glob for static analysis at build time.

const modules = import.meta.glob('/configs/teams/*.json', { eager: true })

/**
 * Returns an array of ALL team member items sorted by filename.
 * Each item is the parsed JSON from configs/teams/<n>.json
 */
export function loadTeamMembers() {
  return Object.keys(modules)
    .sort()
    .map(key => modules[key].default ?? modules[key])
}
