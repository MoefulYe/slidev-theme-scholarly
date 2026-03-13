---
title: Quick Start
---

# Quick Start

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

## Step 1: Create a presentation with CLI (Recommended)

```bash
# One-time usage (no global install needed)
npx -y --package slidev-theme-scholarly sch init my-talk

# Alternative short alias
npx -y --package slidev-theme-scholarly sts init my-talk
```

Available templates:

```bash
npx -y --package slidev-theme-scholarly sch template list
```

Use a specific template:

```bash
npx -y --package slidev-theme-scholarly sch init my-talk --template academic
```

Useful CLI commands:

```bash
# help
npx sch help
npx sch help theme

# theme-specific discovery
npx sch theme list
npx sch layout list
npx sch component list
npx sch snippet list

# apply a Scholarly preset to frontmatter
npx sch theme apply cambridge-green --font elegant --file slides.md
npx sch theme preset apply cambridge --file slides.md

# insert Scholarly snippet blocks
npx sch snippet append theorem --file slides.md
npx sch snippet append methodology --file slides.md

# append a full academic workflow skeleton
npx sch workflow list
npx sch workflow apply paper --file slides.md

# add the Scholarly Vite citation bridge to an existing project
npx sch setup vite

# environment checker (with Scholarly checks)
npx sch doctor
```

## Step 2: Install dependencies and run

```bash
cd my-talk
pnpm install
pnpm run dev
```

Your browser will open automatically with live preview.

The generated starter includes a root `vite.config.ts` that keeps Scholarly citations compatible across Slidev versions.

## Step 3: Edit `slides.md`

The generated project already includes a ready-to-use `slides.md`.

## Manual setup (if you already have a Slidev project)

Install theme dependency:

```bash
npm i -D slidev-theme-scholarly
```

The install step also prints a reminder to run `npx sch setup vite` when you are wiring Scholarly into an existing project.

Set your Slidev frontmatter:

```markdown
---
theme: scholarly
---
```

Then run:

```bash
npx slidev
```

If you want Scholarly's citation bridge in an existing project, the recommended path is:

```bash
npx sch setup vite
```

This creates a root `vite.config.ts` when none exists, or reuses the detected `vite.config.*`. It will not overwrite an unrelated existing Vite config unless you pass `--force`.

If you prefer to wire it up manually, add:

```ts
import { defineConfig } from 'vite'
import { setupScholarlyCitationMarkdown } from 'slidev-theme-scholarly/citation-vite'

export default defineConfig({
  slidev: {
    markdown: {
      markdownSetup(md) {
        setupScholarlyCitationMarkdown(md)
      },
      markdownItSetup(md) {
        setupScholarlyCitationMarkdown(md)
      },
    },
  },
})
```
