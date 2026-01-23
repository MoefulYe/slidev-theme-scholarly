# Layout Screenshot Generation Guide

由于 PNG 导出需要 Playwright，可能会遇到依赖问题。这里提供两种可靠的截图生成方法。

## 方法 1：使用浏览器手动导出（推荐）

这是最可靠的方法，适用于所有环境：

### 步骤：

1. **启动 Slidev 开发服务器：**

```bash
cd scripts
npx slidev generate-layout-screenshots.md
```

2. **在浏览器中访问导出页面：**

访问 `http://localhost:3030/export`（端口可能不同，查看终端输出）

3. **下载 PNG：**

- 在导出页面，选择 "PNG" 格式
- 点击 "Export" 按钮
- 浏览器会下载一个 ZIP 文件，包含所有幻灯片的 PNG

4. **解压并重命名：**

将下载的 ZIP 解压到 `docs/public/images/layouts/`，然后手动重命名文件：

- 001.png → cover.png
- 002.png → default.png
- 003.png → intro.png
- 004.png → section.png
- 005.png → center.png
- 006.png → auto-center.png
- 007.png → end.png
- 008.png → two-cols.png
- 009.png → image-left.png
- 010.png → image-right.png
- 011.png → bullets.png
- 012.png → figure.png
- 013.png → split-image.png
- 014.png → quote.png
- 015.png → fact.png
- 016.png → statement.png
- 017.png → focus.png
- 018.png → compare.png
- 019.png → methodology.png
- 020.png → results.png
- 021.png → timeline.png
- 022.png → agenda.png
- 023.png → acknowledgments.png
- 024.png → references.png

## 方法 2：使用 Playwright CLI 导出

如果 Playwright 已正确安装：

### 安装 Playwright：

```bash
# 安装 Playwright 浏览器
npx playwright install chromium

# 或者安装所有浏览器
npx playwright install
```

### 运行自动化脚本：

```bash
pnpm run export:layout-screenshots
```

### 故障排查：

如果遇到 Playwright 相关错误：

```bash
# 重新安装 Playwright
npm install -D playwright-chromium
npx playwright install chromium

# 检查 Playwright 是否正常
npx playwright --version
```

## 方法 3：使用手动截图重命名脚本

如果您已经通过方法 1 获得了编号的 PNG 文件，可以使用这个脚本快速重命名：

```bash
#!/bin/bash

# 保存为 rename-screenshots.sh 并运行

SOURCE_DIR="/path/to/exported/pngs"  # 修改为实际路径
TARGET_DIR="../docs/public/images/layouts"

declare -A LAYOUTS=(
    ["001"]="cover"
    ["002"]="default"
    ["003"]="intro"
    ["004"]="section"
    ["005"]="center"
    ["006"]="auto-center"
    ["007"]="end"
    ["008"]="two-cols"
    ["009"]="image-left"
    ["010"]="image-right"
    ["011"]="bullets"
    ["012"]="figure"
    ["013"]="split-image"
    ["014"]="quote"
    ["015"]="fact"
    ["016"]="statement"
    ["017"]="focus"
    ["018"]="compare"
    ["019"]="methodology"
    ["020"]="results"
    ["021"]="timeline"
    ["022"]="agenda"
    ["023"]="acknowledgments"
    ["024"]="references"
)

mkdir -p "$TARGET_DIR"

for num in "${!LAYOUTS[@]}"; do
    layout="${LAYOUTS[$num]}"
    if [ -f "$SOURCE_DIR/$num.png" ]; then
        cp "$SOURCE_DIR/$num.png" "$TARGET_DIR/$layout.png"
        echo "✅ Copied: $layout.png"
    else
        echo "⚠️  Missing: $num.png"
    fi
done
```

## 验证结果

生成后，验证所有文件都已创建：

```bash
ls -1 docs/public/images/layouts/*.png | wc -l
# 应该输出：24
```

查看文件列表：

```bash
ls -1 docs/public/images/layouts/
```

## 常见问题

### Q: 为什么 `pnpm run export:layout-screenshots` 不生成文件？

A: 可能是以下原因：

1. Playwright 未安装或安装不完整
2. 系统缺少必要的浏览器依赖（Linux 系统常见）
3. 文件权限问题

解决方法：使用方法 1（浏览器手动导出）

### Q: 导出的图片质量如何调整？

A: 编辑 `generate-layout-screenshots.md`，调整幻灯片内容、字体大小等。

### Q: 能否同时导出多种主题的布局截图？

A: 可以。复制 `generate-layout-screenshots.md`，修改 `themeConfig` 中的 `colorTheme` 和 `fontTheme`，分别导出到不同目录。
