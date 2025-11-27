---
title: 高级布局
---

# 高级布局

本版本引入了 6 个专为学术演示设计的新布局，每个都有独特的视觉风格。

## focus - 聚焦陈述

用图标和强调色突出单个重要陈述或问题。

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

---

## compare - 并排对比

用带标签的双栏对比两种方法、方案或概念。

```markdown
---
layout: compare
title: 传统方法 vs. 我们的方法
leftLabel: 传统方法
rightLabel: 我们的方法
leftColor: red
rightColor: green
---

### 局限性
- 计算成本高
- 训练时间长

::right::

### 优势
- 计算量减少 50%
- 训练速度提升 3 倍
```

**属性：**

- `title`：主标题
- `subtitle`：可选副标题
- `leftLabel`、`rightLabel`：列标签
- `leftColor`、`rightColor`：`red`、`green`、`blue`、`amber`、`purple`

---

## bullets - 增强列表

专业的项目符号样式，带有自定义标记。

```markdown
---
layout: bullets
title: 要点
subtitle: 总结
---

## 主要发现

- **要点 1** - 描述
- **要点 2** - 描述
- **要点 3** - 描述
```

**特点：**

- 自定义项目符号标记（▸）
- 带圆形徽章的编号列表
- 支持嵌套列表

---

## figure - 学术图片

以适当的学术标题和标签显示图片。

```markdown
---
layout: figure
src: ./images/architecture.png
caption: 我们提出的系统架构概览。
label: "图 1："
title: 系统架构
height: 60%
---

图片下方的额外描述。
```

**属性：**

- `src`：图片 URL 或路径
- `caption`：图片说明
- `label`：标签前缀（如 "图 1："）
- `title`：幻灯片标题
- `subtitle`：可选副标题
- `height`：图片高度（默认：`60%`）
- `fit`：`contain`、`cover`、`fill`（默认：`contain`）

---

## references - 参考文献

以学术格式显示参考文献。自动从 BibTeX 引用生成参考文献。

```markdown
---
layout: references
---

[[bibliography]]
```

**对于较长的参考文献列表，使用分页：**

```markdown
---
layout: references
perPage: 5
page: 1
---

[[bibliography]]

---
layout: references
perPage: 5
page: 2
title: "参考文献（续）"
---

[[bibliography]]
```

**手动参考文献（不使用 BibTeX）：**

```markdown
---
layout: references
---

1. **张三等** (2024). *高效深度学习*. 自然机器智能.

2. **李四和王五** (2023). *绿色 AI*. ICML.

3. **陈某等** (2023). *边缘计算*. NeurIPS.
```

**属性：**

- `page`：当前页码（用于分页）
- `perPage`：每页参考文献数量
- `title`：自定义标题（默认："参考文献"或"参考文献（续）"）

**特点：**

- 自动编号的参考文献样式
- 简洁的学术排版
- 根据内容自动调整字体大小

---

## end - 致谢页

带有联系信息的专业结束幻灯片。

```markdown
---
layout: end
email: zhangsan@tsinghua.edu.cn
website: https://example.com/project
subtitle: 问题？
qrcode: https://example.com/qr.png
qrcodeLabel: 扫码获取论文
---

感谢您的聆听！
```

**属性：**

- `thankYou`：自定义感谢文本（默认："谢谢！"）
- `subtitle`：副标题文本
- `email`：联系邮箱
- `website`：项目/个人网站
- `qrcode`：二维码图片 URL
- `qrcodeLabel`：二维码标签

---

## 重新设计的布局

### fact - 渐变数字显示

现在具有大号渐变色数字和装饰元素。

```markdown
---
layout: fact
color: green
---

# 94.7%

基准数据集上的准确率
```

**属性：**

- `color`：`blue`、`green`、`amber`、`red`、`purple`（默认：`blue`）

### statement - 引用样式

现在显示为带有装饰性引号和作者署名的引用。

```markdown
---
layout: statement
author: 爱因斯坦
---

# 想象力比知识更重要

真正的智慧不是知识，而是想象力。
```

**属性：**

- `author`：署名文本
