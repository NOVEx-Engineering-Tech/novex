/**
 * @uuid         UTL-SOC-001
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    Std Social Icons
 *
 * @description
 * Registry mapping a contact/social platform key (e.g. 'facebook', 'email') to its icon, label, href-builder, and display-value formatter, with a safe fallback for unregistered keys.
 *
 * @whereToUse
 * Any data-driven contact/social list (e.g. a config-driven contact loader or footer).
 *
 * @whenToUse
 * Use whenever raw platform keys/values (such as from a JSON config) need to become renderable {label, Icon, href, display} entries.
 */

// ── SOCIAL / CONTACT PLATFORM REGISTRY ──
//
// Single source of truth mapping a configs/contact.json key to how it's
// displayed: which icon to use, what label to show, how to turn the raw
// value into a clickable href, and how to render it on screen (`display`).
//
// `href` always gets the full, real destination (so links work). `display`
// is what the person actually sees — for URL-based platforms that's just
// the namespace/handle (e.g. "novextech"), not the full
// "https://facebook.com/novextech", so it stays short and doesn't overflow
// on small screens. Email/phone show as-is since there's no domain to trim.
//
// To support a brand-new platform: add an entry here with a `key` matching
// the JSON property name, then just add that property to
// configs/contact.json. Everything else (the terminal list, the "choose a
// platform" popup) picks it up automatically.
//
// Any key present in contact.json that ISN'T registered here still shows
// up — it just falls back to a generic link icon, a title-cased label, and
// the raw value as-is, so nothing ever needs manual wiring on the display
// side.

import {
  EmailIcon, PhoneIcon, GlobeIcon, LinkIcon,
  FacebookIcon, InstagramIcon, GithubIcon, LinkedinIcon, TelegramIcon,
  TwitterIcon, YoutubeIcon, TiktokIcon, DiscordIcon, WhatsappIcon,
  MessengerIcon, ViberIcon,
} from '../../components/StdSocialIcons'

const digitsAndPlus = v => v.replace(/[^+\d]/g, '')
const identity = v => v

// Strips the protocol + domain off a URL and returns just the
// namespace/handle — "https://facebook.com/novextech" -> "novextech",
// "https://facebook.com/novextech/" -> "novextech". Falls back to the
// hostname if there's no path (e.g. a bare domain), and to the raw
// value if it isn't a parseable URL at all.
function namespaceOf(value) {
  try {
    const url = new URL(value)
    const path = url.pathname.replace(/^\/+|\/+$/g, '')
    return path || url.hostname
  } catch {
    return value
  }
}

export const SOCIAL_PLATFORMS = {
  email:     { label: 'Email',     Icon: EmailIcon,     href: v => `mailto:${v}`,            display: identity,    external: false },
  phone:     { label: 'Phone',     Icon: PhoneIcon,     href: v => `tel:${digitsAndPlus(v)}`, display: identity,    external: false },
  website:   { label: 'Website',   Icon: GlobeIcon,     href: v => v,                         display: namespaceOf, external: true  },
  facebook:  { label: 'Facebook',  Icon: FacebookIcon,  href: v => v,                         display: namespaceOf, external: true  },
  instagram: { label: 'Instagram', Icon: InstagramIcon, href: v => v,                         display: namespaceOf, external: true  },
  github:    { label: 'GitHub',    Icon: GithubIcon,    href: v => v,                         display: namespaceOf, external: true  },
  linkedin:  { label: 'LinkedIn',  Icon: LinkedinIcon,  href: v => v,                         display: namespaceOf, external: true  },
  telegram:  { label: 'Telegram',  Icon: TelegramIcon,  href: v => v,                         display: namespaceOf, external: true  },
  twitter:   { label: 'X (Twitter)', Icon: TwitterIcon, href: v => v,                         display: namespaceOf, external: true  },
  x:         { label: 'X (Twitter)', Icon: TwitterIcon, href: v => v,                         display: namespaceOf, external: true  },
  youtube:   { label: 'YouTube',   Icon: YoutubeIcon,   href: v => v,                         display: namespaceOf, external: true  },
  tiktok:    { label: 'TikTok',    Icon: TiktokIcon,    href: v => v,                         display: namespaceOf, external: true  },
  discord:   { label: 'Discord',   Icon: DiscordIcon,   href: v => v,                         display: namespaceOf, external: true  },
  whatsapp:  { label: 'WhatsApp',  Icon: WhatsappIcon,  href: v => v,                         display: namespaceOf, external: true  },
  messenger: { label: 'Messenger', Icon: MessengerIcon, href: v => v,                         display: namespaceOf, external: true  },
  viber:     { label: 'Viber',     Icon: ViberIcon,     href: v => v,                         display: namespaceOf, external: true  },
}

function titleCase(key) {
  return key.charAt(0).toUpperCase() + key.slice(1)
}

// Returns the registry entry for `key`, or a generic fallback (link icon,
// title-cased label, raw value shown as-is, treated as an external URL)
// for unregistered keys — so any property added to contact.json renders,
// even before an entry exists for it above.
/**
 * @uuid         UTL-SOC-001:getPlatform
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Looks up the display entry for a platform key, falling back to a generic link entry for unregistered keys.
 */
/**
 * @uniqueid UTL-SOC-001:getPlatform
 *
 * @param key - Platform key, e.g. matching a contact.json property name.
 * @returns { label, Icon, href, display, external } for the platform.
 */
export function getPlatform(key) {
  return SOCIAL_PLATFORMS[key] || { label: titleCase(key), Icon: LinkIcon, href: v => v, display: identity, external: true }
}
