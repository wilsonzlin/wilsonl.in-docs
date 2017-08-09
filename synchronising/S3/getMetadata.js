"use strict";

const fs = require('fs');
const AWS = require('aws-sdk');
const getCredentials = require('../Auth/getCredentials');
const assertValidKey = require('./_assertValidKey');

AWS.config.credentials = getCredentials();
let s3 = new AWS.S3();

const APP_AWS_RESOURCES_INFO = JSON.parse(fs.readFileSync(process.env['HOME'] + '/.aws/wilsonl.in', 'utf8'));

const getMetadata = objectKey => {
    assertValidKey(objectKey);

    return new Promise((resolve, reject) => {
        s3.headObject({
            Bucket: APP_AWS_RESOURCES_INFO.S3_BUCKET_NAME,
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
