"use strict";

const escapeHTML = require('../Utils/escapeHTML');

const HeaderProjectsListItem = ({ name, url, isActive }) => {
    return `
        <li class="${ isActive ? "active" : "" }">
            <a href="${ escapeHTML(url) }">${ escapeHTML(name) }</a>
        </li>
    `;
};

module.exports = HeaderProjectsListItem;
