"use strict";

const escapeHTML = require('../Utils/escapeHTML');

const PaneTocCategory = (name, entriesHtml) => {
    return `
        <div class="toc-category">
            <dt class="toc-category-label">${ escapeHTML(name) }</dt>
            <dd class="toc-category-entries-container">
                <ul class="toc-category-entries">
                    ${ entriesHtml }
                </ul>
            </dd>
        </div>
    `;
};

module.exports = PaneTocCategory;
