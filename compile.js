"use strict";

const fs = require('fs-extra');
const marked = require('marked');

function parseMarkdown(mdText) {
    var renderer = new marked.Renderer();

    renderer.code = (code, language) => {
        var html;

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

    renderer.paragraph = (text) => marked(text).slice(3, -5); // Remove <p> wrapping

    return `<div>${ marked(mdText, { renderer: renderer }) }</div>`;
}

function parseTypedCodeLine(codeText) {
    return codeText.replace(
        /([| ])((?:[A-Z][a-z0-9_]+)+|zQuery|function|int|float|number|string|bool|object|array)/g,
        (_, charBefore, type) => `${charBefore}<span class="type">${ type }</span>`
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

const HeaderListing = function (name) {
    return `
        <li><a href="../${ escapeHTML(name) }">${ escapeHTML(name) }</a></li>
    `;
}

const PaneTocCategoryEntry = function (id, name, description) {
    return `
        <li class="toc-category-entry" title="${ escapeHTML(description) }">
            <label>
                <input type="radio" name="toc-category-entry-active">
                <a href="${ escapeHTML(id) }.html" target="article">${ escapeHTML(name) }</a>
            </label>
        </li>
    `;
};

const PaneTocCategory = function (name, entries) {
    return `
        <div class="toc-category">
            <dt class="toc-category-label" domonclick="this.attributes.expanded = !this.attributes.expanded">${ escapeHTML(name) }</dt>
            <dd class="toc-category-entries-container">
                <ul class="toc-category-entries">
                    ${ entries.map(e => PaneTocCategoryEntry(e.id, e.name, e.description)).join("") }
                </ul>
            </dd>
        </div>
    `;
};

const ReferenceArticleSignature = function (codeHtml) {
    return `
        <pre class="signature">${ codeHtml }</pre>
    `;
};

const ReferenceArticleArgument = function (name, descriptionHtml) {
    return `
        <div>
            <dt class="argument-name">${ escapeHTML(name) }</dt>
            <dd>
                <p class="argument-description">${ descriptionHtml }</p>
            </dd>
        </div>
    `;
};

const ReferenceArgumentReturn = function (valueHtml) {
    return `
        <li>${ valueHtml }</li>
    `;
};

const ReferenceArticle = function (category, name, versions, description, signatures, args, returns) {
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
            ${ signatures.map(s => ReferenceArticleSignature(s.html)).join("") }
        </section>

        <section>
            <h2>Arguments</h2>
            <dl class="arguments-list">
                ${ args.map(a => ReferenceArticleArgument(a.name, a.html)).join("") }
            </dl>
        </section>

        <section>
            <h2>Returns</h2>
            <ul class="returns-list">
                ${ returns.map(r => ReferenceArgumentReturn(r.html)).join("") }
            </ul>
        </section>
    `;
};

const ContentArticle = function (category, name, versions, contentHtml) {
    return `
        <header>
            <div class="category">${ escapeHTML(category) }</div>
            <h1>${ escapeHTML(name) }</h1>
            <div class="versions">${ escapeHTML(versions) }</div>
        </header>

        <section>${ contentHtml }</section>
    `;
};

fs.removeSync(__dirname + '/dist');

const JS_DOC_FOLDERS = ['zQuery'];
const LISTINGS_HTML = JS_DOC_FOLDERS.map(f => HeaderListing(f)).join("");

let generatedHtmlFiles = [];

JS_DOC_FOLDERS.forEach(listing => {
    let categories = Function('"use strict"; return ' + fs.readFileSync(__dirname + '/src/' + listing + '/__metadata__.js'))();
    let categoriesHtml = [];
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
                let versions = fs.readFileSync(path + '/versions.txt');
                let description = fs.readFileSync(path + '/description.txt');

                let signatures = fs.readdirSync(path + '/signatures').filter(p => /\.txt$/.test(p)).sort(sortIdFiles).map(f => {
                    let code = fs.readFileSync(path + '/signatures/' + f, 'utf8');

                    return { html: parseTypedCodeLine(code) };
                });

                let args = fs.readdirSync(path + '/arguments').filter(p => /\.md/.test(p)).sort(sortIdFiles).map(f => {
                    let name = f.slice(f.indexOf('.') + 1, f.lastIndexOf('.'));
                    let markdown = fs.readFileSync(path + '/arguments/' + f, 'utf8');

                    return { name: name, html: marked(markdown) };
                });

                let returns = fs.readdirSync(path + '/returns').filter(p => /\.md/.test(p)).sort(sortIdFiles).map(f => {
                    let markdown = fs.readFileSync(path + '/returns/' + f, 'utf8');

                    return { html: marked(markdown) };
                });

                articleHtml = ReferenceArticle(categoryName, entry, versions, description, signatures, args, returns);

                ret = { id: articleId, name: entry, description: description };
            } else {
                let contentHtml = marked(fs.readFileSync(path, 'utf8'));

                articleHtml = ContentArticle(categoryName, entry, "", contentHtml);

                ret = { id: articleId, name: entry, description: entry };
            }

            fs.writeFileSync(__dirname + '/src/' + listing + '/' + articleId + '.html', articleHtml);
            generatedHtmlFiles.push(listing + '/' + articleId + '.html');
            return ret;
        });

        categoriesHtml.push(PaneTocCategory(categoryName, categoryEntries));
    });

    fs.writeFileSync(__dirname + '/src/' + listing + '/index.html', `
        <ZC-SET[viewportTitle][${listing}]>
        <ZC-SET[headerListings][${LISTINGS_HTML}]>
        <ZC-SET[tocCategories][${categoriesHtml}]>
        <ZC-IMPORT[../__zc_common__/index.html]>
    `);
    generatedHtmlFiles.push(listing + '/index.html');
});

require('zcompile')({
    source: __dirname + '/src',
    destination: __dirname + '/dist',

    minifySelectors: false,
    files: [
        'index.html',
        '_common/app.css',
        '_common/app.noscript.css',
        '_common/app.js',
        '_common/article.css',
    ].concat(generatedHtmlFiles),
});

generatedHtmlFiles.forEach(p => fs.removeSync(`${__dirname}/src/${p}`));
