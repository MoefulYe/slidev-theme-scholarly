#!/bin/bash

# Layout Screenshots Generator for Slidev Theme Scholarly
# This script generates individual screenshots for each layout

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SLIDES_FILE="$SCRIPT_DIR/generate-layout-screenshots.md"
OUTPUT_DIR="$PROJECT_ROOT/docs/public/images/layouts"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo "🎨 Generating layout screenshots..."
echo "📁 Output directory: $OUTPUT_DIR"

# Check if slidev is available
if ! command -v slidev &> /dev/null; then
    echo "❌ Slidev not found. Installing..."
    npm install -g @slidev/cli
fi

cd "$SCRIPT_DIR"

# Layout mapping: slide number -> layout name
declare -A LAYOUTS=(
    [1]="cover"
    [2]="default"
    [3]="intro"
    [4]="section"
    [5]="center"
    [6]="auto-center"
    [7]="end"
    [8]="two-cols"
    [9]="image-left"
    [10]="image-right"
    [11]="bullets"
    [12]="figure"
    [13]="split-image"
    [14]="quote"
    [15]="fact"
    [16]="statement"
    [17]="focus"
    [18]="compare"
    [19]="methodology"
    [20]="results"
    [21]="timeline"
    [22]="agenda"
    [23]="acknowledgments"
    [24]="references"
)

# Generate PNG exports for all slides
echo "📸 Exporting slides as PNG..."
npx slidev export --format png --output "$OUTPUT_DIR/temp" "$SLIDES_FILE"

# Rename files to layout names
echo "📝 Renaming files..."
for slide_num in "${!LAYOUTS[@]}"; do
    layout_name="${LAYOUTS[$slide_num]}"
    temp_file="$OUTPUT_DIR/temp-${slide_num}.png"
    final_file="$OUTPUT_DIR/${layout_name}.png"

    if [ -f "$temp_file" ]; then
        mv "$temp_file" "$final_file"
        echo "✅ Generated: ${layout_name}.png"
    else
        echo "⚠️  Missing: slide ${slide_num} (${layout_name})"
    fi
done

# Clean up any remaining temp files
rm -f "$OUTPUT_DIR"/temp*.png

echo ""
echo "✨ Screenshot generation complete!"
echo "📁 Files saved to: $OUTPUT_DIR"
echo ""
echo "📊 Generated layouts:"
ls -1 "$OUTPUT_DIR"/*.png | wc -l | xargs echo "Total:"
