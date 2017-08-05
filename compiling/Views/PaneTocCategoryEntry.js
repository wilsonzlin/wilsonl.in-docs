"use strict";

const escapeHTML = require('../Utils/escapeHTML');
const createURLPathComponent = require('../Utils/createURLPathComponent');

const PaneTocCategoryEntry = (category, name, description) => {
    return `
        <li class="toc-category-entry-wrapper" title="${ escapeHTML(description) }">
            <input class="toc-category-entry-radio" type="radio" name="toc-category-entry-active">
            <a class="toc-category-entry-link" href="../../${ escapeHTML(createURLPathComponent(category)) }/${ escapeHTML(createURLPathComponent(name)) }" data-name="${ escapeHTML(name) }"></a>
        </li>
    `;
};

module.exports = PaneTocCategoryEntry;
