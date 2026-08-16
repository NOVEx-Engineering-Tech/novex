# Std Social Icons

## Information

Author:     NOVEx Engineering Tech
Time:       2026/08/16
Unique ID:  CMP-FBK-001
Scope:      StdSocialIcons

## Description

Library of small, dependency-free inline SVG icon components for common social/contact platforms.

## When to Use

Use whenever a UI needs a platform icon (Facebook, Instagram, GitHub, LinkedIn, Email, Phone, etc.) without pulling in an icon library.

## How to Use

import { GithubIcon, EmailIcon } from "@/components/StdSocialIcons";

<GithubIcon />

## Exported APIs

### FacebookIcon, InstagramIcon, GithubIcon, LinkedinIcon, TelegramIcon, TwitterIcon, YoutubeIcon, TiktokIcon, DiscordIcon, WhatsappIcon, MessengerIcon, ViberIcon, EmailIcon, PhoneIcon, GlobeIcon, LinkIcon

UUID:       CMP-FBK-001
DependsOn:  none

## Notes

- Each icon is a zero-prop functional component rendering a 14x14 currentColor SVG; style via CSS `color`/`font-size` on a wrapping element.
