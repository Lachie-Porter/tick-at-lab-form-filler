#!/bin/bash
minify() {
  node -e "
var fs = require('fs');
var code = fs.readFileSync('$1','utf8');
code = code.replace(/\s+/g,' ').trim();
process.stdout.write('javascript:' + code);
"
}

echo "=== LOAD CSV bookmarklet ==="
minify bookmarklet-load.js
echo ""
echo ""
echo "=== FILL FORM bookmarklet ==="
minify bookmarklet.js
echo ""
