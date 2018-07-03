"use strict";

const referenza = require("referenza");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

const FLAG_CLEAN = args.clean;

// All directory paths should have a trailing slash
const PROJECT_DIR = __dirname + "/../";
const SOURCE_DIR = PROJECT_DIR + "src/";
const INTERMEDIATE_DIR = PROJECT_DIR + "tmp/";
const OUTPUT_DIR = PROJECT_DIR + "dist/";

const STATE_PATH = PROJECT_DIR + "compiling/state.json";

const PROJECT_NAMES = ["nanoscript", "zQuery", "nicehash"];
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

  feedback: {
    type: referenza.resources.feedback.type.GITHUB,
    repoOwner: "wilsonzlin",
    repoName: "wilsonl.in-docs",
  },

  logo: "w.l.",

  projects: PROJECT_NAMES,

  prefix: URL_PATH_PREFIX,
})
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
