import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { getColorThemePreviewDir, getComponentPreviewFile } from './preview';
import type { CliActionId } from './commands';

export interface SnippetItem {
  label: string;
  description: string;
  snippet: string;
  icon?: string;
  category?: string;
}

function toMarkdownCodeBlock(snippet: string): string {
  return '```md\n' + snippet.trim() + '\n```';
}

const previewExistsCache = new Map<string, boolean>();

function hasPreview(extensionUri: vscode.Uri, ...segments: string[]): boolean {
  const absPath = path.join(extensionUri.fsPath, ...segments);
  const cached = previewExistsCache.get(absPath);
  if (cached !== undefined) return cached;
  const exists = fs.existsSync(absPath);
  previewExistsCache.set(absPath, exists);
  return exists;
}

function createLayoutTooltip(
  extensionUri: vscode.Uri,
  layoutId: string,
  description: string,
  snippet: string
): vscode.MarkdownString {
  const md = new vscode.MarkdownString('', true);
  md.baseUri = extensionUri;
  md.supportHtml = true;
  if (hasPreview(extensionUri, 'media', 'previews', 'layouts', `${layoutId}.png`)) {
    md.appendMarkdown(`![${layoutId}](media/previews/layouts/${layoutId}.png)\n\n`);
  }
  md.appendMarkdown(`**${layoutId}** — ${description}\n\n`);
  md.appendMarkdown(toMarkdownCodeBlock(snippet));
  md.appendMarkdown('\n\n*Click 👁 for larger preview*');
  return md;
}

function createComponentTooltip(
  extensionUri: vscode.Uri,
  label: string,
  description: string,
  snippet: string
): vscode.MarkdownString {
  const md = new vscode.MarkdownString('', true);
  md.baseUri = extensionUri;
  md.supportHtml = true;
  const file = getComponentPreviewFile(label);
  if (file && hasPreview(extensionUri, 'media', 'previews', 'components', `${file}.png`)) {
    md.appendMarkdown(`![${label}](media/previews/components/${file}.png)\n\n`);
  }
  md.appendMarkdown(`**${label}** — ${description}\n\n`);
  md.appendMarkdown(toMarkdownCodeBlock(snippet));
  md.appendMarkdown('\n\n*Click 👁 for larger preview*');
  return md;
}

function createThemeTooltip(
  extensionUri: vscode.Uri,
  label: string,
  description: string | undefined,
  colorTheme: string | undefined
): vscode.MarkdownString {
  const md = new vscode.MarkdownString('', true);
  md.baseUri = extensionUri;
  md.supportHtml = true;

  if (colorTheme) {
    const dir = getColorThemePreviewDir(colorTheme);
    if (dir && hasPreview(extensionUri, 'media', 'previews', 'themes', dir, '1.png')) {
      md.appendMarkdown(`![${label}](media/previews/themes/${dir}/1.png)\n\n`);
    }
  }

  md.appendMarkdown(`**${label}**\n\n`);
  if (description) md.appendMarkdown(`${description}\n\n`);
  if (colorTheme) md.appendMarkdown(`\`colorTheme: ${colorTheme}\`\n\n`);
  md.appendMarkdown('*Click 👁 for full preview*');
  return md;
}

