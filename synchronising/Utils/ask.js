"use strict";

const ReadLine = require('readline');

const ask = question => {
    return new Promise((resolve, reject) => {
        let r = ReadLine.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        r.question(question, answer => {
            r.close();
            resolve(answer);
        });
    });
};

module.exports = ask;
