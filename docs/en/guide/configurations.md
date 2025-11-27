---
title: Configuration Guide
---

# Configuration Guide

## Setting Up Your Presentation

At the very top of your `slides.md` file, add a configuration section:

```yaml
---
theme: scholarly
lang: en  # or 'zh' for Chinese
footerMiddle: Conference Name 2025
authors:
  - name: Jane Smith
    institution: MIT
    email: jane@mit.edu
  - name: John Doe
    institution: Stanford
    email: john@stanford.edu
---
```

## Configuration Options

### Basic Settings

| Option | What it does | Example |
|--------|-------------|---------|
| `theme` | Tells Slidev to use this theme | `scholarly` |
| `lang` | Language for theorems | `en` or `zh` |
| `aspectRatio` | Slide dimensions | `16/9` or `4/3` |

### Author Information

**Single author:**

```yaml
author: Jane Smith
```

**Multiple authors (recommended):**

```yaml
authors:
  - name: Jane Smith
    institution: MIT
    email: jane@mit.edu
  - name: John Doe
    institution: Stanford
```

### Footer Configuration

| Option | What it controls | Example |
|--------|-----------------|---------|
| `footerLeft` | Left side of footer | `Custom text` |
| `footerMiddle` | Middle of footer | `Conference 2025` |
| `footerRight` | Right side (auto) | Page numbers |

**Default behavior (if not specified):**

- Left: Shows author name(s)
- Middle: Empty (or your custom text)
- Right: Page numbers (automatic)

### Theorem Number Format

Customize how theorem numbers appear:

```yaml
theoremNumberFormat: '{number}'      # 1, 2, 3 (default)
theoremNumberFormat: '({number})'    # (1), (2), (3)
theoremNumberFormat: '[{number}]'    # [1], [2], [3]
theoremNumberFormat: '{number}.'     # 1., 2., 3.
```

### Font Size Configuration

You can customize font sizes globally or per-slide for the body text and headings (h1, h2, h3).

**Global font size (applies to all slides):**

```yaml
---
theme: scholarly
fontsize:
  body: 18px    # Base font size for body text
  h1: 48px      # Font size for h1 headings
  h2: 36px      # Font size for h2 headings
  h3: 28px      # Font size for h3 headings
---
```

**Per-slide font size override:**

You can override font sizes for individual slides by adding the `fontsize` configuration to that slide's frontmatter:

```markdown
---
fontsize:
  body: 20px
  h1: 50px
  h2: 40px
  h3: 30px
---

# This slide has custom font sizes

## Subtitle with custom h2 size

### Sub-subtitle with custom h3 size

Body text will be 20px on this slide.
```

**Changing font size for the cover slide only:**

Since the first slide automatically uses the cover layout and settings in the global frontmatter apply to all slides, the best way to customize only the cover slide's font size is to use inline CSS styles.

Add a `<style>` tag in the cover slide's comment section:

```markdown
---
theme: scholarly
authors:
  - name: Your Name
    institution: Your University
---

# Your Presentation Title
Subtitle text

<style>
.slidev-layout.cover h1 {
  font-size: 64px;
}

.slidev-layout.cover h2 {
  font-size: 40px;
}
</style>

---

# Introduction

This slide uses default font sizes.
```

You can customize any CSS property for the cover slide this way:

```markdown
<style>
.slidev-layout.cover h1 {
  font-size: 72px;
  color: #5d8392;
  font-weight: bold;
}

.slidev-layout.cover .author-name {
  font-size: 24px;
}

.slidev-layout.cover .author-institution {
  font-size: 20px;
}
</style>
```

**Alternative: Use fontsize for content slides:**

If you want most slides to have custom font sizes but keep the cover at default size, set `fontsize` on each content slide:

```markdown
---
theme: scholarly
---

# Cover Slide (Default large fonts)

---
fontsize:
  body: 16px
  h1: 36px
---

# Slide 2 (Custom fonts)

---
fontsize:
  body: 16px
  h1: 36px
---

# Slide 3 (Custom fonts)
```

**Flexible format:**

Font sizes accept multiple formats:

```yaml
fontsize:
  body: 18px      # pixels
  h1: 3rem        # rem units
  h2: 2.5em       # em units
  h3: 32          # number (treated as pixels)
```

**Notes:**

- All font size options are optional - you can set any combination
- Per-slide settings override global settings
- If not specified, the theme uses default font sizes optimized for each layout
- Font sizes are applied using CSS variables for maximum compatibility

## Per-Slide Settings

You can override settings for individual slides:

```markdown
---
title: Special Slide
subtitle: With custom header
---

# Content here
```