// Layout definitions organized by category
export const layoutCategories = {
  structure: {
    label: 'Structure',
    description: 'Title, sections, and endings',
    icon: 'symbol-structure',
    layouts: [
      {
        label: 'cover',
        description: 'Title slide (default first slide)',
        icon: '📄',
        snippet: `---
layout: cover
---

# Presentation Title

Subtitle or description

`
      },
      {
        label: 'default',
        description: 'Standard content slide',
        icon: '📝',
        snippet: `---
layout: default
title: Slide Title
subtitle: Optional subtitle
---

## Content Title

Your content here.

`
      },
      {
        label: 'intro',
        description: 'Introduction slide',
        icon: '👋',
        snippet: `---
layout: intro
---

# Introduction Title

Introduction content and overview.

`
      },
      {
        label: 'section',
        description: 'Section divider (sectionMode: dark/light)',
        icon: '📑',
        snippet: `---
layout: section
sectionMode: dark
---

# Section Title

Section subtitle

`
      },
      {
        label: 'center',
        description: 'Centered content',
        icon: '🎯',
        snippet: `---
layout: center
---

## Centered Title

Centered content for important messages.

`
      },
      {
        label: 'auto-center',
        description: 'Auto-adjusting centered content',
        icon: '⚡',
        snippet: `---
layout: auto-center
title: Title
subtitle: Subtitle
---

## Auto-Centered Content

Content with auto-adjusting font size.

`
      },
      {
        label: 'auto-size',
        description: 'Default flow with fit-to-page sizing',
        icon: '📏',
        snippet: `---
layout: auto-size
title: Title
subtitle: Subtitle
autoSizeGrow: true
autoSizeAlign: top
autoSizePadding: normal
minFontSize: 14
maxFontSize: 30
---

## Auto-Sized Main Matter

Content that should fit the available width and height.

`
      },
      {
        label: 'toc',
        description: 'Table of contents (auto-generated, section-grouped outline)',
        icon: '📋',
        snippet: `---
layout: toc
title: Outline
---

`
      },
      {
        label: 'end',
        description: 'Closing slide',
        icon: '🎬',
        snippet: `---
layout: end
email: your@email.com
website: https://example.com
subtitle: Questions?
---

Thank you for your attention!

`
      }
    ]
  },
  content: {
    label: 'Content',
    description: 'Images, columns, and lists',
    icon: 'symbol-file',
    layouts: [
      {
        label: 'two-cols',
        description: 'Two column layout',
        icon: '▥',
        snippet: `---
layout: two-cols
ratio: "1:1"
title: Two Columns
---

## Left Column

Left content here.

::right::

## Right Column

Right content here.

`
      },
      {
        label: 'image-left',
        description: 'Image on left, content on right',
        icon: '🖼️',
        snippet: `---
layout: image-left
image: https://example.com/image.jpg
ratio: "1:2"
title: Image Left
---

## Content Title

Your content on the right side.

`
      },
      {
        label: 'image-right',
        description: 'Content on left, image on right',
        icon: '🖼️',
        snippet: `---
layout: image-right
image: https://example.com/image.jpg
ratio: "2:1"
title: Image Right
---

## Content Title

Your content on the left side.

`
      },
      {
        label: 'bullets',
        description: 'Bullet point list slide',
        icon: '📋',
        snippet: `---
layout: bullets
title: Bullet Points
subtitle: Key points
icon: "▸"
---

## Main Topic

- First point
- Second point
- Third point
- Fourth point

`
      },
      {
        label: 'figure',
        description: 'Image with caption',
        icon: '🖼️',
        snippet: `---
layout: figure
src: https://example.com/figure.jpg
caption: Figure caption describing the image.
label: "Figure 1:"
title: Figure Title
---

Additional description or context.

`
      },
      {
        label: 'split-image',
        description: 'Image comparison',
        icon: '🖼️',
        snippet: `---
layout: split-image
images:
  - ./image1.png
  - ./image2.png
captions:
  - Caption 1
  - Caption 2
title: Comparison
---

`
      }
    ]
  },
  emphasis: {
    label: 'Emphasis',
    description: 'Quotes, facts, and statements',
    icon: 'megaphone',
    layouts: [
      {
        label: 'quote',
        description: 'Quote display',
        icon: '💬',
        snippet: `---
layout: quote
author: Author Name
source: Source, Year
---

Your inspiring quote goes here.

`
      },
      {
        label: 'fact',
        description: 'Single statistic or fact',
        icon: '📊',
        snippet: `---
layout: fact
color: primary
---

# 99%

Description of the statistic

`
      },
      {
        label: 'statement',
        description: 'Bold statement',
        icon: '📢',
        snippet: `---
layout: statement
---

# Your Statement

A bold claim or conclusion that needs emphasis.

`
      },
      {
        label: 'focus',
        description: 'Focused message with icon',
        icon: '🔍',
        snippet: `---
layout: focus
color: primary
icon: 🎯
---

# Main Message

Supporting text for your focused point.

`
      }
    ]
  },
  academic: {
    label: 'Academic',
    description: 'Research and references',
    icon: 'mortar-board',
    layouts: [
      {
        label: 'compare',
        description: 'Side-by-side comparison',
        icon: '⚖️',
        snippet: `---
layout: compare
title: Comparison
leftLabel: Option A
rightLabel: Option B
leftColor: red
rightColor: green
---

### Option A Points

- Point 1
- Point 2
- Point 3

::right::

### Option B Points

- Point 1
- Point 2
- Point 3

`
      },
      {
        label: 'methodology',
        description: 'Research methodology',
        icon: '🔬',
        snippet: `---
layout: methodology
ratio: "1:1"
title: Methodology
---

## Our Approach

1. Step one
2. Step two
3. Step three

::right::

Diagram or visual here

`
      },
      {
        label: 'results',
        description: 'Results dashboard',
        icon: '📊',
        snippet: `---
layout: results
cols: 2
title: Key Results
---

<div class="p-4 bg-white rounded shadow">
  <h3>Metric 1</h3>
  <h1>Value</h1>
</div>

<div class="p-4 bg-white rounded shadow">
  <h3>Metric 2</h3>
  <h1>Value</h1>
</div>

`
      },
      {
        label: 'timeline',
        description: 'Research timeline',
        icon: '📅',
        snippet: `---
layout: timeline
title: Timeline
items:
  - year: "2020"
    title: First Event
    description: Description
  - year: "2021"
    title: Second Event
    description: Description
---

`
      },
      {
        label: 'agenda',
        description: 'Agenda/overview',
        icon: '📋',
        snippet: `---
layout: agenda
title: Agenda
items:
  - Introduction
  - Main Topic
  - Discussion
  - Q&A
---

`
      },
      {
        label: 'acknowledgments',
        description: 'Acknowledgments slide',
        icon: '🙏',
        snippet: `---
layout: acknowledgments
title: Acknowledgments
funders:
  - Funding Organization
collaborators:
  - Collaborator Name
---

Special thanks to all contributors.

`
      },
      {
        label: 'references',
        description: 'Bibliography/References',
        icon: '📚',
        snippet: `---
layout: references
---

[[bibliography]]

`
      }
    ]
  }
};

