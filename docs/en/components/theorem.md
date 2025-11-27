---
title: Theorem
---

# Theorem Components

## What are Theorem Components?

In academic presentations, you often need to present formal statements like theorems, lemmas, or definitions. This theme provides a special component that:

- Automatically numbers your theorems
- Styles them professionally
- Supports multiple languages

### Basic Usage

```markdown
<Theorem type="theorem" title="Pythagorean Theorem">

For a right triangle with legs $a$ and $b$, and hypotenuse $c$:

$$a^2 + b^2 = c^2$$

</Theorem>
```

**Result:** A nicely formatted box with "Theorem 1 (Pythagorean Theorem)" as the header and your content inside.

### Available Types

Each type has a different color:

| Type | English | Chinese | Color |
|------|---------|---------|-------|
| `theorem` | Theorem | 定理 | Blue |
| `lemma` | Lemma | 引理 | Purple |
| `proposition` | Proposition | 命题 | Cyan |
| `corollary` | Corollary | 推论 | Green |
| `definition` | Definition | 定义 | Amber |
| `example` | Example | 例 | Pink |
| `remark` | Remark | 注 | Gray |

### Examples

**Simple theorem:**

```markdown
<Theorem type="theorem">

Every bounded sequence has a convergent subsequence.

</Theorem>
```

**Theorem with title:**

```markdown
<Theorem type="definition" title="Continuity">

A function $f$ is continuous at $x = a$ if...

</Theorem>
```

**Manual numbering:**

```markdown
<Theorem type="lemma" number="3.2">

This will be numbered as "Lemma 3.2" instead of auto-numbering.

</Theorem>
```

**No numbering:**

```markdown
<Theorem type="remark" :autoNumber="false">

This remark has no number.

</Theorem>
```
