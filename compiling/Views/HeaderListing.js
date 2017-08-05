"use strict";

const escapeHTML = require('../Utils/escapeHTML');

const HeaderListing = (name) => {
    return `
        <li class="listing">
            <a class="listing-link" href="/docs/${ escapeHTML(name) }">${ escapeHTML(name) }</a>
        </li>
    `;
};

module.exports = HeaderListing;
