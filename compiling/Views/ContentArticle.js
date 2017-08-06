"use strict";

const escapeHTML = require('../Utils/escapeHTML');

const ContentArticle = ({ category, name, contentHtml }) => {
    return `
        <header>
            <div class="category">${ escapeHTML(category) }</div>
            <h1>${ escapeHTML(name) }</h1>
        </header>

        <section>${ contentHtml }</section>
    `;
};

module.exports = ContentArticle;
