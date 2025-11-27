---
theme: ./
footerMiddle: Slidev Theme Scholarly
description: Presentation slides for scholars
aspectRatio: 4/3
lang: en
theoremNumberFormat: '{number}'
bibFile: ./references.bib
bibStyle: apa
authors:
  - name: First Author
    institution: Your University
    email: first@example.edu
  - name: Second Author
    institution: Another University
    email: second@example.edu
  - name: Third Author
    institution: Third University
    email: third@example.edu
---

# Slidev Theme Scholarly

Presentation slides for scholars

<!--
This example demonstrates all features of the Scholarly theme.

GLOBAL CONFIGURATION (applies to all slides):
- authors: List of authors with name, institution, email
- footerMiddle: Conference name or event
- theoremNumberFormat: Format for theorem numbers
- lang: Language for theorem components
- bibFile: Path to BibTeX file for citations
- bibStyle: Citation style (apa, harvard1, vancouver, ieee, mla, chicago-author-date)
-->

---
layout: intro
---

<!--
LAYOUT: intro
PURPOSE: Introduction or agenda slide
-->

# What is Slidev?

Slidev is a slide maker and presentation tool designed for developers. It includes the following features:

- 📝 **Text-based** - focus on your content with Markdown, then style it later
- 🎨 **Themable** - themes can be shared and reused as npm packages
- 🧑‍💻 **Developer Friendly** - code highlighting, live coding with autocompletion
- 🤹 **Interactive** - embed Vue components to enhance your expressions
- 🎥 **Recording** - built-in recording and camera view
- 📤 **Portable** - export to PDF, PPTX, PNGs, or even a hostable SPA
- 🛠 **Hackable** - virtually anything that's possible on a webpage is possible in Slidev

<br/>

