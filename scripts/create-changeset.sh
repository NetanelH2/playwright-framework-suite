#!/usr/bin/env bash
# Script to create a changeset for package changes
# Usage: ./scripts/create-changeset.sh

set -e

# Get the list of changed packages
if [ -d ".git" ]; then
  # Get changed packages from git diff
  CHANGED_FILES=$(git diff --name-only HEAD~1 HEAD 2>/dev/null || echo "")
  if [ -z "$CHANGED_FILES" ]; then
    # Fallback to status if diff fails
    CHANGED_FILES=$(git status --porcelain | awk '{print $2}')
  fi
else
  echo "Not a git repository"
  exit 1
fi

PACKAGES=$(echo "$CHANGED_FILES" | grep "^packages/" | cut -d'/' -f2 | sort -u | tr '\n' ' ')

if [[ -z "$PACKAGES" ]]; then
  echo "No packages changed"
  exit 0
fi

echo "Changed packages: $PACKAGES"

# Determine version bump from commit message or default to patch
COMMIT_MSG="${1:-patch update}"
if [[ $COMMIT_MSG =~ ^feat.*!:|BREAKING ]]; then
  BUMP="major"
elif [[ $COMMIT_MSG =~ ^feat ]]; then
  BUMP="minor"
else
  BUMP="patch"
fi

echo "Version bump: $BUMP"

# Create changeset
CHANGESET_ID="auto-$(date +%s)"
CHANGESET_FILE=".changeset/${CHANGESET_ID}.md"

cat > "$CHANGESET_FILE" << EOF
---
$(for pkg in $PACKAGES; do
  case "$pkg" in
    playwright-framework)
      echo "\"@netanelh2/playwright-framework\": $BUMP"
      ;;
    create-playwright-project)
      echo "\"@netanelh2/create-playwright-project\": $BUMP"
      ;;
    create-workflows-package)
      echo "\"@netanelh2/create-workflows-package\": $BUMP"
      ;;
  esac
done)
---

$(echo "$COMMIT_MSG" | head -n1)
EOF

echo "✅ Changeset created: $CHANGESET_FILE"
cat "$CHANGESET_FILE"
