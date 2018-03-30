"use strict";

const fs = require('fs-extra');
const zc = require('zcompile');
const parseMarkdown = require('./Utils/parseMarkdown');
const parseTypedCodeLine = require('./Utils/parseTypedCodeLine');
const loadDocumentation = require('./Utils/loadDocumentation');
const createURLPathComponent = require('./Utils/createURLPathComponent');
const createRedirectHTML = require('./Utils/createRedirectHTML');

const StateSession = require('./State/StateSession');

const ContentArticle = require('./Views/ContentArticle');
const HeaderProjectsListItem = require('./Views/HeaderProjectsListItem');
const Page = require('./Views/Page');
const PaneTocCategory = require('./Views/PaneTocCategory');
const PaneTocCategoryEntry = require('./Views/PaneTocCategoryEntry');
const ReferenceArticle = require('./Views/ReferenceArticle');
const ReferenceArticleArgument = require('./Views/ReferenceArticleArgument');
const ReferenceArticleReturn = require('./Views/ReferenceArticleReturn');
const ReferenceArticleSignature = require('./Views/ReferenceArticleSignature');

const {

  SOURCE_DIR,
  INTERMEDIATE_DIR,
  OUTPUT_DIR,

  STATE_PATH,

  PROJECT_NAMES,

  ARTICLE_TYPE_CONTENT,
  ARTICLE_TYPE_REFERENCE,

  URL_PATH_PREFIX,

} = require('./constants');

