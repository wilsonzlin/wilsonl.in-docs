"use strict";

const fs = require('fs');

const getResourcesInfo = () => {
    return JSON.parse(fs.readFileSync(process.env['HOME'] + '/.aws/wilsonl.in', 'utf8'));
};

module.exports = getResourcesInfo;
