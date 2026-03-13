export type ScholarlyCitationMarkdownOptions = {
  autoGenerate?: boolean
  bibFile?: string
  bibTitle?: string
  showNum?: boolean
  style?: string
}

export declare function setupScholarlyCitationMarkdown(
  md: {
    core: {
      ruler: {
        before: (
          beforeName: string,
          ruleName: string,
          rule: (state: {
            env?: {
              frontmatter?: {
                citations?: string[]
              }
            }
            src: string
          }) => void,
        ) => void
      }
    }
    use: (plugin: unknown, options?: unknown) => void
  },
  options?: ScholarlyCitationMarkdownOptions,
): void