const start = ({ FLAG_CLEAN }) => {

  // Ensure clean intermediate directory
  // WARNING: Don't erase output directory if not FLAG_CLEAN, otherwise state is lost
  fs.removeSync(INTERMEDIATE_DIR);
  if (FLAG_CLEAN) {
    console.warn(`====================== CLEAN COMPILE ======================`);
    fs.writeFileSync(STATE_PATH, '{}');
    fs.removeSync(OUTPUT_DIR);
  }

  let generatedHtmlFiles = [];
  let redirects = [];

  for (let projectName of PROJECT_NAMES) {

    let stateSession = new StateSession();

    try {

      let versions = loadDocumentation(projectName, stateSession);
      let latestVersionDoc = Array.from(versions).sort((a, b) => {
        if (a.major < b.major) {
          return -1;
        }
        if (a.major === b.major) {
          if (a.minor < b.minor) {
            return -1;
          }
          if (a.minor === b.minor) {
            return 0;
          }
        }
        return 1;
      }).pop();

      // Redirect from "/ooml" to "/ooml/14/1"
      redirects.push({
        from: '/' + createURLPathComponent(projectName),
        to: latestVersionDoc.urlDirPath,
      });

      // Regenerate the projects list for every project name, as isActive changes each time
      let documentationsListItemsHtml = PROJECT_NAMES.map(d => HeaderProjectsListItem({
        name: d,
        url: URL_PATH_PREFIX + '/' + createURLPathComponent(d) + '/',
        isActive: projectName === d,
      })).join('');

      for (let doc of versions) {

        // Called when a link in a documentation is an internal one
        let internalLinkCallback = id => {
          let match;

          for (let article of doc.articles) {
            if (article.name === id) {
              return URL_PATH_PREFIX + article.urlDirPath;
            }
          }

          throw new ReferenceError(`Non-existent internal link reference "${id}"`);
        };

        let landingArticle = doc.getLandingArticle();

        // Add redirect from "/ooml/14/1" to "/ooml/14/1/Introduction/Welcome"
        redirects.push({
          from: doc.urlDirPath,
          to: landingArticle.urlDirPath,
        });

        for (let article of doc.articles) {

          if (article.stateChanged) {
            // Regenerate the table of contents for every article, as isActive changes every time
            let tocCategoriesHtml = "";

            for (let tocCategoryName of doc.orderOfCategories) {
              let tocCategoryEntriesHtml = "";

              for (let tocEntry of doc.articlesByCategory.get(tocCategoryName)) {
                let tocEntryName = tocEntry.name;
                let tocEntryDescription = tocEntry.description || "";
                let tocArticlePathRelToUrlPrefix = tocEntry.urlDirPath;

                tocCategoryEntriesHtml += PaneTocCategoryEntry({
                  url: URL_PATH_PREFIX + tocArticlePathRelToUrlPrefix,
                  name: tocEntryName,
                  description: tocEntryDescription,
                  isActive: tocCategoryName == article.category && article.name == tocEntryName,
                });
              }

              tocCategoriesHtml += PaneTocCategory(tocCategoryName, tocCategoryEntriesHtml);
            }

            let articleHtml;

            if (article.type == ARTICLE_TYPE_REFERENCE) {

              let signaturesHtml = article.signatures.map(s => ReferenceArticleSignature(parseTypedCodeLine(s.definition))).join('');

              let argumentsHtml = article.parameters.map(p => ReferenceArticleArgument(p.name, parseMarkdown(p.definition, true, internalLinkCallback))).join('');

              let returnsHtml = article.returns.map(r => ReferenceArticleReturn(parseMarkdown(r.definition, true, internalLinkCallback))).join('');

              articleHtml = ReferenceArticle({
                category: article.category,
                name: article.name,
                description: article.description,
                signaturesHtml: signaturesHtml,
                argumentsHtml: argumentsHtml,
                returnsHtml: returnsHtml,
              });

            } else if (article.type == ARTICLE_TYPE_CONTENT) {

              let contentHtml = parseMarkdown(article.content, false, internalLinkCallback);

              articleHtml = ContentArticle({
                category: article.category,
                name: article.name,
                contentHtml: contentHtml,
              });

            } else {

              throw new Error(`Unrecognised article type "${entryType}"`);

            }

            let pageHtml = Page({
              url: URL_PATH_PREFIX + article.urlDirPath,
              viewportTitle: `${article.name} | ${projectName}`,
              documentationsListItemsHtml: documentationsListItemsHtml,
              tocCategoriesHtml: tocCategoriesHtml,
              articleHtml: articleHtml,
            });

            let articleUrlFilePath = article.urlDirPath + 'index.html';

            fs.ensureDirSync(INTERMEDIATE_DIR + article.urlDirPath);
            fs.writeFileSync(INTERMEDIATE_DIR + articleUrlFilePath, pageHtml);
            generatedHtmlFiles.push(articleUrlFilePath);

          }

        }
      }

      stateSession.end(true);

    } catch (e) {

      stateSession.end(false);
      throw e;

    }

  }

  zc({
    source: SOURCE_DIR,
    destination: OUTPUT_DIR,

    minifySelectors: false,
    minifyHTML: {
      minifyInlineCSS: true,
      minifyInlineJS: true,
    },
    files: [
      'index.html',
      '_common/app.css',
      '_common/app.noscript.css',
      '_common/app.js',
    ],
  });

  if (generatedHtmlFiles.length) {
    zc({
      source: INTERMEDIATE_DIR,
      destination: OUTPUT_DIR,

      minifySelectors: false,
      minifyHTML: {
        minifyInlineCSS: true,
        minifyInlineJS: true,
      },
      files: generatedHtmlFiles,
    });
  }

  for (let redirect of redirects) {
    let { from, to } = redirect;

    let from_noslash = from.replace(/\/+$/, "");
    let from_slash = from_noslash + '/';
    let to_noslash = to.replace(/\/+$/, "");
    let to_slash = to_noslash + '/';

    fs.outputFileSync(OUTPUT_DIR + from_slash + 'index.html', createRedirectHTML(URL_PATH_PREFIX + to_slash));
  }

  fs.removeSync(INTERMEDIATE_DIR);

}

if (!module.parent) {
  let args = process.argv.slice(2);

  start({
    FLAG_CLEAN: args.includes("clean"),
  });
} else {
  module.exports = {
    start,
  };
}
