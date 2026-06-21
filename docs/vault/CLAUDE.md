# LLM Wiki — Schema and Conventions

## Schema

`schema_version: 3`

This file is the authoritative schema for any wiki operation. Skills and agents override their own defaults when those defaults conflict with the rules below.

> [!note] Git requirement
> Every vault is its own git repo; `init` git-inits it; structural writes commit. This is the foundation for reversible self-heal, checkpoints, and durable-memory write-backs.

## Purpose

This is a personal research vault following Karpathy's LLM Wiki pattern.
The LLM maintains the wiki. The human curates sources and asks questions.
Domain-agnostic — works for any research topic.

## Data layer layout

The vault is the Data layer of a four-layer stack (Data / Skills / Agents / Orchestration — see `docs/architecture.md` for the full picture). The Data layer itself has two directories:

- `raw/` is immutable source material. Never modify files here.
- `wiki/` is LLM-maintained. All knowledge pages live here.

`CLAUDE.md` (this file) is the schema read at the start of every operation. The LLM reads from `raw/`, writes to `wiki/`, and follows `CLAUDE.md`. An optional `output/` directory is git-ignored scratch space for deliverables (plain markdown, no schema, not validated).

## Directory structure

```
vault/
├── raw/                         # immutable source material
│   └── assets/                  # images, PDFs, attachments
├── wiki/
│   ├── index.md                 # master catalog of all pages
│   ├── log.md                   # chronological operations record
│   ├── _sources/                # one summary per ingested source
│   ├── _synthesis/              # cross-topic analysis
│   ├── <topic-a>/               # first-level topic cluster
│   │   ├── <topic-a>.md         # folder note — index for this branch
│   │   ├── <entity-or-concept>.md
│   │   └── <subtopic>/          # nested subtopic
│   │       ├── <subtopic>.md    # folder note
│   │       └── <entity-or-concept>.md
│   └── <topic-b>/
│       ├── <topic-b>.md         # folder note
│       └── ...
├── _proposed/                   # optional staging for drafts awaiting review (schema v2)
├── output/                      # optional scratch space for deliverables (git-ignored)
├── _templates/                  # per-type templates: frontmatter + body `## Section` skeleton
└── CLAUDE.md                    # this file
```

All paths in this document are relative to `vault/`.

### Folder hierarchy rules

The wiki is organized as a **topic tree**, not by note type.
Each topic gets a folder under `wiki/`. Subtopics nest as child folders.
Every folder contains a folder note that lists and links all notes in that folder and its children.

> [!important] Folder notes (normative)
> The per-folder index is a **folder note** named exactly after its folder (`wiki/<topic>/<topic>.md`, `type: index`); the root index is always `wiki/index.md`; a legacy `_index.md` is accepted but flagged `legacy-index-filename` at schema_version 3 (remediation: `bash scripts/engine.sh migrate --write`).
>
> The hierarchy fields `parent:`, `children:`, and `child_indexes:` MUST be quoted `"[[wikilink]]"` values — a plain title string produces no graph edge and is a lint finding.

- Tree depth must not exceed **four levels**. Deeper nesting signals a need to split into a sibling topic.
- When ingesting a new source, determine which topic folder the extracted concepts and entities belong to.
- If no folder exists for a topic, create one with its folder note.
- If a concept spans two topics, place it in the more specific one and add a `[[wikilink]]` from the other topic's folder note.
- The `parent` frontmatter field links each note to its folder's folder note, making the tree navigable both through folders and through wikilinks.
- Two special folders break the topic pattern:
  - `wiki/_sources/` holds source summaries (one per ingested source)
  - `wiki/_synthesis/` holds cross-topic analysis
    These are prefixed with underscore to sort them visually above topic folders.

## Frontmatter schema

Every note in the vault carries YAML frontmatter. Type lives in frontmatter, not in the folder path — a single topic folder can contain both entities and concepts side by side.

Nine allowed types: `source`, `entity`, `concept`, `topic`, `project`, `synthesis`, `index`, `manifest`, `log`. (`vault/output/` files are plain markdown — no frontmatter required, not tracked by this schema.)

> [!note] Schema versions 2 and 3
> `topic`, `project`, and `manifest` were added in schema_version 2, along with the optional claim-level provenance fields `source_quotes` and `derived` (available on every typed page). Schema_version 3 changes only the per-folder index convention: the index file is a **folder note** named after its folder (`wiki/<topic>/<topic>.md`) instead of `_index.md`, and the wikilink form of `parent`/`children`/`child_indexes` is normative. Vaults declaring `schema_version: 1` or `2` remain valid — each version is a strict superset of the previous one. Upgrade an existing vault with `bash scripts/engine.sh migrate --target <vault> --write`; the v2→v3 `rename-index` action renames each `_index.md` to its folder-note name and rewrites the wikilinks that pointed at it (name conflict ⇒ report + skip).

The `log` type is used only for `wiki/log.md` (the operations log). It requires minimal frontmatter: `title`, `type`, `created`, `updated`. Log entries may use `[[wikilinks]]` to reference real pages in piped basename form (e.g., `[[llm-wiki-pattern|LLM Wiki Pattern]]`), but when describing old/fixed/invalid link patterns, use backtick code formatting instead (e.g., `` `_index` `` not `[[_index]]`) — a code span is not a link, so Obsidian draws no edge and no ghost node.

### Required fields by type

The two universal required fields `type` and `title` apply to every typed page and are not repeated in the table below.

This table is the **single source of truth** for required fields per page type. `scripts/validate-frontmatter.sh` parses this table at gate time (grep/awk only — no Bun). Changing a required field means editing this table and only this table; the per-type YAML examples below are illustrations.

| Type | Required fields | Conditional |
| --- | --- | --- |
| `source` | `source_type sources created updated status confidence` | `source_format != text` requires `attachment_path extracted_at` |
| `entity` | `entity_type parent path sources created updated status confidence` | — |
| `concept` | `parent path sources created updated status confidence` | — |
| `topic` | `summary parent path sources created updated status confidence` | — |
| `project` | `objective project_status parent path sources created updated status confidence` | — |
| `synthesis` | `synthesis_type sources created updated status confidence` | — |
| `index` | `aliases created updated` | — |
| `manifest` | `created updated` | — |
| `log` | `created updated` | — |

### Source notes (`wiki/_sources/`)

```yaml
---
title: "Article or Document Title"
type: source
source_type: article | paper | policy | transcript | book | video | podcast | manual | agent-session
source_format: text | image | pdf # default: text. Required if the original is not markdown/plain text.
attachment_path: "raw/assets/..." # required when source_format != text
extracted_at: 2026-04-16 # required when source_format != text
url: "https://..."
author: "Author Name"
publisher: "Publisher or Site"
date_published: 2026-04-10
date_ingested: 2026-04-16
tags: []
aliases: []
sources: []
created: 2026-04-16
updated: 2026-04-16
status: active | stale | superseded
confidence: 1.0
---
```

`source_format` defaults to `text`. Audio / video formats are deferred — extend the enum when those paths are implemented. `pdf` is supported (I4): when `source_format` is `pdf` or `image`, both `attachment_path` and `extracted_at` are required, and `attachment_path` must point to a real file under `vault/raw/assets/`.

A source summary carries **no outbound `[[wikilinks]]`** — its body is Metadata, Summary, and Key Claims (prose). Provenance is one-directional: **page → source**. Every wiki page a source informs lists it in that page's `sources:` frontmatter, so the source is reached by the pages that cite it. Out-linking from a source (e.g. `## Entities Mentioned` / `## Concepts Mentioned` lists) would fan across every topic the source touches and collapse the graph's topic islands into a hairball, so it is not done. To note coverage, use a single plain-text line (no `[[ ]]`), e.g. `Covers: Specialist Pattern, Orchestrator`.

