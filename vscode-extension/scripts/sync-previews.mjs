import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extensionRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(extensionRoot, '..');

const srcLayouts = path.join(repoRoot, 'docs', 'public', 'images', 'layouts');
const srcThemes = path.join(repoRoot, 'docs', 'public', 'images', 'themes');
const srcComponents = path.join(repoRoot, 'docs', 'public', 'images', 'components');

const destRoot = path.join(extensionRoot, 'media', 'previews');
const destLayouts = path.join(destRoot, 'layouts');
const destThemes = path.join(destRoot, 'themes');
const destComponents = path.join(destRoot, 'components');

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function exists(dir) {
  try {
    await fs.stat(dir);
    return true;
  } catch {
    return false;
  }
}

async function getFiles(dir, ext = '.png') {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath, ext)));
    } else if (entry.name.endsWith(ext)) {
      files.push(fullPath);
    }
  }
  return files;
}

function hasPngquant() {
  try {
    execSync('pngquant --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

const pngquantAvailable = hasPngquant();

async function compressAndCopy(src, dest) {
  await ensureDir(path.dirname(dest));

  if (pngquantAvailable) {
    try {
      // Compress with pngquant (quality 65-80, ~60-70% size reduction)
      execSync(`pngquant --quality=65-80 --force --output "${dest}" "${src}"`, {
        stdio: 'ignore'
      });
      return 'compressed';
    } catch {
      // If compression fails, fall back to copy
      await fs.copyFile(src, dest);
      return 'copied (compression failed)';
    }
  } else {
    // No pngquant, just copy
    await fs.copyFile(src, dest);
    return 'copied (pngquant not found)';
  }
}

async function main() {
  console.log('Syncing preview images...\n');

  if (!(await exists(srcLayouts))) {
    console.warn(`Warning: Layout images not found at ${srcLayouts}`);
  }
  if (!(await exists(srcThemes))) {
    console.warn(`Warning: Theme images not found at ${srcThemes}`);
  }
  if (!(await exists(srcComponents))) {
    console.warn(`Warning: Component images not found at ${srcComponents}`);
  }

  // Clean destination
  if (await exists(destRoot)) {
    await fs.rm(destRoot, { recursive: true, force: true });
  }
  await ensureDir(destLayouts);
  await ensureDir(destThemes);
  await ensureDir(destComponents);

  let totalOriginal = 0;
  let totalCompressed = 0;
  let fileCount = 0;

  // Process layouts
  if (await exists(srcLayouts)) {
    const layoutFiles = await getFiles(srcLayouts);
    for (const file of layoutFiles) {
      const relativePath = path.relative(srcLayouts, file);
      const destPath = path.join(destLayouts, relativePath);

      const originalSize = (await fs.stat(file)).size;
      await compressAndCopy(file, destPath);
      const compressedSize = (await fs.stat(destPath)).size;

      totalOriginal += originalSize;
      totalCompressed += compressedSize;
      fileCount++;
    }
    console.log(`Layouts: ${layoutFiles.length} files processed`);
  }

  // Process themes
  if (await exists(srcThemes)) {
    const themeFiles = await getFiles(srcThemes);
    for (const file of themeFiles) {
      const relativePath = path.relative(srcThemes, file);
      const destPath = path.join(destThemes, relativePath);

      const originalSize = (await fs.stat(file)).size;
      await compressAndCopy(file, destPath);
      const compressedSize = (await fs.stat(destPath)).size;

      totalOriginal += originalSize;
      totalCompressed += compressedSize;
      fileCount++;
    }
    console.log(`Themes: ${themeFiles.length} files processed`);
  }

  // Process components
  if (await exists(srcComponents)) {
    const componentFiles = await getFiles(srcComponents);
    for (const file of componentFiles) {
      const relativePath = path.relative(srcComponents, file);
      const destPath = path.join(destComponents, relativePath);

      const originalSize = (await fs.stat(file)).size;
      await compressAndCopy(file, destPath);
      const compressedSize = (await fs.stat(destPath)).size;

      totalOriginal += originalSize;
      totalCompressed += compressedSize;
      fileCount++;
    }
    console.log(`Components: ${componentFiles.length} files processed`);
  }

  console.log(`\nTotal: ${fileCount} files`);

  if (fileCount === 0) {
    console.log('No files to process.');
  } else {
    const savedPercent = ((1 - totalCompressed / totalOriginal) * 100).toFixed(1);
    const originalMB = (totalOriginal / 1024 / 1024).toFixed(2);
    const compressedMB = (totalCompressed / 1024 / 1024).toFixed(2);
    console.log(`Size: ${originalMB} MB → ${compressedMB} MB (${savedPercent}% saved)`);
  }

  console.log(`\nOutput: ${path.relative(extensionRoot, destRoot)}/`);

  if (!pngquantAvailable) {
    console.log('\nTip: Install pngquant for better compression:');
    console.log('  brew install pngquant  # macOS');
    console.log('  apt install pngquant   # Ubuntu/Debian');
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
