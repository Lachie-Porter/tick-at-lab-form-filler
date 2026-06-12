(function () {
  console.log('[bm] load-csv: starting');

  var existing = document.getElementById('bm-loader');
  if (existing) {
    console.log('[bm] loader already open, closing');
    existing.remove();
    return;
  }

  var div = document.createElement('div');
  div.id = 'bm-loader';
  div.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;background:white;border:1px solid #ccc;border-radius:6px;padding:16px;font-family:sans-serif;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.15);min-width:260px';
  div.innerHTML = '<strong>Load CSV Data</strong><br><br>'
    + '<input type="file" id="bm-file" accept=".csv"><br><br>'
    + '<div id="bm-msg" style="color:#555;font-size:13px"></div>'
    + '<br><button id="bm-close" style="font-size:12px;cursor:pointer">Close</button>';
  document.body.appendChild(div);
  console.log('[bm] loader UI injected');

  document.getElementById('bm-close').onclick = function () {
    console.log('[bm] loader closed by user');
    div.remove();
  };

  document.getElementById('bm-file').onchange = function (e) {
    var file = e.target.files[0];
    if (!file) { console.warn('[bm] no file selected'); return; }
    console.log('[bm] reading file:', file.name, '(' + file.size + ' bytes)');

    var reader = new FileReader();
    reader.onload = function (e) {
      var lines = e.target.result.trim().split('\n');
      console.log('[bm] CSV lines read:', lines.length);

      var headers = lines[0].split(',').map(function (s) { return s.trim(); }).slice(1);
      console.log('[bm] procedures found:', headers);

      var data = {};
      headers.forEach(function (proc) { data[proc] = []; });

      lines.slice(1).forEach(function (line, i) {
        var cols = line.split(',').map(function (s) { return s.trim(); });
        var name = cols[0];
        if (!name) { console.warn('[bm] row', i + 2, 'has no name, skipping'); return; }
        headers.forEach(function (proc, j) {
          if (cols[j + 1]) {
            data[proc].push({ name: name, competency: cols[j + 1] });
          } else {
            console.log('[bm] row', i + 2, '(' + name + '): blank competency for', proc, '— skipped');
          }
        });
      });

      localStorage.setItem('bm_csv_data', JSON.stringify(data));
      console.log('[bm] data saved to localStorage:', data);

      var summary = 'Saved: ' + headers.join(', ') + ' — ' + (lines.length - 1) + ' people.';
      document.getElementById('bm-msg').textContent = summary;
      console.log('[bm]', summary);
    };

    reader.onerror = function () {
      console.error('[bm] FileReader error reading', file.name);
    };

    reader.readAsText(file);
  };
})();