### Entity notes (type: `entity`, placed in topic folders)

Entities are concrete things: people, organizations, products, tools, services, standards, places.

```yaml
---
title: "Entity Name"
type: entity
entity_type: person | organization | product | tool | service | standard | place
aliases: []
parent: "[[subtopic-a1|Subtopic A1]]"
path: "topic-a/subtopic-a1"
sources: ["[[source-note-1|Source Note 1]]", "[[source-note-2|Source Note 2]]"]
related: ["[[other-entity|Other Entity]]", "[[concept-note|Concept Note]]"]
tags: []
created: 2026-04-16
updated: 2026-04-16
update_count: 1
status: active | stale | superseded
confidence: 0.9
---
```

### Concept notes (type: `concept`, placed in topic folders)

Concepts are abstract ideas: frameworks, theories, patterns, principles, methodologies.

```yaml
---
title: "Concept Name"
type: concept
aliases: []
parent: "[[subtopic-a1|Subtopic A1]]"
path: "topic-a/subtopic-a1"
sources: ["[[source-note-1|Source Note 1]]"]
related: ["[[entity-note|Entity Note]]", "[[other-concept|Other Concept]]"]
contradicts: []
supersedes: []
depends_on: []
tags: []
created: 2026-04-16
updated: 2026-04-16
update_count: 1
status: active | stale | superseded
confidence: 0.8
---
```

### Topic notes (type: `topic`, placed in topic folders) — schema v2

A topic page is a narrative landing page for a topic — distinct from the folder's folder note (which is a mechanical Map of Content listing children; the folder note keeps `type: index`, never `type: topic`). Use a topic page when a topic needs a curated overview that orients the reader before they descend into the entity/concept pages. Optional; not every folder needs one.

```yaml
---
title: "Topic Name"
type: topic
aliases: []
parent: "[[topic-a|Topic A]]"
path: "topic-a"
summary: "One- or two-sentence orientation for this topic."
key_pages: ["[[important-concept|Important Concept]]", "[[important-entity|Important Entity]]"]
sources: ["[[source-note-1|Source Note 1]]"]
related: ["[[adjacent-topic|Adjacent Topic]]"]
source_quotes: [] # optional claim-level provenance — see below
derived: false # optional — true when the page is LLM inference, not stated in a source
tags: []
created: 2026-04-16
updated: 2026-04-16
update_count: 1
status: active | stale | superseded
confidence: 0.8
---
```

