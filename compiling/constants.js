"use strict";

const ARTICLE_TYPE_REFERENCE = "reference";
const ARTICLE_TYPE_CONTENT = "content";

// All directory paths should have a trailing slash
const PROJECT_DIR = __dirname + '/../';
const SOURCE_DIR = PROJECT_DIR + 'src/';
const INTERMEDIATE_DIR = PROJECT_DIR + 'tmp/';
const OUTPUT_DIR = PROJECT_DIR + 'dist/';

const URL_PATH_PREFIX = '/docs';

const DOCUMENTATION_NAMES = ['ooml', 'zQuery'];
const METADATA_FILE_NAME = '__metadata__.js';

module.exports = Object.freeze({
    ARTICLE_TYPE_REFERENCE,
    ARTICLE_TYPE_CONTENT,

    PROJECT_DIR,
    SOURCE_DIR,
    INTERMEDIATE_DIR,
    OUTPUT_DIR,

    URL_PATH_PREFIX,

    DOCUMENTATION_NAMES,
    METADATA_FILE_NAME,
});
