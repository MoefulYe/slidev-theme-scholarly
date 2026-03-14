---
title: Academic Layouts
---

# Academic Layouts

Specialized layouts designed for academic presentations - research methodology, results, comparisons, and references.

## compare - Side-by-Side Comparison

**Use for:** Compare two approaches, methods, or concepts with labeled columns

![Compare Layout Example](/images/layouts/compare.png)

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

## methodology - Research Methodology

**Use for:** Two-column layout for presenting research methods with diagrams

![Methodology Layout Example](/images/layouts/methodology.png)

```markdown
---
layout: methodology
ratio: "1:1"
title: Research Methodology
---

## Our Approach

1. Data Collection
2. Feature Extraction
3. Model Training

::right::

![Diagram](./diagram.png)
```

**Props:**
- `ratio`: Column ratio (default: "1:1")
- `title`, `subtitle`: Header content

---

## results - Results Dashboard

**Use for:** Grid layout for displaying multiple metrics or results

![Results Layout Example](/images/layouts/results.png)

```markdown
---
layout: results
cols: 2
title: Key Results
---

<div class="p-4 bg-white rounded shadow">
  <h3>Accuracy</h3>
  <h1>94.7%</h1>
</div>

<div class="p-4 bg-white rounded shadow">
  <h3>Speed</h3>
  <h1>2.3x</h1>
</div>
```

**Props:**
- `cols`: Number of columns (default: 2)
- `title`, `subtitle`: Header content

---

## timeline - Research Timeline

**Use for:** Display research progress or historical events in a vertical timeline format

![Timeline Layout Example](/images/layouts/timeline.png)

```markdown
---
layout: timeline
title: Research Timeline
items:
  - year: "2020"
    title: Initial Research
    description: Began exploring the problem space
  - year: "2021"
    title: Methodology Development
    description: Developed core algorithms
  - year: "2022"
    title: Validation
    description: Conducted experiments
---
```

**Props:**
- `title`: Optional title above the timeline
- `items`: Array of timeline items with `year`, `title`, and `description`

---

## agenda - Agenda Overview

**Use for:** Present your presentation outline or meeting agenda

![Agenda Layout Example](/images/layouts/agenda.png)

```markdown
---
layout: agenda
title: Today's Agenda
items:
  - Introduction and Background
  - Methodology Overview
  - Experimental Results
  - Discussion and Future Work
---
```

**Props:**
- `title`: Agenda title (default: "Agenda")
- `items`: Array of agenda item strings

---

## acknowledgments - Thank You & Credits

**Use for:** Display funding sources and collaborators

![Acknowledgments Layout Example](/images/layouts/acknowledgments.png)

```markdown
---
layout: acknowledgments
title: Acknowledgments
funders:
  - National Science Foundation
  - Department of Energy
collaborators:
  - MIT AI Lab
  - Stanford NLP Group
---

Special thanks to all contributors.
```

**Props:**
- `title`: Section title (default: "Acknowledgments")
- `funders`: Array of funding organization names
- `collaborators`: Array of collaborator names

---

## references - Bibliography

**Use for:** Display references in academic format. Automatically generates bibliography from BibTeX citations.

![References Layout Example](/images/layouts/references.png)

```markdown
---
layout: references
---
```

**For long reference lists, use pagination:**

```markdown
---
layout: references
perPage: 5
page: 1
---

---
layout: references
perPage: 5
page: 2
title: "References (continued)"
---
```

If you want the bibliography to appear at a specific point inside the slide, add `[[bibliography]]` manually at that exact position.

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
