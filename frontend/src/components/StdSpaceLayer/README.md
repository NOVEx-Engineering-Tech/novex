# Std Space Layer

## Information

Author:     NOVEx Engineering Tech
Time:       2026/08/16
Unique ID:  CMP-LAY-001
Scope:      StdSpaceLayer

## Description

Fixed, full-viewport ambient backdrop: a looping background video, a twinkling parallax star canvas, and occasional shooting stars.

## When to Use

Mount once, near the root of the app, behind all page content — it renders as a fixed-position layer.

## How to Use

import SpaceLayer from "@/components/StdSpaceLayer";

<SpaceLayer videoSrc="/assets/my-bg.webm" />

## Exported APIs

### default export (SpaceLayer)

UUID:       CMP-LAY-001
DependsOn:  none

## Notes

- Respects `prefers-reduced-motion` for the star canvas.
- `videoSrc` defaults to `/assets/novex-bg.webm`; pass your own asset path to reuse this in another project.
