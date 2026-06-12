(function () {
  function run($) {
    console.log("[bm] fill-form: starting");

    var DATA = JSON.parse(localStorage.getItem("bm_csv_data") || "null");
    if (!DATA) {
      console.error(
        "[bm] No CSV data in localStorage. Run load-csv bookmarklet first.",
      );
      alert("No CSV loaded. Use the Load CSV bookmarklet first.");
      return;
    }
    console.log("[bm] CSV data loaded. Procedures:", Object.keys(DATA));

    var KEY = "bm_progress";
    localStorage.removeItem(KEY);
    var state = null;

    if (!state) {
      var procs = Object.keys(DATA);
      var menu = procs
        .map(function (p, i) {
          return i + 1 + " = " + p;
        })
        .join("\n");
      var pick = prompt("Which procedure?\n" + menu);
      if (!pick) {
        console.log("[bm] User cancelled procedure selection.");
        return;
      }
      var expName = procs[parseInt(pick.trim(), 10) - 1];
      if (!expName) {
        console.error("[bm] Invalid selection:", pick, "— available:", procs);
        alert("Unknown selection");
        return;
      }
      state = { exp: expName, index: 0 };
      console.log(
        "[bm] Selected procedure:",
        expName,
        "— entries:",
        DATA[expName].length,
      );
    }

    function byLabel(form, text) {
      var label = form
        .find("label")
        .filter(function () {
          return $(this).text().trim().indexOf(text) !== -1;
        })
        .first();

      if (!label.length) {
        console.warn('[bm] byLabel: no label found matching "' + text + '"');
        return $();
      }

      var field = label.find("input, select, textarea").first();
      if (field.length) {
        console.log('[bm] byLabel: "' + text + '" found via label wrapper');
        return field;
      }

      var forAttr = label.attr("for");
      if (forAttr) {
        field = form.find("#" + forAttr);
        if (field.length) {
          console.log('[bm] byLabel: "' + text + '" found via for/id');
          return field;
        }
      }

      field = label.nextAll("input, select, textarea").first();
      if (field.length) {
        console.log('[bm] byLabel: "' + text + '" found via sibling input');
        return field;
      }

      field = label.parent().find("input, select, textarea").first();
      if (field.length) {
        console.log(
          '[bm] byLabel: "' + text + '" found via child of parent container',
        );
        return field;
      }

      console.warn(
        '[bm] byLabel: could not find field for label "' +
          text +
          '" — tried all strategies',
      );
      return $();
    }

    function fillNext(form) {
      if (!form || !form.length) {
        console.error(
          '[bm] fillNext: form not found (id containing "DXPEForm_PW")',
        );
        return;
      }
      console.log("[bm] fillNext: using form", form.attr("id"));

      var list = DATA[state.exp];
      if (state.index >= list.length) {
        console.log("[bm] All entries complete for", state.exp);
        alert("Done — " + state.exp + " complete!");
        localStorage.removeItem(KEY);
        return;
      }

      var person = list[state.index];
      console.log(
        "[bm] Filling entry",
        state.index + 1,
        "/",
        list.length,
        "—",
        person.name,
        "/",
        person.competency,
      );

      byLabel(form, "Investigator Name").val(person.name);
      byLabel(form, "Procedure Name/Summary").val(state.exp);
      byLabel(form, "Species").val("Mouse");
      byLabel(form, "Competency").val(person.competency);

      state.index++;
      localStorage.setItem(KEY, JSON.stringify(state));
      document.title = "(" + state.index + "/" + list.length + ") " + state.exp;
    }

    $(document)
      .off("click.bm")
      .on("click.bm", "a", function () {
        if ($(this).text().trim() === "Apply & New") {
          console.log('[bm] "Apply & New" clicked — filling next entry');
          var form = $('[id*="DXPEForm_PW"]').first();
          if (!form.length) {
            console.error(
              '[bm] click handler: form not found after "Apply & New" click',
            );
          }
          fillNext(form);
        }
      });

    fillNext($('[id*="DXPEForm_PW"]').first());
  }

  if (window.jQuery) {
    console.log(
      "[bm] jQuery already present, version",
      window.jQuery.fn.jquery,
    );
    run(window.jQuery);
  } else {
    console.log("[bm] jQuery not found, injecting from CDN");
    var s = document.createElement("script");
    s.src = "https://code.jquery.com/jquery-3.7.1.min.js";
    s.onload = function () {
      console.log("[bm] jQuery loaded, version", window.jQuery.fn.jquery);
      run(window.jQuery);
    };
    document.head.appendChild(s);
  }
})();
