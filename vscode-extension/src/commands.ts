import * as vscode from 'vscode';

type ThemeConfigUpdate = {
  colorTheme?: string
  fontTheme?: string
  colorMode?: 'light' | 'dark'
}

type ThemePreset = {
  id: string
  label: string
  description: string
  colorTheme: string
  fontTheme: string
}

const COLOR_THEMES: Array<{ value: string; label: string; description: string }> = [
  { value: 'classic-blue', label: 'Classic Blue', description: 'Default scholarly palette' },
  { value: 'oxford-burgundy', label: 'Oxford Burgundy', description: 'Deep burgundy accents' },
  { value: 'cambridge-green', label: 'Cambridge Green', description: 'Elegant green accents' },
  { value: 'yale-blue', label: 'Yale Blue', description: 'Strong blue accents' },
  { value: 'princeton-orange', label: 'Princeton Orange', description: 'Vibrant orange accents' },
  { value: 'nordic-blue', label: 'Nordic Blue', description: 'Cool nordic tones' },
  { value: 'warm-sepia', label: 'Warm Sepia', description: 'Warm paper-like tones' },
  { value: 'monochrome', label: 'Monochrome', description: 'Minimal black & white' },
  { value: 'high-contrast', label: 'High Contrast', description: 'Maximum contrast' }
];

const COLOR_MODES: Array<{ value: 'light' | 'dark'; label: string; description: string }> = [
  { value: 'dark', label: 'Dark', description: 'Dark background with light text (default)' },
  { value: 'light', label: 'Light', description: 'Light background with dark text' }
];

const FONT_THEMES: Array<{ value: string; label: string; description: string }> = [
  { value: 'classic', label: 'Classic', description: 'Traditional academic feel' },
  { value: 'modern', label: 'Modern', description: 'Clean and minimal' },
  { value: 'traditional', label: 'Traditional', description: 'Serif-forward classic' },
  { value: 'contemporary', label: 'Contemporary', description: 'Balanced and readable' },
  { value: 'humanist', label: 'Humanist', description: 'Friendly humanist sans' },
  { value: 'technical', label: 'Technical', description: 'Engineering/tech vibe' },
  { value: 'elegant', label: 'Elegant', description: 'Refined serif accents' },
  { value: 'sans-default', label: 'Sans Default', description: 'Simple sans default' }
];

const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'classic',
    label: 'Classic',
    description: 'Classic Blue + Classic',
    colorTheme: 'classic-blue',
    fontTheme: 'classic'
  },
  {
    id: 'oxford',
    label: 'Oxford',
    description: 'Oxford Burgundy + Traditional',
    colorTheme: 'oxford-burgundy',
    fontTheme: 'traditional'
  },
  {
    id: 'cambridge',
    label: 'Cambridge',
    description: 'Cambridge Green + Elegant',
    colorTheme: 'cambridge-green',
    fontTheme: 'elegant'
  },
  {
    id: 'modern',
    label: 'Modern Minimal',
    description: 'Monochrome + Sans Default',
    colorTheme: 'monochrome',
    fontTheme: 'sans-default'
  }
];

export function insertSnippet(snippet: string) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage('No active editor found');
    return;
  }

  editor.insertSnippet(new vscode.SnippetString(snippet));
}

export async function createNewPresentation(template?: string) {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  
  const fileName = await vscode.window.showInputBox({
    prompt: 'Enter presentation file name',
    value: 'slides.md',
    validateInput: (value) => {
      if (!value.endsWith('.md')) {
        return 'File must have .md extension';
      }
      return null;
    }
  });

  if (!fileName) {
    return;
  }

  const content = template === 'simple' ? getSimpleTemplate() : getAcademicTemplate();

  if (workspaceFolders && workspaceFolders.length > 0) {
    const uri = vscode.Uri.joinPath(workspaceFolders[0].uri, fileName);
    const encoder = new TextEncoder();
    await vscode.workspace.fs.writeFile(uri, encoder.encode(content));
    const doc = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(doc);
  } else {
    // No workspace, create untitled document
    const doc = await vscode.workspace.openTextDocument({
      language: 'markdown',
      content: content
    });
    await vscode.window.showTextDocument(doc);
  }
}

