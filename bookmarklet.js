(function () {
  function run($) {
  var DATA = JSON.parse(localStorage.getItem('bm_csv_data') || 'null');
  if (!DATA) { alert('No CSV loaded. Use the Load CSV bookmarklet first.'); return; }

  var KEY = 'bm_progress';
  localStorage.removeItem(KEY);
  var state = null;

  if (!state) {
    var procs = Object.keys(DATA);
    var menu = procs.map(function (p, i) { return (i + 1) + ' = ' + p; }).join('\n');
    var pick = prompt('Which procedure?\n' + menu);
    if (!pick) return;
    var expName = procs[parseInt(pick.trim(), 10) - 1];
    if (!expName) { alert('Unknown selection'); return; }
    state = { exp: expName, index: 0 };
  }

  function byLabel(text) {
    return $('label').filter(function () {
      return $(this).clone().children().remove().end().text().trim() === text;
    }).find('input, select, textarea');
  }

  function fillNext() {
    var list = DATA[state.exp];
    if (state.index >= list.length) {
      alert('Done — ' + state.exp + ' complete!');
      localStorage.removeItem(KEY);
      return;
    }
    var person = list[state.index];
    byLabel('Investigator name').val(person.name);
    byLabel('Procedure name').val(state.exp);
    byLabel('Species').val('Mouse');
    byLabel('Competency').val(person.competency);
    state.index++;
    localStorage.setItem(KEY, JSON.stringify(state));
    document.title = '(' + state.index + '/' + list.length + ') ' + state.exp;
  }

  $('#contact-form').off('submit.bm').on('submit.bm', function () {
    fillNext();
  });

  fillNext();
  }

  if (window.jQuery) {
    run(window.jQuery);
  } else {
    var s = document.createElement('script');
    s.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    s.onload = function () { run(window.jQuery); };
    document.head.appendChild(s);
  }
})();
