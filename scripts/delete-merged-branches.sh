#!/bin/bash

# Script to delete merged branches
# This script deletes remote branches that have been merged into main

set -e

echo "Fetching all branches..."
git fetch --all --prune

echo "Checking for merged branches..."

# Get all remote branches except main and HEAD
branches=$(git branch -r --merged origin/main | grep -v "origin/main" | grep -v "origin/HEAD" | sed 's|origin/||')

if [ -z "$branches" ]; then
  echo "No merged branches to delete."
  exit 0
fi

echo "The following branches are merged and will be deleted:"
echo "$branches"

read -p "Do you want to proceed? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 1
fi

for branch in $branches; do
  echo "Deleting branch: $branch"
  git push origin --delete "$branch"
done

echo "Done."