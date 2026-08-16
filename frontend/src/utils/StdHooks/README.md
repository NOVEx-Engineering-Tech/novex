# Std Hooks

## Information

Author:     NOVEx Engineering Tech
Time:       2026/08/16
Unique ID:  UTL-HOOK-001
Scope:      StdHooks

## Description

Collection of small, reusable React hooks: typewriter effect, eased count-up, fade-up-on-scroll, a scroll-activity hint sensor, active-section tracking, and an interactive particle canvas.

## When to Use

Use whenever a component needs one of these presentation behaviors instead of re-implementing it.

## How to Use

import { useTypewriter, useCountUp, useFadeUp } from "@/utils/StdHooks";

const text = useTypewriter(["hello", "world"]);
const value = useCountUp(100);
const ref = useFadeUp();

## Exported APIs

### useTypewriter

UUID:       UTL-HOOK-001:useTypewriter
DependsOn:  none

### useCountUp

UUID:       UTL-HOOK-001:useCountUp
DependsOn:  none

### useFadeUp

UUID:       UTL-HOOK-001:useFadeUp
DependsOn:  none

### useScrollSearchHint

UUID:       UTL-HOOK-001:useScrollSearchHint
DependsOn:  none

### useActiveSection

UUID:       UTL-HOOK-001:useActiveSection
DependsOn:  none

### useParticleCanvas

UUID:       UTL-HOOK-001:useParticleCanvas
DependsOn:  none

## Notes

- All hooks are framework-agnostic aside from React itself — no external dependencies.
- `useParticleCanvas` and `useFadeUp` interact directly with the DOM/Canvas API and are client-only.
