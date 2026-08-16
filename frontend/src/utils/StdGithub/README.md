# Std Github

## Information

Author:     NOVEx Engineering Tech
Time:       2026/08/16
Unique ID:  UTL-STR-001
Scope:      StdGithub

## Description

Pure helpers for turning a GitHub profile URL into a username and a public avatar image URL.

## When to Use

Use whenever you have a github.com profile URL and need the handle and/or a ready-to-use avatar image src.

## How to Use

import { getGithubUsername, getGithubAvatar } from "@/utils/StdGithub";

getGithubUsername("https://github.com/IzanamiiDevv"); // => "IzanamiiDevv"
getGithubAvatar("https://github.com/IzanamiiDevv", 128);

## Exported APIs

### getGithubUsername

UUID:       UTL-STR-001:getGithubUsername
DependsOn:  none

### getGithubAvatar

UUID:       UTL-STR-001:getGithubAvatar
DependsOn:  UTL-STR-001:getGithubUsername

## Notes

- No network calls or auth needed — avatars are fetched via GitHub's public `github.com/<user>.png` endpoint.
