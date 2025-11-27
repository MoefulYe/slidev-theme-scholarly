---
title: Keywords
---

# Keywords Component

The `Keywords` component displays keyword tags, perfect for showing research topics or key concepts.

## Basic Usage

```markdown
<Keywords :items="['Machine Learning', 'Deep Learning', 'Neural Networks']" />
```

Or using the syntax sugar:

```markdown
:::keywords{:items='["Machine Learning", "Deep Learning"]' color="blue"}:::
```

## Examples

### Research Keywords

```markdown
<Keywords 
  :items="['Computer Vision', 'Object Detection', 'CNN', 'Transfer Learning']" 
  color="blue" 
/>
```

### Topic Tags

```markdown
<Keywords 
  :items="['Optimization', 'Convergence', 'Gradient Descent']" 
  color="green" 
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `string[]` | `[]` | Array of keyword strings |
| `color` | `string` | `'blue'` | Color theme: `blue`, `green`, `purple`, `amber`, `red` |
