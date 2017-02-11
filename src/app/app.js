"use strict";

window.wl = {
    Docs: {
        DOCUMENT_TITLE_SUFFIX: ' | wilsonl.in',
        HTML_ENTITY_MAP: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        },
        currentListing: undefined,
        escapeHTML: str => ("" + str).replace(/[&<>"'\/]/g, entity => wl.Docs.HTML_ENTITY_MAP[entity]),
        escapeRegExp: str => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
        parseMarkdown: (mdText) => {
            var renderer = new marked.Renderer();

            renderer.code = (code, language) => {
                var html;

                if (language && language.indexOf('_wldoc_') == 0) {
                    switch (language.slice(7)) {
                        case 'typedline':
                            html = wl.Docs.parseTypedCodeLine(code);
                            break;
                    }
                } else if (language) {
                    html = hljs.highlight(language, code, true).value;
                } else {
                    html = wl.Docs.escapeHTML( code );
                }

                return `<pre>${ html }</pre>`;
            };

            renderer.paragraph = (text) => marked(text).slice(3, -5); // Remove <p> wrapping

            return `<div>${ marked(mdText, { renderer: renderer }) }</div>`;
        },
        parseTypedCodeLine: codeText => codeText.replace(/([| ])((?:[A-Z][a-z0-9_]+)+|zQuery|function|int|float|number|string|bool|object|array)/g, (_, charBefore, type) => `${charBefore}<span class=type>${ type }</span>`),
    }
};

(async function() {
	document.body.innerHTML = await (await fetch('../app/app.html')).text();

	let ooml = new OOML.Namespace();
	let app = ooml.objects.app;

    app.header.listings = ['OOML', 'zQuery', 'zVex', 'zSelectPro', 'zc', 'StackUI', 'JSVF'].map(listing => {
        let matchesURI = new RegExp('\\/' + listing + '\\/?$').test(location.pathname);
        if (matchesURI) {
            wl.Docs.currentListing = listing;
        }

        return {
            name: listing,
            attributes: {
                current: matchesURI,
            }
        };
    });

    document.title = `${ wl.Docs.currentListing }${ wl.Docs.DOCUMENT_TITLE_SUFFIX }`;

    let categories = await (await fetch('./doc.json')).json();
    let articles = [];

    categories.forEach(category => {
        let categoryName = category.name;

        let tocCategory = {
            name: categoryName,
            entries: [],
        };

        category.entries.forEach(entry => {
            let article = new ooml.classes.AppArticle(Object.assign({}, entry, {
                attributes: {
                    categoryName: categoryName,
                },
            }));
            articles.push(article);
            tocCategory.entries.push({
                name: entry.name,
                description: entry.description,
                attributes: {
                    article: article,
                },
            });
        });

        app.pane.categories.push(tocCategory);
    });

    app.articles = articles;

    let currentHash = location.hash.slice(1);
    let article = app.articles.find(article => article.name === currentHash);

    if (article) {
        app.loadArticle(article);
        app.pane.categories.some(category => {
            return category.entries.some(entry => {
                if (entry.name === currentHash) {
                    app.attributes.currentArticleEntry = entry;
                    entry.attributes.active = true;
                    return true;
                }
            });
        });
    }
})();
