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

<!-- Slide 1: block -->

<Block type="info" title="Research Finding">
Our evaluation shows a consistent accuracy gain across all three benchmark datasets while keeping inference latency within the target budget.
</Block>

<!-- Slide 2: theorem -->
---
layout: default
title: Theorem Component
subtitle: Formal mathematical statement
---

<Theorem type="theorem" title="Pythagorean Theorem">

For a right triangle with sides $a$, $b$ and hypotenuse $c$:

$$a^2 + b^2 = c^2$$

</Theorem>

<!-- Slide 3: definition -->
---
layout: default
title: Definition Component
subtitle: Styled explanatory statement
---

<Theorem type="definition" title="Continuous Function">
A function is continuous at a point when arbitrarily small input changes produce arbitrarily small output changes.
</Theorem>

<!-- Slide 4: highlight -->
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

<!-- Slide 5: steps -->
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

<!-- Slide 6: columns -->
---
layout: default
title: Columns Component
subtitle: Multi-column layouts
---

:::columns{columns="3" gap="2rem" ratio="1:1:1"}
### Column 1
First column content with some text.

+++

### Column 2
Second column with different information.

+++

### Column 3
Third column completing the layout.
:::

<!-- Slide 7: keywords -->
---
layout: default
title: Keywords Component
subtitle: Tag-style keywords
---

## Research Keywords

<Keywords :keywords="['Machine Learning', 'Neural Networks', 'Computer Vision', 'Deep Learning', 'Optimization']" />

<!-- Slide 8: cite -->
---
layout: default
title: Cite Component
subtitle: Manual citation note
---

## Research Background

Recent studies have shown significant improvements in model accuracy.

<Cite>
For comprehensive analysis, see Johnson & Williams (2024), "Advanced Methods in Deep Learning", pp. 45-67.
</Cite>

<!-- Slide 9: theme-preview -->
---
layout: default
title: ThemePreview Component
subtitle: Local color theme preview
---

<ThemePreview colorTheme="oxford-burgundy">

## Local Theme Preview

This block previews a Scholarly color theme without changing the rest of the slide.

</ThemePreview>