function getAcademicTemplate(): string {
  return `---
theme: scholarly
footerMiddle: Conference Name 2025
lang: en
themeConfig:
  colorTheme: classic-blue
  fontTheme: classic
bibFile: ./references.bib
bibStyle: apa
authors:
  - name: First Author
    institution: Department of Computer Science
    email: first@university.edu
  - name: Second Author
    institution: School of Engineering
    email: second@institute.edu
---

# Presentation Title

Subtitle or Research Topic

<!--
SLIDE: Cover
LAYOUT: cover (default for first slide)
-->

---
layout: bullets
title: Outline
subtitle: What we'll cover today
---

<!--
SLIDE: Outline
LAYOUT: bullets
-->

## Today's Agenda

1. **Introduction** - Background and motivation
2. **Methods** - Our approach
3. **Results** - Key findings
4. **Discussion** - Conclusions

---
layout: section
---

<!--
SLIDE: Section Divider
LAYOUT: section
-->

# Introduction

Background and Motivation

---
layout: default
title: Background
---

<!--
SLIDE: Background
LAYOUT: default
-->

## Background

Your background content here.

- Point 1
- Point 2
- Point 3

---
layout: section
---

# Methods

Our Approach

---
layout: default
title: Methodology
---

## Methodology

<Block type="info" title="Our Approach">

Describe your methodology here.

</Block>

---
layout: section
---

# Results

Key Findings

---
layout: fact
color: green
---

<!--
SLIDE: Key Result
LAYOUT: fact
-->

# 95%

Main Result Metric

---
layout: section
---

# Discussion

Conclusions and Future Work

---
layout: default
title: Conclusions
---

## Conclusions

- Key takeaway 1
- Key takeaway 2
- Key takeaway 3

---
layout: references
---

<!--
SLIDE: References
LAYOUT: references
-->

[[bibliography]]

---
layout: end
email: your@email.com
website: https://example.com
subtitle: Questions?
---

<!--
SLIDE: End
LAYOUT: end
-->

Thank you for your attention!
`;
}

function getSimpleTemplate(): string {
  return `---
theme: scholarly
footerMiddle: Presentation Title
lang: en
themeConfig:
  colorTheme: classic-blue
  fontTheme: classic
authors:
  - name: Your Name
    institution: Your Institution
    email: your@email.com
---

# Presentation Title

Your subtitle here

---
layout: section
---

# First Section

Section description

---
layout: default
---

## Slide Title

Your content here.

- Point 1
- Point 2
- Point 3

---
layout: center
---

## Thank You

Questions?
`;
}

export async function setColorTheme(colorTheme?: string) {
  const value = colorTheme ?? await pickColorTheme();
  if (!value) return;
  await upsertThemeConfigInActiveDocument({ colorTheme: value });
  vscode.window.showInformationMessage(`Slidev Scholarly: colorTheme → ${value}`);
}

export async function setFontTheme(fontTheme?: string) {
  const value = fontTheme ?? await pickFontTheme();
  if (!value) return;
  await upsertThemeConfigInActiveDocument({ fontTheme: value });
  vscode.window.showInformationMessage(`Slidev Scholarly: fontTheme → ${value}`);
}

export async function setColorMode(colorMode?: 'light' | 'dark') {
  const value = colorMode ?? await pickColorMode();
  if (!value) return;
  await upsertThemeConfigInActiveDocument({ colorMode: value });
  vscode.window.showInformationMessage(`Slidev Scholarly: colorMode → ${value}`);
}

export async function applyThemePreset(preset?: ThemePreset | string) {
  let selected: ThemePreset | undefined;

  if (typeof preset === 'string') {
    selected = THEME_PRESETS.find(p => p.id === preset);
  } else {
    selected = preset;
  }

  selected = selected ?? await pickThemePreset();
  if (!selected) return;

  await upsertThemeConfigInActiveDocument({
    colorTheme: selected.colorTheme,
    fontTheme: selected.fontTheme
  });
  vscode.window.showInformationMessage(
    `Slidev Scholarly: preset → ${selected.label} (${selected.colorTheme}, ${selected.fontTheme})`
  );
}

async function pickColorTheme(): Promise<string | undefined> {
  const items: Array<vscode.QuickPickItem & { value: string }> = COLOR_THEMES.map(t => ({
    label: t.label,
    description: t.value,
    detail: t.description,
    value: t.value
  }));

  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: 'Select a Slidev Scholarly color theme',
    matchOnDescription: true,
    matchOnDetail: true
  });

  return selected?.value;
}

async function pickFontTheme(): Promise<string | undefined> {
  const items: Array<vscode.QuickPickItem & { value: string }> = FONT_THEMES.map(t => ({
    label: t.label,
    description: t.value,
    detail: t.description,
    value: t.value
  }));

  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: 'Select a Slidev Scholarly font theme',
    matchOnDescription: true,
    matchOnDetail: true
  });

  return selected?.value;
}

