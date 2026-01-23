import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// BibTeX entry interface
export interface BibEntry {
    key: string;
    type: string;
    author?: string;
    title?: string;
    year?: string;
    journal?: string;
    booktitle?: string;
    publisher?: string;
    volume?: string;
    pages?: string;
}

// Parse a .bib file and extract entries
export function parseBibFile(content: string): BibEntry[] {
    const entries: BibEntry[] = [];
    const text = content;
    const len = text.length;
    let i = 0;

    const isWhitespace = (ch: string) => /\s/.test(ch);
    const skipWhitespace = () => {
        while (i < len && isWhitespace(text[i])) i++;
    };

    const readWord = (): string => {
        const start = i;
        while (i < len && /[A-Za-z0-9_-]/.test(text[i])) i++;
        return text.slice(start, i);
    };

    const readUntil = (stopChars: Set<string>): string => {
        const start = i;
        while (i < len && !stopChars.has(text[i])) i++;
        return text.slice(start, i);
    };

    const parseBraceValue = (): string => {
        i++; // skip '{'
        const start = i;
        let depth = 1;
        while (i < len) {
            const ch = text[i];
            if (ch === '{') depth++;
            else if (ch === '}') depth--;
            if (depth === 0) break;
            i++;
        }
        const value = text.slice(start, i);
        if (i < len && text[i] === '}') i++;
        return value;
    };

    const parseQuotedValue = (): string => {
        i++; // skip opening quote
        let value = '';
        while (i < len) {
            const ch = text[i];
            if (ch === '\\' && i + 1 < len) {
                value += text[i + 1];
                i += 2;
                continue;
            }
            if (ch === '"') {
                i++;
                break;
            }
            value += ch;
            i++;
        }
        return value;
    };

    const parseValueToken = (entryClose: string): string => {
        skipWhitespace();
        if (i >= len) return '';

        const ch = text[i];
        if (ch === '{') return parseBraceValue();
        if (ch === '"') return parseQuotedValue();

        const raw = readUntil(new Set([',', '#', entryClose]));
        return raw.trim();
    };

    const parseValue = (entryClose: string): string => {
        let value = parseValueToken(entryClose);
        skipWhitespace();
        while (i < len && text[i] === '#') {
            i++;
            value += parseValueToken(entryClose);
            skipWhitespace();
        }
        return value.replace(/\s+/g, ' ').trim();
    };

    const skipEnclosedBlock = (open: string, close: string) => {
        let depth = 1;
        while (i < len) {
            const ch = text[i];
            if (ch === open) depth++;
            else if (ch === close) depth--;
            i++;
            if (depth === 0) break;
        }
    };

    while (i < len) {
        const at = text.indexOf('@', i);
        if (at === -1) break;
        i = at + 1;

        skipWhitespace();
        const type = readWord().toLowerCase();
        if (!type) {
            i++;
            continue;
        }

        skipWhitespace();
        const open = text[i];
        if (open !== '{' && open !== '(') continue;
        const close = open === '{' ? '}' : ')';
        i++; // skip open

        if (type === 'comment' || type === 'preamble' || type === 'string') {
            skipEnclosedBlock(open, close);
            continue;
        }

        skipWhitespace();
        const key = readUntil(new Set([',', close])).trim();

        if (i < len && text[i] === ',') i++;

        const entry: BibEntry = { key, type };

        while (i < len) {
            skipWhitespace();
            if (i >= len) break;

            if (text[i] === ',') {
                i++;
                continue;
            }

            if (text[i] === close) {
                i++;
                break;
            }

            const fieldName = readWord().toLowerCase();
            if (!fieldName) {
                i++;
                continue;
            }

            skipWhitespace();
            if (text[i] !== '=') {
                i++;
                continue;
            }

            i++;
            const fieldValue = parseValue(close);
            if (fieldValue) {
                (entry as any)[fieldName] = fieldValue;
            }
        }

        if (entry.key) entries.push(entry);
    }

    return entries;
}

