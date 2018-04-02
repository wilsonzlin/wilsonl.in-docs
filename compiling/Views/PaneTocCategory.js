"use strict";

const escapeHTML = require("../Utils/escapeHTML");

const PaneTocCategory = (name, isActive, entriesHtml) => {
  return `
    <label class="toc-category">
      <input type="radio" hidden name="toc-category-expanded" ${ isActive ? "checked" : "" }>
      <div class="toc-category-label ${ isActive ? "active" : "" }">${ escapeHTML(name) }</div>
      <ul class="toc-category-entries">
        ${ entriesHtml }
      </ul>
    </label>
  `;
};

module.exports = PaneTocCategory;
