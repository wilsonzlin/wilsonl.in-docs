"use strict";

const fs = require('fs-extra');
const marked = require('marked');
const hljs = require('highlight.js');

__dirname = __dirname + '/..';

function parseMarkdown(mdText, removeParagraphTags) {
    let renderer = new marked.Renderer();

    renderer.code = (code, language) => {
        let html;

        if (language && language.indexOf('x-wldoc-') == 0) {
            switch (language.slice(8)) {
                case 'typedline':
                    html = parseTypedCodeLine(code);
                    break;
            }
        } else if (language) {
            html = hljs.highlight(language, code, true).value;
        } else {
            html = escapeHTML(code);
        }

        return `<pre>${ html }</pre>`;
    };

    renderer.paragraph = text => {
        let ret = marked(text);
        if (removeParagraphTags) {
            ret = ret.slice(3, -5); // Remove <p> wrapping
        }
        ret = ret.replace(/ </g, "<zc-space /><").replace(/> /g, "><zc-space />");
        return ret;
    };

    renderer.list = (body, ordered) => {
        let ret = marked(body, ordered);
        ret = ret.replace(/ </g, "<zc-space /><").replace(/> /g, "><zc-space />");
        return '<ul>' + ret + '</ul>';
    };

    renderer.link = (href, title, text) => {
        let html = `<a `;

        if (href[0] != '#') {
            html += 'target=_blank ';
        }
        html += 'href="' + escapeHTML(href) + '" ';

        title = (title || "").trim();
        if (title) {
            html += 'title="' + escapeHTML(title) + '" ';
        }

        html += '>';
        if (text) {
            html += escapeHTML(text);
        }
        html += "</a>";
        return html;
    };

    return marked(mdText, { renderer: renderer });
}

function parseTypedCodeLine(codeText) {
    return codeText.replace(
        /(true|false)/g,
        `<span class="literal">$1</span>`
    ).replace(
        /(?=[| ])((?:[A-Z][a-z0-9_]*)+|zQuery|function|int|float|number|string|bool|object|array|null|undefined)/g,
        (_, type) => `<span class="type">${ type }</span>`
    );
}

function sortIdFiles(a, b) {
    let idA = Number.parseInt(a.slice(0, a.indexOf('.')), 10);
    let idB = Number.parseInt(b.slice(0, b.indexOf('.')), 10);

    return idA < idB ? -1 : idA > idB ? 1 : 0;
}