### Project notes (type: `project`, placed in topic folders) — schema v2

A project page tracks a goal or initiative that aggregates related entities, concepts, and sources with a lifecycle. Use it to follow ongoing work whose state changes over time.

```yaml
---
title: "Project Name"
type: project
aliases: []
parent: "[[topic-a|Topic A]]"
path: "topic-a"
objective: "What this project aims to achieve."
project_status: planned | active | paused | done | abandoned
members: ["[[related-entity|Related Entity]]", "[[related-concept|Related Concept]]"]
sources: ["[[source-note-1|Source Note 1]]"]
related: ["[[related-project|Related Project]]"]
source_quotes: [] # optional claim-level provenance — see below
derived: false # optional
tags: []
created: 2026-04-16
updated: 2026-04-16
update_count: 1
status: active | stale | superseded
confidence: 0.8
---
```

### Synthesis notes (`wiki/_synthesis/`)

Synthesis notes are higher-order analysis: comparisons, themes, contradictions, gap analyses.

```yaml
---
title: "Synthesis Title"
type: synthesis
synthesis_type: comparison | theme | contradiction | gap | timeline
path: "_synthesis"
scope: ["[[concept-1|Concept 1]]", "[[concept-2|Concept 2]]", "[[entity-1|Entity 1]]"]
sources: ["[[source-1|Source 1]]", "[[source-2|Source 2]]", "[[source-3|Source 3]]"]
tags: []
created: 2026-04-16
updated: 2026-04-16
status: active | draft | stale
confidence: 0.7
---
```

### Index notes — folder notes (`wiki/<topic>/<topic>.md`)

Every topic folder contains a **folder note** — a note named exactly after its folder (filename stem == parent directory name, `type: index`) — that serves as the navigable index for that branch of the tree. The root index is always `wiki/index.md`. A legacy `_index.md` is accepted but flagged `legacy-index-filename` at schema_version 3 (run `bash scripts/engine.sh migrate --write` to rename it).

```yaml
---
title: "Topic Name"
type: index
aliases: ["topic-name", "Topic Name"]
parent: "[[topic-a|Topic A]]"
path: "topic-a/subtopic-a1"
children: []
child_indexes: []
tags: []
created: 2026-04-16
updated: 2026-04-16
---
```

**`aliases`** — every index should include aliases that reflect the topic it represents: the topic name in common variations (lowercase slug, title case, abbreviations). These aid search and autocomplete discovery — they do **not** make written links resolve (Obsidian resolves by basename/path only). Links to this index still target its file basename in piped form.

**`children` / `child_indexes`** — MUST be quoted `"[[wikilink]]"` values, like `parent`, in piped basename form (`"[[entity-name|Entity Name]]"`); a plain title string produces no graph edge, and a bare title that relies on an alias does not resolve. On the root `wiki/index.md`, `child_indexes` entries are piped basename links to the folder notes — e.g. `"[[agents|Agents]]"`, not a bare prose title — so the root MOC's edges land on the real index nodes.

### Source manifest (`wiki/_sources/manifest.md`) — schema v2

The source manifest is a single bookkeeping page that tracks the processed state of every raw source. It gives ingest an idempotency key (re-dropping the same file is detected by checksum) and lets the autonomous maintenance loop detect backlog in O(1) instead of re-scanning the log. It is generated and maintained by the engine (`migrate`, `ingest`); you rarely edit it by hand.

```yaml
---
title: "Source Manifest"
type: manifest
created: 2026-04-16
updated: 2026-04-16
---
```

The body holds one row per raw source: `raw_file`, `ingested_at`, `source_page` (`[[wikilink]]`), `status` (`processed | pending | skipped`), and `checksum`. The manifest is bookkeeping (like `index.md` and `log.md`): it is exempt from the `sources`-required and index-membership checks.

### Drafts and review (`_proposed/`) — schema v2

`vault/_proposed/` is an optional staging area for drafted pages awaiting human review (e.g. produced by a local model via `/claude-wiki-pages:draft`). Drafts mirror their eventual wiki path — `_proposed/wiki/<topic>/<page>.md` — and carry `status: draft` plus `proposed_by: "<source>"` (e.g. `"ollama:llama3"`, `"claude"`).

Because `_proposed/` is a sibling of `wiki/`, drafts are **outside every wiki-scoped check** (frontmatter validation, wikilinks, lint, index) until promoted — they cannot pollute the wiki. `/claude-wiki-pages:review` promotes a draft into `wiki/` (clearing `proposed_by`, setting `status: active`, stamping `updated`) under a git checkpoint, or rejects it. Never hand-copy a draft into `wiki/`; promotion via `propose approve` is the only sanctioned path.

**`proposed_by`** _(schema v2, optional)_ — present only on drafts under `_proposed/`. Records what produced the draft. Removed on promotion.

### Graph coloring

Topic branches are color-coded in Obsidian's graph view via the internal graph plugin API. The `/claude-wiki-pages:obsidian-graph-colors` skill manages this programmatically using `obsidian eval`. No frontmatter field needed — colors are applied at the Obsidian graph engine level.

