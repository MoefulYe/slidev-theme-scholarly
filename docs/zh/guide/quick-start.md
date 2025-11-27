---
title: 快速开始
---

# 快速开始

## 第一步：安装 Slidev

首先, 确保已安装 [Node.js](https://nodejs.org/)（从 nodejs.org 下载）. 然后打开终端（Windows 上是命令提示符, Mac/Linux 上是终端）并运行：

```bash
npm install -g @slidev/cli
```

> **这是做什么的？** 这会在你的电脑上安装 Slidev, 使你可以在任何地方使用它.

### 第二步：创建你的第一个演示文稿

```bash
# 为演示文稿创建一个新文件夹
mkdir my-talk
cd my-talk

# 创建幻灯片文件
echo "---
theme: scholarly
---

# 我的第一个学术报告

你的名字

---

# 引言

- 要点 1
- 要点 2
- 要点 3
" > slides.md
```

### 第三步：预览你的演示文稿

```bash
slidev slides.md
```

浏览器会自动打开并显示你的演示文稿！按右箭头键在幻灯片之间切换.

> **提示：** 保持终端运行. 你对 `slides.md` 所做的任何更改都会立即显示在浏览器中！