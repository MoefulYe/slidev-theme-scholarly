/**
 * Generate screenshots for all layouts using Slidev export
 *
 * Usage: node generate-screenshots.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SCRIPT_DIR = __dirname;
const PROJECT_ROOT = path.dirname(SCRIPT_DIR);
const SLIDES_FILE = path.join(SCRIPT_DIR, 'generate-layout-screenshots.md');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'docs/public/images/layouts');

// Layout mapping: slide number -> layout name
const LAYOUTS = {
    1: 'cover',
    2: 'default',
    3: 'intro',
    4: 'section',
    5: 'center',
    6: 'auto-center',
    7: 'end',
    8: 'two-cols',
    9: 'image-left',
    10: 'image-right',
    11: 'bullets',
    12: 'figure',
    13: 'split-image',
    14: 'quote',
    15: 'fact',
    16: 'statement',
    17: 'focus',
    18: 'compare',
    19: 'methodology',
    20: 'results',
    21: 'timeline',
    22: 'agenda',
    23: 'acknowledgments',
    24: 'references'
};

async function main() {
    console.log('🎨 Generating layout screenshots...');
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);

    // Create output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log('✅ Created output directory');
    }

    try {
        console.log('📸 Exporting slides as PNG...');
        console.log('⏳ This may take a few minutes...');

        // Export all slides
        execSync(
            `npx slidev export --format png --output "${OUTPUT_DIR}/temp" "${SLIDES_FILE}"`,
            {
                cwd: SCRIPT_DIR,
                stdio: 'inherit'
            }
        );

        console.log('\n📝 Renaming files...');

        // Rename files to layout names
        let successCount = 0;
        for (const [slideNum, layoutName] of Object.entries(LAYOUTS)) {
            const tempFile = path.join(OUTPUT_DIR, `temp-${slideNum}.png`);
            const finalFile = path.join(OUTPUT_DIR, `${layoutName}.png`);

            if (fs.existsSync(tempFile)) {
                fs.renameSync(tempFile, finalFile);
                console.log(`✅ Generated: ${layoutName}.png`);
                successCount++;
            } else {
                console.log(`⚠️  Missing: slide ${slideNum} (${layoutName})`);
            }
        }

        // Clean up any remaining temp files
        const files = fs.readdirSync(OUTPUT_DIR);
        files.forEach(file => {
            if (file.startsWith('temp') && file.endsWith('.png')) {
                fs.unlinkSync(path.join(OUTPUT_DIR, file));
            }
        });

        console.log('\n✨ Screenshot generation complete!');
        console.log(`📁 Files saved to: ${OUTPUT_DIR}`);
        console.log(`📊 Total generated: ${successCount}/${Object.keys(LAYOUTS).length}`);

    } catch (error) {
        console.error('❌ Error generating screenshots:', error.message);
        console.error('\n💡 Troubleshooting:');
        console.error('1. Make sure Slidev is installed: npm install');
        console.error('2. Check that Playwright is installed: npx playwright install');
        console.error('3. Run from project root: node scripts/generate-screenshots.js');
        process.exit(1);
    }
}

main();
