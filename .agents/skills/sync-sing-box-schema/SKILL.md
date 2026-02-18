---
name: sync-sing-box-schema
description: Use when schema updates must reflect the current HEAD in ~/Projects/Personal/sing-box as the authoritative source of truth.
---

# Sync sing-box Schema

## Overview
Align local Zod definitions with the live checkout at `~/Projects/Personal/sing-box`, treating that repository's HEAD as the upstream source of truth instead of any fixed tag.

## When to Use
- Copying or modifying schema fragments because of upstream protocol or metadata changes observed at HEAD.
- Reconciling bilingual descriptions (`title`, `title_zh`, `description`, `description_zh`) with the current docs or option structs in the upstream repo.
- Investigating drift between `src/schema/**` and the latest config structs or docs in the checked-out sing-box repository.

## Workflow
1. **Start from the checked-out sing-box repository**
   - Ensure `~/Projects/Personal/sing-box` is up to date and on the desired branch; use `git fetch`/`git pull` as needed and verify HEAD is clean.
   - Always read files directly from that checkout (HEAD), never from older tags or other clones.

2. **Trace the relevant upstream sources at HEAD**
   - Follow option structs under `option/*.go`, template docs in `docs/configuration/**`, and any prose that explains new fields.
   - Identify the matching area in `src/schema/**` and plan changes that reuse existing shared fragments.

3. **Update schemas with bilingual metadata**
   - Mirror naming patterns (`export const X = z.object(...)`, `export type X = z.infer<typeof X>`).
   - Add metadata via `.meta(...)`, preserving both English and Chinese titles/descriptions when upstream provides both.

4. **Verify and document**
   - Run `bun run typecheck`, `bun run lint`, and `bun run build` (when exports change).
   - Confirm `src/index.ts` exports match any new modules or schema symbols.

## Guardrails
- Never rely on a hardcoded tag; treat the local sing-box checkout's HEAD as the single source of truth for the entire workflow.
- Avoid lifting schema logic from stale branches or other forks; keep each change tied to the current upstream context.
- When bilingual docs disagree, document the discrepancy rather than guessing a single-language fix.

## Common Mistakes
- Assuming an older release tag still applies and skipping updates to reflect HEAD.
- Forgetting to refresh `~/Projects/Personal/sing-box` before copying field metadata.
- Changing schema exports without checking `src/index.ts`, leading to missing public entry points.
