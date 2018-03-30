"use strict";

const escapeHTML = require('../Utils/escapeHTML');

const ArticleHeader = require('./ArticleHeader');

const ContentArticle = ({ category, name, contentHtml }) => {
  return `
    ${ArticleHeader({ category, name })}

    <section>${contentHtml}</section>
  `;
};

module.exports = ContentArticle;
