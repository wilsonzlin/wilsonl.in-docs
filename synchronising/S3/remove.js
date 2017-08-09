"use strict";

const assertValidKey = require('./_assertValidKey');

// Can't call this "delete" -- thanks JavaScript
const remove = (...objects) => {
    objects.forEach(key => assertValidKey(key));

    return new Promise((resolve, reject) => {
        s3.deleteObjects({
            Bucket: WLM.S3_BUCKET_NAME,
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
                console.log(`Failed to delete ${obj.Key}: ${obj.Message}`);
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
