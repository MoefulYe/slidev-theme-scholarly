#!/bin/bash

# Debug script to check Slidev export output

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"

echo "🔍 Checking for exported files..."

# Check if layout-screenshots directory exists
if [ -d "$ROOT/scripts/layout-screenshots" ]; then
    echo "✅ Found layout-screenshots directory"
    echo ""
    echo "📁 Contents:"
    ls -lah "$ROOT/scripts/layout-screenshots/"
    echo ""
    echo "🖼️  PNG files:"
    find "$ROOT/scripts/layout-screenshots" -name "*.png" -type f
else
    echo "❌ layout-screenshots directory not found"
    echo "💡 Try running the export first:"
    echo "   cd $ROOT/scripts"
    echo "   npx slidev export --format png generate-layout-screenshots.md --output layout-screenshots"
fi
