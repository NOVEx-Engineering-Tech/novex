# Std Project Search

## Information

Author:     NOVEx Engineering Tech
Time:       2026/08/16
Unique ID:  CMP-INP-001
Scope:      StdProjectSearch

## Description

Modal search popup: a focused text input plus submit/cancel actions, returning the query via onSubmit.

## When to Use

Use whenever a lightweight 'search for X' modal is needed, decoupled from any particular data source.

## How to Use

import ProjectSearch from "@/components/StdProjectSearch";

{open && (
  <ProjectSearch initialValue={query} onSubmit={handleSearch} onClose={() => setOpen(false)} />
)}

## Exported APIs

### default export (ProjectSearch)

UUID:       CMP-INP-001
DependsOn:  none

## Notes

- Fully controlled by props; holds no external state and performs no filtering itself — pair it with your own search/filter logic.
