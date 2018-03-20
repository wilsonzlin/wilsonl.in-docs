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

const getMetadata = objectKey => {
    assertValidKey(objectKey);

    return new Promise((resolve, reject) => {
        s3.headObject({
            Bucket: APP_RESOURCES_INFO.S3_BUCKET_NAME,
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
