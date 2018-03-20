"use strict";

const fs = require('fs');

const getResourcesInfo = () => {
  return JSON.parse(fs.readFileSync(process.env['HOME'] + '/.config/proj/wilsonl.in-docs/res.json', 'utf8'));
};

module.exports = getResourcesInfo;