The canonical group order (first match wins, top-down) is the seven **topics**:

1. **Topics** — one `path:wiki/<topic>` query per top-level topic folder, each a unique color. Folder notes inherit their topic's color (there is no `file:_index` catch-all group).

The graph draws **only topic pages, as topic islands** (ADR-0033). Two exclusion layers produce that shape:

- **Excluded from Obsidian's index** (`.obsidian/app.json` → `userIgnoreFilters: ["raw/", "_templates/", "_proposed/", "_inbox/", "output/", "CLAUDE.md", "wiki/log.md"]`): `raw/` provenance, `_templates/`, draft `_proposed/`, the `_inbox/` stub quarantine, `output/` scratch (incl. `_pipeline-plan-*`), the `CLAUDE.md` schema file, and the `wiki/log.md` ops log never appear in the graph, search, or autocomplete. Index-level exclusion is robust; it is the right home for bookkeeping artifacts that never need to stay searchable.
- **Excluded from the topic graph view** (`.obsidian/graph.json` → `search`): the connective scaffolding that must stay searchable — `wiki/_sources/`, `wiki/_synthesis/`, `wiki/index.md` — is filtered out of the drawn graph only, so the topics render as clean islands instead of one hairball fused through shared sources and the MOC. These pages stay in the vault and in search (provenance, synthesis, MOC are intact); they are simply not drawn. `_sources`/`_synthesis` therefore get **no color group** — they are not shown.

When `obsidian eval` is unavailable (no CLI, no running Obsidian), the skill's documented HEADLESS FALLBACK writes `.obsidian/graph.json` directly, touching only `colorGroups`/`collapse-color-groups`. Trade-off: a running Obsidian can clobber a direct file write with its in-memory state — restart Obsidian after a headless write.

When creating a new top-level topic folder, run `/claude-wiki-pages:obsidian-graph-colors` (or the ingest pipeline handles it automatically in step 1.7). The `claude-wiki-pages-curator-agent` agent also checks for missing color groups and applies them.

Graph filters and color groups are **regenerable cache**, not precious state: every value derives from the `wiki/` topic tree. If `.obsidian/graph.json` is lost or mangled, delete it and re-run `/claude-wiki-pages:obsidian-graph-colors` — the scaffold, topic groups, specials, and exclusions are rebuilt deterministically.

### Field: `parent` placeholder form

Every non-root page has a `parent` wikilink that points to the containing folder's folder note, in piped basename form: target the folder note's file basename with a Title-Case display, e.g. `"[[patterns|Patterns]]"`, `"[[tools|Tools]]"`. (Path-qualify if the basename is not unique vault-wide.) Use `"[[parent-folder|Parent Index]]"` only as a placeholder in templates — a bare `"[[Parent Index]]"` relies on alias resolution Obsidian does not perform and produces no edge.

### Output files (`output/`) — not part of the schema

`vault/output/` is user-owned scratch space for deliverables compiled from the wiki (reports, ADRs, memos, exports). It is git-ignored and plain markdown — no frontmatter, no validation, no type. Reference wiki pages with `[[wikilinks]]` in body text if you want Obsidian to resolve them; otherwise any markdown is fine. Claude will not lint, index, or repair files here.

## Field definitions

**`type`** is the primary filter. Read only this field to decide which pages are relevant to an operation.

- Ingest touches `source`, `entity`, `concept`, `topic`, `project`, `index`, `manifest`.
- Query reads `entity`, `concept`, `topic`, `project`, `synthesis`.
- Lint scans all wiki types. Files in `vault/output/` are out of scope.

**`parent`** links a note to its folder's folder note. Makes the tree navigable through wikilinks, not just the filesystem. Every note except top-level indexes must have a `parent`. Like `children` and `child_indexes`, the value MUST be a quoted `"[[wikilink]]"` in piped basename form (`"[[folder-note|Folder Note]]"`) — a plain title string produces no graph edge, and a bare title relying on an alias does not resolve.

**`path`** records the folder path relative to `wiki/`. Enables Dataview queries scoped to a subtree.

**`sources`** is non-negotiable. Every wiki page links back to at least one source note in `wiki/_sources/`. No claim exists without a traceable origin in `raw/`.

**`confidence`** is a float between 0.0 and 1.0. Starts at 1.0 for facts directly stated in a source. Decays if contradicted by newer sources. Strengthens when multiple sources confirm the same claim. Update during ingest (when new sources reinforce or contradict) and during lint (periodic decay for unconfirmed claims).

**`status`** tracks lifecycle:

- `active` — current, maintained.
- `stale` — not updated despite newer related sources existing (flagged by lint).
- `superseded` — explicitly replaced by a newer page (the old page links to its replacement).
- `draft` — incomplete, needs more sources.

**`update_count`** tracks how many ingest operations touched this page. High count = well-evidenced. Low count = peripheral, candidate for review during lint.

**`contradicts` / `supersedes` / `depends_on`** are typed relationships that carry semantic meaning beyond flat wikilinks. Live in frontmatter. At 50+ pages, install obsidian-wikilink-types plugin for inline typed links.

