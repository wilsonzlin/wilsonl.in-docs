"use strict";

const escapeHTML = require('../Utils/escapeHTML');

const HeaderDocumentationsListItem = ({ name, url, isActive }) => {
    return `
        <li class="listing ${ isActive ? "active" : "" }">
            <a class="listing-link" href="${ escapeHTML(url) }">${ escapeHTML(name) }</a>
        </li>
    `;
};

module.exports = HeaderDocumentationsListItem;
