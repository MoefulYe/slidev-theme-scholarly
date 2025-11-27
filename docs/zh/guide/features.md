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

## 📐 17 种布局选项

针对不同需求的不同布局：

- **基础**: cover, default, intro, section, center
- **内容**: quote, fact, statement, two-cols
- **图片**: image-left, image-right
- **新增 (v2.0)**: focus, compare, bullets, figure, references, end

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

:::columns{cols="2"}
左列
+++
右列
:::
```

## 🌍 多语言支持

支持中文和英文的数学内容。