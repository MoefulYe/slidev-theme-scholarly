import { definePreparserSetup } from '@slidev/types'

/**
 * Preparser setup for custom markdown syntax sugar
 * 
 * Supported syntax:
 * 
 * :::block{type="info" title="Title"}
 * Content here
 * :::
 * 
 * :::theorem{type="theorem" title="Title"}
 * Content here
 * :::
 * 
 * :::steps{:steps='[...]' :activeStep="1"}
 * :::
 * 
 * :::columns{cols="2" gap="2rem"}
 * Column 1 content
 * +++
 * Column 2 content
 * :::
 * 
 * :::highlight{color="yellow"}
 * Text to highlight
 * :::
 * 
 * :::cite{author="Smith" year="2024"}
 * Citation text
 * :::
 * 
 * :::keywords{:items='["ML", "AI"]' color="blue"}
 * :::
 */

export default definePreparserSetup(() => {
    // Collect all citekeys across the whole markdown so bibliography can be generated on a dedicated slide.
    const citekeys = new Set<string>()

    function collectCitations(text: string) {
        if (!text)
            return

        // Remove fenced code blocks to avoid false positives.
        let stripped = text.replace(/```[\s\S]*?```/g, '')
        // Remove inline code to avoid false positives.
        stripped = stripped.replace(/`[^`]*`/g, '')
        // Remove HTML comments to avoid processing injected citations or other comments
        stripped = stripped.replace(/<!--[\s\S]*?-->/g, '')
        // Remove URLs to avoid matching emails or package names
        stripped = stripped.replace(/https?:\/\/[^\s)>\]]+/g, '')
        // Remove email-like patterns (word@word.word)
        stripped = stripped.replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, '')

        // Match citation patterns: @citekey or !@citekey
        // Citekey should be alphanumeric with underscores/hyphens, but NOT contain slashes (to exclude package names)
        // and NOT be preceded by a letter/digit (to exclude partial matches)
        for (const m of stripped.matchAll(/(?<![A-Za-z0-9])(!?)@([A-Za-z][A-Za-z0-9_-]*)/g)) {
            // Clean the citekey: remove trailing punctuation
            let key = m[2].replace(/[.,;:!?)]+$/, '')
            if (key.length > 0) {
                citekeys.add(`@${key}`)
            }
        }
    }

    return [
        {
            name: 'scholarly-citations-collector',

            transformRawLines(lines) {
                collectCitations(lines.join('\n'))
            },

            async transformSlide(content, frontmatter) {
                // Also collect citations per-slide (in case transformRawLines is not invoked in some contexts)
                collectCitations(content)

                // If this slide contains the bibliography marker, inject citations as an HTML comment
                // that will be parsed by the markdown-it plugin. We use HTML comments because 
                // Slidev strips YAML frontmatter blocks from slide content before passing to markdown-it.
                if (content.includes('[[bibliography]]')) {
                    // Get citations from frontmatter if explicitly provided, otherwise use collected citekeys
                    let citations: string[] = []

                    if (Array.isArray((frontmatter as any).citations)) {
                        citations = (frontmatter as any).citations
                    } else if (Array.isArray((frontmatter as any).references)) {
                        citations = (frontmatter as any).references
                    } else if (Array.isArray((frontmatter as any).bib)) {
                        citations = (frontmatter as any).bib
                    } else if (citekeys.size > 0) {
                        citations = Array.from(citekeys)
                    }

                    // Support pagination: perPage and page parameters
                    const perPage = (frontmatter as any).perPage as number | undefined
                    const page = (frontmatter as any).page as number | undefined

                    if (perPage && perPage > 0 && citations.length > 0) {
                        const currentPage = page || 1
                        const startIndex = (currentPage - 1) * perPage
                        const endIndex = startIndex + perPage
                        citations = citations.slice(startIndex, endIndex)
                    }

                    // Inject citations as a special HTML comment before [[bibliography]]
                    // Format: <!-- scholarly-citations: ["@key1", "@key2"] -->
                    if (citations.length > 0) {
                        const citationsJson = JSON.stringify(citations)
                        content = content.replace(
                            /\[\[bibliography\]\]/g,
                            `<!-- scholarly-citations: ${citationsJson} -->\n[[bibliography]]`
                        )
                    }
                }

                // Transform :::block{type="info" title="Title"} ... :::
                content = content.replace(
                    /:::block\{([^}]*)\}\s*\n([\s\S]*?):::/g,
                    (_, attrs, inner) => {
                        const props = parseAttributes(attrs)
                        return `<Block ${props}>\n\n${inner.trim()}\n\n</Block>`
                    }
                )

                // Transform :::theorem{type="theorem" title="Title"} ... :::
                content = content.replace(
                    /:::theorem\{([^}]*)\}\s*\n([\s\S]*?):::/g,
                    (_, attrs, inner) => {
                        const props = parseAttributes(attrs)
                        return `<Theorem ${props}>\n\n${inner.trim()}\n\n</Theorem>`
                    }
                )

                // Transform :::highlight{color="yellow"} ... :::
                content = content.replace(
                    /:::highlight\{([^}]*)\}\s*\n([\s\S]*?):::/g,
                    (_, attrs, inner) => {
                        const props = parseAttributes(attrs)
                        return `<Highlight ${props}>${inner.trim()}</Highlight>`
                    }
                )

                // Transform :::cite{author="Smith" year="2024"} ... :::
                content = content.replace(
                    /:::cite\{([^}]*)\}\s*\n([\s\S]*?):::/g,
                    (_, attrs, inner) => {
                        const props = parseAttributes(attrs)
                        return `<Cite ${props}>${inner.trim()}</Cite>`
                    }
                )

                // Transform :::steps{:steps='[...]' :activeStep="1"} :::
                content = content.replace(
                    /:::steps\{([^}]*)\}\s*:::/g,
                    (_, attrs) => {
                        const props = parseAttributes(attrs)
                        return `<Steps ${props} />`
                    }
                )

                // Transform :::keywords{:items='["ML", "AI"]' color="blue"} :::
                content = content.replace(
                    /:::keywords\{([^}]*)\}\s*:::/g,
                    (_, attrs) => {
                        const props = parseAttributes(attrs)
                        return `<Keywords ${props} />`
                    }
                )

                // Transform :::columns{cols="2"} ... +++ ... ::: (use +++ as separator)
                content = content.replace(
                    /:::columns\{([^}]*)\}\s*\n([\s\S]*?):::/g,
                    (_, attrs, inner) => {
                        const props = parseAttributes(attrs)
                        const columns = inner.split(/\n\+\+\+\n/).map((col: string) => col.trim())

                        if (columns.length === 1) {
                            return `<Columns ${props}>\n\n${columns[0]}\n\n</Columns>`
                        }

                        let result = `<Columns ${props}>\n\n${columns[0]}\n\n`
                        for (let i = 1; i < columns.length; i++) {
                            result += `<template #col${i + 1}>\n\n${columns[i]}\n\n</template>\n`
                        }
                        result += '</Columns>'
                        return result
                    }
                )

                return content
            }
        }
    ]
})

/**
 * Parse attributes string into Vue props format
 * Examples:
 *   'type="info" title="Hello"' => 'type="info" title="Hello"'
 *   ':steps="[...]" :active="1"' => ':steps="[...]" :active="1"'
 */
function parseAttributes(attrs: string): string {
    // Already in correct format, just clean up
    return attrs.trim()
}
