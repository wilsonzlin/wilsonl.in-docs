"use strict";

const assertValidKey = require('./_assertValidKey');

const upload = settings => {
    let key = settings.key;
    let dataStream = settings.dataStream;
    let contentType = settings.contentType;
    let metadata = settings.metadata;

    assertValidKey(key);

    return new Promise((resolve, reject) => {
        s3.upload({
            Bucket: WLM.S3_BUCKET_NAME,
            Key: key,
            Body: dataStream,
            ContentType: contentType,
            Metadata: metadata,
        }, (err, res) => {
            if (err) {
                reject(err);
                return;
            }

            console.log(`Uploaded ${key}`);

            resolve();
        })
    });
};

module.exports = upload;
