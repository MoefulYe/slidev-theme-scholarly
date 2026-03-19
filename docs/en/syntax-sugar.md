---
title: Syntax Sugar
---

# Syntax Sugar

This theme provides convenient Markdown syntax sugar for components, making it easier to use without writing HTML-like tags.

## Overview

Instead of writing Vue component syntax:

```markdown
<Block type="info" title="Note">
Content here
</Block>
```

You can use the simpler Markdown directive syntax:

```markdown
:::block{type="info" title="Note"}
Content here
:::
```

## Available Syntax

### Block

```markdown
:::block{type="info" title="Title"}
Your content here...
:::
```

**Types:** `default`, `info`, `success`, `warning`, `danger`, `example`, `alert`

### Theorem

```markdown
:::theorem{type="theorem" title="Theorem Name"}
Mathematical content here...
:::
```

**Types:** `theorem`, `lemma`, `proposition`, `corollary`, `definition`, `example`, `remark`

### Highlight

```markdown
:::highlight{type="warning"}
Text to highlight
:::
```

**Types:** `primary`, `success`, `warning`, `danger`, `info` (legacy alias: `color="yellow|green|blue|pink|purple"`)

### Cite

```markdown
:::cite{author="Smith et al." year="2024"}
Citation context
:::
```

### Steps

```markdown
:::steps{:steps='[{"title":"Step 1","description":"Description"}]' :activeStep="1"}:::
```

### Keywords

```markdown
:::keywords{:keywords='["Keyword 1", "Keyword 2"]' color="blue"}:::
```

### Columns

Use `+++` to separate columns:

```markdown
:::columns{columns="2" gap="2rem"}
Content for column 1
+++
Content for column 2
:::
```

## Complete Example

```markdown
---
layout: default
title: Research Methods
---

## Our Approach

:::block{type="info" title="Key Innovation"}
We propose a novel method that combines...
:::

:::theorem{type="theorem" title="Convergence"}
For any $\epsilon > 0$, the algorithm converges in $O(1/\epsilon^2)$ steps.
:::

:::columns{columns="2"}
### Advantages
- Fast convergence
- Low memory usage
+++
### Applications
- Image classification
- Natural language processing
:::

:::keywords{:keywords='["Deep Learning", "Optimization", "Convergence"]' color="blue"}:::
```

## Notes

- The syntax sugar is processed at build time by the theme markdown transformers
- All props from the original components are supported
- For complex props (arrays, objects), use the Vue binding syntax with `:prop`
- Restart Slidev after making changes to see the effect
