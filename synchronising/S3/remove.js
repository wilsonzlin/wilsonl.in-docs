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

// Can't call this "delete" -- thanks JavaScript
const remove = (...objects) => {
    objects.forEach(key => assertValidKey(key));

    return new Promise((resolve, reject) => {
        s3.deleteObjects({
            Bucket: APP_RESOURCES_INFO.S3_BUCKET_NAME,
            Delete: {
                Objects: objects.map(o => ({ Key: o })),
            },
        }, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            data.Deleted.forEach(obj => {
                console.log(`Deleted ${obj.Key}`);
            });

            data.Errors.forEach(obj => {
                console.log(`Failed to delete ${ obj.Key }: ${ obj.Message }`);
            });

            if (data.Errors.length) {
                reject(Error("Some files failed to delete"));
            } else {
                resolve();
            }
        })
    });
};

module.exports = remove;
