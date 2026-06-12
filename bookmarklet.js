(function () {
  function run($) {
  var DATA = {
    'Exp 1': [
      { name: 'John Doe',   competency: 'Expert' },
      { name: 'Alice Blah', competency: 'Competent' },
      { name: 'Georgia M',  competency: 'Good' },
      { name: 'Foo Bar',    competency: 'Expert' },
    ],
    'Exp 2': [
      { name: 'John Doe',   competency: 'Ok' },
      { name: 'Alice Blah', competency: 'Expert' },
      { name: 'Georgia M',  competency: 'Expert' },
      { name: 'Foo Bar',    competency: 'Woeful' },
    ],
    'Exp 3': [
      { name: 'John Doe',   competency: 'Expert' },
      { name: 'Alice Blah', competency: 'Expert' },
      { name: 'Georgia M',  competency: 'Bad' },
      { name: 'Foo Bar',    competency: 'Expert' },
    ],
    'Exp 4': [
      { name: 'John Doe',   competency: 'Competent' },
      // Alice Blah blank — skipped
      { name: 'Georgia M',  competency: 'Expert' },
      { name: 'Foo Bar',    competency: 'Expert' },
    ],
  };

  var KEY = 'bm_progress';
  localStorage.removeItem(KEY);
  var state = null;

  if (!state) {
    var pick = prompt('Which procedure?\n1 = Exp 1\n2 = Exp 2\n3 = Exp 3\n4 = Exp 4');
    if (!pick) return;
    var expName = { '1': 'Exp 1', '2': 'Exp 2', '3': 'Exp 3', '4': 'Exp 4' }[pick.trim()];
    if (!expName) { alert('Unknown selection'); return; }
    state = { exp: expName, index: 0 };
  }

  function fillNext() {
    var list = DATA[state.exp];
    if (state.index >= list.length) {
      alert('Done — ' + state.exp + ' complete!');
      localStorage.removeItem(KEY);
      return;
    }
    var person = list[state.index];
    $('[name="name"]').val(person.name);
    $('[name="procedure"]').val(state.exp);
    $('[name="species"]').val('Mouse');
    $('[name="competency"]').val(person.competency);
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
