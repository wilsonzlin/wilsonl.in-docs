"use strict";

const fs = require('fs');
const AWS = require('aws-sdk');
const getCredentials = require('../Auth/getCredentials');
const assertValidKey = require('./_assertValidKey');

AWS.config.credentials = getCredentials();
let s3 = new AWS.S3();

const APP_AWS_RESOURCES_INFO = JSON.parse(fs.readFileSync(process.env['HOME'] + '/.aws/wilsonl.in', 'utf8'));

const upload = settings => {
    let key = settings.key;
    let dataStream = settings.dataStream;
    let contentType = settings.contentType;
    let metadata = settings.metadata;

    assertValidKey(key);

    return new Promise((resolve, reject) => {
        s3.upload({
            Bucket: APP_AWS_RESOURCES_INFO.S3_BUCKET_NAME,
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
