#!/bin/bash
minify() {
  node -e "
var fs = require('fs');
var code = fs.readFileSync('$1','utf8');
code = code.replace(/\s+/g,' ').trim();
fs.writeFileSync('$2', 'javascript:' + code);
"
}

minify src/load-csv.js minified/load-csv.js
echo "Written: minified/load-csv.js"

minify src/fill-form.js minified/fill-form.js
echo "Written: minified/fill-form.js"
