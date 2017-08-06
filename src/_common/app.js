"use strict";
(function(undefined) {
    var d = document,
        Ap = Array.prototype,
        qs = function(sel) {
            return d.querySelector(sel);
        },
        qsa = function(sel) {
            return Ap.slice.call(d.querySelectorAll(sel));
        },
        escapeRegExp = function(str) {
            return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        },

        $pane = qs("#pane"),
        $articleEntries = qsa('.toc-category-entry');

    qs("#pane-open-button").onclick = function() {
        $pane.classList.toggle('open');
    };

    qs("#toc-search").oninput = function(e) {
        var term = this.value.trim() || false;
        var regex = term && RegExp(escapeRegExp(term), "i");
        $articleEntries.forEach(function(entry) {
            entry.classList.toggle("hidden", term && !regex.test(entry.children[0].textContent));
        });
    };
})();
