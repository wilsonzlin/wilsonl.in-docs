"use strict";

const escapeHTML = require('../Utils/escapeHTML');
const ReferenceArticleSignature = require('./ReferenceArticleSignature');
const ReferenceArticleArgument = require('./ReferenceArticleArgument');
const ReferenceArgumentReturn = require('./ReferenceArgumentReturn');

const ReferenceArticle = (category, name, versions, description, signatures, args, returns) => {
    return `
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

module.exports = ReferenceArticle;
