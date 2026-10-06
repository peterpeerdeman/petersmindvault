#!/usr/bin/env bash
# Builds custom/publish-fixture and fails if anything not marked `publish: true` ends up in the site.
# Every unpublished fixture note/file contains a LEAK_* marker; published ones contain PUBLIC_OK_*.
set -euo pipefail

cd "$(dirname "$0")/.."
out="$(mktemp -d)"
trap 'rm -rf "$out"' EXIT

npx quartz build -d custom/publish-fixture -o "$out" > "$out.log" 2>&1 || {
  cat "$out.log"
  echo "FAIL: build failed"
  exit 1
}

fail=0
if grep -rIl "LEAK_" "$out"; then
  echo "FAIL: unpublished content found in the files above"
  fail=1
fi
if find "$out" -iname "*leak*" -o -iname "*secret*" -o -iname "*.canvas" -o -iname "*.base" | grep .; then
  echo "FAIL: unpublished files emitted (see above)"
  fail=1
fi
published=$(grep -rlE "PUBLIC_OK_[0-9]" "$out" --include="*.html" | wc -l | tr -d ' ')
if [ "$published" -ne 4 ]; then
  echo "FAIL: expected 4 published notes with PUBLIC_OK markers, found $published"
  fail=1
fi

[ "$fail" -eq 0 ] && echo "OK: only publish: true notes were emitted ($published notes)"
exit "$fail"