// Flatten layouts for backward compatibility
export const layouts: SnippetItem[] = Object.entries(layoutCategories).flatMap(
  ([categoryKey, category]) =>
    category.layouts.map(layout => ({
      ...layout,
      category: categoryKey
    }))
);

// Component definitions
export const components: SnippetItem[] = [
  {
    label: 'Block (Vue)',
    description: 'Beamer-style block',
    icon: '📦',
    snippet: `<Block type="info" title="Block Title">

Block content goes here.

</Block>

`
  },
  {
    label: 'Block (Syntax Sugar)',
    description: 'Beamer-style block (markdown)',
    icon: '📦',
    snippet: `:::block{type="info" title="Block Title"}
Block content goes here.
:::

`
  },
  {
    label: 'Theorem (Vue)',
    description: 'Mathematical theorem',
    icon: '📐',
    snippet: `<Theorem type="theorem" title="Theorem Name">

Mathematical statement here.

$$formula$$

</Theorem>

`
  },
  {
    label: 'Theorem (Syntax Sugar)',
    description: 'Mathematical theorem (markdown)',
    icon: '📐',
    snippet: `:::theorem{type="theorem" title="Theorem Name"}
Mathematical statement here.

$$formula$$
:::

`
  },
  {
    label: 'Definition',
    description: 'Mathematical definition',
    icon: '📖',
    snippet: `<Theorem type="definition" title="Definition Name">

Definition content here.

</Theorem>

`
  },
  {
    label: 'Lemma',
    description: 'Mathematical lemma',
    icon: '📝',
    snippet: `<Theorem type="lemma" title="Lemma Name">

Lemma statement here.

</Theorem>

`
  },
  {
    label: 'Proof',
    description: 'Proof block',
    icon: '✅',
    snippet: `<Theorem type="proof">

Proof content here. $\\square$

</Theorem>

`
  },
  {
    label: 'Corollary',
    description: 'Corollary statement',
    icon: '➡️',
    snippet: `<Theorem type="corollary" title="Corollary">

Corollary statement here.

</Theorem>

`
  },
  {
    label: 'Example',
    description: 'Example block',
    icon: '💡',
    snippet: `<Theorem type="example">

Example content here.

</Theorem>

`
  },
  {
    label: 'Note',
    description: 'Note/remark block',
    icon: '📌',
    snippet: `<Theorem type="note">

Note content here.

</Theorem>

`
  },
  {
    label: 'Highlight (Vue)',
    description: 'Inline text highlight',
    icon: '🖍️',
    snippet: `<Highlight type="primary">highlighted text</Highlight>`
  },
  {
    label: 'Highlight (Syntax Sugar)',
    description: 'Inline text highlight (markdown)',
    icon: '🖍️',
    snippet: `:::highlight{type="primary"}
highlighted text
:::

`
  },
  {
    label: 'Cite (Vue)',
    description: 'Inline citation note (non-BibTeX)',
    icon: '📝',
    snippet: `<Cite :inline="true">

Citation text here.

</Cite>

`
  },
  {
    label: 'Cite (Syntax Sugar)',
    description: 'Inline citation note (markdown)',
    icon: '📝',
    snippet: `:::cite{:inline="true"}
Citation text here.
:::

`
  },
  {
    label: 'Steps',
    description: 'Step-by-step process',
    icon: '🔢',
    snippet: `<Steps :steps="[
  { title: 'Step 1', description: 'Description 1' },
  { title: 'Step 2', description: 'Description 2' },
  { title: 'Step 3', description: 'Description 3' }
]" :activeStep="1" />

`
  },
  {
    label: 'Steps (Syntax Sugar)',
    description: 'Step-by-step process (markdown)',
    icon: '🔢',
    snippet: `:::steps{:steps='[
  { title: "Step 1", description: "Description 1" },
  { title: "Step 2", description: "Description 2" },
  { title: "Step 3", description: "Description 3" }
]' :activeStep="1"}
:::

`
  },
  {
    label: 'Columns',
    description: 'Custom columns layout',
    icon: '▥',
    snippet: `<Columns :columns="3" :gap="2">

Column 1 content

<template #col2>

Column 2 content

</template>

<template #col3>

Column 3 content

</template>

</Columns>

`
  },
  {
    label: 'Columns (Syntax Sugar)',
    description: 'Custom columns layout (markdown)',
    icon: '▥',
    snippet: `:::columns{columns="2" gap="2rem" ratio="1:1"}
Column 1 content

+++

Column 2 content
:::

`
  },
  {
    label: 'Keywords',
    description: 'Keyword tags',
    icon: '🏷️',
    snippet: `<Keywords :keywords="['Keyword 1', 'Keyword 2', 'Keyword 3']" />

`
  },
  {
    label: 'Keywords (Syntax Sugar)',
    description: 'Keyword tags (markdown)',
    icon: '🏷️',
    snippet: `:::keywords{:keywords='["Keyword 1", "Keyword 2", "Keyword 3"]' color="primary"}
:::

`
  },
  {
    label: 'ThemePreview',
    description: 'Preview a color theme',
    icon: '🎨',
    snippet: `<ThemePreview colorTheme="classic-blue">

Content with theme colors applied.

</ThemePreview>

`
  },
  {
    label: 'Citation @',
    description: 'Parenthetical citation',
    icon: '📎',
    snippet: `@citekey`
  },
  {
    label: 'Citation !@',
    description: 'Narrative citation',
    icon: '📎',
    snippet: `!@citekey`
  },
  {
    label: 'Bibliography',
    description: 'Generate reference list',
    icon: '📚',
    snippet: `[[bibliography]]

`
  }
];

