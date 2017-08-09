"use strict";

const fs = require('fs');
const AWS = require('aws-sdk');
const getCredentials = require('../Auth/getCredentials');
const assertValidKey = require('./_assertValidKey');

AWS.config.credentials = getCredentials();
let s3 = new AWS.S3();

const APP_AWS_RESOURCES_INFO = JSON.parse(fs.readFileSync(process.env['HOME'] + '/.aws/wilsonl.in', 'utf8'));

// Can't call this "delete" -- thanks JavaScript
const remove = (...objects) => {
    objects.forEach(key => assertValidKey(key));

    return new Promise((resolve, reject) => {
        s3.deleteObjects({
            Bucket: APP_AWS_RESOURCES_INFO.S3_BUCKET_NAME,
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
