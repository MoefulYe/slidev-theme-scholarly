---
theme: ../
aspectRatio: 4/3
colorMode: light
layout: default
themeConfig:
  colorTheme: classic-blue
  fontTheme: classic
title: Block Component
subtitle: Beamer-style blocks
authors:
  - name: Scholarly Theme
    institution: Documentation Team
---

<!-- Slide 1: Block (Vue) -->

<Block type="info" title="Information">
This is an informational block with important details.
</Block>

<Block type="warning" title="Warning">
This is a warning block to alert users.
</Block>

<Block type="example" title="Example">
This demonstrates an example block.
</Block>

<!-- Slide 2: Theorem Components -->
---
layout: default
title: Theorem Components
subtitle: Mathematical environments
---

<Theorem type="theorem" title="Pythagorean Theorem">

For a right triangle with sides $a$, $b$ and hypotenuse $c$:

$$a^2 + b^2 = c^2$$

</Theorem>

<Theorem type="proof">
By the definition of right triangles... $\square$
</Theorem>

<!-- Slide 3: Definition and Lemma -->
---
layout: default
title: Definition & Lemma
subtitle: Mathematical statements
---

<Theorem type="definition" title="Continuous Function">
A function $f$ is continuous at $x_0$ if $\lim_{x \to x_0} f(x) = f(x_0)$.
</Theorem>

<Theorem type="lemma" title="Boundedness Lemma">
Every continuous function on a closed interval is bounded.
</Theorem>

<!-- Slide 4: Highlight Component -->
---
layout: default
title: Highlight Component
subtitle: Text emphasis styles
---

## Inline Highlights

Use <Highlight type="primary">primary highlight</Highlight> for key concepts.

The <Highlight type="warning">warning highlight</Highlight> draws attention.

Consider the <Highlight type="success">success highlight</Highlight> for achievements.

Also available: <Highlight type="info">info</Highlight> and <Highlight type="error">error</Highlight> styles.

<!-- Slide 5: Steps Component -->
---
layout: default
title: Steps Component
subtitle: Step-by-step process
---

<Steps :steps="[
  { title: 'Data Collection', description: 'Gather training data from multiple sources' },
  { title: 'Preprocessing', description: 'Clean and normalize the dataset' },
  { title: 'Model Training', description: 'Train the neural network' },
  { title: 'Evaluation', description: 'Test and validate results' }
]" :activeStep="2" />

<!-- Slide 6: Columns Component -->
---
layout: default
title: Columns Component
subtitle: Multi-column layouts
---

<Columns :columns="3" :gap="2">

### Column 1
First column content with some text.

---

### Column 2
Second column with different information.

---

### Column 3
Third column completing the layout.

</Columns>

<!-- Slide 7: Keywords Component -->
---
layout: default
title: Keywords Component
subtitle: Tag-style keywords
---

## Research Keywords

<Keywords :keywords="['Machine Learning', 'Neural Networks', 'Computer Vision', 'Deep Learning', 'Optimization']" />

## Technology Stack

<Keywords :keywords="['Python', 'PyTorch', 'TensorFlow', 'CUDA']" color="green" />

<!-- Slide 8: Cite Component -->
---
layout: default
title: Cite Component
subtitle: Citation annotations
---

## Research Background

Recent studies have shown significant improvements in model accuracy.

<Cite :inline="true">
Smith et al. (2023) demonstrated that attention mechanisms improve performance by 15%.
</Cite>

This finding aligns with our experimental results.

<Cite>
For comprehensive analysis, see Johnson & Williams (2024), "Advanced Methods in Deep Learning", pp. 45-67.
</Cite>
