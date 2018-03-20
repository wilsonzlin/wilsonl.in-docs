"use strict";

const _assertValidKey = key => {
  if (typeof key != "string" || key[0] == '/') {
    throw new SyntaxError(`S3 keys must be a string and cannot start with a forward slash (got "${key}")`);
  }
};

module.exports = _assertValidKey;
