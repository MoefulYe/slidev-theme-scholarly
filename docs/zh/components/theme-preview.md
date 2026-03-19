---
title: ThemePreview
---

# ThemePreview 组件

`ThemePreview` 是一个用于在局部区域预览 Scholarly 配色主题的包装组件。它只会为组件内部内容设置一组预览用的 CSS 变量，不会影响全局主题。

![ThemePreview 示例](/images/components/theme-preview.png)

## 基本用法

```markdown
<ThemePreview colorTheme="classic-blue">

## 预览标题

这里的内容会使用所选主题的预览配色渲染。

</ThemePreview>
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `colorTheme` | `string` | `'classic-blue'` | 配色主题 id：`classic-blue`、`oxford-burgundy`、`cambridge-green`、`princeton-orange`、`yale-blue`、`nordic-blue`、`warm-sepia`、`monochrome`、`high-contrast` |

## 说明

- `ThemePreview` 不会改变全局主题，只影响其子内容。
