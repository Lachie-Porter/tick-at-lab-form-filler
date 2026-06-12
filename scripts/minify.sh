#!/bin/bash
minify() {
  node -e "
var fs = require('fs');
var code = fs.readFileSync('$1','utf8');
code = code.replace(/\s+/g,' ').trim();
fs.writeFileSync('$2', 'javascript:' + code);
"
}

minify bookmarklet-load.js minified/bookmarklet-load.js
echo "Written: minified/bookmarklet-load.js"

minify bookmarklet.js minified/bookmarklet.js
echo "Written: minified/bookmarklet.js"