**`source_quotes`** _(schema v2, optional)_ — claim-level provenance. A list of `{ source: "[[source-note]]", quote: "verbatim sentence from the source" }` objects that pin specific claims on the page to the exact source text behind them. Where `sources` says _which_ sources a page draws on, `source_quotes` says _which sentence_ supports a given claim. Leave empty (`[]`) when page-level `sources` is sufficient; populate it for high-stakes or contested claims.

**`derived`** _(schema v2, optional, default `false`)_ — set to `true` when the page (or a claim on it) is LLM inference synthesised across sources rather than stated in any single source. Makes the inference explicit so a reviewer knows it carries less direct evidentiary weight. A `derived: true` page should keep `confidence` below `0.8` unless multiple sources independently support the inference.

**`aliases`** aid search and autocomplete discovery — they are **not** a link-resolution mechanism. Obsidian resolves a written `[[target]]` by **exact vault path or filename basename only**; it does not resolve a bare `[[Alias]]` or `[[Title]]` to a note that merely carries that string in `aliases:` or `title:`. (Obsidian's autocomplete inserts an alias pick as a piped link `[[file-basename|Alias]]` — target is the real filename, the alias is only display text.) So aliases never make a written link resolve; they only help a human or the autocomplete find the page. Keep useful display variants here (slug, title case, abbreviations) for discoverability. The old "the title must be the first alias to avoid ghost nodes" rule is **obsolete**: ghost nodes came from authoring bare `[[Title Case]]` links and relying on alias resolution Obsidian never performs. The fix is to write links in piped basename form (`[[file-basename|Title Case]]`) — see "Linking conventions" — not to add aliases.

**`created` / `updated`** use `YYYY-MM-DD` format.

## Ontology profile (`ontology-profile-v1`)

This section is the single named contract for the vault's formal ontology. R2 graph traversal, C1 MOC descent, and I1 classification all read these two tables and no other source. Do not duplicate or fork either table.

> **Coverage note (D15).** This profile covers two closed sets: (1) the predicate domain→range table below — a closed set of typed wikilink predicates with declared domain, range, direction, and cardinality; and (2) the enum list below — closed canonical values for every schema enum. `entity_type` is the **sole vault-extensible axis**: an owner may widen it via `entity_type_extensions:` in their own CLAUDE.md (decision §11.6); all other enums are fully closed. Adding a new page `type` is a schema change requiring a new ADR, new templates, and a new row in the `### Required fields by type` table.

### Predicate domain→range table

Each row states: which predicate, which page class may originate the link (domain), which page class it may point to (range), and its direction and cardinality. "Page class" values are drawn from the `type` enum in the table below.

| Predicate | Domain (source class) | Range (target class) | Direction / cardinality |
| --- | --- | --- | --- |
| `parent` | any non-root page (`entity`,`concept`,`topic`,`project`,`synthesis`,`index`) | `index` | directed, single |
| `sources` | `entity`,`concept`,`topic`,`project`,`synthesis` | `source` | directed, 1..N (≥1) |
| `related` | `entity`,`concept`,`topic`,`project` | `entity`,`concept`,`topic`,`project` | undirected, 0..N |
| `contradicts` | `concept` | `concept` | undirected, 0..N |
| `supersedes` | `concept`,`topic`,`project`,`synthesis` | same class as domain | directed, 0..N |
| `depends_on` | `concept`,`topic`,`project` | `concept`,`entity` | directed, 0..N |
| `key_pages` | `topic` | `entity`,`concept` | directed, 0..N |
| `members` | `project` | `entity`,`concept` | directed, 0..N |
| `scope` | `synthesis` | `entity`,`concept`,`topic`,`project` | directed, 1..N |
| `children` | `index` | any non-root page | directed, 0..N |
| `child_indexes` | `index` | `index` | directed, 0..N |

> The graph-traversal primitive (Brief §6) takes its edge set from this table. R2 `--graph` walks the provenance/association core — `sources`+`related`+`depends_on` — to N≤2; the remaining rows (`key_pages`, `members`, `scope`, `children`, `child_indexes`, `parent`) are the MOC/descent edges C1 uses. `contradicts`/`supersedes` are available to R3/synthesis. An edge violating a row's domain/range is a future S1-check lint finding, NOT a traversal the engine follows.
>
> **Topic-locality (ADR-0033).** The association predicates `related`, `depends_on`, `key_pages`, `members`, `scope`, `contradicts`, and `supersedes` are additionally constrained: both endpoints must live in the **same top-level topic folder**. A cross-topic association is written as prose, not a typed link, so the graph stays a set of topic islands. `parent`/`sources`/`children`/`child_indexes` are exempt (they target the navigation spine or `_sources/`, which the topic graph excludes from view).

### Enum list

All closed value sets for the schema, single-sourced here. I1's classifier and R1's `--type` filter both read the page-type enum; I1's entity sub-classifier reads `entity_type`. Every consumer reads from this table.

| Enum | Canonical values | Closed? | Calibration |
| --- | --- | --- | --- |
| page type (`type`) | `source`,`entity`,`concept`,`topic`,`project`,`synthesis`,`index`,`manifest`,`log` | closed (core) | not vault-extensible — adding a type is a schema change (new ADR + new templates + lint case) |
| `entity_type` (fixed core, calibratable) | `person`,`organization`,`product`,`tool`,`service`,`standard`,`place` | closed core + owner extension | owner adds via `entity_type_extensions:` allow-list in their OWN vault CLAUDE.md (decision #6); legal set = core ∪ extensions, composed at read time |
| `source_type` | `article`,`paper`,`policy`,`transcript`,`book`,`video`,`podcast`,`manual`,`agent-session` | closed (core) | not owner-extensible |
| `synthesis_type` | `comparison`,`theme`,`contradiction`,`gap`,`timeline` | closed (core) | not owner-extensible |
| `project_status` | `planned`,`active`,`paused`,`done`,`abandoned` | closed (core) | not owner-extensible |
| `source_format` | `text`,`image`,`pdf` (audio/video deferred) | closed (core) | not owner-extensible |
| `status` | `active`,`stale`,`superseded`,`draft` | closed (core) | not owner-extensible |

**Calibration mechanism.** A vault owner widens `entity_type` ONLY by adding the delta to their vault's own CLAUDE.md: `entity_type_extensions: [dataset, model]`. The legal set is then core ∪ extensions, computed at read time. There is no parallel enum file and no second list: the core list lives in this profile, the per-vault widening lives in that vault's authoritative CLAUDE.md, and a consumer reads both from the one schema document it already loads. Page type stays fully closed — widening it is a schema change, by design.

## Ingest rules

When processing a new source from `raw/`:

1. Create a source summary in `wiki/_sources/` with correct frontmatter and a prose body (Metadata, Summary, Key Claims). The summary carries **no outbound `[[wikilinks]]`** — provenance is page → source, so the source is reached through the `sources:` citation on each page it informs (steps 7–8), not by out-linking from the source.
2. Extract entities and concepts from the source.
3. Determine which topic folder each entity/concept belongs to. Create the folder and its folder note (`wiki/<topic>/<topic>.md`) if it does not exist.
4. Search the wiki for existing pages on each entity/concept.
5. **Update existing pages rather than creating duplicates.** This is the entity distribution model — ingesting one source rewrites/extends multiple existing pages rather than creating one summary.
6. Place new pages in the correct topic folder. Set the `parent` and `path` frontmatter fields. Author each new page from its type's template in `_templates/<type>.md` — both the frontmatter and the body `## Section` skeleton (e.g. concept → `## Definition`, `## Key Principles`, `## Examples`, `## Related Concepts`). Do not invent section headings; the structural lint flags a missing template section as `missing-section`.
7. Add the new source to the `sources` frontmatter field of every page touched.
8. Increment `update_count` on every page touched.
9. Update `updated` date on every page touched.
10. Update `confidence`: reinforce if confirming existing claims, weaken if contradicting.
11. Update the relevant folder notes (add new pages to `children`, add new child folders to `child_indexes` — quoted `"[[wikilink]]"` values).
12. Update `wiki/index.md` with any new pages.
13. Append to `wiki/log.md`: `## [YYYY-MM-DD] ingest | Source Title`

## Query rules

1. Read `wiki/index.md` first to find relevant pages.
2. For topic-scoped queries, start from the relevant folder note and traverse downward.
3. Read matching pages. Follow wikilinks to gather context.
4. Synthesize an answer with `[[wikilink]]` citations to specific wiki pages.
5. End every answer with a `## Sources` section — numbered, research-paper style: one entry per consulted wiki page, as a `[[wikilink]]` plus the raw source file path(s) from that page's `sources:` frontmatter. If no pages were consulted, say so explicitly instead of omitting the section.
6. If the answer is valuable and novel, offer to file it as a new synthesis page in `wiki/_synthesis/`.
7. Append to `wiki/log.md`: `## [YYYY-MM-DD] query | Question summary`

## Lint rules

Check for:

- **Orphan pages** — no inbound wikilinks.
- **Dangling links** — wikilinks to non-existent pages.
- **Stale pages** — not updated in 30+ days despite newer related sources existing.
- **Contradictions** — between pages on the same topic.
- **Missing pages** — concepts mentioned in prose but lacking their own page.
- **Missing frontmatter fields** — every field in the schema must be present.
- **Low confidence** — `confidence` below 0.5 (flag for review or removal).
- **Index consistency** — every note in a folder is listed in its folder note; every folder note links to its parent index.
- **Index aliases** — every folder note must have `aliases` reflecting the topic (slug, title case, abbreviations).
- **Legacy index filename** — a `_index.md` in a schema_version 3 vault (verify WARN `legacy-index-filename`; remediation: run `bash scripts/engine.sh migrate --write`).
- **Plain-string hierarchy links** — `parent`/`children`/`child_indexes` values that are not quoted `"[[wikilink]]"`s (no graph edge is produced).
- **Cross-topic links** — a `[[wikilink]]` or association field (`related`/`depends_on`/`key_pages`/`members`/`scope`) pointing from a topic page to a page in a **different** top-level topic folder (ADR-0033 topic-locality). Info-level; remediate with `bash scripts/disentangle-links.sh --apply`. The spine (`parent`), provenance (`sources`), and folder-note `children`/`child_indexes` are exempt.
- **Missing parent/path** — notes with missing or incorrect `parent`/`path` fields.
- **Excessive nesting** — folders deeper than four levels (signal to refactor).
- **Index consistency** — `wiki/index.md` matches actual wiki contents.

Report as Errors, Warnings, and Info items.
Append to `wiki/log.md`: `## [YYYY-MM-DD] lint | Health check`

Recommended schedule: every 10 ingests, or monthly.

## Readability

These rules keep pages scannable in Obsidian and in plain-markdown viewers. They complement, not replace, the frontmatter schema.

- **Heading depth cap: H4.** If a section needs H5, split the page.
- **At-a-glance block.** Any page longer than 150 lines must open, directly under the H1, with a `> [!summary]` callout of 5–8 lines that states the page's thesis, the key facts, and when to consult it. Encyclopedic pages stay long but become scannable.
- **Prefer callouts for emphasis.** Use `> [!note]`, `> [!warning]`, `> [!important]`, `> [!summary]` instead of runs of bold or italics.
- **One concept per page, one page per concept.** If two pages would overlap by more than 50%, merge them or pick a canonical one and link from the other.
- **Transclusion policy.** Default to `[[wikilink]] + 1–2-sentence summary` when referencing another page. Use `![[page#block-id]]` transclusion only when the same verbatim block must appear in two contexts (e.g., an effort table shared between a concept page and a synthesis). When you transclude, leave a short comment above the embed explaining why the canonical block lives elsewhere, so the next editor does not duplicate it back.
- **Line length and paragraph length.** Break lines at natural phrase boundaries, not fixed columns. Keep paragraphs at 5 sentences or fewer.
- **Aliases aid discovery, not resolution.** Add reasonable display variants (slug, title case, abbreviation) to `aliases` so a human or the autocomplete can find the page by any name. Aliases do **not** make a written `[[link]]` resolve — links must target the file basename in piped form (`[[file-basename|Title Case]]`); see "Linking conventions".
- **Confidence discipline.** Never default to `1.0`. Use `1.0` only for direct quotes or settled facts from an authoritative source. Use `0.8` only when at least two independent sources corroborate the claim. Use `0.6` for single-source internal-policy claims. Use below `0.5` for inference not supported by explicit source text. Record `confidence` honestly — lint enforces the single-source-≥0.8 check.

## Linking conventions

> [!important] Obsidian resolves by path or basename only — never by alias or title
> A written `[[target]]` resolves to a note **only** by exact vault path or filename basename. It does **not** resolve by the note's `aliases:` or `title:`. A bare `[[Title Case]]` link that relies on an alias does not resolve — it floats as a ghost node and orphans the target. This applies in body text **and** in every frontmatter link field.

- Use `[[wikilinks]]` for all internal links. Never use raw file paths in prose.
- **Every cross-page link MUST target the destination's file basename** (the kebab-case filename stem, no extension), with the Title-Case page title as piped display text: `[[entity-name|Entity Name]]`. The bare `[[Entity Name]]` form is wrong — it relies on alias resolution Obsidian does not perform.
- **Default to the bare basename. Path-qualify ONLY on a genuine vault-wide collision — the basename occurs in 2+ files anywhere in the vault** (including `raw/` originals). A `wiki/_sources/adr-0001-x.md` summary and its `raw/docs/adr/ADR-0001-x.md` original share a basename, so a bare-basename link silently routes to the wrong file. Then target the page's **actual** wiki-relative path (no extension), verified to exist: `[[_sources/adr-0001-four-layer-orchestrator|ADR-0001: Four-Layer Orchestrator]]`. Never guess the folder — over-qualifying a unique basename with the wrong folder creates a dangling link.
- This applies to **both** body text and frontmatter link fields (`parent`, `sources`, `related`, `children`, `child_indexes`, `key_pages`, `members`, `scope`, `depends_on`, etc.). Every link field uses the piped basename (or path-qualified) form.
- Link to the most specific page.
- Every wiki page must link back to at least one source.
- `aliases` aid search/autocomplete discovery only — they are not a resolution mechanism. Do not rely on an alias to make a written link resolve; write the piped basename form instead.
- In frontmatter, use typed relationship fields (`contradicts`, `supersedes`, `depends_on`) for semantic links — also in piped basename form.
- Wikilink display text uses Title Case page titles; the link target is always the file basename (or wiki-relative path), never the title.

> [!important] Topic-local linking — keep the graph as topic islands (ADR-0033)
> A `[[wikilink]]` between two **topic pages** must stay **within the same top-level topic folder**. Do not link a page in one topic folder to a page in another: a cross-topic `[[link]]` fuses the two topics in the graph and, repeated across the tree, collapses the topic islands into a hairball. Write a cross-topic reference as **plain prose** (the page's title as text), not a wikilink.
> Exempt — these never count against topic-locality: the navigation spine `parent:` (up to the folder note, then `index.md`), provenance `sources:` → `_sources/**`, and a folder note's `children:`/`child_indexes:` (its own pages). The association fields `related`/`depends_on`/`key_pages`/`members`/`scope`/`contradicts`/`supersedes` must point only to same-topic pages.
> Rule of thumb: **a link is allowed unless both endpoints are topic pages in different top-level folders.** Remediate an existing vault with `bash scripts/disentangle-links.sh --apply` (dry-run by default).

## Naming conventions

- Filenames use kebab-case: `article-title-here.md`
- Page titles inside files use Title Case: `# Article Title Here`
- Wikilinks target the file basename with Title-Case display: `[[entity-name|Entity Name]]` (path-qualify when the basename is not unique vault-wide — see "Linking conventions")
- The per-folder index is a folder note named exactly after its folder: `<topic>.md` inside `wiki/<topic>/`. The root index is always `wiki/index.md`. (`_index.md` is the legacy pre-v3 name — accepted, but flagged `legacy-index-filename`.)
- Source summaries match source title in kebab-case

## What does NOT belong in the wiki

- Raw source text (stays in `raw/`).
- Ephemeral task context.
- Git state.
- Calendar items.
- Anything that changes faster than weekly.

## Challenge mode

Before writing an ADR, proposal, or making a decision, query the wiki with a challenge framing:

> I'm about to decide [X]. Search the wiki for:
>
> - Past decisions on similar topics
> - Contradictions in my current understanding
> - Gaps in evidence
> - Sources that argue against this approach
>
> Push back on my assumptions.

## Scaling milestones

- **0–50 pages**: `index.md` plus a folder note per folder is sufficient. Focus on frontmatter consistency.
- **50–200 pages**: Install obsidian-wikilink-types for typed links. Run synthesize for cross-branch connections.
- **200–500 pages**: Install qmd for local search. Confidence decay and stale detection become essential. Prune folders with 30+ notes.
- **500+ pages**: Consider splitting into multiple vaults by research domain.

## Skill compatibility — IMPORTANT

**This document (CLAUDE.md) is the authoritative schema. When any skill's default behavior conflicts with these rules, follow CLAUDE.md.** Skills ship with generic defaults (flat directory layouts, minimal frontmatter, plain-string sources); the schema here overrides all of them.

### llm-wiki skills (wizard, ingest, query, lint, fix)

These skills were written for a **flat** directory layout: `wiki/sources/`, `wiki/entities/`, `wiki/concepts/`, `wiki/synthesis/`. This vault uses a **different** layout:

| Skill expects                                                 | This vault uses                              | Rule                                                                             |
| ------------------------------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------- |
| `wiki/sources/`                                               | `wiki/_sources/`                             | Always use `wiki/_sources/`                                                      |
| `wiki/entities/`                                              | topic folders (`wiki/<topic>/`)              | Place entities in the appropriate topic folder, not a flat `entities/` directory |
| `wiki/concepts/`                                              | topic folders (`wiki/<topic>/`)              | Place concepts in the appropriate topic folder, not a flat `concepts/` directory |
| `wiki/synthesis/`                                             | `wiki/_synthesis/`                           | Always use `wiki/_synthesis/`                                                    |
| Minimal frontmatter (`tags`, `sources`, `created`, `updated`) | Full schema (see above)                      | Always use the full frontmatter schema for the page's `type`                     |
| `sources` as plain strings                                    | `sources` as piped basename `[[wikilinks]]`  | Always use piped basename wikilinks (`[[source-note\|Source Note]]`) in `sources`  |
| No `type` field                                               | `type` required on every page                | Always include `type` in frontmatter                                             |
| No `parent` / `path` fields                                   | Required on all pages except top-level index | Always set `parent` and `path`                                                   |
| No per-folder index files                                     | A folder note in every topic folder          | Create the folder note (`wiki/<topic>/<topic>.md`) when creating a topic folder  |
| No `aliases` on indexes                                       | Required on every folder note                | Add topic name variants (slug, title case, abbreviations)                        |

When running `/claude-wiki-pages:ingest`: follow the 13-step ingest rules in this document, not the skill's simpler defaults. The skill provides the workflow structure; this document provides the schema.

When running `/claude-wiki-pages:lint`: check everything the skill checks PLUS the additional rules in this document (index consistency, parent/path validation, confidence thresholds, type field validation, nesting depth).

### synthesize and index

These skills were written for **project-folder vaults** (folders with `README.md` files), not wiki-structured vaults. Use them with these overrides:

- **synthesize**: Write output to `wiki/_synthesis/`, not the vault root. Use the synthesis frontmatter schema from this document, not the skill's default frontmatter.
- **index**: Use only for generating an overview of the full topic tree. Write output to `wiki/`, not the vault root. The per-folder folder notes are maintained by the ingest workflow, not by this skill.

### obsidian-markdown, obsidian-bases, obsidian-cli

These are general-purpose Obsidian format skills. No conflicts — use as-is.
