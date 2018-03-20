"use strict";

const _assertValidKey = key => {
  if (typeof key != "string" || key[0] != '/') {
    throw new SyntaxError(`Cloudflare keys must be a string and start with a forward slash (got "${key}")`);
  }
};

module.exports = _assertValidKey;
