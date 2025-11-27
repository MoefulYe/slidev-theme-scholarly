---
title: 语法糖
---

# 语法糖

本主题为组件提供了便捷的 Markdown 语法糖，使您无需编写 HTML 标签即可轻松使用组件。

## 概述

无需编写 Vue 组件语法：

```markdown
<Block type="info" title="提示">
这里是内容
</Block>
```

您可以使用更简洁的 Markdown 指令语法：

```markdown
:::block{type="info" title="提示"}
这里是内容
:::
```

## 可用语法

### Block（信息块）

```markdown
:::block{type="info" title="标题"}
您的内容...
:::
```

**类型：** `default`、`info`、`success`、`warning`、`danger`、`example`、`alert`

### Theorem（定理）

```markdown
:::theorem{type="theorem" title="定理名称"}
数学内容...
:::
```

**类型：** `theorem`、`lemma`、`proposition`、`corollary`、`definition`、`example`、`remark`

### Highlight（高亮）

```markdown
:::highlight{color="yellow"}
需要高亮的文本
:::
```

**颜色：** `yellow`、`green`、`blue`、`pink`、`purple`

### Cite（引用）

```markdown
:::cite{author="张三等" year="2024"}
引用上下文
:::
```

### Steps（步骤）

```markdown
:::steps{:steps='[{"title":"步骤 1","description":"说明"}]' :activeStep="1"}:::
```

### Keywords（关键词）

```markdown
:::keywords{:items='["关键词 1", "关键词 2"]' color="blue"}:::
```

### Columns（多列）

使用 `+++` 分隔列：

```markdown
:::columns{cols="2" gap="2rem"}
第一列内容
+++
第二列内容
:::
```

## 完整示例

```markdown
---
layout: default
title: 研究方法
---

## 我们的方法

:::block{type="info" title="核心创新"}
我们提出了一种结合...的新方法
:::

:::theorem{type="theorem" title="收敛性"}
对于任意 $\epsilon > 0$，算法在 $O(1/\epsilon^2)$ 步内收敛。
:::

:::columns{cols="2"}
### 优势
- 快速收敛
- 低内存使用
+++
### 应用
- 图像分类
- 自然语言处理
:::

:::keywords{:items='["深度学习", "优化", "收敛性"]' color="blue"}:::
```

## 注意事项

- 语法糖在构建时由预解析器处理
- 支持原始组件的所有属性
- 对于复杂属性（数组、对象），使用 Vue 绑定语法 `:prop`
- 修改后需要重启 Slidev 才能生效