function escapeHTML(str) {
    let entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };
    return ("" + str).replace(/[&<>"'\/]/g, entity => entityMap[entity]);
}

const HeaderListing = (name) => {
    return `
        <li class="listing">
            <a class="listing-link" href="../${ escapeHTML(name) }">${ escapeHTML(name) }</a>
        </li>
    `;
};

const PaneTocCategoryEntry = (id, name, description) => {
    return `
        <li class="toc-category-entry-wrapper" title="${ escapeHTML(description) }">
            <input class="toc-category-entry-radio" type="radio" name="toc-category-entry-active">
            <a class="toc-category-entry-link" href="${ escapeHTML(id) }.html" target="2" data-name="${ escapeHTML(name) }"></a>
        </li>
    `;
};

const PaneTocCategory = (name, entries) => {
    return `
        <div class="toc-category">
            <dt class="toc-category-label">${ escapeHTML(name) }</dt>
            <dd class="toc-category-entries-container">
                <ul class="toc-category-entries">
                    ${ entries.map(e => PaneTocCategoryEntry(e.id, e.name, e.description)).join("") }
                </ul>
            </dd>
        </div>
    `;
};

const ReferenceArticleSignature = (codeHtml) => {
    return `
        <pre class="signature">${ codeHtml }</pre>
    `;
};

const ReferenceArticleArgument = (name, descriptionHtml) => {
    return `
        <div>
            <dt class="argument-name">${ escapeHTML(name) }</dt>
            <dd>
                <p class="argument-description">${ descriptionHtml }</p>
            </dd>
        </div>
    `;
};

const ReferenceArgumentReturn = (valueHtml) => {
    return `
        <li>${ valueHtml }</li>
    `;
};

const ReferenceArticle = (category, name, versions, description, signatures, args, returns) => {
    return `
        <link rel="stylesheet" href="../_common/article.css">
        <header>
            <div class="category">${ escapeHTML(category) }</div>
            <h1>${ escapeHTML(name) }</h1>
            <div class="versions">${ escapeHTML(versions) }</div>
        </header>

        <section class="section-synopsis">
            <h2>Synopsis</h2>
            <p class="description">${ escapeHTML(description) }</p>
            ${ !signatures ? "" : signatures.map(s => ReferenceArticleSignature(s.html)).join("") }
        </section>

        ${ !args || !args.length ? "" : `<section>
            <h2>Arguments</h2>
            <dl class="arguments-list">
                ${ args.map(a => ReferenceArticleArgument(a.name, a.html)).join("") }
            </dl>
        </section>` }

        ${ !returns || !returns.length ? "" : `<section>
            <h2>Returns</h2>
            <ul class="returns-list">
                ${ returns.map(r => ReferenceArgumentReturn(r.html)).join("") }
            </ul>
        </section>` }
    `;
};

const ContentArticle = (category, name, versions, contentHtml) => {
    return `
        <link rel="stylesheet" href="../_common/article.css">
        <header>
            <div class="category">${ escapeHTML(category) }</div>
            <h1>${ escapeHTML(name) }</h1>
            <div class="versions">${ escapeHTML(versions) }</div>
        </header>

        <section>${ contentHtml }</section>
    `;
};

fs.removeSync(__dirname + '/dist');

const JS_DOC_FOLDERS = ['ooml', 'zQuery'];
const LISTINGS_HTML = JS_DOC_FOLDERS.map(f => HeaderListing(f)).join("");

let generatedHtmlFiles = [];

JS_DOC_FOLDERS.forEach(listing => {
    let categories = require(__dirname + '/src/' + listing + '/__metadata__.js');
    let categoriesHtml = "";
    let articleAutoIncrement = 0;

    categories.forEach(category => {
        let categoryName = category.name;

        let categoryEntries = category.entries.map(entry => {
            let path = `${__dirname}/src/${listing}/${categoryName}/${entry}.md`;
            let articleHtml;
            let articleId = articleAutoIncrement++;
            let ret;

            let stats = fs.lstatSync(path);
            if (stats.isDirectory()) {
                let versions = fs.readFileSync(path + '/versions.txt', 'utf8').trim();
                let description = fs.readFileSync(path + '/description.txt', 'utf8').trim();

                let signatures;
                if (fs.existsSync(path + '/signatures')) {
                    signatures = fs.readdirSync(path + '/signatures').filter(p => /\.txt$/.test(p)).sort(sortIdFiles).map(f => {
                        let code = fs.readFileSync(path + '/signatures/' + f, 'utf8');

                        return {html: parseTypedCodeLine(code)};
                    });
                }

                let args;
                if (fs.existsSync(path + '/arguments')) {
                    args = fs.readdirSync(path + '/arguments').filter(p => /\.md/.test(p)).sort(sortIdFiles).map(f => {
                        let name = f.slice(f.indexOf('.') + 1, f.lastIndexOf('.'));
                        let markdown = fs.readFileSync(path + '/arguments/' + f, 'utf8');

                        return {name: name, html: parseMarkdown(markdown, true)};
                    });
                }

                let returns;
                if (fs.existsSync(path + '/returns')) {
                    returns = fs.readdirSync(path + '/returns').filter(p => /\.md/.test(p)).sort(sortIdFiles).map(f => {
                        let markdown = fs.readFileSync(path + '/returns/' + f, 'utf8');

                        return { html: parseMarkdown(markdown, true) };
                    });
                }

                articleHtml = ReferenceArticle(categoryName, entry, versions, description, signatures, args, returns);

                ret = { id: articleId, name: entry, description: description };
            } else {
                let contentHtml = parseMarkdown(fs.readFileSync(path, 'utf8'));

                articleHtml = ContentArticle(categoryName, entry, "", contentHtml);

                ret = { id: articleId, name: entry, description: entry };
            }

            fs.writeFileSync(__dirname + '/src/' + listing + '/' + articleId + '.html', articleHtml);
            generatedHtmlFiles.push(listing + '/' + articleId + '.html');
            return ret;
        });

        categoriesHtml += PaneTocCategory(categoryName, categoryEntries);
    });

    fs.writeFileSync(__dirname + '/src/' + listing + '/index.html', fs.readFileSync(__dirname + '/src/__zc_common__/index.html', 'utf8')
        .replace(/\{\{ *viewportTitle *\}\}/g, escapeHTML(listing))
        .replace(/\{\{ *headerListings *\}\}/g, LISTINGS_HTML)
        .replace(/\{\{ *tocCategories *\}\}/g, categoriesHtml)
    );
    generatedHtmlFiles.push(listing + '/index.html');
});

require('zcompile')({
    source: __dirname + '/src',
    destination: __dirname + '/dist',

    minifySelectors: false,
    minifyHTML: {
        minifyInlineCSS: true,
        minifyInlineJS: true,
    },
    files: [
        'index.html',
        '_common/app.css',
        '_common/app.noscript.css',
        '_common/app.js',
        '_common/article.css',
    ].concat(generatedHtmlFiles),
});

generatedHtmlFiles.forEach(p => fs.removeSync(`${__dirname}/src/${p}`));