// Tree Item class
export class SnippetTreeItem extends vscode.TreeItem {
  constructor(
    public readonly item: SnippetItem,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(item.label, collapsibleState);
    this.tooltip = item.description;
    this.description = item.description;
    this.iconPath = new vscode.ThemeIcon('symbol-snippet');
    this.command = {
      command: 'slidev-scholarly.insertLayout',
      title: 'Insert',
      arguments: [{ snippet: item.snippet }]
    };
  }

  get snippet(): string {
    return this.item.snippet;
  }
}

// Layout Category Tree Item
class LayoutCategoryTreeItem extends vscode.TreeItem {
  constructor(
    public readonly categoryKey: string,
    public readonly categoryData: { label: string; description: string; icon: string }
  ) {
    super(categoryData.label, vscode.TreeItemCollapsibleState.Collapsed);
    this.description = categoryData.description;
    this.iconPath = new vscode.ThemeIcon(categoryData.icon);
    this.contextValue = 'layoutCategory';
  }
}

// Layouts Provider with categories
export class LayoutsProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  constructor(private readonly extensionUri: vscode.Uri) { }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
    if (!element) {
      // Return category groups
      return Promise.resolve(
        Object.entries(layoutCategories).map(
          ([key, category]) => new LayoutCategoryTreeItem(key, category)
        )
      );
    }

    if (element instanceof LayoutCategoryTreeItem) {
      // Return layouts in this category
      const category = layoutCategories[element.categoryKey as keyof typeof layoutCategories];
      return Promise.resolve(
        category.layouts.map(layout => {
          const item = new SnippetTreeItem(layout, vscode.TreeItemCollapsibleState.None);
          item.contextValue = 'layoutSnippet';
          item.tooltip = createLayoutTooltip(
            this.extensionUri,
            layout.label,
            layout.description,
            layout.snippet
          );
          item.command = {
            command: 'slidev-scholarly.insertLayout',
            title: 'Insert',
            arguments: [{ snippet: layout.snippet }]
          };
          return item;
        })
      );
    }

    return Promise.resolve([]);
  }
}