// Find .bib file from frontmatter or workspace
export async function findBibFile(document?: vscode.TextDocument): Promise<string | undefined> {
    const resolvedDocument = document ?? vscode.window.activeTextEditor?.document;
    if (!resolvedDocument) return undefined;

    const text = resolvedDocument.getText();

    // Look for bibFile in frontmatter
    const frontmatterMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (frontmatterMatch) {
        const bibFileMatch = frontmatterMatch[1].match(/^\s*bibFile:\s*(.+?)\s*$/m);
        if (bibFileMatch) {
            const raw = bibFileMatch[1].trim();
            const noComment = raw.split('#')[0].trim();
            const bibPath = noComment.replace(/^['"]|['"]$/g, '');
            const docDir = path.dirname(resolvedDocument.uri.fsPath);
            return path.resolve(docDir, bibPath);
        }
    }

    // Fallback: look for references.bib in workspace
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
        const defaultBib = path.join(workspaceFolders[0].uri.fsPath, 'references.bib');
        if (fs.existsSync(defaultBib)) {
            return defaultBib;
        }
    }

    return undefined;
}

// Load and cache BibTeX entries
const cachedEntriesByPath = new Map<string, BibEntry[]>();

export function clearBibCache() {
    cachedEntriesByPath.clear();
}

export async function loadBibEntries(document?: vscode.TextDocument): Promise<BibEntry[]> {
    const bibPath = await findBibFile(document);
    if (!bibPath || !fs.existsSync(bibPath)) {
        return [];
    }

    const cached = cachedEntriesByPath.get(bibPath);
    if (cached && cached.length > 0) return cached;

    try {
        const content = fs.readFileSync(bibPath, 'utf8');
        const parsed = parseBibFile(content);
        cachedEntriesByPath.set(bibPath, parsed);
        return parsed;
    } catch (e) {
        console.error('Error loading bib file:', e);
        return [];
    }
}

// Completion provider for @citekey
export class BibCompletionProvider implements vscode.CompletionItemProvider {
    async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
    ): Promise<vscode.CompletionItem[]> {
        const lineText = document.lineAt(position).text;
        const linePrefix = lineText.substring(0, position.character);

        // Check if we're after @ or !@
        if (!linePrefix.match(/(!?@)[\w-]*$/)) {
            return [];
        }

        const entries = await loadBibEntries(document);

        return entries.map(entry => {
            const item = new vscode.CompletionItem(
                entry.key,
                vscode.CompletionItemKind.Reference
            );

            // Build detail string
            const author = entry.author ? entry.author.split(' and ')[0] : 'Unknown';
            const year = entry.year || '';
            item.detail = `${author} (${year})`;

            // Build documentation
            item.documentation = new vscode.MarkdownString(
                `**${entry.title || 'Untitled'}**\n\n` +
                `*${entry.author || 'Unknown author'}*\n\n` +
                `${entry.journal || entry.booktitle || entry.publisher || ''} ${year}`
            );

            item.insertText = entry.key;
            item.filterText = entry.key;

            return item;
        });
    }
}

// Hover provider for citations
export class BibHoverProvider implements vscode.HoverProvider {
    async provideHover(
        document: vscode.TextDocument,
        position: vscode.Position
    ): Promise<vscode.Hover | undefined> {
        const range = document.getWordRangeAtPosition(position, /!?@[\w-]+/);
        if (!range) return undefined;

        const text = document.getText(range);
        const key = text.replace(/^!?@/, '');

        const entries = await loadBibEntries(document);
        const entry = entries.find(e => e.key === key);

        if (!entry) return undefined;

        const markdown = new vscode.MarkdownString();
        markdown.appendMarkdown(`### ${entry.title || 'Untitled'}\n\n`);
        markdown.appendMarkdown(`**Authors:** ${entry.author || 'Unknown'}\n\n`);
        markdown.appendMarkdown(`**Year:** ${entry.year || 'N/A'}\n\n`);
        if (entry.journal) {
            markdown.appendMarkdown(`**Journal:** ${entry.journal}\n\n`);
        }
        if (entry.booktitle) {
            markdown.appendMarkdown(`**Conference:** ${entry.booktitle}\n\n`);
        }
        markdown.appendMarkdown(`\`@${entry.key}\``);

        return new vscode.Hover(markdown, range);
    }
}

// Tree view provider for BibTeX entries
export class BibTreeItem extends vscode.TreeItem {
    constructor(
        public readonly entry: BibEntry,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        const author = entry.author ? entry.author.split(' and ')[0].split(',')[0] : 'Unknown';
        super(`${author} (${entry.year || 'N/A'})`, collapsibleState);
        this.description = entry.key;
        this.tooltip = entry.title || entry.key;
        this.iconPath = new vscode.ThemeIcon('book');
        this.command = {
            command: 'slidev-scholarly.insertBibKey',
            title: 'Insert Citation',
            arguments: [entry.key]
        };
    }
}

export class BibTreeProvider implements vscode.TreeDataProvider<BibTreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<BibTreeItem | undefined | null | void> = new vscode.EventEmitter<BibTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<BibTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        clearBibCache();
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: BibTreeItem): vscode.TreeItem {
        return element;
    }

    async getChildren(): Promise<BibTreeItem[]> {
        const entries = await loadBibEntries(vscode.window.activeTextEditor?.document);
        return entries.map(entry =>
            new BibTreeItem(entry, vscode.TreeItemCollapsibleState.None)
        );
    }
}
