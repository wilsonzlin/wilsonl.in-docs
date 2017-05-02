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

        $currentListingLink = qs('a[href="../' + location.pathname.replace(/^\/+|\/+$/g, '') + '"]'),
        $pane = qs("#pane"),
        $noloadMessage = qs("#article-noload-message"),
        $article = qs("#article"),
        $articleEntries = qsa('.toc-category-entry-wrapper'),
        onClickArticle = function (a) {
            $article.contentWindow.location.replace(a.getAttribute("data-link"));
            a.previousSibling.checked = true;
            $noloadMessage.style.display = "none";
            history.replaceState(undefined, undefined, '#' + a.getAttribute('data-name'));
            $pane.classList.remove('open');
        },
        parseHash = function () {
            var hash = location.hash.slice(1);
            if (hash) {
                var link = qs('a[data-name="' + hash + '"]');
                if (link) {
                    link.click();
                }
            }
        };

    $currentListingLink.onclick = function () {
        return false
    };
    $currentListingLink.parentNode.classList.add('current');

    qs("#pane-open-button").onclick = function () {
        $pane.classList.toggle('open');
    };

    qsa('.toc-category-entry-link').forEach(function (link) {
        link.setAttribute("data-link", link.href);
        link.href = '#' + link.getAttribute('data-name');
    });

    $pane.addEventListener("click", function (e) {
        var target = e.target;
        if (target.nodeName == 'A' && target.target == 2) {
            e.preventDefault();
            onClickArticle(target);
        } else if (target.nodeName == 'DT') {
            target.parentNode.classList.toggle("hidden");
        }
    }, true);

    qs("#toc-search").oninput = function (e) {
        var term = this.value.trim() || false;
        var regex = term && RegExp(escapeRegExp(term), "i");
        $articleEntries.forEach(function (entry) {
            entry.classList.toggle("hidden", term && !regex.test(entry.children[1].getAttribute('data-name')));
        });
    };

    parseHash();
})();
