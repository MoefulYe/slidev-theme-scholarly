---
title: Quick Start
---

# Quick Start

## Step 1: Install Slidev

First, make sure you have [Node.js](https://nodejs.org/) installed (download from nodejs.org). Then open your terminal (Command Prompt on Windows, Terminal on Mac/Linux) and run:

::: code-group

```bash [npm]
npm install -g @slidev/cli
```

```bash [yarn]
yarn global add @slidev/cli
```

```bash [pnpm]
pnpm add -g @slidev/cli
```

:::

> **What does this do?** It installs Slidev on your computer so you can use it anywhere.

### Step 2: Create Your First Presentation

```bash
# Create a new folder for your presentation
mkdir my-talk
cd my-talk

# Create your slides file
echo "---
theme: scholarly
---

# My First Academic Talk

Your name here

---

# Introduction

- Point 1
- Point 2
- Point 3
" > slides.md
```

### Step 3: Preview Your Presentation

```bash
slidev slides.md
```

Your browser will open automatically showing your presentation! Press the right arrow key to move between slides.

> **Tip:** Keep the terminal running. Any changes you make to `slides.md` will show up immediately in your browser!
