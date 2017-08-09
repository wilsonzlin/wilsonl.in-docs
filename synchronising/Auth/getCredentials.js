"use strict";

const AWS = require('aws-sdk');

const getCredentials = () => {
    return new AWS.SharedIniFileCredentials({ profile: 'wilsonl.in-docs' });
};

module.exports = getCredentials;
