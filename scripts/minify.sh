#!/bin/bash
minify() {
  npx terser "$1" --compress --mangle --output "$2"
  echo "javascript:" | cat - "$2" > "$2.tmp" && mv "$2.tmp" "$2"
  echo "Written: $2"
}

minify src/load-csv.js minified/load-csv.js
minify src/fill-form.js minified/fill-form.js
minify src/reset.js minified/reset.js
