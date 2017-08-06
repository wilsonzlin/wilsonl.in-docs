"use strict";

const escapeHTML = require('../Utils/escapeHTML');

const PaneTocCategoryEntry = ({ url, name, description, isActive }) => {
    return `
        <li class="toc-category-entry-wrapper ${ isActive ? "active" : "" }" title="${ escapeHTML(description) }">
            <a class="toc-category-entry-link" href="${ escapeHTML(url) }" data-name="${ escapeHTML(name) }"></a>
        </li>
    `;
};

module.exports = PaneTocCategoryEntry;