// Components Provider
export class ComponentsProvider implements vscode.TreeDataProvider<SnippetTreeItem> {
  constructor(private readonly extensionUri: vscode.Uri) { }

  getTreeItem(element: SnippetTreeItem): vscode.TreeItem {
    element.contextValue = 'componentSnippet';
    element.tooltip = createComponentTooltip(
      this.extensionUri,
      element.item.label,
      element.item.description,
      element.item.snippet
    );
    element.command = {
      command: 'slidev-scholarly.insertComponent',
      title: 'Insert',
      arguments: [{ snippet: element.snippet }]
    };
    return element;
  }

  getChildren(): Thenable<SnippetTreeItem[]> {
    return Promise.resolve(
      components.map(item => new SnippetTreeItem(item, vscode.TreeItemCollapsibleState.None))
    );
  }
}

// Templates Provider
export class TemplatesProvider implements vscode.TreeDataProvider<SnippetTreeItem> {
  getTreeItem(element: SnippetTreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<SnippetTreeItem[]> {
    const templates: SnippetItem[] = [
      {
        label: 'New Academic Presentation',
        description: 'Create a complete academic presentation',
        icon: '🎓',
        snippet: 'academic'
      },
      {
        label: 'New Simple Presentation',
        description: 'Create a simple presentation',
        icon: '📊',
        snippet: 'simple'
      }
    ];

    const items = templates.map(item => {
      const treeItem = new SnippetTreeItem(item, vscode.TreeItemCollapsibleState.None);
      treeItem.command = {
        command: 'slidev-scholarly.newPresentation',
        title: 'Create',
        arguments: [item.snippet]
      };
      return treeItem;
    });

    return Promise.resolve(items);
  }
}

type ThemeGroupId = 'presets' | 'colorThemes' | 'fontThemes';

type ThemePresetItem = {
  id: string;
  label: string;
  description: string;
  colorTheme: string;
  fontTheme: string;
};

// Theme data imported from shared definitions (Single Source of Truth)
import {
  COLOR_THEMES_SIMPLE as COLOR_THEMES,
  FONT_THEMES_SIMPLE as FONT_THEMES,
  THEME_PRESETS
} from './sharedData';

class ThemeGroupTreeItem extends vscode.TreeItem {
  constructor(
    public readonly groupId: ThemeGroupId,
    label: string
  ) {
    super(label, vscode.TreeItemCollapsibleState.Collapsed);
    this.iconPath = new vscode.ThemeIcon('symbol-folder');
  }
}

interface ThemeValueMeta {
  colorTheme?: string;
  fontTheme?: string;
}

class ThemeValueTreeItem extends vscode.TreeItem {
  public readonly meta?: ThemeValueMeta;

