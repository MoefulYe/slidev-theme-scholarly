---
title: Advanced Layouts
---

# Advanced Layouts

This version introduces 6 new layouts designed for academic presentations, each with distinct visual styles.

## focus - Focused Statement

Highlight a single important statement or question with an icon and color accent.

```markdown
---
layout: focus
color: blue
icon: 🎯
---

# Research Question

How can we improve model accuracy while reducing computational cost?
```

**Props:**
- `color`: `blue`, `green`, `amber`, `red`, `purple` (default: `blue`)
- `icon`: Any emoji or text (default: none)

---

## compare - Side-by-Side Comparison

Compare two approaches, methods, or concepts with labeled columns.

```markdown
---
layout: compare
title: Traditional vs. Our Approach
leftLabel: Traditional Methods
rightLabel: Our Approach
leftColor: red
rightColor: green
---

### Limitations
- High computational cost
- Long training time

::right::

### Advantages
- 50% less computation
- 3x faster training
```

**Props:**
- `title`: Main title
- `subtitle`: Optional subtitle
- `leftLabel`, `rightLabel`: Column labels
- `leftColor`, `rightColor`: `red`, `green`, `blue`, `amber`, `purple`

---

## bullets - Enhanced List

Professional bullet point styling with custom markers.

```markdown
---
layout: bullets
title: Key Points
subtitle: Summary
---

## Main Findings

- **Point 1** - Description
- **Point 2** - Description
- **Point 3** - Description
```

**Features:**
- Custom bullet markers (▸)
- Numbered lists with circular badges
- Nested list support

---

## figure - Academic Figure

Display figures with proper academic captions and labels.

```markdown
---
layout: figure
src: ./images/architecture.png
caption: Overview of our proposed system architecture.
label: "Figure 1:"
title: System Architecture
height: 60%
---

Additional description below the figure.
```

**Props:**
- `src`: Image URL or path
- `caption`: Figure caption
- `label`: Label prefix (e.g., "Figure 1:")
- `title`: Slide title
- `subtitle`: Optional subtitle
- `height`: Image height (default: `60%`)
- `fit`: `contain`, `cover`, `fill` (default: `contain`)

---

## references - Bibliography

Display references in academic format. Automatically generates bibliography from BibTeX citations.

```markdown
---
layout: references
---

[[bibliography]]
```

**For long reference lists, use pagination:**

```markdown
---
layout: references
perPage: 5
page: 1
---

[[bibliography]]

---
layout: references
perPage: 5
page: 2
title: "References (continued)"
---

[[bibliography]]
```

**Manual references (without BibTeX):**

```markdown
---
layout: references
---

1. **Smith et al.** (2024). *Efficient Deep Learning*. Nature MI.

2. **Johnson & Williams** (2023). *Green AI*. ICML.

3. **Chen et al.** (2023). *Edge Computing*. NeurIPS.
```

**Props:**

- `page`: Current page number (for pagination)
- `perPage`: Number of references per page
- `title`: Custom title (default: "References" or "References (cont.)")

**Features:**

- Automatic numbered reference styling
- Clean academic typography
- Auto-adjusting font size based on content

---

## end - Thank You Slide

Professional closing slide with contact information.

```markdown
---
layout: end
email: jane@stanford.edu
website: https://example.com/project
subtitle: Questions?
qrcode: https://example.com/qr.png
qrcodeLabel: Scan for paper
---

Thank you for your attention!
```

**Props:**
- `thankYou`: Custom thank you text (default: "Thank You!")
- `subtitle`: Subtitle text
- `email`: Contact email
- `website`: Project/personal website
- `qrcode`: QR code image URL
- `qrcodeLabel`: Label for QR code

---

## Redesigned Layouts

### fact - Gradient Number Display

Now features large gradient-colored numbers with decorative elements.

```markdown
---
layout: fact
color: green
---

# 94.7%

Accuracy on benchmark dataset
```

**Props:**
- `color`: `blue`, `green`, `amber`, `red`, `purple` (default: `blue`)

### statement - Quote Style

Now displays as a quote with decorative quotation marks and author attribution.

```markdown
---
layout: statement
author: Einstein
---

# Imagination is more important than knowledge

The true sign of intelligence is not knowledge but imagination.
```

**Props:**
- `author`: Attribution text
