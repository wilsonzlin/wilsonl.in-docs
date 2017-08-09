"use strict";

const fs = require('fs');
const AWS = require('aws-sdk');
const getCredentials = require('../Auth/getCredentials');
const assertValidKey = require('./_assertValidKey');

AWS.config.credentials = getCredentials();
let cloudFront = new AWS.CloudFront();

const APP_AWS_RESOURCES_INFO = JSON.parse(fs.readFileSync(process.env['HOME'] + '/.aws/wilsonl.in', 'utf8'));

const invalidate = (...keys) => {
    keys.forEach(key => assertValidKey(key));

    return new Promise((resolve, reject) => {
        cloudFront.createInvalidation({
            DistributionId: APP_AWS_RESOURCES_INFO.CLOUDFRONT_DISTRIBUTION_ID,
            InvalidationBatch: {
                CallerReference: `${ APP_AWS_RESOURCES_INFO.S3_BUCKET_NAME }_docs_sync-app_${ Date.now() }`,
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
