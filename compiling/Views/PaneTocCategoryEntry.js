"use strict";

const escapeHTML = require('../Utils/escapeHTML');

const PaneTocCategoryEntry = (id, name, description) => {
    return `
        <li class="toc-category-entry-wrapper" title="${ escapeHTML(description) }">
            <input class="toc-category-entry-radio" type="radio" name="toc-category-entry-active">
            <a class="toc-category-entry-link" href="${ escapeHTML(id) }.html" target="2" data-name="${ escapeHTML(name) }"></a>
        </li>
    `;
};

module.exports = PaneTocCategoryEntry;
