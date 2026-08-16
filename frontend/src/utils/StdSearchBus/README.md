# Std Search Bus

## Information

Author:     NOVEx Engineering Tech
Time:       2026/08/16
Unique ID:  UTL-EVT-001
Scope:      StdSearchBus

## Description

Minimal window-CustomEvent pub/sub bus letting two components without a shared parent communicate without a state library.

## When to Use

Use when a single fire-and-forget UI signal needs to cross the component tree and a state library would be overkill.

## How to Use

import { requestProjectSearch, onProjectSearchRequest } from "@/utils/StdSearchBus";

// publisher
requestProjectSearch();

// subscriber
useEffect(() => onProjectSearchRequest(() => setOpen(true)), []);

## Exported APIs

### requestProjectSearch

UUID:       UTL-EVT-001:requestProjectSearch
DependsOn:  none

### onProjectSearchRequest

UUID:       UTL-EVT-001:onProjectSearchRequest
DependsOn:  none

## Notes

- The event name/function names are currently specific to the 'open project search' use case; rename them if reusing this pattern for a different signal in another project.
