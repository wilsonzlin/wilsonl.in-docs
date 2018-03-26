"use strict";

const ARTICLE_TYPE_REFERENCE = "reference";
const ARTICLE_TYPE_CONTENT = "content";

// All directory paths should have a trailing slash
const PROJECT_DIR = __dirname + '/../';
const SOURCE_DIR = PROJECT_DIR + 'src/';
const INTERMEDIATE_DIR = PROJECT_DIR + 'tmp/';
const OUTPUT_DIR = PROJECT_DIR + 'dist/';

const STATE_PATH = PROJECT_DIR + 'compiling/state.json';
const STATE_LOCK_PATH = PROJECT_DIR + 'compiling/state.json.lock';

// URL path prefix should not have trailing slash,
// as all urlDirPath values have leading slash
const URL_PATH_PREFIX = '/docs';

const PROJECT_NAMES = ['ooml', 'nanoscript', 'zQuery'];
const METADATA_FILE_NAME = '__metadata__.js';

module.exports = Object.freeze({
  ARTICLE_TYPE_REFERENCE,
  ARTICLE_TYPE_CONTENT,

  PROJECT_DIR,
  SOURCE_DIR,
  INTERMEDIATE_DIR,
  OUTPUT_DIR,

  STATE_PATH,
  STATE_LOCK_PATH,

  URL_PATH_PREFIX,

  PROJECT_NAMES,
  METADATA_FILE_NAME,
});
