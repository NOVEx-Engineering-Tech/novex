# Std Person Card

## Information

Author:     NOVEx Engineering Tech
Time:       2026/08/16
Unique ID:  CMP-CRD-001
Scope:      StdPersonCard

## Description

Profile card for a person: GitHub-derived avatar (with initials fallback), name, role, expertise tags, and social links.

## When to Use

Use on team/about/contributor listing pages to render a person from a plain data object.

## How to Use

import PersonCard from "@/components/StdPersonCard";

<PersonCard person={{ name: "Ada Lovelace", githubLink: "https://github.com/example" }} variant="founder" />

## Exported APIs

### default export (PersonCard)

UUID:       CMP-CRD-001
DependsOn:  UTL-STR-001:getGithubUsername, UTL-STR-001:getGithubAvatar   # Std Github
CMP-FBK-001   # Std Social Icons

## Notes

- Card becomes clickable (opens the GitHub profile) automatically when `person.githubLink` is set.
- Falls back to name initials if the GitHub avatar fails to load.
