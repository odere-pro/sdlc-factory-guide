# Plan: SDLC Factory — LinkedIn + Medium + GitHub Docs

## TL;DR

Create three deliverables from existing `raw/` SDLC content, output into `dist/` with separated folders. (1) LinkedIn post as `.txt` in `dist/linkedin/`, (2) Long-form Medium article as `.md` in `dist/medium/`, (3) Complete Docusaurus 3 documentation site in `dist/github/` — multilingual (11 locales), fully SEO-optimized (sitemap, JSON-LD, OG/Twitter cards, hreflang, canonical URLs, robots.txt, Core Web Vitals), dark/light/auto themes, CI/CD with quality gates, deployed to `odere-pro.github.io/sdlc-factory-guide`.

---

## Output Structure

```
dist/
├── linkedin/
│   └── linkedin-post.txt
├── medium/
│   └── medium-article.md
└── github/                              ← this IS the git repo root
    ├── README.md                        ← starts with SDLC checklist index
    ├── package.json
    ├── docusaurus.config.ts
    ├── sidebars.ts
    ├── tsconfig.json
    ├── babel.config.js
    ├── .markdownlintrc.json
    ├── cspell.json
    ├── .github/
    │   └── workflows/
    │       ├── deploy.yml               ← build + deploy to GitHub Pages
    │       └── pr-check.yml             ← quality gates on PRs
    ├── docs/                            ← English source (primary)
    │   ├── intro.md
    │   ├── checklist.md
    │   ├── rule-file.md
    │   ├── context-engineering.md
    │   ├── verification.md
    │   ├── running-the-work.md
    │   ├── review-and-ship.md
    │   ├── controlling-cost.md
    │   ├── production-agents.md
    │   └── team-standard.md
    ├── i18n/
    │   ├── sv/
    │   │   ├── docusaurus-plugin-content-docs/current/  ← translated .md
    │   │   ├── docusaurus.json                          ← UI strings
    │   │   └── code.json                                ← code block labels
    │   ├── uk/  ...same structure...
    │   ├── es/  ├── de/  ├── fr/
    │   ├── ja/  ├── zh-Hans/  ├── pt-BR/
    │   ├── ko/  └── hi/
    ├── src/
    │   ├── css/custom.css
    │   └── pages/index.tsx              ← landing page with hero
    └── static/
        ├── img/
        │   ├── logo.svg
        │   ├── favicon.ico
        │   └── og-image.png             ← 1200×630 social sharing image
        └── robots.txt
```

---

## Supported Languages (11 locales)

| Code | Language | Label | Region |
|------|----------|-------|--------|
| `en` | English | English | Default/primary |
| `sv` | Swedish | Svenska | Scandinavia |
| `uk` | Ukrainian | Українська | Ukraine |
| `es` | Spanish | Español | Latin America, Spain |
| `de` | German | Deutsch | Germany, Austria, Switzerland |
| `fr` | French | Français | France, Canada, Africa |
| `ja` | Japanese | 日本語 | Japan |
| `zh-Hans` | Chinese (Simplified) | 简体中文 | China |
| `pt-BR` | Portuguese (Brazil) | Português (Brasil) | Brazil |
| `ko` | Korean | 한국어 | South Korea |
| `hi` | Hindi | हिन्दी | India |

---

## Phase 1 — LinkedIn Post

**Output**: `dist/linkedin/linkedin-post.txt`

### Step 1.1 — Write the post

**Opening hook** (~210 chars, before LinkedIn "see more" fold):
- Start with a bold, personal statement about focusing on outcomes not implementation
- Immediately signal this is about Agentic Engineering

**Body**:
- Brief nod to Karpathy's Software 3.0 concept: LLMs are the new programming paradigm, your output is no longer code — it's the system that produces code
- Condense Part 1 (Rule File) into 2-3 punchy lines: "The highest-leverage hour — write 10 lines of project rules, stop re-explaining every session"
- Condense Part 2 (Context Engineering) into 2-3 lines: "Static vs dynamic context. Stop pasting entire repos. Pay only for tokens you need"
- Tease the remaining 6 parts: "That's 2 of 8. The full checklist covers verification, cost control, production agents, team standards…"

**CTA**: Direct link to `https://github.com/odere-pro/sdlc-factory-guide`

**Closing urgency**: What you lose by postponing — every ad-hoc prompt without a rule file burns tokens on retry loops, every unverified output is a bet against your production, every week without this setup is compounding engineering debt

**Hashtags**: #AgenticEngineering #AI #Software3 #DeveloperProductivity #LLM #CodingWithAI