  constructor(
    public readonly kind: 'preset' | 'colorTheme' | 'fontTheme',
    public readonly value: string,
    label: string,
    description?: string,
    command?: vscode.Command,
    meta?: ThemeValueMeta
  ) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.description = description;
    this.iconPath = new vscode.ThemeIcon(
      kind === 'preset' ? 'paintcan' : kind === 'fontTheme' ? 'symbol-font' : 'symbol-color'
    );
    this.command = command;
    this.meta = meta;
    this.contextValue = kind === 'preset' ? 'themePreset' :
      kind === 'colorTheme' ? 'themeColorTheme' : 'themeFontTheme';
  }
}

export class ThemesProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  constructor(private readonly extensionUri: vscode.Uri) { }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
    if (!element) {
      return Promise.resolve([
        new ThemeGroupTreeItem('presets', 'Presets'),
        new ThemeGroupTreeItem('colorThemes', 'Color Themes'),
        new ThemeGroupTreeItem('fontThemes', 'Font Themes')
      ]);
    }

    if (element instanceof ThemeGroupTreeItem) {
      if (element.groupId === 'presets') {
        return Promise.resolve(
          THEME_PRESETS.map(preset => {
            const item = new ThemeValueTreeItem(
              'preset',
              preset.id,
              preset.label,
              preset.description,
              {
                command: 'slidev-scholarly.applyThemePreset',
                title: 'Apply Preset',
                arguments: [preset]
              },
              { colorTheme: preset.colorTheme, fontTheme: preset.fontTheme }
            );
            item.tooltip = createThemeTooltip(
              this.extensionUri,
              preset.label,
              preset.description,
              preset.colorTheme
            );
            return item;
          })
        );
      }

      if (element.groupId === 'colorThemes') {
        return Promise.resolve(
          COLOR_THEMES.map(theme => {
            const item = new ThemeValueTreeItem(
              'colorTheme',
              theme.value,
              theme.label,
              theme.value,
              {
                command: 'slidev-scholarly.setColorTheme',
                title: 'Set Color Theme',
                arguments: [theme.value]
              },
              { colorTheme: theme.value }
            );
            item.tooltip = createThemeTooltip(
              this.extensionUri,
              theme.label,
              theme.value,
              theme.value
            );
            return item;
          })
        );
      }

      if (element.groupId === 'fontThemes') {
        return Promise.resolve(
          FONT_THEMES.map(theme => {
            const item = new ThemeValueTreeItem(
              'fontTheme',
              theme.value,
              theme.label,
              theme.value,
              {
                command: 'slidev-scholarly.setFontTheme',
                title: 'Set Font Theme',
                arguments: [theme.value]
              },
              { fontTheme: theme.value }
            );
            item.tooltip = new vscode.MarkdownString(
              `**${theme.label}**\n\n\`fontTheme: ${theme.value}\``
            );
            return item;
          })
        );
      }
    }

    return Promise.resolve([]);
  }
}

type CliGroupId = 'create' | 'theme' | 'snippets' | 'tools';

type CliActionItem = {
  label: string;
  description: string;
  icon: string;
  action: CliActionId;
};

