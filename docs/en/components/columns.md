---
title: Columns
---

# Columns Component

The `Columns` component creates flexible multi-column layouts.

## Basic Usage

```markdown
<Columns :cols="2">
  
Content for column 1

<template #col2>

Content for column 2

</template>

</Columns>
```

Or using the syntax sugar:

```markdown
:::columns{cols="2" gap="2rem"}
First column content
+++
Second column content
:::
```

## Examples

### Two Columns

```markdown
:::columns{cols="2"}
## Method A
- Advantage 1
- Advantage 2
+++
## Method B
- Advantage 1
- Advantage 2
:::
```

### Three Columns

```markdown
:::columns{cols="3" gap="1rem"}
### Step 1
Introduction
+++
### Step 2
Methods
+++
### Step 3
Results
:::
```

### Custom Ratios

```markdown
<Columns :cols="2" ratio="1:2">
  
Narrow sidebar content

<template #col2>

Wide main content area

</template>

</Columns>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `number \| string` | `2` | Number of columns |
| `gap` | `string` | `'2rem'` | Gap between columns |
| `ratio` | `string` | - | Column width ratio (e.g., `'1:2'`, `'1:1:2'`) |
