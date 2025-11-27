---
title: Highlight
---

# Highlight Component

The `Highlight` component provides inline text highlighting with various colors.

## Basic Usage

```markdown
This is <Highlight>important text</Highlight> in your slide.
```

Or using the syntax sugar:

```markdown
:::highlight{color="yellow"}
Important text to highlight
:::
```

## Examples

### Different Colors

```markdown
<Highlight color="yellow">Yellow highlight</Highlight>

<Highlight color="green">Green highlight</Highlight>

<Highlight color="blue">Blue highlight</Highlight>

<Highlight color="pink">Pink highlight</Highlight>
```

### In Context

```markdown
Our method achieves <Highlight color="green">94.7% accuracy</Highlight>, 
which is <Highlight color="yellow">significantly better</Highlight> than 
the baseline.
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `'yellow'` | Highlight color: `yellow`, `green`, `blue`, `pink`, `purple` |
