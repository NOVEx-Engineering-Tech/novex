/**
 * @uuid         UTL-STR-001
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Pure helpers for turning a GitHub profile URL into a username and a public avatar image URL, using GitHub's no-auth avatar endpoint.
 *
 * @whereToUse
 * Anywhere a GitHub profile link needs to be resolved into a display username or avatar image.
 *
 * @whenToUse
 * Use whenever you have a github.com profile URL and need the handle and/or a ready-to-use avatar <img> src without calling the GitHub API.
 */

/**
 * @uuid         UTL-STR-001:getGithubUsername
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Extracts the username segment from a GitHub profile URL.
 */
/**
 * @uniqueid UTL-STR-001:getGithubUsername
 *
 * Extracts the username from a GitHub profile URL, e.g.
 * "https://github.com/IzanamiiDevv" -> "IzanamiiDevv"
 *
 * @param githubLink - Full GitHub profile URL, or falsy.
 * @returns The username, or '' if not parseable/absent.
 */
export function getGithubUsername(githubLink) {
  if (!githubLink) return ''
  try {
    const { pathname } = new URL(githubLink)
    return pathname.split('/').filter(Boolean)[0] ?? ''
  } catch {
    return ''
  }
}

/**
 * @uuid         UTL-STR-001:getGithubAvatar
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    UTL-STR-001:getGithubUsername
 *
 * @description
 * Builds a GitHub avatar image URL for a profile link, at the requested pixel size.
 */
/**
 * @uniqueid UTL-STR-001:getGithubAvatar
 *
 * GitHub serves a user's current avatar directly at github.com/<user>.png —
 * no API call or auth needed, so no CORS/rate-limit concerns.
 *
 * @param githubLink - Full GitHub profile URL, or falsy.
 * @param size - Desired avatar pixel size (default 200).
 * @returns Avatar image URL, or '' if the username can't be resolved.
 */
export function getGithubAvatar(githubLink, size = 200) {
  const username = getGithubUsername(githubLink)
  return username ? `https://github.com/${username}.png?size=${size}` : ''
}
