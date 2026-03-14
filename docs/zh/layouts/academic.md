---
title: 学术布局
---

# 学术布局

专为学术演示设计的布局 - 研究方法、结果、对比和参考文献。

## compare - 并排对比

**用于：** 用带标签的双栏对比两种方法、方案或概念

![并排对比布局示例](/images/layouts/compare.png)

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

## methodology - 研究方法

**用于：** 用于展示研究方法和图表的双栏布局

![研究方法布局示例](/images/layouts/methodology.png)

```markdown
---
layout: methodology
ratio: "1:1"
title: 研究方法
---

## 我们的方法

1. 数据收集
2. 特征提取
3. 模型训练

::right::

![图表](./diagram.png)
```

**属性：**
- `ratio`：列比例（默认："1:1"）
- `title`、`subtitle`：页眉内容

---

## results - 结果仪表板

**用于：** 用于显示多个指标或结果的网格布局

![结果仪表板布局示例](/images/layouts/results.png)

```markdown
---
layout: results
cols: 2
title: 主要结果
---

<div class="p-4 bg-white rounded shadow">
  <h3>准确率</h3>
  <h1>94.7%</h1>
</div>

<div class="p-4 bg-white rounded shadow">
  <h3>速度</h3>
  <h1>2.3x</h1>
</div>
```

**属性：**
- `cols`：列数（默认：2）
- `title`、`subtitle`：页眉内容

---

## timeline - 研究时间线

**用于：** 以垂直时间线格式显示研究进展或历史事件

![研究时间线布局示例](/images/layouts/timeline.png)

```markdown
---
layout: timeline
title: 研究时间线
items:
  - year: "2020"
    title: 初步研究
    description: 开始探索问题空间
  - year: "2021"
    title: 方法论开发
    description: 开发核心算法
  - year: "2022"
    title: 验证
    description: 进行实验
---
```

**属性：**
- `title`：时间线上方的可选标题
- `items`：带有 `year`、`title` 和 `description` 的时间线项目数组

---

## agenda - 议程概览

**用于：** 展示演示大纲或会议议程

![议程概览布局示例](/images/layouts/agenda.png)

```markdown
---
layout: agenda
title: 今日议程
items:
  - 简介和背景
  - 方法概述
  - 实验结果
  - 讨论和未来工作
---
```

**属性：**
- `title`：议程标题（默认："Agenda"）
- `items`：议程项目字符串数组

---

## acknowledgments - 致谢

**用于：** 显示资助来源和合作者

![致谢布局示例](/images/layouts/acknowledgments.png)

```markdown
---
layout: acknowledgments
title: 致谢
funders:
  - 国家自然科学基金
  - 科技部
collaborators:
  - 清华大学人工智能实验室
  - 北京大学计算机系
---

特别感谢所有贡献者。
```

**属性：**
- `title`：章节标题（默认："Acknowledgments"）
- `funders`：资助组织名称数组
- `collaborators`：合作者名称数组

---

## references - 参考文献

**用于：** 以学术格式显示参考文献。自动从 BibTeX 引用生成参考文献。

![参考文献布局示例](/images/layouts/references.png)

```markdown
---
layout: references
---
```

**对于较长的参考文献列表，使用分页：**

```markdown
---
layout: references
perPage: 5
page: 1
---

---
layout: references
perPage: 5
page: 2
title: "参考文献（续）"
---
```

如果你想把 bibliography 放在该页里的某个精确位置，可以手动在对应位置写 `[[bibliography]]`。

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
