# Std Terminal Contact

## Information

Author:     NOVEx Engineering Tech
Time:       2026/08/16
Unique ID:  CMP-FRM-001
Scope:      StdTerminalContact

## Description

Terminal-styled, typewriter-animated readout listing the active contact channels for a company or project.

## When to Use

Use in a contact section/page for a terminal/CLI-themed presentation of available contact channels.

## How to Use

import TerminalContact from "@/components/StdTerminalContact";

<TerminalContact />

## Exported APIs

### default export (TerminalContact)

UUID:       CMP-FRM-001
DependsOn:  none  # internal: loadContactChannels() from this project's src/lib/contactLoader

## Notes

- Couples to this project's `src/lib/contactLoader.js` (a project-specific data loader, kept internal — not a Pavillion module). To reuse this component in another project, either port a `loadContactChannels(): ContactChannel[]` function with the same shape, or adapt the component to accept `channels` as a prop.
