"use strict";

const fs = require('fs');

const getCredentials = () => {
  return JSON.parse(fs.readFileSync(process.env['HOME'] + '/.config/proj/wilsonl.in-docs/cred.json', 'utf8'));
};

module.exports = getCredentials;
