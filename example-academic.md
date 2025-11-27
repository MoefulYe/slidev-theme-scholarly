---
theme: ./
footerMiddle: Academic Conference 2025
lang: en
bibFile: ./references.bib
bibStyle: apa
authors:
  - name: Alice Johnson
    institution: Department of Computer Science
    email: alice.j@university.edu
  - name: Bob Chen
    institution: School of Engineering
    email: bob.chen@institute.edu
---

# Efficient Deep Learning Models

A Study on Reducing Computational Cost While Maintaining Accuracy

<!--
SLIDE: Cover
LAYOUT: cover (default for first slide)
PURPOSE: Title slide with authors in footer
-->

---
layout: bullets
title: Outline
subtitle: What we'll cover today
---

<!--
SLIDE: Outline
LAYOUT: bullets
PURPOSE: Show agenda with bullet points
-->

## Today's Agenda

1. **Introduction** - Background and motivation
2. **Methods** - Our approach and methodology
3. **Results** - Key findings
4. **Discussion** - Implications and future work

---
layout: section
---

<!--
SLIDE: Section Divider
LAYOUT: section
PURPOSE: Mark the beginning of a new section
-->

# Introduction

Background and Motivation

---
layout: focus
color: blue
icon: 🎯
---

<!--
SLIDE: Research Question
LAYOUT: focus
PURPOSE: Highlight the main research question with icon and color
OPTIONS: color (blue/green/amber/red), icon (emoji)
-->

# Research Question

How can we improve model accuracy while reducing computational cost?

---
layout: bullets
title: Background
subtitle: Setting the stage
---

<!--
SLIDE: Background
LAYOUT: bullets
PURPOSE: List key background points
CITATIONS: Using @citekey syntax (Vue-style would be <Cite key="..." />)
-->

## Why This Matters

- Deep learning models are becoming increasingly complex @lecun2015deep
- Training costs have grown exponentially
- Environmental impact is a growing concern
- Need for more efficient approaches @smith2023deep

---
layout: compare
title: Traditional vs. Our Approach
leftLabel: Traditional Methods
rightLabel: Our Approach
leftColor: red
rightColor: green
---

<!--
SLIDE: Comparison
LAYOUT: compare
PURPOSE: Side-by-side comparison with colored labels
OPTIONS: leftLabel, rightLabel, leftColor, rightColor
-->

### Limitations

- High computational cost
- Long training time
- Large carbon footprint
- Requires expensive hardware

::right::

### Advantages

- 50% less computation
- 3x faster training
- Eco-friendly
- Runs on consumer GPUs

---
layout: section
---

<!--
SLIDE: Section Divider
LAYOUT: section
-->

# Methods

Our Approach

---
layout: default
title: Methodology Overview
---

<!--
SLIDE: Methodology
LAYOUT: default
COMPONENT: <Steps> (Vue component)
PURPOSE: Show step-by-step process with active step highlighted
-->

## Our Framework

<Steps :steps="[
  { title: 'Data Collection', description: 'Gather and preprocess datasets' },
  { title: 'Model Design', description: 'Design efficient architecture' },
  { title: 'Training', description: 'Train with optimized procedure' },
  { title: 'Evaluation', description: 'Benchmark against baselines' }
]" :activeStep="2" />

---
layout: figure
src: https://cover.sli.dev
caption: Overview of our proposed architecture showing the main components and data flow.
label: "Figure 1:"
title: System Architecture
---

<!--
SLIDE: Figure
LAYOUT: figure
PURPOSE: Display image with caption and label
OPTIONS: src, caption, label, fit
-->

The model consists of three main modules working together.

---
layout: default
title: Mathematical Foundation
---

<!--
SLIDE: Theorem
LAYOUT: default
COMPONENT: <Theorem> (Vue component)
PURPOSE: Display mathematical theorems with auto-numbering
-->

## Key Theorem

<Theorem type="theorem" title="Convergence Guarantee">

For any $\epsilon > 0$, our algorithm converges to an $\epsilon$-optimal solution in $O(\frac{1}{\epsilon^2})$ iterations.

</Theorem>

<Theorem type="proof">

The proof follows from the convexity of the loss function and the bounded gradient assumption. See Appendix A for details. $\square$

</Theorem>

---
layout: default
title: Model Architecture
---

