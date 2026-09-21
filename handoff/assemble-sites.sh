#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PARTS_DIR="$ROOT_DIR/sites"
OUTPUT_DIR="$ROOT_DIR/assembled-sites"

mkdir -p "$OUTPUT_DIR"

for first_part in "$PARTS_DIR"/*.tar.gz.part-000.b64; do
  archive_name="$(basename "$first_part" .part-000.b64)"
  : > "$OUTPUT_DIR/$archive_name"
  for encoded_part in "$PARTS_DIR/$archive_name".part-*.b64; do
    base64 --decode "$encoded_part" >> "$OUTPUT_DIR/$archive_name"
  done
done

(cd "$ROOT_DIR" && sha256sum -c SHA256SUMS.txt --ignore-missing)

echo "Site archives are ready in $OUTPUT_DIR"
