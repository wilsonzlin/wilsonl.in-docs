"use strict";

const _assertValidKey = key => {
    if (key[0] != '/') {
        throw new SyntaxError("CloudFront keys must start with a forward slash");
    }
};

module.exports = _assertValidKey;
