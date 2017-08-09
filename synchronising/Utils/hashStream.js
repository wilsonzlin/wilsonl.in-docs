"use strict";

const Crypto = require('crypto');

const hashStream = (hashType, stream, metadata) => {
    return new Promise((resolve, reject) => {
        let hash = Crypto.createHash(hashType);
        let sha512 = "";

        hash.on('readable', () => {
            let data = hash.read();
            if (data) {
                sha512 = data.toString("hex");
            }
        });

        hash.on('finish', () => {
            resolve({ hash: sha512, metadata: metadata });
        });

        hash.on('error', err => {
            reject(err);
        });

        stream.pipe(hash);
    });
};

module.exports = hashStream;
