"use strict";

const assertValidKey = require('./_assertValidKey');

const getMetadata = objectKey => {
    assertValidKey(objectKey);

    return new Promise((resolve, reject) => {
        s3.headObject({
            Bucket: WLM.S3_BUCKET_NAME,
            Key: objectKey,
        }, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            resolve({ key: objectKey, metadata: data.Metadata });
        });
    });
};

module.exports = getMetadata;
