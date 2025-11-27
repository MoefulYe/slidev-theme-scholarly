---
title: Highlight
---

# Highlight 组件

`Highlight` 组件提供多种颜色的内联文本高亮。

## 基本用法

```markdown
这是你幻灯片中的 <Highlight>重要文本</Highlight>。
```

或使用语法糖：

```markdown
:::highlight{color="yellow"}
需要高亮的重要文本
:::
```

## 示例

### 不同颜色

```markdown
<Highlight color="yellow">黄色高亮</Highlight>

<Highlight color="green">绿色高亮</Highlight>

<Highlight color="blue">蓝色高亮</Highlight>

<Highlight color="pink">粉色高亮</Highlight>
```

### 在上下文中使用

```markdown
我们的方法达到了 <Highlight color="green">94.7% 的准确率</Highlight>，
这 <Highlight color="yellow">显著优于</Highlight> 基线方法。
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `color` | `string` | `'yellow'` | 高亮颜色：`yellow`、`green`、`blue`、`pink`、`purple` |
