# Std Section Header

## Information

Author:     NOVEx Engineering Tech
Time:       2026/08/16
Unique ID:  CMP-LAY-002
Scope:      StdSectionHeader

## Description

Small presentational heading block: an eyebrow label, a title, and an accent word/phrase.

## When to Use

Use at the top of any content section that needs a consistent label + title + accent heading.

## How to Use

import SectionHeader from "@/components/StdSectionHeader";

<SectionHeader label="// about us" title="Who we" accent="are" />

## Exported APIs

### default export (SectionHeader)

UUID:       CMP-LAY-002
DependsOn:  none

## Notes

- Purely presentational; relies on global `.section-label` / `.section-title` classes from the host app's global stylesheet for typography, plus its own `style.module.css` for layout.
