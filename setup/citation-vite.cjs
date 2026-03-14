"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupScholarlyCitationMarkdown = void 0;
// Source of truth for Scholarly's citation markdown helper.
// Runtime JS/CJS and declaration outputs are generated from this file.
const markdown_it_citation_1 = __importDefault(require("@jxpeng98/markdown-it-citation"));
const SCHOLARLY_CITATIONS_RE = /<!--\s*scholarly-citations:\s*(\[.*?\])\s*-->/;
const SCHOLARLY_CITATION_SETUP_FLAG = Symbol.for('scholarly.citation.setup');
function resolvePlugin(mod) {
    return mod?.default ?? mod;
}
function resolveCitationConfig(options = {}) {
    const config = globalThis.__scholarlyConfig || {};
    return {
        bibFile: options.bibFile || config.bibFile || 'references.bib',
        style: options.style || config.bibStyle || 'apa',
        showNum: options.showNum ?? config.showNum ?? false,
        bibTitle: options.bibTitle ?? '',
        autoGenerate: options.autoGenerate ?? false,
    };
}
function setupScholarlyCitationMarkdown(md, options = {}) {
    const flaggedMd = md;
    if (flaggedMd[SCHOLARLY_CITATION_SETUP_FLAG])
        return;
    flaggedMd[SCHOLARLY_CITATION_SETUP_FLAG] = true;
    const citationPlugin = resolvePlugin(markdown_it_citation_1.default);
    if (typeof citationPlugin !== 'function') {
        console.warn('[citation] resolved plugin is not a function:', markdown_it_citation_1.default);
        return;
    }
    md.use(citationPlugin, resolveCitationConfig(options));
    md.core.ruler.before('citation_bibliography', 'scholarly_citations_parser', (state) => {
        var _a;
        const match = state.src.match(SCHOLARLY_CITATIONS_RE);
        if (!match)
            return;
        try {
            const citations = JSON.parse(match[1]);
            state.env || (state.env = {});
            (_a = state.env).frontmatter || (_a.frontmatter = {});
            state.env.frontmatter.citations = citations;
        }
        catch (error) {
            console.error('[scholarly] Failed to parse citations comment:', error);
        }
    });
}
exports.setupScholarlyCitationMarkdown = setupScholarlyCitationMarkdown;
