"use strict";
(function (undefined) {
  var d = document,
    Ap = Array.prototype,
    qs = function (sel) {
      return d.querySelector(sel);
    },
    qsa = function (sel) {
      return Ap.slice.call(d.querySelectorAll(sel));
    },
    escapeRegExp = function (str) {
      return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    },

    $articleEntries = qsa('.toc-category-entry');

  qs('#toc-search').onkeyup = function (e) {
    var term = this.value.trim() || false;
    var regex = term && RegExp(escapeRegExp(term), 'i');
    $articleEntries.forEach(function (entry) {
      var classes = entry.className.split(/\s+/);
      var indexOfHiddenClass = classes.indexOf('hidden');
      if (term && !regex.test(entry.children[0].textContent)) {
        if (!~indexOfHiddenClass) {
          classes.push('hidden');
        }
      } else {
        if (~indexOfHiddenClass) {
          classes.splice(indexOfHiddenClass, 1);
        }
      }
      entry.className = classes.join(' ');
    });
  };
})();
