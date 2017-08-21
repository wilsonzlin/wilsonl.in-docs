"use strict";

const fs = require('fs-extra');
const zc = require('zcompile');
const parseMarkdown = require('./Utils/parseMarkdown');
const parseTypedCodeLine = require('./Utils/parseTypedCodeLine');
const loadDocumentation = require('./Utils/loadDocumentation');

const ContentArticle = require('./Views/ContentArticle');
const HeaderDocumentationsListItem = require('./Views/HeaderDocumentationsListItem');
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

    DOCUMENTATION_NAMES,

    ARTICLE_TYPE_CONTENT,
    ARTICLE_TYPE_REFERENCE,

    URL_PATH_PREFIX,

} = require('./constants');

// Ensure clean intermediate and output directories
fs.removeSync(INTERMEDIATE_DIR);
fs.removeSync(OUTPUT_DIR);

let generatedHtmlFiles = [];
let redirects = [];

for (let documentationName of DOCUMENTATION_NAMES) {
    let versions = loadDocumentation(documentationName);

    // Regenerate the documentations list for every documentation name, as isActive changes each time
    let documentationsListItemsHtml = DOCUMENTATION_NAMES.map(d => HeaderDocumentationsListItem({
        name: d,
        // TODO Refactor so that it gets proper path for Documentation.urlDirPath
        url: URL_PATH_PREFIX + '/' + d,
        isActive: documentationName === d,
    })).join('');

    for (let doc of versions) {

        // Called when a link in a documentation is an internal one
        let internalLinkCallback = id => {

            for (let article of doc.articles) {
                if (article.name === id) {
                    return URL_PATH_PREFIX + article.urlDirPath;
                }
            }

            if (!category) {
                throw new ReferenceError(`Non-existent internal link reference "${ id }"`);
            }
        };

        let landingArticle = doc.getLandingArticle();

        // Add redirect from "/ooml/14/1" to "/ooml/14/1/Introduction/Welcome"
        redirects.push({
            from: doc.urlDirPath,
            to: landingArticle.urlDirPath,
            // Make it so that "/ooml/14/1" and "/ooml/14/1/" both redirect
            coverAllTrailingSlashes: true,
        });

        for (let article of doc.articles) {

            // Regenerate the table of contents for every article, as isActive changes every time
            let tocCategoriesHtml = "";

            for (let tocCategoryName of doc.orderOfCategories) {
                let tocCategoryEntriesHtml = "";

                for (let tocEntry of doc.articlesByCategory.get(tocCategoryName)) {
                    let tocEntryName = tocEntry.name;
                    let tocEntryDescription = tocEntry.description || tocEntryName;
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
                    description: description,
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

                throw new Error(`Unrecognised article type "${ entryType }"`);

            }

            let pageHtml = Page({
                url: URL_PATH_PREFIX + article.urlDirPath,
                viewportTitle: `${ article.name } | ${ documentationName }`,
                documentationsListItemsHtml: documentationsListItemsHtml,
                tocCategoriesHtml: tocCategoriesHtml,
                articleHtml: articleHtml,
            });

            let articleUrlFilePath = article.urlDirPath + '/index.html';

            fs.ensureDirSync(INTERMEDIATE_DIR + article.urlDirPath);
            fs.writeFileSync(INTERMEDIATE_DIR + articleUrlFilePath, pageHtml);
            generatedHtmlFiles.push(articleUrlFilePath);

        }
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

fs.writeJsonSync(OUTPUT_DIR + 'redirects.json', redirects);

fs.removeSync(INTERMEDIATE_DIR);
