---
title: 重大升级说明
---

# 重大升级说明

本主题正在准备一次**重大升级**。接下来的版本可能包含**不兼容变更**，从而影响你已有的 Slidev 演示文稿。

## 可能受影响的内容

不同项目情况不同，但常见影响点包括：

- **Slidev / Node.js 版本要求**：请确保本地环境满足主题要求。
- **主题配置**：部分 frontmatter 字段、`themeConfig` 配置项可能调整。
- **布局 / 组件**：布局名称、组件 props、默认行为或样式变量可能变化。
- **构建/导出**：PDF 导出、资源路径等行为可能随上游 Slidev 调整。

## 建议升级步骤（Checklist）

1. 检查 Node.js 版本（本主题要求 Node.js 20+）：

   ```bash
   node -v
   ```

2. 升级到兼容的 Slidev 版本：

   ```bash
   npm i -D @slidev/cli
   ```

3. 升级主题：

   ```bash
   npm i -D slidev-theme-scholarly
   ```

4. 启动 Slidev，按报错提示逐项修复：

   ```bash
   npx slidev
   ```

如果升级后短期内无法迁移完毕，建议先临时 **pin 到旧版本**，等迁移完成再升级。

## 使用预发布版本（Pre-release）进行提前验证

我们会先发布 **预发布版本**，用于在正式发布前验证重大改动。

### Tag / 版本号格式

| 类型 | Tag 格式 | 示例 |
|------|----------|------|
| 正式版 | `vX.Y.Z` | `v2.0.0` |
| 预发布 | `vX.Y.Z-<pre>` | `v2.0.0-beta.1`、`v2.0.0-rc.0` |

预发布版本遵循 SemVer，**必须包含** `-<pre>` 预发布标识，否则 CI 会当作正式版本处理。

- 安装预发布通道（dist-tag: `next`）：

  ```bash
  npm i -D slidev-theme-scholarly@next
  ```

- 切回稳定版本（dist-tag: `latest`）：

  ```bash
  npm i -D slidev-theme-scholarly
  ```

## 变更详情在哪里看

- GitHub Releases：https://github.com/jxpeng98/slidev-theme-scholarly/releases
- Changelog：https://github.com/jxpeng98/slidev-theme-scholarly/blob/main/CHANGELOG.md
