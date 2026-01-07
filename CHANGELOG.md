# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-beta.1] - 2026-01-07

### ⚠️ Breaking Changes

This is a major upgrade with breaking changes. Please read the [Upgrade Notes](https://github.com/jxpeng98/slidev-theme-scholarly/blob/main/docs/en/guide/upgrade.md) before updating.

### Changed

- **Node.js**: Now requires Node.js 20+
- **Slidev**: Updated to Slidev v52+
- **Release workflow**: Added prerelease support (`@next` dist-tag for beta versions)

### Added

- **Documentation**: Added upgrade notes for major version migration
- **CI/CD**: Prerelease workflow for `vX.Y.Z-*` tags (published to `@next`)

---

## [0.1.2] - 2025-12-18

### Added

- **Quote Layout**: New `author` and `source` props for better attribution display
- **Bullets Layout**: New `icon` prop for customizable bullet characters (default: ▸)
- **Fact Layout**: Added `purple` color variant for consistency with Focus layout
- **CSS Variables**: Added semantic tokens (`--scholarly-header-height`, `--scholarly-footer-height`, `--scholarly-accent-color`, `--scholarly-border-radius`)
- **Booktabs Table**: Academic three-line table styling (三线表) - removes vertical lines, keeps horizontal rules
- **Code Block Styling**: Improved with light gray background and monospace fonts
- **Citation/Footnote Styling**: Visual hierarchy with smaller font size and gray color

### Fixed

- **VSCode Extension**: Corrected color options in snippets
  - `fact`: Added `primary` as default color option
  - `focus`: Added `primary` and `purple` color options
  - `compare`: Fixed `amber` to `gray` to match actual layout implementation
- **VSCode Extension**: Updated snippets with new layout props (quote, bullets, fact)
- **VSCode Extension**: BibTeX Integration (v0.3.6)
  - New **References** panel showing all citations from `.bib` file
  - Auto-complete for `@citekey` from BibTeX file
  - Hover preview showing citation details (author, title, year)
  - Refresh button to reload references

---

## [0.1.1] - 2025-10-30

### Fixed

- Update `.npmrc` configuration for pnpm package manager
- Remove Slidev configuration settings from VSCode settings
- Update language to English and translate example content

## [0.1.0] - 2025-10-29

### Added

- Initial release of slidev-theme-scholarly
- LaTeX Beamer-style footer with gradient backgrounds
- Multi-author support with intelligent display
- Global footer configuration system
- 11 layout variants: cover, default, intro, center, fact, statement, section, quote, two-cols, image-left, image-right
- Scholarly header system with title/subtitle
- Theorem component with auto-numbering
- Multi-language support (zh/en) for theorem components
- Customizable theorem numbering format
- Optimized layout system using CenteredLayout component

### Features

- **Cover Layout**: Title slide with multi-author support and Beamer-style footer
- **Default Layout**: Standard content layout with header and footer
- **Intro Layout**: Introduction layout with left-aligned content
- **Center Layout**: Centered content with full width
- **Fact/Statement Layouts**: Centered content with constrained width
- **Section Layout**: Chapter divider without header
- **Quote Layout**: Special styling for quotations
- **Two-Cols Layout**: Two-column grid layout
- **Image-Left/Right Layouts**: Full-height image with text side-by-side
- **Theorem Component**: Auto-numbered theorems, lemmas, propositions, etc.

### Configuration

- Global frontmatter configuration for footer
- Per-page title and subtitle
- Customizable author information
- Language selection (zh/en)
- Custom theorem numbering format
