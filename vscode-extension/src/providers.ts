import * as vscode from 'vscode';

export interface SnippetItem {
  label: string;
  description: string;
  snippet: string;
  icon?: string;
}

// Layout definitions
export const layouts: SnippetItem[] = [
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
    label: 'section',
    description: 'Section divider',
    icon: '📑',
    snippet: `---
layout: section
---

# Section Title

Section subtitle

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
---

## Main Topic

- First point
- Second point
- Third point
- Fourth point

`
  },
  {
    label: 'quote',
    description: 'Quote display',
    icon: '💬',
    snippet: `---
layout: quote
---

Your inspiring quote goes here.

— Attribution

`
  },
  {
    label: 'fact',
    description: 'Single statistic or fact',
    icon: '📊',
    snippet: `---
layout: fact
color: green
---

# 99%

Description of the statistic

`
  },
  {
    label: 'focus',
    description: 'Focused message with icon',
    icon: '🔍',
    snippet: `---
layout: focus
color: blue
icon: 🎯
---

# Main Message

Supporting text for your focused point.

`
  },
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
    label: 'references',
    description: 'Bibliography/References',
    icon: '📚',
    snippet: `---
layout: references
---

[[bibliography]]

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
  }
];

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
    label: 'Columns',
    description: 'Custom columns layout',
    icon: '▥',
    snippet: `<Columns :columns="3" :gap="2">

Column 1 content

---

Column 2 content

---

Column 3 content

</Columns>

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

// Layouts Provider
export class LayoutsProvider implements vscode.TreeDataProvider<SnippetTreeItem> {
  getTreeItem(element: SnippetTreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<SnippetTreeItem[]> {
    return Promise.resolve(
      layouts.map(item => new SnippetTreeItem(item, vscode.TreeItemCollapsibleState.None))
    );
  }
}

// Components Provider
export class ComponentsProvider implements vscode.TreeDataProvider<SnippetTreeItem> {
  getTreeItem(element: SnippetTreeItem): vscode.TreeItem {
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
