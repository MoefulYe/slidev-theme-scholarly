---
title: Layouts
---

# Layouts

Layouts define how content is arranged on each slide. Choose the right layout to present your content effectively.

## Available Layouts

### [Basic Layouts](./basic.md)

The essential layouts for most presentations:

| Layout | Use Case |
|--------|----------|
| `cover` | Title slide |
| `default` | Standard content |
| `intro` | Section introduction |
| `section` | Chapter divider |
| `center` | Centered content |
| `quote` | Quotations |
| `fact` | Key statistics |
| `statement` | Important statements |
| `two-cols` | Two-column content |
| `image-left` | Image on left |
| `image-right` | Image on right |

### [Advanced Layouts (v2.0)](./advanced.md)

New specialized layouts for academic presentations:

| Layout | Use Case |
|--------|----------|
| `focus` | Highlight key questions |
| `compare` | Side-by-side comparison |
| `bullets` | Enhanced bullet lists |
| `figure` | Academic figures with captions |
| `references` | Bibliography |
| `end` | Thank you slide |

## How to Use

Specify a layout in the slide's frontmatter:

```markdown
---
layout: section
---

# My Section Title
```

If no layout is specified, `default` is used automatically.
