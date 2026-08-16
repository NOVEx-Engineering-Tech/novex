# NOVEx Portfolio — Pavillion Architecture

This project was restructured from a flat Vite/React layout into the
**Pavillion Architecture** (per
[NOVEx-Engineering-Tech/Pavillion_Template](https://github.com/NOVEx-Engineering-Tech/Pavillion_Template)):
`app / lib / utils / components / module`, with reusable pieces packaged as
Pavillion modules (manifest + headers + README) under `frontend/src/module/`.

## Application

- VSCode
- Docker Desktop
- NodeJS
- Git
- Github
- GitKraken

## What changed vs. the template

This site is a fully static portfolio (no server/API needs), so it stays on
**Vite + React Router** rather than being rewritten onto the template's
Next.js frontend — only the *folder architecture and module conventions*
were adopted, not the framework. See
`docs/dev/references/project_tree.md` for the resulting tree and
`docs/dev/references/modulelization.md` for the full module-authoring spec
(carried over from the template as-is).

## Getting started

```bash
cd frontend
npm install
npm run dev
```

## Modules added

The following reusable pieces were extracted into Pavillion modules
(manifest at `frontend/src/module/<name>/pavillion.module.json`, source
under `frontend/src/components/<name>/` or `frontend/src/utils/<name>/`).
Everything else (routes/pages, `Navbar`, `Footer`, `ContactModal`,
`constants.js`, and the `configs/*.json` data loaders) stays as an internal,
project-specific feature since it's tied to this portfolio's content/branding.

| Module | Artifact | Scope | What it is |
|---|---|---|---|
| Std Space Layer | `CMP-LAY-001` | components | Ambient starfield/video backdrop layer |
| Std Section Header | `CMP-LAY-002` | components | Label + title + accent section heading |
| Std Social Icons | `CMP-FBK-001` | components | Inline SVG icon set for social/contact platforms |
| Std Person Card | `CMP-CRD-001` | components | Profile card (avatar, role, tags, socials) |
| Std Terminal Contact | `CMP-FRM-001` | components | Terminal-styled animated contact channel list |
| Std Project Search | `CMP-INP-001` | components | Controlled search modal (input + submit/cancel) |
| Std Hooks | `UTL-HOOK-001` | utils | Typewriter, count-up, fade-up, scroll-hint, active-section, particle-canvas hooks |
| Std Search Bus | `UTL-EVT-001` | utils | Tiny window-CustomEvent pub/sub bus |
| Std Github | `UTL-STR-001` | utils | GitHub profile URL → username/avatar helpers |
| Std Social Platforms | `UTL-SOC-001` | utils | Platform-key → {icon, label, href, display} registry |

Each module's `README.md` documents its dependencies, API, and any coupling
notes (e.g. `Std Terminal Contact` reads contact data via this project's
internal `src/lib/contactLoader.js` — a consuming project should supply an
equivalent loader or adapt the component to take `channels` as a prop).
