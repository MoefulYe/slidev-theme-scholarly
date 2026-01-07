---
title: 强调布局
---

# 强调布局

用于突出关键信息、引用和统计数据的布局。

## quote - 引用

**用于：** 突出显示名言警句

![引用布局示例](/images/layouts/quote.png)

```markdown
---
layout: quote
author: 理查德·费曼
source: 物理定律的本性, 1965
---

第一原则是你不能欺骗自己。
```

**属性：**
- `author`：引用出处
- `source`：引用来源（书籍、演讲等）

**显示内容：**

- 大字号、带装饰性引号的样式化引用
- 下方的出处

---

## fact - 单个统计数据

**用于：** 突出重要数字或事实

![单个统计数据布局示例](/images/layouts/fact.png)

```markdown
---
layout: fact
color: green
---

# 94.7%

基准数据集上的准确率
```

**属性：**
- `color`：`primary`、`blue`、`green`、`amber`、`red`、`purple`（默认：`primary`）

**显示内容：**

- 非常大的渐变色数字
- 下方较小的描述
- 玻璃效果和装饰元素

---

## statement - 重要陈述

**用于：** 需要强调的大胆、有影响力的陈述

![重要陈述布局示例](/images/layouts/statement.png)

```markdown
---
layout: statement
author: 爱因斯坦
---

# 想象力比知识更重要

真正的智慧不是知识，而是想象力。
```

**属性：**
- `author`：署名文本（可选）

**显示内容：**

- 大字号陈述文本，居中
- 装饰性引号
- 中等宽度以提高可读性

---

## focus - 聚焦陈述

**用于：** 用视觉强调突出单个重要陈述或问题

![聚焦陈述布局示例](/images/layouts/focus.png)

```markdown
---
layout: focus
color: blue
icon: 🎯
---

# 研究问题

如何在降低计算成本的同时提高模型准确率？
```

**属性：**
- `color`：`blue`、`green`、`amber`、`red`、`purple`（默认：`blue`）
- `icon`：任何表情符号或文本（默认：无）

**显示内容：**

- 大图标（如果指定）
- 颜色强调的主要信息
- 下方的支持文本
