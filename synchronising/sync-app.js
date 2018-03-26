"use strict";

const fs = require('fs');
const ContentType = require('mime-types').contentType;
const Path = require('path');
const RecursiveReaddir = require('recursive-readdir-sync');

const compile = require('../compiling/compile.js');

const ask = require('./Utils/ask');
const hashStream = require('./Utils/hashStream');

const copy = require('./S3/copy');
const getMetadata = require('./S3/getMetadata');
const stream = require('./S3/stream');
const list = require('./S3/list');
const remove = require('./S3/remove');
const upload = require('./S3/upload');
const invalidate = require('./Cloudflare/invalidate');

// Hash used to uniquely identify every file, so that sync can work with 100% accuracy
const APP_FILES_INTEGRITY_HASH = "sha512";
const APP_URL_PATH_PREFIX = 'docs/';

// All path constants should end with a trailing slash
const PROJECT_DIR = __dirname + '/../';
const COMPILED_DIR = PROJECT_DIR + 'dist/';

// Compile app
console.log("======================= COMPILING ====================\n");
compile.start({ FLAG_CLEAN: true });
console.log("\n=============== COMPILATION FINISHED ===============\n");

// Hashes of files in the cloud
let objectHashes = new Map(); // { "music/lib/ooml.js" => F90DDD77E400DFE... }

// Paths of all the files in the cloud
let objectKeys; // [ music/index.html, music/lib/ooml.js, ... ]

// Paths of all the files stored locally (folders not included)
let localFileNames = RecursiveReaddir(COMPILED_DIR).map(path => Path.relative(COMPILED_DIR, path));// [ index.html, lib/ooml.js, ... ]

// Hashes of files stored locally
let localHashes = new Map(); // { "lib/ooml.js" => F90DDD77E400DFE... }

let extraCloudFiles = [];
let missingCloudFiles = [];
let hashMismatchCloudFiles = [];
let pathsToInvalidate = [];

list({
  prefix: APP_URL_PATH_PREFIX,
})
  .then(data => {
    // Get all object keys, including ones that end with a slash (they should not be there)
    objectKeys = data.Contents.map(o => o.Key);

    return Promise.all(objectKeys.map(obj => getMetadata(obj)));
  })
  .then(objs => {
    return Promise.all(objs.filter(obj => {
      if (obj.metadata.sha512) {
        // If cloud file already has hash, get hash
        objectHashes.set(Path.relative(APP_URL_PATH_PREFIX, obj.key), obj.metadata.sha512);
      } else {
        return true;
      }
    }).map(obj => {
      console.log(obj.key + " does not have a SHA-512 hash, hashing...");

      // Get hash of file in the cloud
      return hashStream(APP_FILES_INTEGRITY_HASH, stream(obj.key), { key: obj.key });
    }));
  })
  .then(hashes => {
    return Promise.all(hashes.map(({ metadata, hash }) => {
      console.log(`Hashed ${metadata.key}: ${hash}`);
      objectHashes.set(Path.relative(APP_URL_PATH_PREFIX, metadata.key), hash);

      return copy({
        keyFrom: metadata.key,
        keyTo: metadata.key,
        contentType: ContentType(Path.extname(metadata.key)) || 'application/octet-stream',
        metadata: {
          sha512: hash,
        },
      });
    }));
  })
  .then(() => {
    // Get hashes of all local files
    return Promise.all(localFileNames.map(file => hashStream(APP_FILES_INTEGRITY_HASH, fs.createReadStream(COMPILED_DIR + file), { file: file })));
  })
  .then(hashes => {
    hashes.forEach(({ metadata, hash }) => {
      localHashes.set(metadata.file, hash);
    });
  })
  .then(() => {
    let cloudFiles = new Set(objectKeys.map(obj => Path.relative(APP_URL_PATH_PREFIX, obj)));
    let localFiles = new Set(localFileNames);

    function addS3ObjectToInvalidate(s3key) {
      let invalidation = '/' + APP_URL_PATH_PREFIX + s3key;
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
      // WARNING: Script exits here
      process.exit(0);
    }

    return ask('\nAre you sure you want to sync? (y) ');
  })
  .then(answer => {
    if (answer.toLocaleLowerCase() != 'y') {
      throw new Error("User cancelled process");
    }
  })
  .then(() => {
    console.log("\n=============== DELETING FILES ===============\n");
    if (extraCloudFiles.length) {
      return remove(...extraCloudFiles.map(f => APP_URL_PATH_PREFIX + f));
    }
  })
  .then(() => {
    console.log("\n=============== UPLOADING FILES ===============\n");
    return Promise.all(missingCloudFiles.concat(hashMismatchCloudFiles).map(file => {
      return upload({
        key: APP_URL_PATH_PREFIX + file,
        dataStream: fs.createReadStream(COMPILED_DIR + file),
        contentType: ContentType(Path.extname(file)),
        metadata: {
          sha512: localHashes.get(file),
        },
      });
    }));
  })
  .then(() => {
    console.log("\n============== INVALIDATING FILES =============\n");
    return invalidate(...pathsToInvalidate);
  })
  // BUGFIX: Sometimes IntelliJ Node.js runner doesn't detect script ending
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
