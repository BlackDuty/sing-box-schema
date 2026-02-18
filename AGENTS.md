# AGENTS.md
Guide for coding agents working in `sing-box-schema`.

## Project snapshot
- TypeScript library that models every section of `sing-box` configuration (inbounds, outbounds, routing, DNS, experimentals) as comprehensive Zod schemas.
- Runtime/PM: Bun (`bun@1.2.20`); language: TypeScript; validation lib: Zod v4.
- Build tool: `tsdown` (produces minified CJS/ESM bundles, TypeScript declarations, and source maps); formatter/linter: Biome.
- Purpose: maintain the Zod schemas and their generated JSON Schemas for sing-box configs.

## Key files
- `package.json`
- `biome.jsonc`
- `tsconfig.json`
- `tsdown.config.ts`
- `src/index.ts`
- `scripts/gen-json-schema.ts`

## Project structure
- `src/schema/`: domain-specific schema groups
  - `protocols/`: Shadowsocks, Trojan, VMess, and other protocol schemas
  - `services/`: helpers such as `derp`, `resolved`, etc.
  - `experimentals/`: experimental configuration pieces
  - `rules/`: routing and DNS rule schemas
  - `groups/`: selectors, URL tests, and related helpers
  - `shared.ts`: reusable fragments shared across schema modules
- `src/utils.ts`: helper utilities such as `listable`
- `src/index.ts`: public export barrel for all schemas
- `scripts/`: scripts driven by Bun; `gen-json-schema.ts` emits `schema.json` and `schema.zh.json` from the Zod definitions

## Commands
Run all commands from the repository root.

### Install deps
```bash
bun install
```

### Build
```bash
bun run build
```
`build` is:
```bash
tsdown && bun run generate
```
Build artifacts:
- `dist/`
- `schema.json`
- `schema.zh.json`

### Dev watch mode
```bash
bun run dev
```

### Typecheck
```bash
bun run typecheck
```

### Lint + format
```bash
bun run lint
```
Notes:
- Uses `biome check --write`
- Can rewrite files

### Generate schema files only
```bash
bun run generate
```

## Tests (important)
Current repo state:
- No `test` script in `package.json`
- No CI test job in `.github/workflows/publish.yaml`
- No discovered `*.test.*`/`*.spec.*` files

### Run a single test
Not currently available (no configured test runner).
If tests are added, define explicit test scripts and update this section with the exact single-test command.

## CI/release behavior
Release workflow (`.github/workflows/publish.yaml`) runs:
1. `bun install`
2. `bun run scripts/check-version.ts ${{ github.ref_name }}`
3. `bun run build`
4. `bun publish -p --access public`
If you change schema/build/exports, verify `bun run build` locally.

## Code style guidelines
Follow existing local patterns; do not introduce a new style system.

### Formatting
- Source of truth: `biome.jsonc`
- Indent with spaces
- Use double quotes
- Keep semicolons
- Use trailing commas in multiline literals/calls

### Imports
- Prefer external imports before internal imports
- Internal imports may be alias (`@/...`) or relative; match surrounding file style
- Alias config from `tsconfig.json`:
  - `@ -> ./src`
  - `@/* -> ./src/*`

### Naming
- File names: mostly kebab-case (`route-rule.ts`, `ssm-api.ts`)
- Schema constants: PascalCase (`Configuration`, `HTTPInboundOptions`)
- Inferred TS types: same PascalCase name as schema constant

### Schema/type pattern
Use the established pattern:
```ts
export const Example = z.object({ ... });
export type Example = z.infer<typeof Example>;
```

### Composition and reuse
- Reuse shapes with `...OtherSchema.shape` when possible
- Extend shared blocks instead of duplicating field groups

### Metadata conventions
This repo heavily uses `.meta(...)` on schemas and fields.
- Keep bilingual metadata when present:
  - `title`, `title_zh`
  - `description`, `description_zh`
- Preserve top-level `id` and version/context metadata patterns
- Keep metadata style consistent with nearby modules

### Optional/deprecated fields
- Use `.optional()` for non-required config fields
- Mark deprecated fields with metadata (`deprecated: true`) when needed

### Types
- Always run `bun run typecheck` after edits
- Prefer inferred types from Zod schema definitions
- Biome allows explicit `any`, but prefer concrete types unless existing code pattern justifies otherwise

### Error handling
- Library usage follows Zod parse semantics (`Configuration.parse(...)`)
- Script failures should be explicit (`console.error`, non-zero exit)

### Comments and docs
- Preserve useful JSDoc and inline comments
- Keep added comments concise and factual
- Match local bilingual doc style when touching schema metadata

## Agent-related local instructions found
Migrated to open-standard skill docs:
- `.agents/skills/sync-sing-box-schema/SKILL.md`

Main guidelines:
- Use a document-first workflow, avoid assumptions, confirm ambiguities, and preserve existing code style/comments.
- Keep code artifacts in fluent English; use concise user-facing language as context requires.

## Recommended execution checklist for agents
1. Read the target module and nearby related schema files
2. Make minimal edits consistent with neighboring patterns
3. Run `bun run typecheck`
4. Run `bun run lint`
5. Run `bun run build` if schema/public exports changed
6. Ensure `src/index.ts` exports remain aligned with module changes
