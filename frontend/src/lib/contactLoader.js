// Loads configs/contact.json — the single source of truth for how
// people can reach the company.
//
// A key only shows up on the site once it has a non-empty value. That
// means new channels (Telegram, LinkedIn, etc.) can sit in the config
// as "" ahead of time and stay hidden until someone fills them in —
// no code changes needed either way.

import contactConfig from '/configs/contact.json'
import { getPlatform } from '../utils/StdSocialPlatforms'

/**
 * Returns an array of active contact channels, each with:
 *   { key, label, Icon, value, display, href, external }
 * `value` is the raw config entry; `display` is the short, on-screen
 * form (namespace/handle only for URL-based platforms). Only keys with
 * a non-empty string value are included.
 */
export function loadContactChannels() {
  return Object.entries(contactConfig)
    .filter(([, value]) => typeof value === 'string' && value.trim() !== '')
    .map(([key, value]) => {
      const platform = getPlatform(key)
      return {
        key,
        label: platform.label,
        Icon: platform.Icon,
        value,
        display: platform.display(value),
        href: platform.href(value),
        external: platform.external,
      }
    })
}
