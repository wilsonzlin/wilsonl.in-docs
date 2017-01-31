const AWS = require('aws-sdk');
const ContentType = require('mime-types').contentType;
const fs = require('fs-extra');
const Path = require('path');
const recursiveReaddirSync = require('recursive-readdir-sync');

const ARGS = process.argv.slice(2);
const FLAG_FULL = ARGS.includes('full');

console.log(`Compiling...\n`);
require('./compile.js');

let credentials = new AWS.SharedIniFileCredentials({ profile: 'wilsonl.in-docs' });
AWS.config.credentials = credentials;

let s3 = new AWS.S3();
let cloudFront = new AWS.CloudFront();

let files = FLAG_FULL ? recursiveReaddirSync(__dirname + '/dist').map(path => Path.relative(__dirname + '/dist', path)) : [
    'index.css',
    'index.html',
    'app/app.css',
    'app/app.html',
    'app/app.js',
];

if (FLAG_FULL) {
    console.log(`\nDeleting folder "docs/" from S3...\n`);
    s3.listObjectsV2({
        Bucket: 'wilsonl.in',
        Prefix: 'docs/',
    }, (err, data) => {
        if (err) {
            throw err;
        }

        let filesDeleted = 0;

        data.Contents.forEach(obj => {
            let fileToDelete = obj.Key;
            console.log(`Deleting ${ fileToDelete }...`);

            s3.deleteObject({
                Bucket: 'wilsonl.in',
                Key: fileToDelete,
            }, err => {
                if (err) {
                    throw err;
                }
                if (++filesDeleted === data.Contents.length) {
                    start();
                }
            });
        });
    });
} else {
    start();
}

function start() {

    console.log('\n=============== STARTING UPLOAD ===============\n');
    let uploadedCount = 0;

    files.forEach(file => {
        let path = __dirname + '/dist/' + file;
        let stream = fs.createReadStream(path);

        s3.upload({
            Bucket: 'wilsonl.in',
            Key: 'docs/' + file,
            Body: stream,
            ContentType: ContentType(Path.extname(file)),
        }, (err, res) => {
            if (err) throw err;

            console.log(`Uploaded ${file}`);

            uploadedCount++;

            if (uploadedCount == files.length) {

                console.log('\n=============== STARTING INVALIDATION ===============\n');

                let invalidations = files.map(file => `/docs/${ file }`);
                invalidations.slice().forEach(path => {
                    if (/index\.html$/.test(path)) {
                        let baseFolder = path.split('/').slice(0, -1).join('/');
                        invalidations.push(baseFolder);
                        invalidations.push(baseFolder + '/');
                    }
                });

                cloudFront.createInvalidation({
                    DistributionId: 'E16E493DYHVW0H',
                    InvalidationBatch: {
                        CallerReference: `wilsonl.in/docs_${ Date.now() }`,
                        Paths: {
                            Quantity: invalidations.length,
                            Items: invalidations,
                        },
                    },
                }, (err, res) => {
                    if (err) throw err;

                    console.log(`Done!`);
                    console.log([
                        `\n=============== INVALIDATIONS ===============\n`,
                        ...invalidations
                    ].join('\n   - '));
                });
            }
        });
    });

}
