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

const list = settings => {
    assertValidKey(settings.prefix);

    return new Promise((resolve, reject) => {
        s3.listObjectsV2({
            Bucket: APP_RESOURCES_INFO.S3_BUCKET_NAME,
            Prefix: settings.prefix,
            MaxKeys: settings.maxKeys || 100000,
        }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

module.exports = list;
