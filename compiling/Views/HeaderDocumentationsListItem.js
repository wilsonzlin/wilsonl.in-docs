"use strict";

const escapeHTML = require('../Utils/escapeHTML');

const HeaderDocumentationsListItem = ({ name, url, isActive }) => {
    return `
        <li class="${ isActive ? "active" : "" }">
            <a href="${ isActive ? "#" : escapeHTML(url) }">${ escapeHTML(name) }</a>
        </li>
    `;
};

module.exports = HeaderDocumentationsListItem;
