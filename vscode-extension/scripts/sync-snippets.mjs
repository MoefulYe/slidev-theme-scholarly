import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extensionRoot = path.resolve(__dirname, '..');
const snippetDir = path.join(extensionRoot, 'snippets');

const files = [
  ['layouts.json', 'layouts.vscode.json'],
  ['components.json', 'components.vscode.json']
];

function pickCanonicalPrefix(prefix) {
  const prefixes = Array.isArray(prefix)
    ? prefix.filter(value => typeof value === 'string')
    : typeof prefix === 'string'
      ? [prefix]
      : [];

  if (prefixes.length === 0) {
    return null;
  }

  const shortSsPrefix = [...prefixes]
    .filter(value => value.startsWith('ss-'))
    .sort((left, right) => left.length - right.length)[0];

  if (shortSsPrefix) {
    return shortSsPrefix;
  }

  const citationPrefix = prefixes.find(value => value.startsWith('@') || value.startsWith('!@'));
  if (citationPrefix) {
    return citationPrefix;
  }

  return prefixes[0];
}

async function syncSnippetFile(sourceName, targetName) {
  const sourcePath = path.join(snippetDir, sourceName);
  const targetPath = path.join(snippetDir, targetName);
  const raw = JSON.parse(await fs.readFile(sourcePath, 'utf8'));
  const result = {};

  for (const [key, value] of Object.entries(raw)) {
    if (!value || typeof value !== 'object' || !('prefix' in value)) {
      result[key] = value;
      continue;
    }

    const canonicalPrefix = pickCanonicalPrefix(value.prefix);
    result[key] = canonicalPrefix
      ? { ...value, prefix: canonicalPrefix }
      : value;
  }

  await fs.writeFile(targetPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  console.log(`Synced ${path.relative(extensionRoot, targetPath)}`);
}

async function main() {
  for (const [sourceName, targetName] of files) {
    await syncSnippetFile(sourceName, targetName);
  }
}

main().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
