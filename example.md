---
theme: ./
footerMiddle: Slidev Theme Scholarly
description: Presentation slides for scholars
aspectRatio: 4/3
lang: en
theoremNumberFormat: '{number}'
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
  (Or use single "author: Your Name" for one author)
- footerMiddle: Conference name or event (middle section of footer)
- footerLeft: Custom text for left footer (overrides author display)
- theoremNumberFormat: Format for theorem numbers (e.g., '{number}', 'Theorem {number}')
- lang: Language for theorem components (zh, en, fr, de, es, it, ja, pt, ru)
- themeColors: Custom theme colors (primary, headerBg, footerLeftBg, etc.)

The footer automatically appears on all slides with page numbers on the right.
-->

<!-- <style>
.slidev-layout.cover h1 {
  font-size: 64px;
  color: red;
}
</style> -->

---
layout: intro
footerMiddle: Slidev Theme
---

<!--
LAYOUT: intro
PURPOSE: Introduction or agenda slide
WHEN TO USE: For outlining your presentation structure or introducing a topic

NEW FEATURES:
- align: 'left' (default) or 'center' for text alignment
- density: 'auto', 'compact', 'normal', 'relaxed' for spacing control
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
layout: default
title: Layout Optimization
subtitle: Reducing Code Duplication and Enhancing Maintainability
---

<!--
LAYOUT: default
PURPOSE: Standard slide for regular content

NEW FEATURES:
- Smart content density detection (auto-adjusts spacing based on content amount)
- density prop: 'auto' (default), 'compact', 'normal', 'relaxed'
-->

## Keyboard Shortcuts

|     |     |
| --- | --- |
| <kbd>space</kbd> / <kbd>tab</kbd> / <kbd>right</kbd> | next animation or slide |
| <kbd>left</kbd>  / <kbd>shift</kbd><kbd>space</kbd> | previous animation or slide |
| <kbd>up</kbd> | previous slide |
| <kbd>down</kbd> | next slide |

---
layout: default
title: Block Component Demo
subtitle: Beamer-style Blocks
---

<!--
NEW COMPONENT: <Block>
PURPOSE: Beamer-style colored blocks for highlighting content
TYPES: default, info, success, warning, danger, example, alert
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
layout: two-cols
ratio: "2:3"
title: Two Columns Layout
subtitle: Now with Configurable Ratio!
---

<!--
LAYOUT: two-cols
NEW FEATURES:
- ratio: Column width ratio, e.g., "1:1" (default), "1:2", "2:1", "1:3", "3:1", "2:3"
- gap: Gap between columns (default: "1rem")
-->

## Left Column (2fr)

This column takes 2 parts of the width.

- Point 1
- Point 2
- Point 3

::right::

## Right Column (3fr)

This column takes 3 parts of the width.

```python
def hello():
    print("Hello World!")
    
# Code example
for i in range(10):
    hello()
```

---
layout: image-left
image: https://cover.sli.dev
ratio: "1:2"
title: Image Left Layout
subtitle: Now with Configurable Ratio!
---

<!--
LAYOUT: image-left
NEW FEATURES:
- ratio: Image:content ratio, e.g., "1:1" (default), "1:2", "2:3"
- fit: Image fit mode - 'cover' (default), 'contain', 'fill'
- position: Image position (e.g., "center", "top", "left top")
-->

## Content on Right (2fr)

The image takes 1 part, content takes 2 parts.

When you use `image-left` layout:

- Image fills the left side
- Content appears on the right
- Ratio is configurable now!

```ts
const ratio = "1:2" // image:content
```

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
fontsize:
  body: 20px
  h1: 48px
  h2: 36px
  h3: 28px
---

<!--
LAYOUT: default (auto-applied when no layout is specified)
PURPOSE: Demonstrates that default layout is automatic

KEY POINT: You don't need to write `layout: default` explicitly.
If you don't specify any layout, Slidev uses "default" automatically.
-->

# This H1 Should Be 48px

## This H2 Should Be 36px

### This H3 Should Be 28px

Notice that even without specifying `layout: default`, this slide:

- Uses the default layout automatically
- Shows the footer with author information from the frontmatter
- Displays the conference name in the middle
- Shows page numbers on the right
- **Body text is 20px, H1 is 48px, H2 is 36px, H3 is 28px**

This demonstrates that **all fontsize configuration works correctly** including h1, h2, and h3!

---
layout: quote
title: Quote Layout
subtitle: Display Inspirational Quotes
---

