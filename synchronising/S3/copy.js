"use strict";

const assertValidKey = require('./_assertValidKey');

const copy = settings => {
    let keyFrom = settings.keyFrom;
    let keyTo = settings.keyTo;
    let contentType = settings.contentType;
    let metadata = settings.metadata;

    assertValidKey(keyFrom);
    assertValidKey(keyTo);

    return new Promise((resolve, reject) => {
        s3.copyObject({
            Bucket: WLM.S3_BUCKET_NAME,
            CopySource: WLM.S3_BUCKET_NAME + '/' + keyFrom,
            Key: keyTo,
            ContentType: contentType,
            Metadata: metadata,
            MetadataDirective: "REPLACE",
        }, (err, res) => {
            if (err) {
                reject(err);
                return;
            }

            console.log(`Copied ${keyFrom} to ${keyTo}`);

            resolve();
        })
    });
};

module.exports = copy;
