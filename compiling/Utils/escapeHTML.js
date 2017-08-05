"use strict";

const escapeHTML = str => {
    let entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };
    return ("" + str).replace(/[&<>"'\/]/g, entity => entityMap[entity]);
};

module.exports = escapeHTML;
