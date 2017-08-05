"use strict";

const parseTypedCodeLine = codeText => {
    return codeText.replace(
        /(true|false)/g,
        `<span class="literal">$1</span>`
    ).replace(
        /(?=[| ])((?:[A-Z][a-z0-9_]*)+|zQuery|function|int|float|number|string|bool|object|array|null|undefined)/g,
        (_, type) => `<span class="type">${ type }</span>`
    );
};

module.exports = parseTypedCodeLine;
