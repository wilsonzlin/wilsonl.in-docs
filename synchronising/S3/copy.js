"use strict";

const fs = require('fs');
const AWS = require('aws-sdk');
const getCredentials = require('../Auth/getCredentials');
const assertValidKey = require('./_assertValidKey');

AWS.config.credentials = getCredentials();
let s3 = new AWS.S3();

const APP_AWS_RESOURCES_INFO = JSON.parse(fs.readFileSync(process.env['HOME'] + '/.aws/wilsonl.in', 'utf8'));

const copy = settings => {
    let keyFrom = settings.keyFrom;
    let keyTo = settings.keyTo;
    let contentType = settings.contentType;
    let metadata = settings.metadata;

    assertValidKey(keyFrom);
    assertValidKey(keyTo);

    return new Promise((resolve, reject) => {
        s3.copyObject({
            Bucket: APP_AWS_RESOURCES_INFO.S3_BUCKET_NAME,
            CopySource: APP_AWS_RESOURCES_INFO.S3_BUCKET_NAME + '/' + keyFrom,
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
