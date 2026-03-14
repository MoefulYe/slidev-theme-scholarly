export interface ScholarlyCitationMarkdownOptions {
    autoGenerate?: boolean;
    bibFile?: string;
    bibTitle?: string;
    showNum?: boolean;
    style?: string;
}
type CitationMarkdownState = {
    env?: {
        frontmatter?: {
            citations?: string[];
        };
    };
    src: string;
};
export interface CitationMarkdownInstance {
    core: {
        ruler: {
            before: (beforeName: string, ruleName: string, rule: (state: CitationMarkdownState) => void) => void;
        };
    };
    use: (plugin: unknown, options?: unknown) => void;
}
export declare function setupScholarlyCitationMarkdown(md: CitationMarkdownInstance, options?: ScholarlyCitationMarkdownOptions): void;
export {};
