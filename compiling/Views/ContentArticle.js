"use strict";

const escapeHTML = require('../Utils/escapeHTML');

const ContentArticle = (category, name, versions, contentHtml) => {
    return `
        <header>
            <div class="category">${ escapeHTML(category) }</div>
            <h1>${ escapeHTML(name) }</h1>
            <div class="versions">${ escapeHTML(versions) }</div>
        </header>

        <section>${ contentHtml }</section>
    `;
};

module.exports = ContentArticle;
