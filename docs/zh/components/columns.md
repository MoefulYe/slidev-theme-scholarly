---
title: Columns
---

# Columns 组件

`Columns` 组件创建灵活的多列布局。

## 基本用法

```markdown
<Columns :cols="2">
  
第一列内容

<template #col2>

第二列内容

</template>

</Columns>
```

或使用语法糖：

```markdown
:::columns{cols="2" gap="2rem"}
第一列内容
+++
第二列内容
:::
```

## 示例

### 两列

```markdown
:::columns{cols="2"}
## 方法 A
- 优势 1
- 优势 2
+++
## 方法 B
- 优势 1
- 优势 2
:::
```

### 三列

```markdown
:::columns{cols="3" gap="1rem"}
### 步骤 1
引言
+++
### 步骤 2
方法
+++
### 步骤 3
结果
:::
```

### 自定义比例

```markdown
<Columns :cols="2" ratio="1:2">
  
窄侧边栏内容

<template #col2>

宽主内容区域

</template>

</Columns>
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `cols` | `number \| string` | `2` | 列数 |
| `gap` | `string` | `'2rem'` | 列间距 |
| `ratio` | `string` | - | 列宽比例（如 `'1:2'`、`'1:1:2'`） |
