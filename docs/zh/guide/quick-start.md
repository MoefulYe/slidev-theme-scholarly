---
title: 快速开始
---

# 快速开始

## 前置要求

确保你已安装 [Node.js](https://nodejs.org/)。

## 第一步：使用 CLI 创建演示项目（推荐）

```bash
# 一次性使用（不需要全局安装）
npx -y --package slidev-theme-scholarly sch init my-talk

# 备选短命令
npx -y --package slidev-theme-scholarly sts init my-talk
```

可用模板：

```bash
npx -y --package slidev-theme-scholarly sch template list
```

指定模板：

```bash
npx -y --package slidev-theme-scholarly sch init my-talk --template academic
```

常用 CLI 命令：

```bash
# 帮助
npx sch help
npx sch help theme

# 查看主题专属资源
npx sch theme list
npx sch layout list
npx sch component list
npx sch snippet list

# 应用 Scholarly 主题预设到 frontmatter
npx sch theme apply cambridge-green --font elegant --file slides.md
npx sch theme preset apply cambridge --file slides.md

# 插入 Scholarly 学术片段
npx sch snippet append theorem --file slides.md
npx sch snippet append methodology --file slides.md

# 追加整套学术演示骨架
npx sch workflow list
npx sch workflow apply paper --file slides.md

# 给已有项目补上 Scholarly 的 Vite 引用桥接
npx sch setup vite

# 环境检查（包含 Scholarly 检查）
npx sch doctor
```

## 第二步：安装依赖并启动

```bash
cd my-talk
pnpm install
pnpm run dev
```

浏览器会自动打开，并支持实时预览。

初始化出来的项目会自带根目录 `vite.config.ts`，用于保持 Scholarly 引用在不同 Slidev 版本下都能正常工作。

## 第三步：编辑 `slides.md`

初始化后的项目已经包含可直接使用的 `slides.md`。

## 手动方式（如果你已有 Slidev 项目）

安装主题：

```bash
npm i -D slidev-theme-scholarly
```

安装时也会打印一条提醒：如果你是在已有项目里接入 Scholarly，请继续运行 `npx sch setup vite`。

在 frontmatter 中设置：

```markdown
---
theme: scholarly
---
```

然后运行：

```bash
npx slidev
```

如果你想在已有项目里补上 Scholarly 的引用桥接，推荐直接运行：

```bash
npx sch setup vite
```

当项目里没有 `vite.config.*` 时，它会创建根目录 `vite.config.ts`；如果已经检测到现有 `vite.config.*`，则会复用它。除非显式传入 `--force`，否则不会覆盖无关的现有配置。

如果你更倾向于手动接入，也可以添加：

```ts
import { defineConfig } from 'vite'
import { setupScholarlyCitationMarkdown } from 'slidev-theme-scholarly/citation-vite'

export default defineConfig({
  slidev: {
    markdown: {
      markdownSetup(md) {
        setupScholarlyCitationMarkdown(md)
      },
      markdownItSetup(md) {
        setupScholarlyCitationMarkdown(md)
      },
    },
  },
})
```
