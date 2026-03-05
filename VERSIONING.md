# Versioning & Release Tags

本仓库包含两个可发布产物，**版本号独立管理**：
1) **Slidev 主题（npm）**：`slidev-theme-scholarly`  
2) **VS Code 插件（Marketplace / VSIX）**：`slidev-scholarly-snippets`

This repo contains two independently versioned deliverables:

1. **Slidev Theme (npm)**: `slidev-theme-scholarly`
2. **VS Code Extension (Marketplace / VSIX)**: `slidev-scholarly-snippets`

They are related, but **do not share the same version number** anymore.

## 1) Slidev Theme (npm)

- **版本号真源**：仓库根目录 `package.json`
- **Tag 格式**：`vX.Y.Z`（例如 `v1.2.3`、`v1.2.3-beta.1`）
- **CI**：`.github/workflows/release.yml`
  - 稳定版（不含 `-<pre>`）：发布到 npm（`latest`）
  - 预发布（含 `-<pre>`）：发布到 npm（`next`）

- **Version source of truth**: `package.json` at repo root
- **Tag format**: `vX.Y.Z` (e.g. `v1.2.3`, `v1.2.3-beta.1`)
- **CI**: `.github/workflows/release.yml`
  - Stable tag (no `-<pre>`): publishes to npm (`latest`)
  - Pre-release tag (with `-<pre>`): publishes to npm (`next`)

### Commands

- 主题版本 bump（同时更新 docs）：
  - `pnpm bump patch|minor|major|X.Y.Z[-pre]`
- 将主题版本同步到 docs：
  - `pnpm version:sync`

- Bump theme (and docs) version:
  - `pnpm bump patch|minor|major|X.Y.Z[-pre]`
- Sync docs version from theme:
  - `pnpm version:sync`

## 2) VS Code Extension (Marketplace / VSIX)

Marketplace 的插件版本号必须是**纯 `X.Y.Z`**（不允许 `-beta.1`）。beta 请通过 Marketplace 的 **pre-release 渠道**发布。

Marketplace extension versions must be **plain `X.Y.Z`** (no `-beta.1` suffix). Use the Marketplace **pre-release channel** to publish beta builds.

- **版本号真源**：`vscode-extension/package.json`
- **Tag 格式**：
  - 稳定 VSIX：`vscode-vX.Y.Z`
  - 预发布 VSIX：`vscode-pre-vX.Y.Z`
- **CI**：`.github/workflows/vscode-release.yml`

- **Version source of truth**: `vscode-extension/package.json`
- **Tag formats**:
  - Stable VSIX GitHub release: `vscode-vX.Y.Z`
  - Pre-release VSIX GitHub release: `vscode-pre-vX.Y.Z`
- **CI**: `.github/workflows/vscode-release.yml`

### Commands

- 插件版本 bump：
  - `pnpm bump:vscode patch|minor|major|X.Y.Z`
- 打包 VSIX：
  - `pnpm vscode:package`
- 发布（在 `vscode-extension/` 下执行）：
  - 稳定：`pnpm run publish`
  - 预发布：`pnpm run publish:pre`

- Bump extension version:
  - `pnpm bump:vscode patch|minor|major|X.Y.Z`
- Package VSIX:
  - `pnpm vscode:package`
- Publish (from `vscode-extension/`):
  - Stable: `pnpm run publish`
  - Pre-release: `pnpm run publish:pre`
