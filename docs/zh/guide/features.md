---
title: 核心特性
---

# 核心特性

## 🎨 专业设计

- 简洁的学术美学, 灵感来自 LaTeX Beamer
- 所有幻灯片自动添加页眉和页脚
- 整个演示文稿样式一致

## 👥 多作者支持

优雅地显示一位, 两位或整个研究团队：

- 1 位作者："张三"
- 2 位作者："张三 & 李四"  
- 3 位作者："张三, 李四, 王五"
- 4+ 位作者："张三等"

## 🔢 智能定理编号

插入定理, 引理, 定义并自动编号：

- 每种类型（定理, 引理等）都有自己的计数器
- 支持中文和英文
- 可自定义编号格式

## 📐 18 种布局选项

针对不同需求的不同布局：

- **基础**: cover, default, intro, section, center
- **内容**: quote, fact, statement, two-cols
- **图片**: image-left, image-right
- **高级 (v2.0)**: focus, compare, bullets, figure, references, end, auto-center

## 📊 学术样式 (v0.1.2)

专业的学术演示 CSS 样式：

- **三线表** - 去除垂直线，仅保留水平线
- **代码块** - 浅灰背景配等宽字体
- **引用样式** - 缩小字号和灰色字体形成层次感
- **引用块** - 左边框配斜体样式

## 📚 内置引用支持

从 BibTeX 文件自动生成参考文献：

- 使用 `@citekey` 进行括号引用
- 使用 `!@citekey` 进行叙述性引用
- 支持 APA、Harvard、Vancouver、IEEE、MLA、Chicago 样式
- 自动从所有引用生成参考文献列表
- 无需额外配置！

## 🧩 丰富的组件

内置学术内容组件：

- **Theorem** - 定理、引理、定义，自动编号
- **Block** - Beamer 风格彩色块
- **Steps** - 工作流程/步骤可视化
- **Keywords** - 关键词标签
- **Columns** - 灵活的多列布局
- **Highlight** - 内联文本高亮

## 📝 Markdown 语法糖

使用简单的 Markdown 指令代替 HTML：

```markdown
:::block{type="info" title="提示"}
这里是内容
:::

:::theorem{type="theorem" title="结果"}
数学内容
:::

:::columns{columns="2"}
左列
+++
右列
:::
```

## 🌍 多语言支持

支持中文和英文的数学内容。

## 🆕 v0.1.2 新功能

| 功能 | 描述 |
|------|------|
| `quote` 布局 | 新增 `author` 和 `source` 属性 |
| `bullets` 布局 | 新增 `icon` 属性自定义项目符号 |
| `fact` 布局 | 新增 `purple` 紫色变体 |
| 三线表 | 学术风格表格样式 |
| 代码块 | 增强样式 |
