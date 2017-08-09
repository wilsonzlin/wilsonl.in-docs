"use strict";

const _assertValidKey = key => {
    if (key[0] == '/') {
        throw new SyntaxError("S3 keys cannot start with a forward slash");
    }
};

module.exports = _assertValidKey;
