---
title: Citations
---

# Citations

The theme has built-in support for academic citations using BibTeX files. Citations are automatically collected and bibliography is generated.

## Configuration

Configure citation settings in your frontmatter:

```yaml
---
theme: scholarly
bibFile: references.bib  # Path to BibTeX file (default: references.bib)
bibStyle: apa            # Citation style
bibShowNum: false        # Show numbered markers in bibliography (e.g. [1])
---
```

**Supported styles:**

- `apa` (default)
- `harvard1`
- `vancouver`
- `ieee`
- `mla`
- `chicago-author-date`

## Basic Usage

### Parenthetical Citations

Use `@citekey` for parenthetical citations:

```markdown
Deep learning has revolutionized AI @lecun2015deep.
```

Renders as: Deep learning has revolutionized AI (LeCun et al., 2015).

### Narrative Citations

Use `!@citekey` for narrative (author-prominent) citations:

```markdown
!@vaswani2017attention introduced the Transformer architecture.
```

Renders as: Vaswani et al. (2017) introduced the Transformer architecture.

### Multiple Citations

```markdown
Recent advances @smith2023deep @wang2022attention have shown...
```

## Markdown Footnotes

Standard Markdown footnotes work out of the box. No theme-specific syntax is required:

```markdown
Our compact model stays stable across five seeds[^1].

[^1]: Validation accuracy varied by less than 0.3 percentage points.
```

In Slidev's interactive view, the theme applies academic footnote styling automatically:

- Hover a footnote marker on desktop to preview the note
- Click the marker to pin the popover
- Press `Esc` or click outside to close it

You can set a global default in the headmatter:

```yaml
---
footnoteDisplay: hover-only
---
```

And override it per slide with frontmatter:

```markdown
---
footnoteDisplay: notes-only
---
```

- `footnoteDisplay: both` keeps the bottom footnotes and the inline hover/click preview
- `footnoteDisplay: hover-only` hides the bottom footnote block and keeps only the inline preview
- `footnoteDisplay: notes-only` keeps the bottom footnotes and disables the hover/click popover

Priority order:

- Per-slide `footnoteDisplay`
- Global headmatter `footnoteDisplay`
- Legacy `themeConfig.footnoteDisplay`
- Default `both`

When you print or export slides, footnotes fall back to the normal footnote block at the bottom of the slide.

## Bibliography

Add a references slide:

```markdown
---
layout: references
---
```

The bibliography is automatically generated from all citations used in your slides.

If the slide body is empty, or only contains headings/comments, the theme injects the bibliography automatically.

If you want custom placement inside a references slide, add `[[bibliography]]` exactly where the list should appear.

Normal theme usage does not require a project-level `vite.config.ts`; Scholarly registers the citation hooks from the theme package itself.

## Pagination

For long reference lists, use pagination:

```markdown
---
layout: references
perPage: 5
page: 1
---

---
layout: references
perPage: 5
page: 2
title: "References (continued)"
---
```

## BibTeX File Example

Create a `references.bib` file in your project root:

```bibtex
@article{lecun2015deep,
  title={Deep learning},
  author={LeCun, Yann and Bengio, Yoshua and Hinton, Geoffrey},
  journal={Nature},
  volume={521},
  pages={436--444},
  year={2015}
}

@inproceedings{vaswani2017attention,
  title={Attention is all you need},
  author={Vaswani, Ashish and others},
  booktitle={NeurIPS},
  year={2017}
}
```

## Cite Component (Manual)

The `<Cite>` component is a lightweight helper for manual citation notes (non-BibTeX). For BibTeX citations, prefer `@citekey` / `!@citekey`.

### Author-Year Marker (Legacy)

```markdown
<Cite author="Smith et al." year="2024" />
```

Renders as: (Smith et al., 2024)

You can also provide additional context:

```markdown
<Cite author="Smith et al." year="2024">
Citation text here.
</Cite>
```

### Numeric Marker

```markdown
<Cite :inline="true">
Citation text here.
</Cite>
```

Optionally set a fixed `id`:

```markdown
<Cite :inline="false" :id="1">
Reference item here.
</Cite>
```
