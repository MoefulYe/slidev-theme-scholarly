---
title: 内容布局
---

# 内容布局

用于显示图片、分栏和列表内容的布局。

## two-cols - 双栏

**用于：** 比较或显示并行内容

![双栏布局示例](/images/layouts/two-cols.png)

```markdown
---
layout: two-cols
ratio: "2:3"
title: 双栏布局
---

## 左栏 (2fr)

此栏占据 2 份宽度。

- 要点 1
- 要点 2

::right::

## 右栏 (3fr)

此栏占据 3 份宽度。
```

**属性：**
- `ratio`：列宽比例，如 "1:1"、"2:3"（默认："1:1"）
- `title`、`subtitle`：可选的页眉内容

**显示内容：**

- 左栏内容（`::right::` 之前）
- 右栏内容（`::right::` 之后）
- 可配置的宽度比例

---

## image-left - 左图右文

**用于：** 用文字解释视觉内容

![左图右文布局示例](/images/layouts/image-left.png)

```markdown
---
layout: image-left
image: ./path/to/image.png
ratio: "1:2"
title: 左图布局
---

## 右侧内容 (2fr)

- 设备 A
- 设备 B
- 设备 C

设置的描述...
```

**属性：**
- `image`：图片 URL 或路径
- `ratio`：图片:内容比例（默认："1:1"）
- `fit`：`cover`、`contain`、`fill`（默认：`cover`）
- `title`、`subtitle`：可选的页眉内容

**显示内容：**

- 左侧全高度图片
- 右侧内容

---

## image-right - 左文右图

**用于：** 文字配支持性视觉内容

![左文右图布局示例](/images/layouts/image-right.png)

```markdown
---
layout: image-right
image: https://example.com/image.jpg
ratio: "3:2"
fit: contain
title: 右图布局
---

## 左侧内容 (3fr)

我们的发现显示...

- 发现 1
- 发现 2
```

**属性：**
- `image`：图片 URL 或路径
- `ratio`：内容:图片比例（默认："1:1"）
- `fit`：`cover`、`contain`、`fill`（默认：`cover`）
- `title`、`subtitle`：可选的页眉内容

**显示内容：**

- 左侧内容
- 右侧全高度图片

---

## bullets - 增强列表

**用于：** 带有自定义标记的专业项目符号样式

![增强列表布局示例](/images/layouts/bullets.png)

```markdown
---
layout: bullets
title: 要点
subtitle: 总结
icon: "→"
---

## 主要发现

- **要点 1** - 描述
- **要点 2** - 描述
- **要点 3** - 描述
```

**属性：**
- `title`：幻灯片标题
- `subtitle`：可选副标题
- `icon`：自定义项目符号字符（默认：`▸`）

**特点：**
- 自定义项目符号标记
- 带圆形徽章的编号列表
- 支持嵌套列表

---

## figure - 学术图片

**用于：** 以适当的学术标题和标签显示图片

![学术图片布局示例](/images/layouts/figure.png)

```markdown
---
layout: figure
image: ./images/architecture.png
caption: 我们提出的系统架构概览。
label: "图 1："
title: 系统架构
height: 60%
---

图片下方的额外描述。
```

在 Slidev 的 frontmatter 里请使用 `image`，不要使用 `src`。`src` 是 Slidev 用于外部幻灯片源的保留字段，使用它会导致 figure 页面在 build/export 时被吞掉。

**属性：**
- `image`：图片 URL 或路径
- `caption`：图片说明
- `label`：标签前缀（如 "图 1："）
- `title`：幻灯片标题
- `subtitle`：可选副标题
- `height`：图片高度（默认：`60%`）
- `fit`：`contain`、`cover`、`fill`（默认：`contain`）

---

## split-image - 图片对比

**用于：** 并排显示多张图片并带有说明

![图片对比布局示例](/images/layouts/split-image.png)

```markdown
---
layout: split-image
images:
  - ./before.png
  - ./after.png
captions:
  - 优化前
  - 优化后
title: 视觉对比
---
```

**属性：**
- `images`：图片 URL 数组
- `captions`：说明文字数组
- `title`、`subtitle`：页眉内容
