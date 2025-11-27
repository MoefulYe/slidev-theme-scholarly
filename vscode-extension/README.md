# Slidev Scholarly Snippets

VS Code extension for quickly inserting Slidev Theme Scholarly layouts and components.

## Features

### 🎯 Activity Bar Panel

The extension adds a dedicated panel in the VS Code Activity Bar with three sections:

- **Layouts** - All available slide layouts
- **Components** - Vue components and syntax sugar
- **Templates** - Quick-start presentation templates

Click any item to insert it at the cursor position.

### ⌨️ Snippets

Type the prefix and press `Tab` to expand snippets:

#### Layout Snippets

| Prefix | Description |
|--------|-------------|
| `ss-cover` | Cover slide |
| `ss-section` | Section divider |
| `ss-default` | Default content slide |
| `ss-center` | Centered content |
| `ss-auto-center` | Auto-adjusting centered content |
| `ss-two-cols` | Two column layout |
| `ss-image-left` | Image on left |
| `ss-image-right` | Image on right |
| `ss-bullets` | Bullet point list |
| `ss-quote` | Quote display |
| `ss-fact` | Single statistic |
| `ss-focus` | Focused message |
| `ss-compare` | Side-by-side comparison |
| `ss-figure` | Image with caption |
| `ss-statement` | Bold statement |
| `ss-references` | Bibliography |
| `ss-end` | Closing slide |
| `ss-frontmatter` | Full frontmatter config |

#### Component Snippets

| Prefix | Description |
|--------|-------------|
| `ss-block` | Block component (Vue) |
| `ss-block-md` | Block component (Markdown) |
| `ss-theorem` | Theorem component (Vue) |
| `ss-theorem-md` | Theorem component (Markdown) |
| `ss-definition` | Definition block |
| `ss-lemma` | Lemma block |
| `ss-proof` | Proof block |
| `ss-corollary` | Corollary block |
| `ss-highlight` | Inline highlight |
| `ss-steps` | Steps component |
| `ss-columns` | Columns component |
| `ss-keywords` | Keywords component |
| `ss-cite` | Parenthetical citation `@citekey` |
| `ss-cite-n` | Narrative citation `!@citekey` |
| `ss-bibliography` | Bibliography marker |
| `ss-math-i` | Inline math |
| `ss-math-b` | Math block |
| `ss-fontsize` | Font size config |
| `ss-comment` | Slide documentation comment |

## Installation

### From VSIX (Local)

1. Build the extension:
   ```bash
   cd vscode-extension
   npm install
   npm run compile
   npx vsce package
   ```

2. Install in VS Code:
   - Open VS Code
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
   - Type "Install from VSIX"
   - Select the generated `.vsix` file

### From Marketplace (Coming Soon)

Search for "Slidev Scholarly Snippets" in the VS Code Extensions marketplace.

## Usage

1. Open a Markdown file (`.md`)
2. Use one of these methods:
   - **Activity Bar**: Click the Slidev Scholarly icon in the sidebar
   - **Snippets**: Type `ss-` and select from autocomplete
   - **Command Palette**: `Cmd+Shift+P` → "Slidev Scholarly"

## Example

Start a new presentation by typing `ss-frontmatter`:

```markdown
---
theme: scholarly
footerMiddle: Conference Name
lang: en
bibFile: ./references.bib
bibStyle: apa
authors:
  - name: Author Name
    institution: Institution
    email: email@example.com
---

# Presentation Title

Subtitle
```

Then add slides with `ss-section`, `ss-default`, etc.

## Requirements

- VS Code 1.85.0 or higher
- [Slidev Theme Scholarly](https://github.com/jxpeng98/slidev-theme-scholarly) installed in your project

## License

MIT
