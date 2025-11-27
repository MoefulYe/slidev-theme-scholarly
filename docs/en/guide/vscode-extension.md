---
title: VS Code Extension
---

# VS Code Extension

We provide a VS Code extension to boost your productivity when creating Slidev presentations with this theme.

## Features

- 🎯 **Activity Bar Panel** - Quick access to all layouts, components, and templates
- ✨ **Code Snippets** - Type `ss-` or `scholarly-` to trigger snippets for layouts and components
- 📝 **One-Click Insert** - Click any item in the panel to insert code at cursor position
- 🚀 **New Presentation** - Create a new presentation with pre-configured template

## Installation

### From VSIX File

1. Download the `.vsix` file from the [vscode-extension](https://github.com/jxpeng98/slidev-theme-scholarly/tree/main/vscode-extension) folder
2. In VS Code, press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
3. Type "Extensions: Install from VSIX" and select the downloaded file
4. Reload VS Code

## Usage

### Using Code Snippets

Type the prefix in any Markdown file to trigger auto-completion:

```markdown
ss-cover      # Insert cover layout
ss-theorem    # Insert theorem component
ss-block      # Insert block component
scholarly-cite # Insert citation
```

Press `Tab` to move between placeholders in the inserted snippet.

### Using Activity Bar

1. Click the **Slidev Scholarly** icon in the Activity Bar (left sidebar)
2. Browse through three sections:
   - **Layouts** - All available slide layouts
   - **Components** - Built-in Vue components
   - **Templates** - Pre-made presentation templates
3. Click the `+` button next to any item to insert it at cursor position

### Creating New Presentation

1. Open Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Type "Slidev Scholarly: New Presentation"
3. Choose a location and filename
4. A new file will be created with the basic template

## Available Snippets

### Layout Snippets

| Prefix | Description |
|--------|-------------|
| `ss-cover` | Cover/title slide |
| `ss-default` | Default content slide |
| `ss-intro` | Section introduction |
| `ss-section` | Section divider |
| `ss-center` | Centered content |
| `ss-quote` | Quote layout |
| `ss-fact` | Single fact/statistic |
| `ss-statement` | Important statement |
| `ss-image-left` | Image on left, text on right |
| `ss-image-right` | Image on right, text on left |
| `ss-two-cols` | Two-column layout |
| `ss-focus` | Focused statement with icon |
| `ss-compare` | Side-by-side comparison |
| `ss-bullets` | Enhanced bullet list |
| `ss-figure` | Academic figure with caption |
| `ss-references` | Bibliography slide |
| `ss-end` | Thank you/closing slide |

### Component Snippets

| Prefix | Description |
|--------|-------------|
| `ss-theorem` | Theorem/lemma/definition |
| `ss-block` | Beamer-style colored block |
| `ss-steps` | Workflow/process steps |
| `ss-keywords` | Keyword tags |
| `ss-columns` | Multi-column layout |
| `ss-highlight` | Text highlighting |
| `ss-cite` | Inline citation |
| `scholarly-bibliography` | Bibliography placeholder |

## Tips

### Quick Layout Selection

When you need a specific layout, just type `ss-` and browse through the autocomplete suggestions. Each snippet includes helpful placeholders for common options.

### Combining with Markdown Syntax Sugar

The extension works great with the [Markdown Syntax Sugar](../syntax-sugar.md) feature. You can use either:

```markdown
<!-- Using Vue component (from snippet) -->
<Theorem type="theorem" title="Main Result">
Content here
</Theorem>

<!-- Using Markdown directive -->
:::theorem{type="theorem" title="Main Result"}
Content here
:::
```

### Customizing Snippets

If you want to modify the snippets, you can:

1. Open VS Code Settings
2. Search for "Configure User Snippets"
3. Select "markdown.json"
4. Add your custom snippets

## Troubleshooting

### Snippets Not Showing

1. Make sure the extension is installed and enabled
2. Check that you're editing a `.md` file
3. Try pressing `Ctrl+Space` to manually trigger suggestions

### Activity Bar Icon Missing

1. Right-click on the Activity Bar
2. Make sure "Slidev Scholarly" is checked

## Feedback

Found a bug or have a feature request? Please open an issue on [GitHub](https://github.com/jxpeng98/slidev-theme-scholarly/issues).