Read more about [Why Slidev?](https://sli.dev/guide/why)

---
layout: section
---

<!--
LAYOUT: section
PURPOSE: Mark the beginning of a new section
-->

# Part 1: Basic Layouts

## Essential layouts for academic presentations

---
layout: default
title: Default Layout
subtitle: Standard Content Slide
---

<!--
LAYOUT: default
PURPOSE: Standard slide for regular content
-->

## Keyboard Shortcuts

|     |     |
| --- | --- |
| <kbd>space</kbd> / <kbd>tab</kbd> / <kbd>right</kbd> | next animation or slide |
| <kbd>left</kbd>  / <kbd>shift</kbd><kbd>space</kbd> | previous animation or slide |
| <kbd>up</kbd> | previous slide |
| <kbd>down</kbd> | next slide |

---
layout: center
title: Center Layout
subtitle: Centered Content
---

<!--
LAYOUT: center
PURPOSE: Center important content on the slide
-->

## Centered Content

This layout is perfect for important statements or key messages.

All content is vertically and horizontally centered.

---
layout: quote
---

<!--
LAYOUT: quote
PURPOSE: Display memorable quotes
-->

Life is like a box of chocolates. You never know what you're gonna get.

— Forrest Gump

---
layout: fact
---

<!--
LAYOUT: fact
PURPOSE: Highlight a single statistic or fact
-->

# 100%

Academic Excellence

---
layout: statement
---

<!--
LAYOUT: statement
PURPOSE: Make a bold, impactful statement
-->

# Important Statement

This layout is designed for impactful statements that need emphasis.

---
layout: section
---

# Part 2: Multi-Column Layouts

## Layouts with images and columns

---
layout: two-cols
ratio: "2:3"
title: Two Columns Layout
subtitle: Configurable Ratio
---

<!--
LAYOUT: two-cols
- ratio: Column width ratio, e.g., "1:1", "2:3"
-->

## Left Column (2fr)

This column takes 2 parts of the width.

- Point 1
- Point 2
- Point 3

::right::

## Right Column (3fr)

This column takes 3 parts of the width.

\`\`\`python
def hello():
    print("Hello World!")
    
# Code example
for i in range(10):
    hello()
\`\`\`

---
layout: image-left
image: https://cover.sli.dev
ratio: "1:2"
title: Image Left Layout
subtitle: Configurable Ratio
---

<!--
LAYOUT: image-left
- ratio: Image:content ratio
- fit: cover, contain, fill
-->

## Content on Right (2fr)

The image takes 1 part, content takes 2 parts.

When you use `image-left` layout:

- Image fills the left side
- Content appears on the right
- Ratio is configurable now!

\`\`\`ts
const ratio = "1:2" // image:content
\`\`\`

---
layout: image-right
image: https://cover.sli.dev
ratio: "3:2"
fit: contain
title: Image Right Layout
subtitle: With Configurable Options
---

<!--
LAYOUT: image-right
Same features as image-left but reversed
-->

## Content on Left (3fr)

The content takes 3 parts, image takes 2 parts.

Features:
- `ratio` - control image:content ratio
- `fit` - cover, contain, or fill
- `position` - image position

The image uses `fit: contain` to show the full image.

---
layout: section
---

# Part 3: Components

## Built-in components for academic content

---
layout: default
title: Block Component
subtitle: Beamer-style Blocks
---

<!--
COMPONENT: <Block>
TYPES: default, info, success, warning, danger, example
-->

## Block Component

<Block type="default" title="Default Block">

This is a default block with Beamer-style gradient header.

</Block>

<Block type="info" title="Information">

Use info blocks for general information and explanations.

</Block>

<Block type="warning" title="Warning">

Use warning blocks for important notes and cautions.

</Block>

---
layout: default
title: More Block Types
---

## More Block Styles

<Block type="success" title="Success">

Use success blocks for positive outcomes and confirmations.

</Block>

<Block type="danger" title="Danger">

Use danger blocks for critical warnings and errors.

</Block>

<Block type="example" title="Example">

Use example blocks for demonstrations and code samples.

</Block>

---
layout: default
title: Theorem Component
subtitle: Mathematical Statements
---

<!--
COMPONENT: <Theorem>
PURPOSE: Display mathematical theorems with auto-numbering
-->

## Mathematical Theorems

<Theorem type="theorem" title="Pythagorean Theorem">

For a right triangle with legs \(a\) and \(b\), and hypotenuse \(c\), we have:

$$a^2 + b^2 = c^2$$

</Theorem>

<Theorem type="lemma">

All continuous functions on a closed interval are uniformly continuous.

</Theorem>

---
layout: default
title: Definitions and Examples
---

## Definitions and Examples

<Theorem type="definition" title="Limit">

Let the function $f$ be defined on an open interval containing point $a$. If for any $\epsilon > 0$, there exists a $\delta > 0$ such that when $0 < |x - a| < \delta$, we have $|f(x) - L| < \epsilon$, then we say $\lim_{x \to a} f(x) = L$.

</Theorem>

<Theorem type="example">

Consider the function $f(x) = x^2$:

- $f(0) = 0$
- $f(1) = 1$
- $f(2) = 4$

</Theorem>

---
layout: default
title: Proof and Note Types
---

## Proof and Note Types

<Theorem type="claim" title="Bounded Sequence">

Every bounded sequence in $\mathbb{R}^n$ has a convergent subsequence.

</Theorem>

<Theorem type="proof">

We prove this by the Bolzano-Weierstrass theorem. Since the sequence is bounded, it lies within a compact set. By sequential compactness, there exists a convergent subsequence. $\square$

</Theorem>

<Theorem type="note">

This is a fundamental result in real analysis and is essential for proving many convergence theorems.

</Theorem>

---
layout: default
title: Compact Theorem Mode
---

## Compact Mode for Dense Content

<Theorem type="theorem" :compact="true">

For $n \geq 1$, we have $\sum_{k=1}^{n} k = \frac{n(n+1)}{2}$.

</Theorem>

<Theorem type="proof" :compact="true">

By induction on $n$. Base case $n=1$ is trivial. Assume true for $n$, then $\sum_{k=1}^{n+1} k = \sum_{k=1}^{n} k + (n+1) = \frac{n(n+1)}{2} + (n+1) = \frac{(n+1)(n+2)}{2}$. $\square$

</Theorem>

<Theorem type="corollary" :compact="true">

The sum of the first $n$ positive integers is always a triangular number.

</Theorem>

---
layout: default
title: Custom Numbering
subtitle: Override auto-numbering
---

## Custom Numbering

<Theorem type="theorem" number="3.1" title="Special Case">

Sometimes we need to use specific numbering, such as 3.1 to represent the first theorem in chapter 3.

</Theorem>

<Theorem type="theorem" :autoNumber="false" title="Unnumbered Theorem">

This theorem has no number because `autoNumber={false}` is set.

</Theorem>

---
layout: default
title: Highlight Component
---

<!--
COMPONENT: <Highlight>
TYPES: primary, success, warning, danger, info
-->

## Highlighting Important Content

The <Highlight>key concept</Highlight> here is that you can easily highlight text inline.

Different highlight types:
- <Highlight type="primary">Primary highlight</Highlight> for main concepts
- <Highlight type="success">Success highlight</Highlight> for positive points
- <Highlight type="warning">Warning highlight</Highlight> for cautions
- <Highlight type="danger">Danger highlight</Highlight> for critical items
- <Highlight type="info">Info highlight</Highlight> for general info

This makes your slides more <Highlight type="success">readable</Highlight> and <Highlight type="primary">engaging</Highlight>!

---
layout: section
---

# Part 4: Advanced Features

## Font size customization and auto-centering

---
fontsize:
  body: 20px
  h1: 48px
  h2: 36px
  h3: 28px
---

<!--
FEATURE: Custom font sizes per slide
-->

# This H1 Should Be 48px

## This H2 Should Be 36px

### This H3 Should Be 28px

Notice that even without specifying `layout: default`, this slide:

- Uses the default layout automatically
- Shows the footer with author information
- **Body text is 20px, H1 is 48px, H2 is 36px, H3 is 28px**

This demonstrates that **all fontsize configuration works correctly**!

---
layout: auto-center
title: Auto Center Layout
subtitle: Auto-adjusting font size
---

<!--
LAYOUT: auto-center
PURPOSE: Automatically adjust font size and center vertically
-->

## Auto-Centered Content

This layout automatically:

- Adjusts font size to fit content
- Centers content vertically
- Keeps text left-aligned within the centered block

### Example Use Cases

1. Slides with varying content length
2. Content that needs to "fill" the space
3. Dynamic content from data sources

---
layout: auto-center
---

## Short Content Test

Just a few lines of text.

This should display with a larger font size since there's less content.

---
layout: auto-center
title: Dense Content Test
---

## This Slide Has More Content

- Point 1: Lorem ipsum dolor sit amet
- Point 2: Consectetur adipiscing elit
- Point 3: Sed do eiusmod tempor incididunt
- Point 4: Ut labore et dolore magna aliqua
- Point 5: Ut enim ad minim veniam
- Point 6: Quis nostrud exercitation ullamco
- Point 7: Laboris nisi ut aliquip ex ea commodo consequat

The font size should automatically decrease to fit all this content while keeping it centered.

---
layout: default
title: Citations
subtitle: Academic Reference Support
---

<!--
FEATURE: Academic citations using BibTeX
- Configure in frontmatter: bibFile, bibStyle
- @citekey for parenthetical citations (Author, Year)
- !@citekey for narrative citations: Author (Year)
- [[bibliography]] marker generates reference list
-->

## Citation Examples

Deep learning has revolutionized many fields @lecun2015deep.

!@vaswani2017attention introduced the Transformer architecture, which has become foundational in NLP.

Multiple works have contributed to this area @smith2023deep @wang2022attention.

For a comprehensive introduction, see @bishop2006pattern.

---
layout: references
---

<!--
LAYOUT: references
PURPOSE: Display bibliography/references

For long reference lists, you can split across multiple pages:
- perPage: Number of references per page
- page: Current page number (1, 2, 3, ...)

Example for page 1:
layout: references
perPage: 3
page: 1

Example for page 2:
layout: references
perPage: 3
page: 2
title: "References (continued)"
-->

[[bibliography]]

---
layout: center
---

## Thank You

Questions?

[Documentation](https://sli.dev) / [GitHub Repo](https://github.com/jxpeng98/slidev-theme-scholarly)
