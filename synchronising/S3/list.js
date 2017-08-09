"use strict";

const assertValidKey = require('./_assertValidKey');

const list = prefix => {
    assertValidKey(prefix);

    return new Promise((resolve, reject) => {
        s3.listObjectsV2({
            Bucket: WLM.S3_BUCKET_NAME,
            Prefix: 'docs/',
            MaxKeys: 100000,
        }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

module.exports = list;
