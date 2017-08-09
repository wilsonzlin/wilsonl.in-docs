"use strict";

const assertValidKey = require('./_assertValidKey');

const invalidate = (...keys) => {
    keys.forEach(key => assertValidKey(key));

    return new Promise((resolve, reject) => {
        cloudFront.createInvalidation({
            DistributionId: WLM.CLOUDFRONT_DISTRIBUTION_ID,
            InvalidationBatch: {
                CallerReference: `${WLM.S3_BUCKET_NAME}_docs_sync-app_${ Date.now() }`,
                Paths: {
                    Quantity: keys.length,
                    Items: keys,
                },
            },
        }, (err, res) => {
            if (err) {
                reject(err);
                return;
            }

            keys.forEach(key => {
                console.log(`Invalidated ${key}`);
            });

            resolve();
        });
    });
};

module.exports = invalidate;