**Constraints**:
- Total length: ≤3000 chars
- First ~210 chars must hook (LinkedIn fold)
- Plain text only, no markdown
- Professional but personal tone
- Reference: LinkedIn `in/oleksander-derechei/`, Medium `@odere.pub`

### Step 1.2 — Validate

- Char count ≤ 3000
- GitHub link present and correct
- Karpathy mentioned
- Urgency closing present
- Hook is compelling before the fold

---

## Phase 2 — Medium Article

**Output**: `dist/medium/medium-article.md`

### Step 2.1 — Write YAML frontmatter

```yaml
---
title: "The Agentic Engineering Setup Guide"
description: "An 8-part checklist to move from ad-hoc AI prompting to a disciplined engineering workflow — rule files, context engineering, verification, cost control, and team standards."
tags:
  - AI
  - Software Engineering
  - Artificial Intelligence
  - Programming
  - Developer Tools
canonical_url: "https://odere-pro.github.io/sdlc-factory-guide/"
---
```

Notes:
- `title` ≤60 chars for SEO
- `description` ≤160 chars
- `canonical_url` points to YOUR docs site (Medium gives SEO credit back to you, shows "Originally published at…")
- Exactly 5 tags (Medium max is 5; these are high-volume)

### Step 2.2 — Write article structure

1. **Kicker** (1 paragraph) — "How to focus on the outcome, not the implementation." Frame the shift: your real output is the system that produces code, not the code itself. Connect to Karpathy's Software 3.0 — LLMs as the new runtime.

2. **TL;DR block** — Blockquote with link to the full checklist on GitHub: `https://github.com/odere-pro/sdlc-factory-guide`

3. `---` separator

4. **Part 1 — Set up the rule file** (H2)
   - Why it works (rule file > clever prompts)
   - What goes in: stack, conventions, hard rules, workflow
   - Code block: real `CLAUDE.md` example from `raw/01-rule-file.md`
   - Grow it by correction pattern
   - Tools section
   - "You own architecture; the agent implements"

5. `---` separator

6. **Part 2 — Engineer the context** (H2)
   - Static vs dynamic buckets
   - Cost intuition (2000 tokens × 50 requests = 100k tokens)
   - Skills pattern with progressive disclosure
   - Code block: minimal skill example
   - Six kinds of context
   - "Don't paste the whole repo"

7. `---` separator

8. **Part 3 — Build verification** (H2)
   - Tests as the deterministic contract
   - Code block: pytest example
   - Evals for non-deterministic parts (output + trajectory)
   - Code block: YAML eval rubric
   - The feedback loop

9. `---` separator

10. **Part 4 — Run the work** (H2)
    - Conductor vs orchestrator modes (bullet list, NOT table)
    - Three places agents fit (editor, terminal, background)
    - Sandbox execution
    - The 80% problem — where it goes wrong

11. `---` separator

12. **Part 5 — Review and ship** (H2)
    - Agent as first-pass reviewer
    - Review checklist for generated code (3 bullets)
    - Code block: pre-commit hook (secrets blocker)
    - Observability: traces, evals, cost, drift
    - The maintenance win

13. `---` separator

