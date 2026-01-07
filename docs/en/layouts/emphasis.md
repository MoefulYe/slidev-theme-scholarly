---
title: Emphasis Layouts
---

# Emphasis Layouts

Layouts for highlighting key messages, quotes, and statistics.

## quote - Quotations

**Use for:** Highlighting memorable quotes

![Quote Layout Example](/images/layouts/quote.png)

```markdown
---
layout: quote
author: Richard Feynman
source: The Character of Physical Law, 1965
---

The first principle is that you must not fool yourself.
```

**Props:**
- `author`: Quote attribution
- `source`: Source of the quote (book, speech, etc.)

**What it shows:**

- Large, styled quote with decorative quotation marks
- Attribution below

---

## fact - Single Statistic

**Use for:** Highlighting important numbers or facts

![Fact Layout Example](/images/layouts/fact.png)

```markdown
---
layout: fact
color: green
---

# 94.7%

Accuracy on benchmark dataset
```

**Props:**
- `color`: `primary`, `blue`, `green`, `amber`, `red`, `purple` (default: `primary`)

**What it shows:**

- Very large gradient-colored number
- Smaller description below
- Glass effect with decorative elements

---

## statement - Important Statement

**Use for:** Bold, impactful statements that need emphasis

![Statement Layout Example](/images/layouts/statement.png)

```markdown
---
layout: statement
author: Einstein
---

# Imagination is more important than knowledge

The true sign of intelligence is not knowledge but imagination.
```

**Props:**
- `author`: Attribution text (optional)

**What it shows:**

- Large statement text, centered
- Decorative quotation marks
- Medium width for readability

---

## focus - Focused Statement

**Use for:** Highlight a single important statement or question with visual emphasis

![Focus Layout Example](/images/layouts/focus.png)

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

**What it shows:**

- Large icon (if specified)
- Color-accented main message
- Supporting text below
