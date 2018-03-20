"use strict";

const AWS = require('aws-sdk');
const getCredentials = require('../Auth/getCredentials');
const getResourcesInfo = require('../Auth/getResourcesInfo');
const assertValidKey = require('./_assertValidKey');

const APP_RESOURCES_INFO = getResourcesInfo();
const CREDENTIALS = getCredentials();

AWS.config.accessKeyId = CREDENTIALS.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = CREDENTIALS.AWS_SECRET_ACCESS_KEY;
AWS.config.region = APP_RESOURCES_INFO.S3_BUCKET_REGION;

let s3 = new AWS.S3();

const upload = settings => {
    let key = settings.key;
    let dataStream = settings.dataStream;
    let contentType = settings.contentType;
    let metadata = settings.metadata;

    assertValidKey(key);

    return new Promise((resolve, reject) => {
        s3.upload({
            Bucket: APP_RESOURCES_INFO.S3_BUCKET_NAME,
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
