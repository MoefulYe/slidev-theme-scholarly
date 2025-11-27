---
title: Keywords
---

# Keywords 组件

`Keywords` 组件显示关键词标签，非常适合展示研究主题或关键概念。

## 基本用法

```markdown
<Keywords :items="['机器学习', '深度学习', '神经网络']" />
```

或使用语法糖：

```markdown
:::keywords{:items='["机器学习", "深度学习"]' color="blue"}:::
```

## 示例

### 研究关键词

```markdown
<Keywords 
  :items="['计算机视觉', '目标检测', 'CNN', '迁移学习']" 
  color="blue" 
/>
```

### 主题标签

```markdown
<Keywords 
  :items="['优化', '收敛性', '梯度下降']" 
  color="green" 
/>
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `items` | `string[]` | `[]` | 关键词字符串数组 |
| `color` | `string` | `'blue'` | 颜色主题：`blue`、`green`、`purple`、`amber`、`red` |