async function pickColorMode(): Promise<'light' | 'dark' | undefined> {
  const items: Array<vscode.QuickPickItem & { value: 'light' | 'dark' }> = COLOR_MODES.map(t => ({
    label: t.label,
    description: t.value,
    detail: t.description,
    value: t.value
  }));

  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: 'Select a Slidev Scholarly color mode',
    matchOnDescription: true,
    matchOnDetail: true
  });

  return selected?.value;
}

async function pickThemePreset(): Promise<ThemePreset | undefined> {
  const items: Array<vscode.QuickPickItem & { preset: ThemePreset }> = THEME_PRESETS.map(preset => ({
    label: preset.label,
    description: preset.description,
    preset
  }));

  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: 'Apply a Slidev Scholarly theme preset',
    matchOnDescription: true
  });

  return selected?.preset;
}

async function upsertThemeConfigInActiveDocument(update: ThemeConfigUpdate) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage('No active editor found');
    return;
  }

  const document = editor.document;
  if (document.languageId !== 'markdown') {
    vscode.window.showWarningMessage('Open a Markdown file to edit Slidev frontmatter');
    return;
  }

  const eol = document.eol === vscode.EndOfLine.CRLF ? '\r\n' : '\n';
  const text = document.getText();

  const frontmatterMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!frontmatterMatch) {
    const yamlLines = buildNewFrontmatter(update);
    const insertion = `---${eol}${yamlLines.join(eol)}${eol}---${eol}${eol}`;
    await editor.edit((editBuilder) => {
      editBuilder.insert(new vscode.Position(0, 0), insertion);
    });
    return;
  }

  const fullMatch = frontmatterMatch[0];
  const yaml = (frontmatterMatch[1] ?? '').replace(/\r\n/g, '\n');
  const updatedYaml = upsertThemeConfigYaml(yaml, update);
  const updatedYamlWithEol = updatedYaml.split('\n').join(eol);
  const replacement = `---${eol}${updatedYamlWithEol}${eol}---${eol}`;

  await editor.edit((editBuilder) => {
    editBuilder.replace(
      new vscode.Range(
        document.positionAt(0),
        document.positionAt(fullMatch.length)
      ),
      replacement
    );
  });
}

function buildNewFrontmatter(update: ThemeConfigUpdate): string[] {
  const lines: string[] = [];
  lines.push('theme: scholarly');
  const themeConfigLines = buildThemeConfigLines(update);
  if (themeConfigLines.length > 0) {
    lines.push('themeConfig:');
    lines.push(...themeConfigLines);
  }
  return lines;
}

function buildThemeConfigLines(update: ThemeConfigUpdate): string[] {
  const lines: string[] = [];
  if (update.colorTheme) lines.push(`  colorTheme: ${update.colorTheme}`);
  if (update.fontTheme) lines.push(`  fontTheme: ${update.fontTheme}`);
  if (update.colorMode) lines.push(`  colorMode: ${update.colorMode}`);
  return lines;
}

function upsertThemeConfigYaml(yaml: string, update: ThemeConfigUpdate): string {
  const lines = yaml.split('\n');
  const themeConfigIndex = lines.findIndex(line =>
    line.trim() === 'themeConfig:' && line.match(/^\s*/)?.[0]?.length === 0
  );

  if (themeConfigIndex === -1) {
    const themeConfigLines = buildThemeConfigLines(update);
    if (themeConfigLines.length === 0) return yaml.trimEnd();

    const result = [...lines];
    if (result.length && result[result.length - 1].trim() !== '') result.push('');
    result.push('themeConfig:');
    result.push(...themeConfigLines);
    return result.join('\n').trimEnd();
  }

  const blockStart = themeConfigIndex + 1;
  let blockEnd = blockStart;
  while (blockEnd < lines.length) {
    const line = lines[blockEnd];
    if (!line.trim()) {
      blockEnd++;
      continue;
    }
    const indent = line.match(/^\s*/)?.[0] ?? '';
    if (indent.length === 0) break;
    blockEnd++;
  }

  const updated = [...lines];

  const upsertChild = (key: keyof ThemeConfigUpdate, value: string | undefined) => {
    if (!value) return;
    const childRegex = new RegExp(`^\\s{2}${key}:\\s*`);
    let foundIndex = -1;
    for (let i = blockStart; i < blockEnd; i++) {
      if (childRegex.test(updated[i])) {
        foundIndex = i;
        break;
      }
    }

    if (foundIndex !== -1) {
      updated[foundIndex] = `  ${key}: ${value}`;
      return;
    }

    updated.splice(blockEnd, 0, `  ${key}: ${value}`);
    blockEnd++;
  };

  upsertChild('colorTheme', update.colorTheme);
  upsertChild('fontTheme', update.fontTheme);
  upsertChild('colorMode', update.colorMode);

  return updated.join('\n').trimEnd();
}
