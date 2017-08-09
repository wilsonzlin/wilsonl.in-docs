"use strict";

const getCredentials = () => {
    return new AWS.SharedIniFileCredentials({ profile: 'wilsonl.in-docs' });
};

module.exports = getCredentials;
