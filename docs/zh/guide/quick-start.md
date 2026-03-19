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

## 第三步：编辑 `slides.md`

初始化后的项目已经包含可直接使用的 `slides.md`。

## 手动方式（如果你已有 Slidev 项目）

安装主题：

```bash
npm i -D slidev-theme-scholarly
```

在 frontmatter 中设置：

```markdown
---
theme: scholarly
bibFile: references.bib
bibStyle: apa
---
```

然后运行：

```bash
npx slidev
```

Scholarly 会从主题包内部自动注册 citation 相关 hook，正常使用时不需要项目级 `vite.config.ts`。

参考文献页可以直接这样写：

```markdown
---
layout: references
---
```

只有在你想自定义 bibliography 在该页中的插入位置时，才需要显式写 `[[bibliography]]`。
