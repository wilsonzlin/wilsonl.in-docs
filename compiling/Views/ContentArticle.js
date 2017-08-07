"use strict";

const escapeHTML = require('../Utils/escapeHTML');

const ContentArticle = ({ category, name, contentHtml }) => {
    return `
        <header>
            <a href="#pane" class="category">&lt;<zc-space /><zc-space /><zc-space />${ escapeHTML(category) }</a>
            <h1>${ escapeHTML(name) }</h1>
        </header>

        <section>${ contentHtml }</section>
    `;
};

module.exports = ContentArticle;
