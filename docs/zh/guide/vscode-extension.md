---
title: VS Code 插件
---

# VS Code 插件

我们提供了 VS Code 插件，以提高使用此主题创建 Slidev 演示文稿的效率。

## 功能特点

- 🎯 **侧边栏面板** - 快速访问所有布局、组件和模板
- ✨ **代码片段** - 输入 `ss-` 或 `scholarly-` 触发布局和组件的代码片段
- 📝 **一键插入** - 点击面板中的任何项目即可在光标位置插入代码
- 🚀 **新建演示** - 创建带有预配置模板的新演示文稿

## 安装方法

### 从 VSIX 文件安装

1. 从 [vscode-extension](https://github.com/jxpeng98/slidev-theme-scholarly/tree/main/vscode-extension) 文件夹下载 `.vsix` 文件
2. 在 VS Code 中，按 `Cmd+Shift+P`（Mac）或 `Ctrl+Shift+P`（Windows/Linux）
3. 输入 "Extensions: Install from VSIX" 并选择下载的文件
4. 重新加载 VS Code

## 使用方法

### 使用代码片段

在任何 Markdown 文件中输入前缀以触发自动完成：

```markdown
ss-cover      # 插入封面布局
ss-theorem    # 插入定理组件
ss-block      # 插入信息块组件
scholarly-cite # 插入引用
```

按 `Tab` 键在插入的代码片段中的占位符之间移动。

### 使用侧边栏

1. 点击侧边栏（左侧）中的 **Slidev Scholarly** 图标
2. 浏览三个部分：
   - **Layouts（布局）** - 所有可用的幻灯片布局
   - **Components（组件）** - 内置 Vue 组件
   - **Templates（模板）** - 预制的演示文稿模板
3. 点击任何项目旁边的 `+` 按钮即可在光标位置插入

### 创建新演示文稿

1. 打开命令面板（`Cmd+Shift+P` / `Ctrl+Shift+P`）
2. 输入 "Slidev Scholarly: New Presentation"
3. 选择位置和文件名
4. 将创建一个包含基本模板的新文件

## 可用的代码片段

### 布局片段

| 前缀 | 描述 |
|------|------|
| `ss-cover` | 封面/标题幻灯片 |
| `ss-default` | 默认内容幻灯片 |
| `ss-intro` | 章节介绍 |
| `ss-section` | 章节分隔符 |
| `ss-center` | 居中内容 |
| `ss-quote` | 引用布局 |
| `ss-fact` | 单个事实/统计数据 |
| `ss-statement` | 重要陈述 |
| `ss-image-left` | 左图右文 |
| `ss-image-right` | 左文右图 |
| `ss-two-cols` | 双栏布局 |
| `ss-focus` | 带图标的聚焦陈述 |
| `ss-compare` | 并排对比 |
| `ss-bullets` | 增强列表 |
| `ss-figure` | 带标题的学术图片 |
| `ss-references` | 参考文献幻灯片 |
| `ss-end` | 致谢/结束幻灯片 |

### 组件片段

| 前缀 | 描述 |
|------|------|
| `ss-theorem` | 定理/引理/定义 |
| `ss-block` | Beamer 风格彩色块 |
| `ss-steps` | 工作流程/步骤 |
| `ss-keywords` | 关键词标签 |
| `ss-columns` | 多列布局 |
| `ss-highlight` | 文本高亮 |
| `ss-cite` | 内联引用 |
| `scholarly-bibliography` | 参考文献占位符 |

## 使用技巧

### 快速选择布局

当你需要特定布局时，只需输入 `ss-` 并浏览自动完成建议。每个片段都包含常用选项的有用占位符。

### 与 Markdown 语法糖结合使用

该插件与 [Markdown 语法糖](../syntax-sugar.md) 功能配合良好。你可以使用：

```markdown
<!-- 使用 Vue 组件（来自代码片段） -->
<Theorem type="theorem" title="主要结果">
内容
</Theorem>

<!-- 使用 Markdown 指令 -->
:::theorem{type="theorem" title="主要结果"}
内容
:::
```

### 自定义代码片段

如果你想修改代码片段，可以：

1. 打开 VS Code 设置
2. 搜索 "Configure User Snippets"
3. 选择 "markdown.json"
4. 添加你的自定义片段

## 故障排除

### 代码片段不显示

1. 确保插件已安装并启用
2. 检查你是否正在编辑 `.md` 文件
3. 尝试按 `Ctrl+Space` 手动触发建议

### 侧边栏图标缺失

1. 右键点击侧边栏
2. 确保 "Slidev Scholarly" 已勾选

## 反馈

发现 bug 或有功能需求？请在 [GitHub](https://github.com/jxpeng98/slidev-theme-scholarly/issues) 上提交 issue。
