"use strict";

const escapeHTML = require('../Utils/escapeHTML');

const ReferenceArticle = ({ category, name, description, signaturesHtml, argumentsHtml, returnsHtml }) => {
    return `
        <header>
            <div class="category">${ escapeHTML(category) }</div>
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
