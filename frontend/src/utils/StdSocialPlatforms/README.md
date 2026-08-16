# Std Social Platforms

## Information

Author:     NOVEx Engineering Tech
Time:       2026/08/16
Unique ID:  UTL-SOC-001
Scope:      StdSocialPlatforms

## Description

Registry mapping a contact/social platform key to its icon, label, href-builder, and display-value formatter, with a generic fallback for unregistered keys.

## When to Use

Use whenever raw platform keys/values (e.g. from a JSON config) need to become renderable {label, Icon, href, display} entries.

## How to Use

import { getPlatform } from "@/utils/StdSocialPlatforms";

const platform = getPlatform("github");
platform.href("https://github.com/example"); // => the same URL
platform.display("https://github.com/example"); // => "example"

## Exported APIs

### getPlatform

UUID:       UTL-SOC-001:getPlatform
DependsOn:  none

### SOCIAL_PLATFORMS

UUID:       UTL-SOC-001
DependsOn:  CMP-FBK-001   # Std Social Icons

## Notes

- To add a new platform, add an entry to the `SOCIAL_PLATFORMS` map with a matching `key`; anything not registered still renders via the generic fallback.
