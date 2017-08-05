"use strict";

const escapeHTML = require('../Utils/escapeHTML');
const PaneTocCategoryEntry = require('./PaneTocCategoryEntry');

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

module.exports = PaneTocCategory;
