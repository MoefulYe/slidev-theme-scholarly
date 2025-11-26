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
    return [
        {
            async transformSlide(content, frontmatter) {
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
