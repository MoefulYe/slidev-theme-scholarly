---
title: Basic Layouts
---

# Basic Layouts

**What is a layout?**
A layout is like a slide template in PowerPoint. It determines how content is arranged on the slide.

## How to Choose a Layout

At the top of each slide, add:

```yaml
---
layout: layout-name
---
```

If you don't specify a layout, Slidev uses the `default` layout automatically.

## Available Layouts

### 1️⃣ **cover** - Title Slide

**Use for:** The first slide of your presentation

```markdown
---
layout: cover
authors:
  - name: Your Name
    institution: Your University
    email: you@example.edu
footerMiddle: Conference Name 2025
---

# Your Presentation Title
Subtitle or description
```

**What it shows:**

- Large title in the center
- Author(s) with institution and email
- Footer with author, conference, and page number


---

### 2️⃣ **default** - Standard Content

**Use for:** Most of your slides (this is automatic!)

```markdown
---
title: My Slide Title
subtitle: Optional subtitle
---

# Main Content

- Bullet point 1
- Bullet point 2

You can add text, images, code, math formulas, etc.
```

**What it shows:**

- Optional header with title and subtitle
- Your content in the middle
- Footer at the bottom

---

### 3️⃣ **intro** - Section Introduction

**Use for:** Starting a new section of your talk

```markdown
---
layout: intro
---

# Part 2: Methodology

Let's discuss our approach
```

**What it shows:**

- Large, centered text
- No header (more space for the title)
- Footer at the bottom

---

### 4️⃣ **section** - Chapter Divider

**Use for:** Major transitions in your presentation

```markdown
---
layout: section
---

# Results
```

**What it shows:**

- Very large, centered title
- No header
- Footer at the bottom
- Perfect for dramatic section breaks

---

### 5️⃣ **center** - Centered Content

**Use for:** Short messages or key points

```markdown
---
layout: center
---

# Key Takeaway

This is the most important point
```

**What it shows:**

- All content centered horizontally and vertically
- Great for emphasis

---

### 6️⃣ **quote** - Quotations

**Use for:** Highlighting quotes

```markdown
---
layout: quote
---

> "The only way to do great work is to love what you do."
> 
> — Steve Jobs
```

**What it shows:**

- Large, styled quote
- Attribution below

---

### 7️⃣ **fact** - Single Fact/Statistic

**Use for:** Highlighting important numbers or facts

```markdown
---
layout: fact
---

# 95%

Success rate of our method
```

**What it shows:**

- Very large number or short text
- Smaller description below

---

### 8️⃣ **statement** - Important Statement

**Use for:** Highlighting key statements

```markdown
---
layout: statement
---

# Our method achieves state-of-the-art results

Outperforming all previous approaches
```

**What it shows:**

- Large statement text, centered
- Medium width for readability

---

### 9️⃣ **image-left** - Image on Left, Text on Right

**Use for:** Explaining visuals with text

```markdown
---
layout: image-left
image: ./path/to/image.png
---

# Experimental Setup

- Equipment A
- Equipment B  
- Equipment C

Description of the setup...
```

**What it shows:**

- Full-height image on the left half
- Your content on the right half

---

### 🔟 **image-right** - Image on Right, Text on Left

**Use for:** Text with supporting visual

```markdown
---
layout: image-right
image: https://example.com/image.jpg
---

# Results Analysis

Our findings show...

- Finding 1
- Finding 2
```

**What it shows:**

- Your content on the left half
- Full-height image on the right half

---

### 1️⃣1️⃣ **two-cols** - Two Columns

**Use for:** Comparing or showing parallel content

```markdown
---
layout: two-cols
---

# Method A

- Advantage 1
- Advantage 2
- Advantage 3

::right::

# Method B

- Advantage 1
- Advantage 2
- Advantage 3
```

**What it shows:**

- Left column content (before `::right::`)
- Right column content (after `::right::`)
- Equal width columns

---

## New Layouts (v2.0)

See [New Layouts](./09-new-layouts.md) for detailed documentation of the 6 new layouts:

- **focus** - Highlight key statements with icons
- **compare** - Side-by-side comparisons
- **bullets** - Enhanced list styling
- **figure** - Academic figures with captions
- **references** - Bibliography format
- **end** - Thank you slide with contact info
