import * as vscode from 'vscode';

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
