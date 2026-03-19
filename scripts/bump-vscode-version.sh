#!/usr/bin/env bash
set -euo pipefail

# Bump VS Code extension version (vscode-extension/package.json only).
#
# Usage:
#   ./scripts/bump-vscode-version.sh <patch|minor|major|new-version>
#
# Examples:
#   ./scripts/bump-vscode-version.sh patch        # 1.0.3 → 1.0.4
#   ./scripts/bump-vscode-version.sh minor        # 1.0.3 → 1.1.0
#   ./scripts/bump-vscode-version.sh major        # 1.0.3 → 2.0.0
#   ./scripts/bump-vscode-version.sh 2.0.0        # → 2.0.0
#
# Notes:
#   - Marketplace extension versions must be plain x.y.z (no -beta / -rc suffix).

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
INPUT="${1:-}"

if [[ -z "$INPUT" ]]; then
  echo "Usage: $0 <patch|minor|major|new-version>"
  echo ""
  echo "  Semver keywords:"
  echo "    patch           1.0.3 → 1.0.4"
  echo "    minor           1.0.3 → 1.1.0"
  echo "    major           1.0.3 → 2.0.0"
  echo ""
  echo "  Explicit version:"
  echo "    2.0.0           → 2.0.0"
  exit 2
fi

EXT_PKG="${ROOT_DIR}/vscode-extension/package.json"
if [[ ! -f "$EXT_PKG" ]]; then
  echo "Error: vscode-extension/package.json not found" >&2
  exit 1
fi

CURRENT_VERSION=$(node -p "require('${EXT_PKG}').version")
echo "[bump-vscode-version] Current version: ${CURRENT_VERSION}"

resolve_semver() {
  local current="$1"
  local bump_type="$2"

  # Extensions must stay x.y.z; if current contains a suffix, drop it.
  local base="${current%%-*}"

  IFS='.' read -r major minor patch <<< "$base"

  case "$bump_type" in
    patch) echo "${major}.${minor}.$((patch + 1))" ;;
    minor) echo "${major}.$((minor + 1)).0" ;;
    major) echo "$((major + 1)).0.0" ;;
    *) echo "" ;;
  esac
}

case "$INPUT" in
  patch|minor|major)
    NEW_VERSION=$(resolve_semver "$CURRENT_VERSION" "$INPUT")
    if [[ -z "$NEW_VERSION" ]]; then
      echo "Error: failed to compute new version" >&2
      exit 1
    fi
    echo "[bump-vscode-version] Bumping ${INPUT}: ${CURRENT_VERSION} → ${NEW_VERSION}"
    ;;
  *)
    NEW_VERSION="$INPUT"
    if [[ ! "$NEW_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
      echo "Error: VS Code extension version must be plain x.y.z (got: ${NEW_VERSION})" >&2
      exit 1
    fi
    echo "[bump-vscode-version] Setting explicit version: ${CURRENT_VERSION} → ${NEW_VERSION}"
    ;;
esac

OLD_VERSION=$(node -p "require('${EXT_PKG}').version")
node -e "
  const fs = require('fs');
  const content = fs.readFileSync('${EXT_PKG}', 'utf8');
  const pkg = JSON.parse(content);
  pkg.version = '${NEW_VERSION}';
  const match = content.match(/^([ \\t]+)\\\"/m);
  const indent = match ? match[1].length : 2;
  fs.writeFileSync('${EXT_PKG}', JSON.stringify(pkg, null, indent) + '\\n');
"

echo "  ✓  vscode-extension/package.json: ${OLD_VERSION} → ${NEW_VERSION}"

echo ""
echo "[bump-vscode-version] Updated to ${NEW_VERSION}"
echo ""
echo "Next steps:"
echo "  git add vscode-extension/package.json"
echo "  git commit -m 'chore(vscode): bump version to ${NEW_VERSION}'"
echo "  # Stable tag:"
echo "  git tag -a \"vscode-v${NEW_VERSION}\" -m \"vscode-v${NEW_VERSION}\""
echo "  # Pre-release tag:"
echo "  git tag -a \"vscode-pre-v${NEW_VERSION}\" -m \"vscode-pre-v${NEW_VERSION}\""
