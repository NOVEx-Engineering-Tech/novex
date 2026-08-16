/**
 * @uuid         CMP-FBK-001
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Library of small inline SVG icon components (Facebook, Instagram, GitHub, Email, Phone, and other common social/contact platforms).
 *
 * @whereToUse
 * Anywhere a platform icon needs to be rendered — profile cards, contact widgets, footers, social link lists.
 *
 * @whenToUse
 * Use whenever a UI needs a lightweight, dependency-free icon for a social or contact platform instead of pulling in an icon library.
 */

export const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

export const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
  </svg>
)

export const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)

export const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m2 6 10 7 10-7"/>
  </svg>
)

export const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.4 0 .7-.2 1z"/>
  </svg>
)

export const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>
  </svg>
)

export const LinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.5 1.5"/>
    <path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.5-1.5"/>
  </svg>
)

export const LinkedinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2.2"/>
    <path d="M10 9h4v2.2c.7-1.4 2.1-2.5 4.2-2.5 3.4 0 4.8 2.1 4.8 5.6V21h-4v-6c0-1.6-.6-2.7-2-2.7-1.1 0-1.8.8-2.1 1.5-.1.3-.1.6-.1 1V21h-4z"/>
  </svg>
)

export const TelegramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.5 3.5 2.6 11.1c-1.2.5-1.2 1.2-.2 1.5l4.8 1.5 1.9 5.6c.2.6.4.8.9.8s.7-.2 1-.5l2.4-2.3 4.9 3.6c.9.5 1.5.3 1.8-.8l3.2-15c.4-1.4-.4-2-1.8-1.5zM8.1 13.5l9.3-5.9c.5-.3.9 0 .6.5l-7.5 6.9-.3 3.3-1.6-3.5z"/>
  </svg>
)

export const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 2h3.2l-7 8 8.2 12h-6.4l-5-6.8-5.7 6.8H2l7.5-8.6L1.6 2H8.2l4.6 6.2zm-1.1 18.2h1.8L7.3 3.7H5.4z"/>
  </svg>
)

export const YoutubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7.5s-.2-1.6-.9-2.3c-.9-.9-1.8-.9-2.3-1C15.5 4 12 4 12 4h0s-3.5 0-6.8.2c-.5.1-1.4.1-2.3 1C2.2 5.9 2 7.5 2 7.5S1.8 9.4 1.8 11.2v1.5c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1C7.2 20 12 20 12 20s3.5 0 6.8-.3c.5-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.5c0-1.9-.2-3.7-.2-3.7zM9.8 14.7V8.9l5.5 2.9z"/>
  </svg>
)

export const TiktokIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 2h-3.3v13.6a3 3 0 1 1-2.3-2.9v-3.3a6.3 6.3 0 1 0 5.6 6.3V8.8a7.7 7.7 0 0 0 4.5 1.4V6.9a4.4 4.4 0 0 1-4.5-4.4z"/>
  </svg>
)

export const DiscordIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 5.3A16 16 0 0 0 15 4.1l-.3.6a13.6 13.6 0 0 1 3.4 1.3 14.6 14.6 0 0 0-12.2 0 13.6 13.6 0 0 1 3.4-1.3L9 4.1a16 16 0 0 0-3.9 1.2C2.9 8.7 2.3 12 2.6 15.3a16.2 16.2 0 0 0 4.9 2.5l.7-1.1a10.4 10.4 0 0 1-1.7-.8l.4-.3a11.6 11.6 0 0 0 10.2 0l.4.3a10.4 10.4 0 0 1-1.7.8l.7 1.1a16.2 16.2 0 0 0 4.9-2.5c.4-3.7-.6-7-2.5-10zM9 13c-.7 0-1.3-.7-1.3-1.5S8.2 10 9 10s1.3.7 1.3 1.5S9.7 13 9 13zm6 0c-.7 0-1.3-.7-1.3-1.5S14.2 10 15 10s1.3.7 1.3 1.5S15.7 13 15 13z"/>
  </svg>
)

export const WhatsappIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1s-.7.8-.9 1c-.1.2-.3.2-.6.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5S9.5 10 9.3 9.3s-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-1 1-1 2.3s1 2.7 1.1 2.9c.1.2 2 3 4.7 4.2.7.3 1.2.4 1.6.5.7.2 1.3.2 1.7.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.2-.3-.2-.5-.3z"/>
  </svg>
)

export const MessengerIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.5 2 2 6.2 2 11.4c0 2.9 1.4 5.5 3.6 7.2V22l3.3-1.8c.9.2 1.9.4 3.1.4 5.5 0 10-4.2 10-9.4S17.5 2 12 2zm1 12.6-2.6-2.7-5 2.7 5.5-5.8 2.6 2.7 5-2.7z"/>
  </svg>
)

export const ViberIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c-4.4 0-8 2.9-8 7.4 0 2.7 1.5 5 3.8 6.5-.1.9-.5 2.3-1.5 3.6 1.7-.2 3.2-1 4.3-1.9.4.1.9.1 1.4.1 4.4 0 8-2.9 8-7.4S16.4 2 12 2zm-.1 2.4c3.2.1 5.5 2.4 5.7 5.5 0 .3-.2.5-.5.5s-.5-.2-.5-.5c-.2-2.6-2.1-4.5-4.7-4.6-.3 0-.5-.2-.5-.5s.2-.5.5-.4zm.1 1.7c2.3.2 3.7 1.6 3.9 3.9 0 .3-.2.5-.4.5-.3 0-.5-.2-.5-.4-.2-1.8-1.2-2.8-3-3-.3 0-.5-.2-.4-.5 0-.2.2-.5.4-.5zM9.3 9.9c.2 0 .8.3 1.6 1.1l.4.4c.2.2.2.5 0 .8l-.4.5c-.1.2-.1.4 0 .6.3.6 1.6 1.9 2.2 2.2.2.1.4.1.6 0l.5-.4c.2-.2.6-.2.8 0l1.6 1.6c.2.2.3.6 0 .9-.4.5-1.1 1-1.9 1-1.7 0-4.2-1.5-5.9-3.1C7 13.9 5.6 11.5 5.6 9.8c0-.8.5-1.5 1-1.9.3-.2.6-.2.8 0l1.5 1.6c.1.1.2.3.2.4h.2z"/>
  </svg>
)
