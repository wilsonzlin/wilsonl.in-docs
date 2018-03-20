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

const copy = settings => {
  let keyFrom = settings.keyFrom;
  let keyTo = settings.keyTo;
  let contentType = settings.contentType;
  let metadata = settings.metadata;

  assertValidKey(keyFrom);
  assertValidKey(keyTo);

  return new Promise((resolve, reject) => {
    s3.copyObject({
      Bucket: APP_RESOURCES_INFO.S3_BUCKET_NAME,
      CopySource: APP_RESOURCES_INFO.S3_BUCKET_NAME + '/' + keyFrom,
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