const CLI_GROUPS: Record<CliGroupId, { label: string; icon: string; items: CliActionItem[] }> = {
  create: {
    label: 'Create',
    icon: 'new-file',
    items: [
      {
        label: 'New Presentation...',
        description: 'Run scholarly init with prompts',
        icon: 'new-file',
        action: 'initPresentation'
      },
      {
        label: 'List Templates',
        description: 'Run scholarly template list',
        icon: 'list-flat',
        action: 'templateList'
      }
    ]
  },
  theme: {
    label: 'Theme',
    icon: 'paintcan',
    items: [
      {
        label: 'Apply Theme Preset...',
        description: 'Apply color/font preset to frontmatter',
        icon: 'wand',
        action: 'themeApply'
      },
      {
        label: 'Apply Theme Preset Combo...',
        description: 'Run scholarly theme preset apply',
        icon: 'paintcan',
        action: 'themePresetApply'
      },
      {
        label: 'List Themes',
        description: 'Run scholarly theme list',
        icon: 'symbol-color',
        action: 'themeList'
      },
      {
        label: 'List Theme Presets',
        description: 'Run scholarly theme preset list',
        icon: 'list-flat',
        action: 'themePresetList'
      },
      {
        label: 'List Layouts',
        description: 'Run scholarly layout list',
        icon: 'layout',
        action: 'layoutList'
      },
      {
        label: 'List Components',
        description: 'Run scholarly component list',
        icon: 'symbol-method',
        action: 'componentList'
      }
    ]
  },
  snippets: {
    label: 'Snippets',
    icon: 'symbol-snippet',
    items: [
      {
        label: 'Append Snippet...',
        description: 'Append theorem/methodology/etc to slides',
        icon: 'add',
        action: 'snippetAppend'
      },
      {
        label: 'Show Snippet...',
        description: 'Print a snippet in terminal',
        icon: 'eye',
        action: 'snippetShow'
      },
      {
        label: 'List Snippets',
        description: 'Run scholarly snippet list',
        icon: 'list-flat',
        action: 'snippetList'
      },
      {
        label: 'Append Workflow...',
        description: 'Append paper/seminar/quick workflow',
        icon: 'git-commit',
        action: 'workflowApply'
      },
      {
        label: 'List Workflows',
        description: 'Run scholarly workflow list',
        icon: 'list-tree',
        action: 'workflowList'
      }
    ]
  },
  tools: {
    label: 'Tools',
    icon: 'tools',
    items: [
      {
        label: 'Doctor',
        description: 'Check CLI environment and project status',
        icon: 'pulse',
        action: 'doctor'
      },
      {
        label: 'Setup Vite Citation Bridge...',
        description: 'Create or repair Scholarly Vite citation integration',
        icon: 'link',
        action: 'setupVite'
      },
      {
        label: 'Help',
        description: 'Run scholarly help',
        icon: 'question',
        action: 'help'
      }
    ]
  }
};

class CliGroupTreeItem extends vscode.TreeItem {
  constructor(public readonly groupId: CliGroupId, label: string, icon: string) {
    super(label, vscode.TreeItemCollapsibleState.Expanded);
    this.iconPath = new vscode.ThemeIcon(icon);
  }
}

class CliActionTreeItem extends vscode.TreeItem {
  constructor(public readonly actionItem: CliActionItem) {
    super(actionItem.label, vscode.TreeItemCollapsibleState.None);
    this.description = actionItem.description;
    this.tooltip = `${actionItem.label} — ${actionItem.description}`;
    this.iconPath = new vscode.ThemeIcon(actionItem.icon);
    this.contextValue = 'cliAction';
    this.command = {
      command: 'slidev-scholarly.cliAction',
      title: 'Run CLI Action',
      arguments: [actionItem.action]
    };
  }
}

export class CliProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
    if (!element) {
      const groups = (Object.keys(CLI_GROUPS) as CliGroupId[]).map(
        key => new CliGroupTreeItem(key, CLI_GROUPS[key].label, CLI_GROUPS[key].icon)
      );
      return Promise.resolve(groups);
    }

    if (element instanceof CliGroupTreeItem) {
      const group = CLI_GROUPS[element.groupId];
      return Promise.resolve(group.items.map(item => new CliActionTreeItem(item)));
    }

    return Promise.resolve([]);
  }
}
