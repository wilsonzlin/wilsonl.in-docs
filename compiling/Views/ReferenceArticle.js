"use strict";

const escapeHTML = require('../Utils/escapeHTML');

const ReferenceArticle = ({ category, name, description, signaturesHtml, argumentsHtml, returnsHtml }) => {
    return `
        <header>
            <a href="#pane" class="category">&lt;<zc-space /><zc-space /><zc-space />${ escapeHTML(category) }</a>
            <h1>${ escapeHTML(name) }</h1>
        </header>

        <section class="section-synopsis">
            <h2>Synopsis</h2>
            <p class="description">${ escapeHTML(description) }</p>
            ${ signaturesHtml }
        </section>

        ${ !argumentsHtml ? "" : `<section>
            <h2>Arguments</h2>
            <dl class="arguments-list">
                ${ argumentsHtml }
            </dl>
        </section>` }

        ${ !returnsHtml ? "" : `<section>
            <h2>Returns</h2>
            <ul class="returns-list">
                ${ returnsHtml }
            </ul>
        </section>` }
    `;
};

module.exports = ReferenceArticle;
