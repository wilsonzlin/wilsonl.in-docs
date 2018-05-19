"use strict";

const referenza = require("referenza");

const FLAG_CLEAN = process.argv.slice(2).includes("clean");

// All directory paths should have a trailing slash
const PROJECT_DIR = __dirname + "/../";
const SOURCE_DIR = PROJECT_DIR + "src/";
const INTERMEDIATE_DIR = PROJECT_DIR + "tmp/";
const OUTPUT_DIR = PROJECT_DIR + "dist/";

const STATE_PATH = PROJECT_DIR + "compiling/state.json";

const PROJECT_NAMES = ["ooml", "nanoscript", "zQuery", "zc"];
const METADATA_FILE_NAME = "__metadata__.js";

// URL path prefix should not have trailing slash,
// as all urlDirPath values have leading slash
const URL_PATH_PREFIX = "/docs";

referenza.compile({
  clean: FLAG_CLEAN,

  sourceDir: SOURCE_DIR,
  intermediateDir: INTERMEDIATE_DIR,
  outputDir: OUTPUT_DIR,

  statePath: STATE_PATH,

  metadataFileName: METADATA_FILE_NAME,

  projectNames: PROJECT_NAMES,

  urlPathPrefix: URL_PATH_PREFIX,
});