<!--
LAYOUT: quote
PURPOSE: Display memorable quotes or important statements
WHEN TO USE: For emphasizing key insights, famous quotes, or important principles

FEATURES:
- Centered, large text for maximum impact
- Special styling for quote and attribution
- No header (header is hidden even if title/subtitle provided)
- Footer shown at bottom

FORMAT:
First paragraph = The quote
Second paragraph (starting with —) = Attribution

TIP: Keep quotes short and impactful for best effect
-->

Life is like a box of chocolates. You never know what you're gonna get.

— Forrest Gump

---
layout: section
title: Section Layout
subtitle: Chapter Dividers
---

<!--
LAYOUT: section
PURPOSE: Mark the beginning of a new section or chapter
WHEN TO USE: To divide your presentation into major parts

FEATURES:
- Large, centered heading
- Prominent subtitle
- No header shown
- Footer at bottom
- More spacing than regular slides

TIP: Use this to give your audience a mental "break" between topics
-->

# Section Title

## Subtitle

Use this layout to mark the beginning of a new section or chapter in your presentation.

---
layout: center
title: Center Layout
subtitle: Centered Content
---

<!--
LAYOUT: center
PURPOSE: Center important content on the slide
WHEN TO USE: For key messages, important announcements, or single focal points

FEATURES:
- All content vertically and horizontally centered
- Optional header (shown if title/subtitle provided)
- Footer at bottom
- Clean, focused design

TIP: Best for slides with minimal content that deserve full attention
-->

## Centered Content

This layout is perfect for important statements or key messages.

---
layout: fact
title: Fact Layout
---

<!--
LAYOUT: fact
PURPOSE: Highlight a single statistic or fact
WHEN TO USE: To emphasize important numbers or brief statements

FEATURES:
- Extra large, centered content
- Maximum width constrained for readability
- No header (even if title provided)
- Footer at bottom
- Designed for 1-2 lines of text max

TIP: Use big numbers or very short phrases (e.g., "100%", "First Place")
-->

# 100%

Academic Excellence

---
layout: statement
title: Statement Layout
---

<!--
LAYOUT: statement
PURPOSE: Make a bold, impactful statement
WHEN TO USE: For thesis statements, key findings, or important conclusions

FEATURES:
- Large, centered text
- Medium width constraint for readability
- No header shown
- Footer at bottom
- More width than 'fact' layout

TIP: Best for 1-3 sentence statements that capture a main idea
-->

# Important Statement

This layout is designed for impactful statements that need emphasis.

---
layout: default
title: Theorem Component Demo
subtitle: Mathematical Statements with Auto-numbering
---

<!--
COMPONENT: <Theorem>
PURPOSE: Display mathematical theorems, definitions, lemmas, etc. with automatic numbering

NEW FEATURES:
- New types: proof, note, claim
- compact mode for tighter spacing
- Language-aware title brackets: () for English, （）for Chinese
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
title: More Theorem Examples
---

<!--
THEOREM TYPES EXPLAINED:
- theorem: Major results
- lemma: Helper results used to prove theorems
- definition: Precise definitions of concepts
- proposition: Smaller results
- corollary: Results that follow directly from theorems
- example: Illustrative examples
- remark: Additional notes or observations
- proof: Proof blocks (no numbering by default)
- note: Note blocks
- claim: Claim statements

All types auto-number separately in presentation order.
-->

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
title: New Theorem Types
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
title: Highlight Component Demo
---

<!--
NEW COMPONENT: <Highlight>
PURPOSE: Highlight important text inline
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
layout: default
title: Manual Numbering Example
subtitle: Override auto-numbering when needed
---

<!--
CUSTOM NUMBERING:
Sometimes you need specific numbering (like "3.1" for chapter 3, theorem 1).
Use the `number` prop to override auto-numbering.

To hide numbering completely, use `:autoNumber="false"` (note the colon for boolean)
-->

## Custom Numbering

<Theorem type="theorem" number="3.1" title="Special Case">

Sometimes we need to use specific numbering, such as 3.1 to represent the first theorem in chapter 3.

</Theorem>

<Theorem type="theorem" :autoNumber="false" title="Unnumbered Theorem">

This theorem has no number because `autoNumber={false}` is set.

</Theorem>

---
layout: center
---

<!--
FINAL SLIDE
This is a simple closing slide using the center layout.
Perfect for "Thank You", Q&A, or contact information.
-->

## Thank You

Questions?

[Documentation](https://sli.dev) / [GitHub Repo](https://github.com/jxpeng98/slidev-theme-scholarly)