<!--
SLIDE: Definition
LAYOUT: default
COMPONENT: :::theorem (Syntax Sugar)
PURPOSE: Same as <Theorem> but using markdown syntax sugar
CITATION: !@citekey for narrative citation "Author (Year)"
-->

## Attention Mechanism

Building on the Transformer architecture !@vaswani2017attention, we propose:

:::theorem{type="definition" title="Efficient Attention"}
Given query $Q$, key $K$, and value $V$ matrices, our efficient attention is:

$$\text{EfficientAttn}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}} \odot M\right)V$$

where $M$ is a learnable sparse mask.
:::

---
layout: section
---

<!--
SLIDE: Section Divider
LAYOUT: section
-->

# Results

Key Findings

---
layout: fact
color: green
---

<!--
SLIDE: Key Fact
LAYOUT: fact
PURPOSE: Highlight a single impressive statistic
OPTIONS: color (green/blue/amber/red)
-->

# 94.7%

Accuracy on benchmark dataset

---
layout: two-cols
ratio: "1:1"
title: Quantitative Results
---

<!--
SLIDE: Two Columns
LAYOUT: two-cols
PURPOSE: Side-by-side content with tables
OPTIONS: ratio (e.g., "1:1", "2:3")
-->

## Performance Metrics

| Metric | Ours | Baseline |
|--------|------|----------|
| Accuracy | **94.7%** | 91.2% |
| F1 Score | **0.93** | 0.89 |
| Speed | **3.2s** | 9.8s |

::right::

## Resource Usage

| Resource | Ours | Baseline |
|----------|------|----------|
| GPU Memory | **4GB** | 12GB |
| Training Time | **2h** | 8h |
| Parameters | **12M** | 45M |

---
layout: focus
color: amber
icon: ⚠️
---

<!--
SLIDE: Limitations
LAYOUT: focus
PURPOSE: Highlight important limitations with warning color
-->

# Limitations

Our method requires clean labeled data and may not generalize to all domains.

---
layout: section
---

<!--
SLIDE: Section Divider
LAYOUT: section
-->

# Discussion

Implications and Future Work

---
layout: bullets
title: Key Takeaways
subtitle: Summary of Findings
---

<!--
SLIDE: Key Takeaways
LAYOUT: bullets
COMPONENT: <Highlight> (Vue component)
PURPOSE: Summarize findings with highlighted keywords
-->

## What We Learned

- <Highlight type="primary">Efficiency matters</Highlight> - Smaller models can achieve competitive results
- <Highlight type="success">Architecture design is crucial</Highlight> - Right inductive biases help @wang2022attention
- <Highlight type="warning">Trade-offs exist</Highlight> - Speed vs. accuracy balance
- <Highlight type="info">Reproducibility is key</Highlight> - All code is open-sourced

---
layout: default
title: Future Directions
---

<!--
SLIDE: Future Work
LAYOUT: default
COMPONENT: :::block (Syntax Sugar)
PURPOSE: Same as <Block> but using markdown syntax sugar
-->

## Next Steps

:::block{type="info" title="Short-term Goals"}
- Extend to more domains (NLP, speech)
- Improve robustness to noisy data
- Release pre-trained models
:::

:::block{type="example" title="Long-term Vision"}
- Develop theoretical foundations @bishop2006pattern
- Build user-friendly tools
- Foster community adoption
:::

---
layout: default
title: Acknowledgments
---

<!--
SLIDE: Acknowledgments
LAYOUT: default
COMPONENT: <Block> (Vue component)
PURPOSE: Show acknowledgments using Vue component syntax
-->

## Acknowledgments

<Block type="success" title="Funding">

This work was supported by the National Science Foundation.

</Block>

<Block type="info" title="Resources">

We thank the computing center for providing GPU resources.

</Block>

---
layout: references
---

<!--
SLIDE: References
LAYOUT: references
PURPOSE: Auto-generated bibliography from BibTeX citations
MARKER: [[bibliography]] generates the reference list
-->

[[bibliography]]

---
layout: end
email: alice.j@university.edu
website: https://github.com/example/project
subtitle: Questions?
---

<!--
SLIDE: End
LAYOUT: end
PURPOSE: Closing slide with contact information
OPTIONS: email, website, subtitle
-->

Thank you for your attention!