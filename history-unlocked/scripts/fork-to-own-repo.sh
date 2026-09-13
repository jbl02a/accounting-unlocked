#!/usr/bin/env bash
# Lift history-unlocked/ out of the accounting repo and into its own.
#
# This directory is already self-contained — its own package.json, vercel.json,
# .gitignore, icons and docs — so "forking" is really just: copy it somewhere
# clean, start a fresh git history, and push.
#
# Usage, from anywhere:
#   ./scripts/fork-to-own-repo.sh git@github.com:<you>/history-unlocked.git [target-dir]
#
# Create the empty repository on GitHub first (no README, no .gitignore — this
# script provides both), then run this with its URL.

set -euo pipefail

REMOTE="${1:-}"
TARGET="${2:-$HOME/history-unlocked}"

if [ -z "$REMOTE" ]; then
  echo "usage: $0 <git-remote-url> [target-dir]" >&2
  exit 1
fi

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ -e "$TARGET" ]; then
  echo "error: $TARGET already exists — pass a different target directory" >&2
  exit 1
fi

echo "→ copying $SRC to $TARGET (excluding node_modules and dist)"
mkdir -p "$TARGET"
tar -C "$SRC" --exclude=node_modules --exclude=dist --exclude=.git -cf - . | tar -C "$TARGET" -xf -

cd "$TARGET"
echo "→ starting a fresh git history"
git init -q -b main
git add -A
git commit -q -m "History Unlocked: an interactive AP U.S. History course

Periods 1 and 2 through the French and Indian War: eight levels, a practice
exam in the AP stimulus format, a filterable timeline and a printable cram
sheet. Lifted out of the repository it was prototyped in."

git remote add origin "$REMOTE"
echo "→ pushing to $REMOTE"
git push -u origin main

cat <<'DONE'

Done. Next steps:
  1. In Vercel, import the new repository (framework preset: Vite, build `npm run
     build`, output `dist`). vercel.json is already in place, including the
     no-cache headers on sw.js that make PWA updates get noticed.
  2. Delete history-unlocked/ from the accounting repo once you are happy, so
     there is only one copy to maintain.
DONE
