---
title: 配置指南
---

# 配置指南

## 设置你的演示文稿

在 `slides.md` 文件的最顶部, 添加一个配置部分：

```yaml
---
theme: scholarly
lang: zh  # 或 'en' 表示英文
footerMiddle: 2025 年会议名称
authors:
  - name: 张三
    institution: 清华大学
    email: zhangsan@tsinghua.edu.cn
  - name: 李四
    institution: 北京大学
    email: lisi@pku.edu.cn
---
```

## 配置选项

### 基本设置

| 选项 | 作用 | 示例 |
|------|------|------|
| `theme` | 告诉 Slidev 使用这个主题 | `scholarly` |
| `lang` | 定理的语言 | `zh` 或 `en` |
| `aspectRatio` | 幻灯片尺寸 | `16/9` 或 `4/3` |

### 作者信息

**单个作者：**

```yaml
author: 张三
```

**多个作者（推荐）：**

```yaml
authors:
  - name: 张三
    institution: 清华大学
    email: zhangsan@tsinghua.edu.cn
  - name: 李四
    institution: 北京大学
```

### 页脚配置

| 选项 | 控制内容 | 示例 |
|------|---------|------|
| `footerLeft` | 页脚左侧 | `自定义文本` |
| `footerMiddle` | 页脚中间 | `2025 年会议` |
| `footerRight` | 页脚右侧（自动） | 页码 |

**默认行为（如果未指定）：**

- 左侧：显示作者姓名
- 中间：空（或你的自定义文本）
- 右侧：页码（自动）

### 定理编号格式

自定义定理编号的显示方式：

```yaml
theoremNumberFormat: '{number}'      # 1, 2, 3（默认）
theoremNumberFormat: '({number})'    # (1), (2), (3)
theoremNumberFormat: '[{number}]'    # [1], [2], [3]
theoremNumberFormat: '{number}.'     # 1., 2., 3.
```

### 字体大小配置

你可以全局或按页面自定义正文和标题（h1, h2, h3）的字体大小.

**全局字体大小（应用于所有幻灯片）：**

```yaml
---
theme: scholarly
fontsize:
  body: 18px    # 正文的基础字体大小
  h1: 48px      # h1 标题的字体大小
  h2: 36px      # h2 标题的字体大小
  h3: 28px      # h3 标题的字体大小
---
```

**单页字体大小覆盖：**

你可以通过在该幻灯片的 frontmatter 中添加 `fontsize` 配置来覆盖单个幻灯片的字体大小：

```markdown
---
fontsize:
  body: 20px
  h1: 50px
  h2: 40px
  h3: 30px
---

# 此幻灯片具有自定义字体大小

## 具有自定义 h2 大小的副标题

### 具有自定义 h3 大小的次级副标题

此幻灯片上的正文将为 20px.
```

**仅更改封面幻灯片的字体大小：**

由于第一张幻灯片自动使用封面布局, 而全局 frontmatter 中的设置会应用到所有幻灯片, 自定义封面幻灯片字体大小的最佳方法是使用内联 CSS 样式.

在封面幻灯片的注释部分添加 `<style>` 标签：

```markdown
---
theme: scholarly
authors:
  - name: 你的名字
    institution: 你的大学
---

# 你的演示标题
副标题文本

<style>
.slidev-layout.cover h1 {
  font-size: 64px;
}

.slidev-layout.cover h2 {
  font-size: 40px;
}
</style>

---

# 引言

此幻灯片使用默认字体大小.
```

你可以用这种方式自定义封面幻灯片的任何 CSS 属性：

```markdown
<style>
.slidev-layout.cover h1 {
  font-size: 72px;
  color: #5d8392;
  font-weight: bold;
}

.slidev-layout.cover .author-name {
  font-size: 24px;
}

.slidev-layout.cover .author-institution {
  font-size: 20px;
}
</style>
```

**替代方案：对内容幻灯片使用 fontsize：**

如果你希望大多数幻灯片使用自定义字体大小, 但保持封面使用默认大小, 可以在每张内容幻灯片上设置 `fontsize`：

```markdown
---
theme: scholarly
---

# 封面幻灯片（默认大字体）

---
fontsize:
  body: 16px
  h1: 36px
---

# 幻灯片 2（自定义字体）

---
fontsize:
  body: 16px
  h1: 36px
---

# 幻灯片 3（自定义字体）
```

**灵活的格式：**

字体大小接受多种格式：

```yaml
fontsize:
  body: 18px      # 像素
  h1: 3rem        # rem 单位
  h2: 2.5em       # em 单位
  h3: 32          # 数字（视为像素）
```

**注意事项：**

- 所有字体大小选项都是可选的 - 你可以设置任意组合
- 单页设置会覆盖全局设置
- 如果未指定, 主题使用为每种布局优化的默认字体大小
- 字体大小使用 CSS 变量应用, 以实现最大兼容性

## 单页设置

你可以为单独的幻灯片覆盖设置：

```markdown
---
title: 特殊幻灯片
subtitle: 带有自定义页眉
---

# 这里是内容
```