14. **Part 6 — Control cost** (H2)
    - Hidden debt of going fast (3 bullets)
    - Lever 1: first-pass success
    - Lever 2: route by task (bullet list format, NOT table — Medium doesn't render tables)
    - Code block: YAML routing config
    - Lever 3: dynamic context
    - Worked intuition example

15. `---` separator

16. **Part 7 — Ship production agents** (H2)
    - Script vs product decision
    - Four production essentials (list)
    - One workflow prototype → production
    - Code block: conversation-style example
    - Multi-agent coordination (shared state, MCP, A2A)

17. `---` separator

18. **Part 8 — Make it a team standard** (H2)
    - Treat harness as code (version, review, own)
    - Gate on eval not demo
    - Code block: CI gate YAML
    - Reshape code review
    - Prototype/production boundary
    - Hire for judgment

19. `---` separator

20. **Conclusion** — CTA to GitHub repo, link to LinkedIn for discussion, reference full checklist

### Step 2.3 — Medium formatting compliance

- Single H1 (the title in frontmatter only — Medium uses it automatically)
- All sections use H2
- `---` separator between every logical section
- NO tables anywhere — convert cost routing table from `raw/06` to bullet list
- Lists, code blocks, blockquotes used throughout
- Personal/authentic voice ("I", "you", "we")
- ~15-20 min read (~3500-4500 words)
- Where a diagram/chart would help, add: `<!-- IMAGE: [description] -->`

### Step 2.4 — Validate

- Frontmatter: title ≤60 chars, description ≤160 chars, exactly 5 tags
- `canonical_url` points to docs site (not GitHub repo)
- No duplicate H1
- Every section separated by `---`
- Zero tables
- Code blocks present (≥6: CLAUDE.md, skill, pytest, eval YAML, hook, routing, CI gate)
- Blockquotes present (TL;DR at minimum)
- GitHub link appears ≥2 times (TL;DR + conclusion)

---

## Phase 3 — GitHub Documentation Repository

**Target URL**: `odere-pro.github.io/sdlc-factory-guide`
**Repo**: `github.com/odere-pro/sdlc-factory-guide`

### Phase 3A — Scaffold Docusaurus 3 Project (Steps 3.1–3.6)

#### Step 3.1 — `package.json`

Dependencies:
- `@docusaurus/core@3.x`
- `@docusaurus/preset-classic@3.x`
- `@easyops-cn/docusaurus-search-local` (local search, no Algolia signup)
- `react@18.x`, `react-dom@18.x`

DevDependencies:
- `@docusaurus/module-type-aliases@3.x`
- `@docusaurus/tsconfig@3.x`
- `typescript@5.x`
- `markdownlint-cli2` (quality gate)
- `cspell` (spell check gate)

Scripts:
- `start` → `docusaurus start`
- `build` → `docusaurus build`
- `deploy` → `docusaurus deploy`
- `serve` → `docusaurus serve`
- `write-translations` → `docusaurus write-translations`
- `lint:md` → `markdownlint-cli2 "docs/**/*.md"`
- `lint:spell` → `cspell "docs/**/*.md"`

#### Step 3.2 — `docusaurus.config.ts`

**Site metadata**:
- `title`: `"Agentic Engineering Setup"`
- `tagline`: `"An 8-part guide to disciplined AI-assisted software development"`
- `url`: `"https://odere-pro.github.io"`
- `baseUrl`: `"/sdlc-factory-guide/"`
- `organizationName`: `"odere-pro"`
- `projectName`: `"sdlc-factory-guide"`
- `trailingSlash`: `false`
- `deploymentBranch`: `"gh-pages"`

**i18n config** (see Supported Languages table above):

```ts
i18n: {
  defaultLocale: 'en',
  locales: ['en','sv','uk','es','de','fr','ja','zh-Hans','pt-BR','ko','hi'],
  localeConfigs: {
    en:        { label: 'English',            htmlLang: 'en-US' },
    sv:        { label: 'Svenska',            htmlLang: 'sv-SE' },
    uk:        { label: 'Українська',         htmlLang: 'uk-UA' },
    es:        { label: 'Español',            htmlLang: 'es-ES' },
    de:        { label: 'Deutsch',            htmlLang: 'de-DE' },
    fr:        { label: 'Français',           htmlLang: 'fr-FR' },
    ja:        { label: '日本語',              htmlLang: 'ja-JP' },
    'zh-Hans': { label: '简体中文',            htmlLang: 'zh-CN' },
    'pt-BR':   { label: 'Português (Brasil)', htmlLang: 'pt-BR' },
    ko:        { label: '한국어',              htmlLang: 'ko-KR' },
    hi:        { label: 'हिन्दी',              htmlLang: 'hi-IN' },
  },
},
```

**Preset classic config**:
- `docs.sidebarPath: './sidebars.ts'`
- `docs.editUrl: 'https://github.com/odere-pro/sdlc-factory-guide/tree/main/'`
- `docs.showLastUpdateTime: true`
- `docs.showLastUpdateAuthor: true`
- `blog: false` (no blog)
- `theme.customCss: './src/css/custom.css'`
- `sitemap` — see Phase 3D Step 3.16
- `gtag` — see Phase 3D Step 3.22 (optional)

**Theme config**:
- `colorMode.defaultMode: 'light'`
- `colorMode.disableSwitch: false`
- `colorMode.respectPrefersColorScheme: true` (auto mode)
- Navbar: logo, docs link, GitHub link, `localeDropdown` (position right)
- Footer: columns for Docs, Community (LinkedIn, Medium, GitHub), Reference
- `prism.theme` and `prism.darkTheme` for code highlighting
- `tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 }`
- `metadata` — see Phase 3D Step 3.17

**Performance optimization** (Docusaurus 3.3+ `future` config):

```ts
future: {
  faster: {
    swcJsLoader: true,
    swcJsMinimizer: true,
    lightningCssMinimizer: true,
    mdxCrossCompilerCache: true,
  },
},
```

**Plugins**:
- `@easyops-cn/docusaurus-search-local` with `hashed: true`, multi-language support

#### Step 3.3 — `sidebars.ts`

```ts
const sidebars = {
  docs: [
    'intro',
    'checklist',
    {
      type: 'category',
      label: 'The Guide',
      collapsed: false,
      items: [
        'rule-file',
        'context-engineering',
        'verification',
        'running-the-work',
        'review-and-ship',
        'controlling-cost',
        'production-agents',
        'team-standard',
      ],
    },
  ],
};
```

#### Step 3.4 — `src/css/custom.css`

- CSS custom properties for brand colors (light + dark)
- `:root` and `[data-theme='dark']` selectors
- System font stack (no external font load = better LCP)
- Content max-width ~800px for readability
- Code block styling
- Responsive adjustments

#### Step 3.5 — `src/pages/index.tsx`

- Hero section: title, tagline, "Get Started" → `/docs/intro`
- Feature grid (3 cols): "Rule File", "Context Engineering", "Verification"
- Reference to Karpathy Software 3.0 inspiration
- Links to Medium + LinkedIn
- Uses `<Head>` for page-specific JSON-LD (WebSite schema)

#### Step 3.6 — Static assets

- `static/img/logo.svg` — placeholder logo
- `static/img/favicon.ico`
- `static/img/og-image.png` — 1200×630 OG image for social sharing
- `static/robots.txt` — see Phase 3D Step 3.20

---

### Phase 3B — Content Migration (Steps 3.7–3.8)

#### Step 3.7 — Migrate `raw/` → `docs/` with Docusaurus frontmatter

Each file gets Docusaurus-compatible frontmatter with SEO fields:

**`docs/intro.md`** ← from `raw/index.md`:

```yaml
---
id: intro
title: The Agentic Engineering Workflow
description: A practical, eight-part guide to moving from ad-hoc AI prompting to a disciplined workflow you can rely on in production.
sidebar_position: 1
slug: /
keywords: [agentic engineering, AI workflow, software development, SDLC, vibe coding]
image: /img/og-image.png
---
```

**`docs/checklist.md`** ← from `raw/00-sdlc-todolist.md`:

```yaml
---
id: checklist
title: Implementation Checklist
description: Complete actionable checklist for setting up an agentic engineering workflow — from rule files to team standards.
sidebar_position: 2
keywords: [checklist, implementation, setup, agentic engineering, AI development]
image: /img/og-image.png
---
```

**`docs/rule-file.md`** ← from `raw/01-rule-file.md`:

```yaml
---
id: rule-file
title: "Part 1 — Set Up the Rule File"
description: Create the onboarding document your AI agent needs — stack, conventions, hard rules, and workflow in CLAUDE.md or AGENTS.md.
sidebar_position: 3
keywords: [rule file, CLAUDE.md, AGENTS.md, AI configuration, coding agent]
image: /img/og-image.png
---
```

**Pattern for Parts 2–8**: same structure — `id`, `title`, `description` (≤160 chars), `sidebar_position` (4–10), `keywords` (4-5 terms), `image`.

Content body changes:
- Remove existing YAML `title`/`nav_order` frontmatter (replaced)
- Update inter-file links: `[Part 1](01-rule-file.md)` → `[Part 1](/docs/rule-file)`
- Remove "Previous/Next" nav lines at bottom (Docusaurus auto-generates)
- Keep all code blocks, lists, blockquotes intact
- Add `alt` text to any images for image SEO

#### Step 3.8 — Deduplication strategy

- `raw/` stays as-is (authoring workspace, not shipped)
- `dist/github/docs/` = English source of truth (Docusaurus-formatted)
- `dist/medium/` = standalone rewrite (different tone, no nav frontmatter)
- `dist/linkedin/` = original short-form content
- Translations: full file copies in `i18n/{locale}/docusaurus-plugin-content-docs/current/` (Docusaurus requirement — no symlinks/references possible)

---

### Phase 3C — README.md (Step 3.9)

#### Step 3.9 — Write `dist/github/README.md`

1. **Title**: `# Agentic Engineering Setup`
2. **Badges**: deploy status, license, locales count
3. **One-liner**: "A practical, 8-part guide… inspired by Google's New SDLC and Karpathy's Software 3.0."
4. **Link to live docs**: `odere-pro.github.io/sdlc-factory-guide`
5. **Full checklist** — entire `raw/00-sdlc-todolist.md` with checkboxes, each section title links to the docs page
6. **Quick start**:
   ```bash
   git clone https://github.com/odere-pro/sdlc-factory-guide.git
   cd sdlc-factory-guide
   npm install
   npm start
   ```
7. **Available translations** — 11 locales with labels
8. **Contributing** — how to contribute translations/content/fixes
9. **Reference** — link to Google whitepaper
10. **License** — Apache-2.0

---

### Phase 3D — SEO & Performance Optimization (Steps 3.10–3.23)

This is the comprehensive SEO layer. Every step references exactly where in `docusaurus.config.ts` or the file system the config lives.

#### Step 3.10 — Sitemap configuration

In `docusaurus.config.ts` → `presets` → `@docusaurus/preset-classic` → `sitemap`:

```ts
sitemap: {
  lastmod: 'date',
  changefreq: 'weekly',
  priority: 0.5,
  ignorePatterns: ['/tags/**'],
  filename: 'sitemap.xml',
},
```

- Generates `sitemap.xml` at build time at `/sdlc-factory-guide/sitemap.xml`
- `lastmod: 'date'` outputs `<lastmod>` from git commit dates (requires `showLastUpdateTime: true` in docs config)
- Pages with `noindex` meta are automatically excluded
- Respects `trailingSlash` setting
- Includes all locale URLs when i18n is active

#### Step 3.11 — Global meta tags

In `docusaurus.config.ts` → `themeConfig.metadata`:

```ts
metadata: [
  { name: 'keywords', content: 'agentic engineering, AI workflow, SDLC, software development, LLM, coding agent, vibe coding' },
  { name: 'author', content: 'Oleksandr Derechei' },
  { property: 'og:type', content: 'website' },
  { property: 'og:image', content: 'https://odere-pro.github.io/sdlc-factory-guide/img/og-image.png' },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },
  { property: 'og:image:type', content: 'image/png' },
  { property: 'og:site_name', content: 'Agentic Engineering Setup' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:image', content: 'https://odere-pro.github.io/sdlc-factory-guide/img/og-image.png' },
  { name: 'robots', content: 'index, follow' },
],
```

Docusaurus auto-generates `og:title`, `og:description`, `og:url` from each page's frontmatter `title` and `description`. No need to duplicate those globally.

#### Step 3.12 — Per-page frontmatter SEO fields

Every doc page MUST have these frontmatter fields (already defined in Step 3.7):
- `title` — used for `<title>`, `og:title`, `twitter:title`
- `description` (≤160 chars) — used for `<meta name="description">`, `og:description`, `twitter:description`
- `keywords` (array) — used for `<meta name="keywords">`
- `image` — used for `og:image` and `twitter:image` (per-page override)

Docusaurus automatically applies frontmatter `description` to both `description` AND `og:description` — no need to set both.

#### Step 3.13 — JSON-LD structured data (global)

In `docusaurus.config.ts` → `headTags`:

```ts
headTags: [
  {
    tagName: 'script',
    attributes: { type: 'application/ld+json' },
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'WebSite',
      name: 'Agentic Engineering Setup',
      url: 'https://odere-pro.github.io/sdlc-factory-guide/',
      description: 'An 8-part guide to disciplined AI-assisted software development',
      author: {
        '@type': 'Person',
        name: 'Oleksandr Derechei',
        url: 'https://www.linkedin.com/in/oleksander-derechei/',
        sameAs: [
          'https://github.com/odere-pro',
          'https://medium.com/@odere.pub',
          'https://www.linkedin.com/in/oleksander-derechei/',
        ],
      },
      publisher: {
        '@type': 'Person',
        name: 'Oleksandr Derechei',
      },
      inLanguage: ['en','sv','uk','es','de','fr','ja','zh-Hans','pt-BR','ko','hi'],
    }),
  },
],
```

#### Step 3.14 — JSON-LD per-page (TechArticle schema)

In each doc's MDX content, add a `<head>` block with page-specific structured data:

```mdx
<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Part 1 — Set Up the Rule File',
      description: 'Create the onboarding document your AI agent needs.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/rule-file',
      },
    })}
  </script>
</head>
```

Apply to all 10 doc pages. The `headline` and `description` match the frontmatter. `datePublished` = initial publish date.

#### Step 3.15 — JSON-LD BreadcrumbList

In `src/pages/index.tsx` and optionally via a custom Docusaurus plugin (or manually per page):

```json
{
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://odere-pro.github.io/sdlc-factory-guide/" },
    { "@type": "ListItem", "position": 2, "name": "Docs", "item": "https://odere-pro.github.io/sdlc-factory-guide/docs/" },
    { "@type": "ListItem", "position": 3, "name": "Rule File", "item": "https://odere-pro.github.io/sdlc-factory-guide/docs/rule-file" }
  ]
}
```

#### Step 3.16 — Canonical URLs and hreflang (automatic)

Docusaurus auto-generates when i18n is configured:
- `<link rel="canonical" href="...">` on every page
- `<link rel="alternate" hreflang="en-US" href="...">` for each locale
- `<link rel="alternate" hreflang="x-default" href="...">` for default

**No manual config needed** — just ensure `i18n.localeConfigs` has correct `htmlLang` values (already set in Step 3.2).

Generated HTML example:

```html
<link rel="alternate" hreflang="en-US" href="https://odere-pro.github.io/sdlc-factory-guide/docs/rule-file" />
<link rel="alternate" hreflang="sv-SE" href="https://odere-pro.github.io/sdlc-factory-guide/sv/docs/rule-file" />
<link rel="alternate" hreflang="uk-UA" href="https://odere-pro.github.io/sdlc-factory-guide/uk/docs/rule-file" />
<!-- ...all 11 locales... -->
<link rel="alternate" hreflang="x-default" href="https://odere-pro.github.io/sdlc-factory-guide/docs/rule-file" />
```

#### Step 3.17 — Open Graph tags

**Global** (Step 3.11 handles): `og:type`, `og:image`, `og:image:width/height`, `og:site_name`
**Per-page** (auto from frontmatter): `og:title`, `og:description`, `og:url`, `og:image` (if `image` in frontmatter)

OG image specs:
- Dimensions: 1200×630px (16:9)
- Format: PNG
- File size: <200KB
- Content: title text overlay + brand colors + logo

#### Step 3.18 — Twitter Card tags

**Global** (Step 3.11 handles): `twitter:card` = `summary_large_image`, `twitter:image`
**Per-page** (auto from frontmatter): `twitter:title`, `twitter:description`

#### Step 3.19 — Medium canonical URL (cross-posting SEO)

The Medium article's frontmatter `canonical_url` (Step 2.1) points back to the docs site:

```yaml
canonical_url: "https://odere-pro.github.io/sdlc-factory-guide/"
```

This ensures:
- Google credits the docs site as primary source
- No duplicate content penalty
- Medium shows "Originally published at odere-pro.github.io"
- All backlink value flows to your domain

#### Step 3.20 — `static/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://odere-pro.github.io/sdlc-factory-guide/sitemap.xml
```

#### Step 3.21 — Performance SEO (Core Web Vitals)

**LCP optimization** (<2.5s target):
- System font stack in CSS (no external font requests)
- Preconnect hints in `headTags` if any external resources needed
- Images: `loading="lazy"`, explicit `width`/`height` attributes
- Enable `future.faster` Docusaurus options (Step 3.2)

**CLS optimization** (<0.1 target):
- All images have explicit dimensions
- No layout-shifting ads or dynamic content
- Font `display: swap` if custom fonts used

**FID optimization** (<100ms target):
- Docusaurus static HTML = minimal JS blocking
- Code-split by page (Docusaurus default)

#### Step 3.22 — Analytics (optional, recommend for SEO tracking)

In `docusaurus.config.ts` → preset → `gtag`:

```ts
gtag: {
  trackingID: 'G-XXXXXXXXXX',  // User to fill in their GA4 ID
  anonymizeIP: true,
},
```

If no GA4 account yet, leave commented out — can be added later without rebuild.

#### Step 3.23 — SEO verification checklist

After build, verify:
- `build/sitemap.xml` exists and contains all doc URLs + locale variants
- `build/robots.txt` exists and references sitemap
- Every HTML page has `<link rel="canonical">`
- Every HTML page has `hreflang` tags for all 11 locales
- Every HTML page has `og:title`, `og:description`, `og:image`, `og:url`
- Every HTML page has `twitter:card`, `twitter:image`
- JSON-LD `WebSite` schema present on every page (via `headTags`)
- JSON-LD `TechArticle` schema on each doc page (via `<head>` blocks)
- Run [Google Rich Results Test](https://search.google.com/test/rich-results) on the deployed site
- Run [PageSpeed Insights](https://pagespeed.web.dev/) — target green scores (90+) on all metrics
- Run [Schema.org Validator](https://validator.schema.org/) on sample pages

---

### Phase 3E — CI/CD with Quality Gates (Steps 3.24–3.27)

#### Step 3.24 — `.github/workflows/pr-check.yml` (PR Quality Gates)

**Trigger**: `pull_request` to `main`

**Jobs**:

1. **lint-markdown** (~30s)
   - Checkout → Node 20 → `npm ci`
   - `npx markdownlint-cli2 "docs/**/*.md"`
   - Config: `.markdownlintrc.json`

2. **spell-check** (~30s, *parallel with lint-markdown*)
   - `npx cspell "docs/**/*.md" --no-progress`
   - Config: `cspell.json`

3. **build-validation** (~2min, *parallel with above*)
   - `npm run build` — catches broken links, invalid frontmatter, MDX errors
   - Also validates sitemap generation, SEO meta in output

4. **link-check** (*depends on build-validation*)
   - Run link checker on `build/` output
   - Check external URLs with timeout/retry

**Branch protection**: all 4 jobs must pass before merge.

#### Step 3.25 — `.github/workflows/deploy.yml` (Build + Deploy)

**Trigger**: `push` to `main`

**Permissions**: `pages: write`, `id-token: write`, `contents: read`

**Jobs**:

1. **build** (~3min)
   - Checkout → Node 20 → `npm ci` (with npm cache)
   - `npm run build` — builds all locales
   - `actions/upload-pages-artifact@v3` — upload `build/`

2. **deploy** (*depends on build*)
   - `actions/configure-pages@v5`
   - `actions/deploy-pages@v4`
   - Environment: `github-pages`

**GitHub repo settings**:
- Settings → Pages → Source: GitHub Actions
- Settings → Branches → Branch protection on `main`: require status checks

#### Step 3.26 — `.markdownlintrc.json`

```json
{
  "default": true,
  "MD013": false,
  "MD033": false,
  "MD041": false
}
```

- `MD013: false` — disable line length (docs have long lines)
- `MD033: false` — allow inline HTML (Docusaurus `<head>` blocks, JSX)
- `MD041: false` — first line needn't be H1 (frontmatter comes first)

#### Step 3.27 — `cspell.json`

```json
{
  "version": "0.2",
  "language": "en",
  "words": [
    "docusaurus", "karpathy", "sdlc", "agentic", "CLAUDE", "AGENTS",
    "fastapi", "sqlalchemy", "alembic", "pytest", "httpx", "structlog",
    "ruff", "codex", "copilot", "windsurf", "jetbrains", "hotjar",
    "frontmatter", "hreflang", "sitemap", "canonicals", "og", "FOMO",
    "derechei", "odere"
  ],
  "ignorePaths": ["node_modules", "build", "i18n"]
}
```

---

### Phase 3F — Translation Workflow (Steps 3.28–3.30)

#### Step 3.28 — Generate translation stubs

```bash
npx docusaurus write-translations --locale sv
npx docusaurus write-translations --locale uk
npx docusaurus write-translations --locale es
npx docusaurus write-translations --locale de
npx docusaurus write-translations --locale fr
npx docusaurus write-translations --locale ja
npx docusaurus write-translations --locale zh-Hans
npx docusaurus write-translations --locale pt-BR
npx docusaurus write-translations --locale ko
npx docusaurus write-translations --locale hi
```

Generates per locale:
- `i18n/{locale}/docusaurus.json` — UI strings (navbar, footer, theme)
- `i18n/{locale}/code.json` — code block labels

#### Step 3.29 — Create translation content skeleton

For each locale, create `i18n/{locale}/docusaurus-plugin-content-docs/current/` with copies of all 10 doc files. Initially English copies — stubs for future translation.

**Translation priority**:
1. `intro.md` + `checklist.md` (highest traffic)
2. `rule-file.md` + `context-engineering.md` (most shared)
3. Remaining 6 parts

#### Step 3.30 — Translation workflow process

1. Author writes/updates English in `docs/`
2. PR check validates build
3. Merge triggers deploy
4. Translation task (separate PR per locale):
   - AI-generate initial translation
   - Human review for accuracy
   - PR with only `i18n/{locale}/` changes
   - Same quality gates apply
5. Merge translation PR → rebuild with updated locale

**Content reuse note**: English `docs/` files are NOT duplicated for English — Docusaurus serves them directly. Only non-English locales get copies in `i18n/`. The `docusaurus.json` UI strings are the lightweight part; the full doc copies in `i18n/{locale}/docusaurus-plugin-content-docs/current/` are the heavy part but required by Docusaurus architecture.

---

## Relevant Source Files (read-only)

- `raw/index.md` — intro, series overview
- `raw/00-sdlc-todolist.md` — checklist → README + Medium TL;DR
- `raw/01-rule-file.md` — Part 1 + CLAUDE.md example
- `raw/02-context-engineering.md` — Part 2 + skill example
- `raw/03-verification.md` — Part 3 + pytest + eval examples
- `raw/04-running-the-work.md` — Part 4 + modes/agents
- `raw/05-review-and-ship.md` — Part 5 + hook example
- `raw/06-controlling-cost.md` — Part 6 + routing config (convert table→list for Medium)
- `raw/07-production-agents.md` — Part 7 + multi-agent
- `raw/08-team-standard.md` — Part 8 + CI gate example

## Files to Create (~40 files)

- `dist/linkedin/linkedin-post.txt`
- `dist/medium/medium-article.md`
- `dist/github/README.md`
- `dist/github/package.json`
- `dist/github/docusaurus.config.ts`
- `dist/github/sidebars.ts`
- `dist/github/tsconfig.json`
- `dist/github/babel.config.js`
- `dist/github/.markdownlintrc.json`
- `dist/github/cspell.json`
- `dist/github/.github/workflows/deploy.yml`
- `dist/github/.github/workflows/pr-check.yml`
- `dist/github/docs/` — 10 markdown files
- `dist/github/src/css/custom.css`
- `dist/github/src/pages/index.tsx`
- `dist/github/static/img/logo.svg`
- `dist/github/static/img/favicon.ico`
- `dist/github/static/img/og-image.png`
- `dist/github/static/robots.txt`
- `dist/github/i18n/{locale}/docusaurus.json` × 10
- `dist/github/i18n/{locale}/code.json` × 10

---

## Verification Summary

| Check | Tool/Method | Pass Criteria |
|-------|-------------|---------------|
| LinkedIn char count | `wc -c` | ≤3000 chars |
| LinkedIn hook | Manual | First ~210 chars compelling |
| Medium frontmatter | YAML parse | title ≤60, desc ≤160, 5 tags, canonical present |
| Medium format | Grep | 0 tables, ≥6 code blocks, `---` separators, single H1 |
| Docusaurus build | `npm run build` | Exit 0, 0 broken links |
| Markdown lint | `npm run lint:md` | Exit 0 |
| Spell check | `npm run lint:spell` | Exit 0 |
| Sitemap | Check `build/sitemap.xml` | Exists, all doc URLs + locales |
| robots.txt | Check `build/robots.txt` | Exists, references sitemap |
| Canonical tags | Inspect HTML | Every page has `<link rel="canonical">` |
| hreflang tags | Inspect HTML | All 11 locales linked |
| OG tags | Inspect HTML | `og:title`, `og:description`, `og:image`, `og:url` |
| Twitter tags | Inspect HTML | `twitter:card`, `twitter:image` |
| JSON-LD | Schema validator | WebSite + TechArticle schemas valid |
| Dark/light/auto | Browser toggle | All 3 modes work |
| Language switcher | Click dropdown | All 11 locales listed |
| PageSpeed | pagespeed.web.dev | All scores 90+ |
| Rich Results | Google tool | Structured data detected |
| README render | GitHub preview | Checkboxes + links work |

---

## Decisions

- **Framework**: Docusaurus 3
- **Hosting**: GitHub Pages via GitHub Actions
- **URL**: `odere-pro.github.io/sdlc-factory-guide`
- **Languages**: 11 locales (en + 10)
- **Search**: `@easyops-cn/docusaurus-search-local`
- **License**: Apache-2.0
- **Blog**: disabled
- **Analytics**: GA4 via `gtag` (optional, user fills ID)
- **Karpathy**: general Software 3.0 reference
- **Medium depth**: full 8-part deep dive
- **Medium canonical**: points to docs site (SEO credit to you)
- **Translation launch**: English-only, stubs for all locales
- **Content dedup**: `docs/` = English source; translations = managed copies in `i18n/`; Medium = standalone rewrite
- **Performance**: system fonts, `future.faster`, lazy images, no external CSS

---

## Execution Order

```
Phase 1 (LinkedIn)  ────────────────┐
                                    ├──→ Phase 1+2 complete
Phase 2 (Medium)    ────────────────┘
         ↑ parallel ↑

Phase 3A (Scaffold: 3.1-3.6) ──┬──→ Phase 3B (Content: 3.7-3.8) ──→ Phase 3C (README: 3.9)
                                │
                                ├──→ Phase 3D (SEO: 3.10-3.23)  ← parallel with 3B
                                │
                                ├──→ Phase 3E (CI/CD: 3.24-3.27) ← parallel with 3B
                                │
                                └──→ Phase 3F (i18n: 3.28-3.30)  ← parallel with 3B

Final: Verification (all checks from table above)
```
