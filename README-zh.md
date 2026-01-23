# Slidev 学术主题 (Scholarly Theme)

[![NPM version](https://img.shields.io/npm/v/slidev-theme-scholarly?color=3AB9D4&label=)](https://www.npmjs.com/package/slidev-theme-scholarly)
[![GitHub stars](https://img.shields.io/github/stars/jxpeng98/slidev-theme-scholarly?style=social)](https://github.com/jxpeng98/slidev-theme-scholarly)
[![License](https://img.shields.io/github/license/jxpeng98/slidev-theme-scholarly)](./LICENSE)

[English](./README.md) · [在线演示](https://scholarly.penghu.pro/) · [文档](https://github.com/jxpeng98/slidev-theme-scholarly/tree/main/docs/zh)

一个专为学术演示设计的 [Slidev](https://sli.dev) 专业主题，采用 LaTeX Beamer 风格的设计。

> **⚠️ 即将发布重大升级**
>
> 接下来的版本可能包含不兼容变更。升级前请先阅读[重大升级说明](./docs/zh/guide/upgrade.md)。
>
> **抢先体验预发布版本：**
> ```bash
> npm i -D slidev-theme-scholarly@next
> ```

> **⚠️ 即将发布重大升级**
>
> 接下来的版本可能包含不兼容变更（依赖版本、主题配置、布局/组件等），可能影响已有演示文稿。升级前请先阅读[重大升级说明](https://github.com/jxpeng98/slidev-theme-scholarly/blob/main/docs/zh/guide/upgrade.md)。
>
> **抢先体验预发布版本：**
> ```bash
> npm i -D slidev-theme-scholarly@next
> ```

---

## ✨ 主要特性

| 特性 | 说明 |
|------|------|
| 🎓 **专业设计** | LaTeX Beamer 风格，学术感十足 |
| 📐 **24 种布局** | 结构、内容、强调、学术四大类别 |
| 🧩 **丰富组件** | 定理、信息块、引用、步骤、关键词、多栏、高亮 |
| 🎨 **9 种配色主题** | 经典蓝、牛津、剑桥、耶鲁、普林斯顿、北欧、单色、棕褐、高对比度 |
| 📚 **BibTeX 引用** | 自动生成参考文献，支持 APA、Harvard、IEEE、MLA 格式 |
| 📝 **语法糖** | 简化的 Markdown 指令语法 |
| 🔧 **VS Code 扩展** | 代码片段、预览、BibTeX 集成 |

---

## 🚀 快速开始

### 安装

```bash
npm i -D slidev-theme-scholarly
```

### 创建演示文稿

```markdown
---
theme: scholarly
authors:
  - name: 你的名字
    institution: 你的大学
footerMiddle: 2026 年会议
---

# 你的演示标题

副标题或描述

---

# 引言

- 要点 1
- 要点 2
- 要点 3
```

### 预览

```bash
npx slidev
```

---

## 📐 布局

布局分为**四个类别**：

### 结构布局

| 布局 | 说明 |
|------|------|
| `cover` | 带作者的标题页 |
| `default` | 标准内容页 |
| `intro` | 章节介绍 |
| `section` | 章节分隔符 |
| `center` | 居中内容 |
| `auto-center` | 自动居中内容 |
| `end` | 结束页 |

### 内容布局

| 布局 | 说明 |
|------|------|
| `two-cols` | 双栏布局 |
| `image-left` | 左图右文 |
| `image-right` | 左文右图 |
| `bullets` | 增强列表 |
| `figure` | 带标题的学术图片 |
| `split-image` | 分割图片布局 |

### 强调布局

| 布局 | 说明 |
|------|------|
| `quote` | 样式化引用 |
| `fact` | 单个事实/统计数据 |
| `statement` | 重要陈述 |
| `focus` | 带图标的聚焦陈述 |

### 学术布局

| 布局 | 说明 |
|------|------|
| `compare` | 并排对比 |
| `methodology` | 研究方法 |
| `results` | 研究结果 |
| `timeline` | 时间线可视化 |
| `agenda` | 演示议程 |
| `acknowledgments` | 致谢 |
| `references` | 参考文献 |

**用于：** 开始报告的新部分
[查看布局文档 →](./docs/zh/layouts/structure.md)

```markdown
---
layout: intro
---

# 第二部分：研究方法

让我们讨论我们的方法
```

**显示内容：**

- 大字号、居中的文本
- 无页眉（为标题留出更多空间）
- 底部的页脚
## 🧩 组件

---
| 组件 | 说明 | 示例 |
|------|------|------|
| **Theorem** | 定理、引理、定义 | `<Theorem type="theorem">...</Theorem>` |
| **Block** | Beamer 风格信息块 | `<Block type="info">...</Block>` |
| **Citations** | BibTeX 引用 | `@citekey` 或 `!@citekey` |
| **Steps** | 流程可视化 | `<Steps :steps="[...]" />` |
| **Keywords** | 关键词标签 | `<Keywords :items="[...]" />` |
| **Columns** | 多栏布局 | `<Columns :cols="2">...</Columns>` |
| **Highlight** | 文本高亮 | `<Highlight>文本</Highlight>` |

[查看组件文档 →](./docs/zh/components/index.md)

---

## 🎨 主题预览

<details open>
<summary><b>经典蓝（默认）</b></summary>
<table>
  <tr>
    <td><img src="./images/themes/classic-blue/1.png" width="220" alt="封面"/></td>
    <td><img src="./images/themes/classic-blue/2.png" width="220" alt="章节"/></td>
    <td><img src="./images/themes/classic-blue/3.png" width="220" alt="内容"/></td>
    <td><img src="./images/themes/classic-blue/4.png" width="220" alt="引用"/></td>
  </tr>
</table>
</details>

<details>
<summary><b>牛津酒红</b></summary>
<table>
  <tr>
    <td><img src="./images/themes/oxford/1.png" width="220" alt="封面"/></td>
    <td><img src="./images/themes/oxford/2.png" width="220" alt="章节"/></td>
    <td><img src="./images/themes/oxford/3.png" width="220" alt="内容"/></td>
    <td><img src="./images/themes/oxford/4.png" width="220" alt="引用"/></td>
  </tr>
</table>
</details>

<details>
<summary><b>剑桥绿</b></summary>
<table>
  <tr>
    <td><img src="./images/themes/cambridge/1.png" width="220" alt="封面"/></td>
    <td><img src="./images/themes/cambridge/2.png" width="220" alt="章节"/></td>
    <td><img src="./images/themes/cambridge/3.png" width="220" alt="内容"/></td>
    <td><img src="./images/themes/cambridge/4.png" width="220" alt="引用"/></td>
  </tr>
</table>
</details>

<details>
<summary><b>更多主题...</b></summary>

- 耶鲁蓝
- 普林斯顿橙
- 北欧蓝
- 单色
- 暖棕褐
- 高对比度

[查看所有主题 →](./docs/zh/guide/themes.md)
</details>

---

## 📚 文档

### 入门指南

- [快速开始](./docs/zh/guide/quick-start.md) - 5 分钟上手
- [重大升级说明](./docs/zh/guide/upgrade.md) - 版本迁移指南
- [主要功能](./docs/zh/guide/features.md) - 功能概览
- [配置](./docs/zh/guide/configurations.md) - 主题配置选项
- [主题](./docs/zh/guide/themes.md) - 配色和字体主题

### 布局

- [结构布局](./docs/zh/layouts/structure.md) - 封面、章节、导航
- [内容布局](./docs/zh/layouts/content.md) - 文字、图片、分栏
- [强调布局](./docs/zh/layouts/emphasis.md) - 引用、事实、高亮
- [学术布局](./docs/zh/layouts/academic.md) - 方法论、结果、参考文献

### 组件

- [定理 (Theorem)](./docs/zh/components/theorem.md) - 数学定理
- [信息块 (Block)](./docs/zh/components/block.md) - 信息块
- [引用 (Citations)](./docs/zh/components/cite.md) - BibTeX 引用
- [步骤 (Steps)](./docs/zh/components/steps.md) - 流程可视化
- [关键词 (Keywords)](./docs/zh/components/keywords.md) - 关键词标签
- [多栏 (Columns)](./docs/zh/components/columns.md) - 多栏布局
- [高亮 (Highlight)](./docs/zh/components/highlight.md) - 文本高亮

### 进阶

- [语法糖](./docs/zh/syntax-sugar.md) - Markdown 指令
- [VS Code 扩展](./docs/zh/guide/vscode-extension.md) - 代码片段和工具
- [示例](./docs/zh/examples.md) - 完整示例

---

## 👥 适用人群

- 👨‍🎓 **博士生** - 展示论文和研究成果
- 👩‍🏫 **教授** - 制作课程讲座
- 🔬 **研究人员** - 准备会议报告
- 📊 **任何人** - 需要精美学术演示的人

**无需编程经验！**

---

## 🔧 VS Code 扩展

使用我们的 VS Code 扩展提高效率：

- 🎯 侧边栏面板，快速访问布局/组件
- ✨ 代码片段：输入 `ss-` 插入布局/组件
- 📚 BibTeX 集成，自动补全
- 👁️ 预览支持

[从 Releases 下载 →](https://github.com/jxpeng98/slidev-theme-scholarly/releases)

---

## 🤝 贡献

欢迎贡献！

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build
```

[查看贡献指南 →](./docs/zh/contributing.md)

---

## 📄 许可证

MIT 许可证 - 详见 [LICENSE](./LICENSE)。

---

## 🔗 链接

- [📖 文档](https://github.com/jxpeng98/slidev-theme-scholarly/tree/main/docs/zh)
- [🎬 在线演示](https://scholarly.penghu.pro/)
- [🐛 问题反馈](https://github.com/jxpeng98/slidev-theme-scholarly/issues)
- [💬 讨论](https://github.com/slidevjs/slidev/discussions)
- [📦 NPM 包](https://www.npmjs.com/package/slidev-theme-scholarly)

---

**用 ❤️ 为全世界的学者制作**
