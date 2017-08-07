"use strict";

// TODO REFACTOR ALL THE THINGS

const AWS = require('aws-sdk');
const fs = require('fs');
const ReadLine = require('readline');
const ContentType = require('mime-types').contentType;
const Path = require('path');
const Crypto = require('crypto');
const RecursiveReaddir = require('recursive-readdir-sync');

__dirname = __dirname + '/..';

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'wilsonl.in-docs' });
const WLM = JSON.parse(fs.readFileSync(process.env['HOME'] + '/.aws/wilsonl.in', 'utf8'));

let s3 = new AWS.S3();
let cloudFront = new AWS.CloudFront();

function ask(question) {
    return new Promise((resolve, reject) => {
        let r = ReadLine.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        r.question(question, answer => {
            r.close();
            resolve(answer);
        });
    });
}

function upload(settings) {
    return new Promise((resolve, reject) => {
        let key = settings.key;
        let dataStream = settings.dataStream;
        let contentType = settings.contentType;
        let metadata = settings.metadata;

        if (key[0] == '/') {
            reject(SyntaxError("The object key should not begin with a slash"));
            return;
        }

        s3.upload({
            Bucket: WLM.S3_BUCKET_NAME,
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
}

function copy(settings) {
    return new Promise((resolve, reject) => {
        let keyFrom = settings.keyFrom;
        let keyTo = settings.keyTo;
        let contentType = settings.contentType;
        let metadata = settings.metadata;

        if (keyFrom[0] == '/' || keyTo[0] == '/') {
            reject(SyntaxError("The object key should not begin with a slash"));
            return;
        }

        s3.copyObject({
            Bucket: WLM.S3_BUCKET_NAME,
            CopySource: WLM.S3_BUCKET_NAME + '/' + keyFrom,
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
}

function invalidate(keys) {
    return new Promise((resolve, reject) => {
        if (keys.find(key => key[0] != '/') !== undefined) {
            reject(SyntaxError("Invalidation keys must start with a forward slash"));
        }

        cloudFront.createInvalidation({
            DistributionId: WLM.CLOUDFRONT_DISTRIBUTION_ID,
            InvalidationBatch: {
                CallerReference: `${WLM.S3_BUCKET_NAME}_docs_sync-app_${ Date.now() }`,
                Paths: {
                    Quantity: keys.length,
                    Items: keys,
                },
            },
        }, (err, res) => {
            if (err) {
                reject(err);
                return;
            }

            keys.forEach(key => {
                console.log(`Invalidated ${key}`);
            });

            resolve();
        });
    });
}

function deleteMulti(objects) {
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
}

function getMetadata(objectKey) {
    return new Promise((resolve, reject) => {
        if (objectKey[0] == '/') {
            reject(SyntaxError("The object key should not begin with a slash"));
            return;
        }

        s3.headObject({
            Bucket: WLM.S3_BUCKET_NAME,
            Key: objectKey,
        }, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            resolve({ key: objectKey, metadata: data.Metadata });
        });
    });
}

function sha512stream(stream, metadata) {
    return new Promise((resolve, reject) => {
        let hash = Crypto.createHash("sha512");
        let sha512 = "";

        hash.on('readable', () => {
            let data = hash.read();
            if (data) {
                sha512 = data.toString("hex");
            }
        });

        hash.on('finish', () => {
            resolve({ hash: sha512, metadata: metadata });
        });

        hash.on('error', err => {
            reject(err);
        });

        stream.pipe(hash);
    });
}

function main() {
    console.log("======================= COMPILING ====================\n");
    require('../compiling/compile.js');
    console.log("\n=============== COMPILATION FINISHED ===============\n");

    s3.listObjectsV2({
        Bucket: WLM.S3_BUCKET_NAME,
        Prefix: 'docs/',
        MaxKeys: 100000,
    }, (err, data) => {
        if (err) {
            throw err;
        }

        let objectKeys = data.Contents.map(o => o.Key).filter(k => !/\/$/.test(k)); // [ music/index.html, music/lib/ooml.js, ... ]
        let objectHashes = new Map(); // { "music/lib/ooml.js" => F90DDD77E400DFE... }
        let localFileNames = RecursiveReaddir(__dirname + '/dist').map(path => Path.relative(__dirname + '/dist', path));// [ index.html, lib/ooml.js, ... ]
        let localHashes = new Map(); // { "lib/ooml.js" => F90DDD77E400DFE... }

        Promise.all(objectKeys.map(obj => getMetadata(obj)))
            .then(objs => {
                return Promise.all(objs.filter(obj => {
                    if (obj.metadata.sha512) {
                        objectHashes.set(Path.relative('docs/', obj.key), obj.metadata.sha512);
                    } else {
                        return true;
                    }
                }).map(obj => {
                    console.log(obj.key + " does not have a SHA-512 hash, hashing...");

                    return sha512stream(s3.getObject({
                        Bucket: WLM.S3_BUCKET_NAME,
                        Key: obj.key,
                    }).createReadStream(), { key: obj.key });
                }));
            })
            .then(hashes => {
                return Promise.all(hashes.map(hash => {
                    console.log(`Hashed ${hash.metadata.key}: ${hash.hash}`);
                    objectHashes.set(Path.relative('docs/', hash.metadata.key), hash.hash);

                    return copy({
                        keyFrom: hash.metadata.key,
                        keyTo: hash.metadata.key,
                        contentType: ContentType(Path.extname(hash.metadata.key)),
                        metadata: {
                            sha512: hash.hash,
                        },
                    });
                }));
            })
            .then(() => {
                return Promise.all(localFileNames.map(file => sha512stream(fs.createReadStream(`${__dirname}/dist/${file}`), { file: file })));
            })
            .then(hashes => {
                hashes.forEach(hash => {
                    localHashes.set(hash.metadata.file, hash.hash);
                });
            })
            .then(() => {
                let cloudFiles = new Set(objectKeys.map(obj => Path.relative('docs/', obj)));
                let localFiles = new Set(localFileNames);

                let extraCloudFiles = [];
                let missingCloudFiles = [];
                let hashMismatchCloudFiles = [];
                let pathsToInvalidate = [];

                function addS3ObjectToInvalidate(s3key) {
                    let invalidation = '/docs/' + s3key;
                    pathsToInvalidate.push(invalidation);
                    if (/\/index\.html$/.test(invalidation)) {
                        pathsToInvalidate.push(Path.dirname(invalidation));
                        pathsToInvalidate.push(Path.dirname(invalidation) + '/');
                    }
                }

                cloudFiles.forEach(cf => {
                    if (!localFiles.has(cf)) {
                        extraCloudFiles.push(cf);
                        addS3ObjectToInvalidate(cf);
                    }
                });
                localFiles.forEach(lf => {
                    if (!cloudFiles.has(lf)) {
                        missingCloudFiles.push(lf);
                        addS3ObjectToInvalidate(lf);
                    } else {
                        if (localHashes.get(lf) !== objectHashes.get(lf)) {
                            hashMismatchCloudFiles.push(lf);
                            addS3ObjectToInvalidate(lf);
                        }
                    }
                });

                if (!extraCloudFiles.length) {
                    console.log("\nNo extra files");
                } else {
                    console.log(`\nExtra files found on AWS to delete (${extraCloudFiles.length}):\n`);
                    console.log(extraCloudFiles.join('\n'));
                }

                if (!missingCloudFiles.length) {
                    console.log("\nNo missing files");
                } else {
                    console.log(`\nMissing files not found on AWS upload (${missingCloudFiles.length}):\n`);
                    console.log(missingCloudFiles.join('\n'));
                }

                if (!hashMismatchCloudFiles.length) {
                    console.log("\nNo hash mismatch files");
                } else {
                    console.log(`\nFiles with a different hash on AWS upload (${hashMismatchCloudFiles.length}):\n`);
                    console.log(hashMismatchCloudFiles.join('\n'));
                }

                if (!extraCloudFiles.length && !missingCloudFiles.length && !hashMismatchCloudFiles.length) {
                    console.log('\nNothing to do, sync complete');
                    process.exit(0);
                }

                ask('\nAre you sure you want to sync? (y) ')
                    .then(answer => {
                        if (answer.toLocaleLowerCase() != 'y') {
                            console.log("Aborting...");
                            process.exit(1);
                        }
                    })
                    .then(() => {
                        console.log("\n=============== DELETING FILES ===============\n");
                        if (extraCloudFiles.length) {
                            return deleteMulti(extraCloudFiles.map(f => `docs/${f}`));
                        }
                    })
                    .then(() => {
                        console.log("\n=============== UPLOADING FILES ===============\n");
                        return Promise.all(missingCloudFiles.concat(hashMismatchCloudFiles).map(file => {
                            return upload({
                                key: 'docs/' + file,
                                dataStream: fs.createReadStream(__dirname + '/dist/' + file),
                                contentType: ContentType(Path.extname(file)),
                                metadata: {
                                    sha512: localHashes.get(file),
                                },
                            });
                        }));
                    })
                    .then(() => {
                        console.log("\n============== INVALIDATING FILES =============\n");
                        return invalidate(pathsToInvalidate);
                    })
                    .then(() => process.exit(0))
                    .catch(e => {
                        console.error(e);
                        process.exit(1);
                    });
            });
    });
}

main();
