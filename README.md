# Slidev Theme Scholarly

[![NPM version](https://img.shields.io/npm/v/slidev-theme-scholarly?color=3AB9D4&label=)](https://www.npmjs.com/package/slidev-theme-scholarly)
[![GitHub stars](https://img.shields.io/github/stars/jxpeng98/slidev-theme-scholarly?style=social)](https://github.com/jxpeng98/slidev-theme-scholarly)
[![License](https://img.shields.io/github/license/jxpeng98/slidev-theme-scholarly)](./LICENSE)

[中文版](./README-zh.md) · [Live Demo](https://scholarly.penghu.pro/) · [Documentation](https://scholarly-docs.jxpeng.dev/en/)

A professional presentation theme for [Slidev](https://sli.dev), designed specifically for academic presentations with LaTeX Beamer-inspired styling.

> **⚠️ Major Upgrade in Progress**
>
> Upcoming versions may include breaking changes. Please check the [Upgrade Notes](https://scholarly-docs.jxpeng.dev/en/guide/upgrade.html) before updating.
>
> **Try the pre-release:**
> ```bash
> npm i -D slidev-theme-scholarly@next
> ```

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🎓 **Professional Design** | LaTeX Beamer-inspired with academic styling |
| 📐 **24 Layouts** | Structure, Content, Emphasis, and Academic categories |
| 🧩 **Rich Components** | Theorem, Block, Citations, Steps, Keywords, Columns, Highlight |
| 🎨 **9 Color Themes** | Classic Blue, Oxford, Cambridge, Yale, Princeton, Nordic, Monochrome, Sepia, High Contrast |
| 📚 **BibTeX Citations** | Automatic bibliography with APA, Harvard, IEEE, MLA styles |
| 📝 **Syntax Sugar** | Simplified Markdown directives for components |
| 🔧 **VS Code Extension** | Snippets, previews, and BibTeX integration |

---

## 🚀 Quick Start

### Installation

```bash
npm i -D slidev-theme-scholarly
```

### Create Your Presentation

```markdown
---
theme: scholarly
authors:
  - name: Your Name
    institution: Your University
footerMiddle: Conference 2026
---

# Your Presentation Title

Subtitle or description

---

# Introduction

- Point 1
- Point 2
- Point 3
```

### Preview

```bash
npx slidev
```

---

## 📐 Layouts

Layouts are organized into **four categories**:

### Structure Layouts

| Layout | Description |
|--------|-------------|
| `cover` | Title slide with authors |
| `default` | Standard content slide |
| `intro` | Section introduction |
| `section` | Chapter divider |
| `center` | Centered content |
| `auto-center` | Auto-centered content |
| `end` | Closing slide |

### Content Layouts

| Layout | Description |
|--------|-------------|
| `two-cols` | Two-column layout |
| `image-left` | Image on left, text on right |
| `image-right` | Image on right, text on left |
| `bullets` | Enhanced bullet list |
| `figure` | Academic figure with caption |
| `split-image` | Split image layout |

### Emphasis Layouts

| Layout | Description |
|--------|-------------|
| `quote` | Styled quotation |
| `fact` | Single fact/statistic |
| `statement` | Important statement |
| `focus` | Focused statement with icon |

### Academic Layouts

| Layout | Description |
|--------|-------------|
| `compare` | Side-by-side comparison |
| `methodology` | Research methodology |
| `results` | Research results |
| `timeline` | Timeline visualization |
| `agenda` | Presentation agenda |
| `acknowledgments` | Acknowledgments |
| `references` | Bibliography |

[View Layout Documentation →](https://scholarly-docs.jxpeng.dev/en/layouts/structure.html)

---

## 🧩 Components

| Component | Description | Example |
|-----------|-------------|---------|
| **Theorem** | Theorems, lemmas, definitions | `<Theorem type="theorem">...</Theorem>` |
| **Block** | Beamer-style info blocks | `<Block type="info">...</Block>` |
| **Citations** | BibTeX citations | `@citekey` or `!@citekey` |
| **Steps** | Process visualization | `<Steps :steps="[...]" />` |
| **Keywords** | Keyword tags | `<Keywords :items="[...]" />` |
| **Columns** | Multi-column layout | `<Columns :cols="2">...</Columns>` |
| **Highlight** | Text highlighting | `<Highlight>text</Highlight>` |

[View Component Documentation →](https://scholarly-docs.jxpeng.dev/en/components/index.html)

---

## 🎨 Theme Gallery

<details open>
<summary><b>Classic Blue (Default)</b></summary>
<table>
  <tr>
    <td><img src="./images/themes/classic-blue/1.png" width="220" alt="Cover"/></td>
    <td><img src="./images/themes/classic-blue/2.png" width="220" alt="Section"/></td>
    <td><img src="./images/themes/classic-blue/3.png" width="220" alt="Content"/></td>
    <td><img src="./images/themes/classic-blue/4.png" width="220" alt="Quote"/></td>
  </tr>
</table>
</details>

At the top of each slide, add:
<details>
<summary><b>Oxford Burgundy</b></summary>
<table>
  <tr>
    <td><img src="./images/themes/oxford/1.png" width="220" alt="Cover"/></td>
    <td><img src="./images/themes/oxford/2.png" width="220" alt="Section"/></td>
    <td><img src="./images/themes/oxford/3.png" width="220" alt="Content"/></td>
    <td><img src="./images/themes/oxford/4.png" width="220" alt="Quote"/></td>
  </tr>
</table>
</details>

<details>
<summary><b>Cambridge Green</b></summary>
<table>
  <tr>
    <td><img src="./images/themes/cambridge/1.png" width="220" alt="Cover"/></td>
    <td><img src="./images/themes/cambridge/2.png" width="220" alt="Section"/></td>
    <td><img src="./images/themes/cambridge/3.png" width="220" alt="Content"/></td>
    <td><img src="./images/themes/cambridge/4.png" width="220" alt="Quote"/></td>
  </tr>
</table>
</details>

<details>
<summary><b>More Themes...</b></summary>

- Yale Blue
- Princeton Orange
- Nordic Blue
- Monochrome
- Warm Sepia
- High Contrast

[View All Themes →](https://scholarly-docs.jxpeng.dev/en/guide/themes.html)
</details>

**Use for:** Most of your slides (this is automatic!)

---

## 🔧 VS Code Extension

Boost your productivity with our VS Code extension:

- 🎯 Activity Bar panel for layouts/components
- ✨ Snippets: type `ss-` to insert layouts/components
- 📚 BibTeX integration with auto-complete
- 👁️ Preview support

[Download from Releases →](https://github.com/jxpeng98/slidev-theme-scholarly/releases)

---

## 🤝 Contributing

We welcome contributions!

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build
pnpm run build
```

[View Contributing Guide →](https://scholarly-docs.jxpeng.dev/en/contributing.html)

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

## 🔗 Links

- [📖 Documentation](https://scholarly-docs.jxpeng.dev/en/)
- [🎬 Live Demo](https://scholarly.jxpeng.dev/)
- [🐛 Issues](https://github.com/jxpeng98/slidev-theme-scholarly/issues)
- [💬 Discussions](https://github.com/slidevjs/slidev/discussions)
- [📦 NPM Package](https://www.npmjs.com/package/slidev-theme-scholarly)

---

