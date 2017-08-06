"use strict";

const ARTICLE_TYPE_REFERENCE = "reference";
const ARTICLE_TYPE_CONTENT = "content";

const fs = require('fs-extra');
const zc = require('zcompile');
const parseMarkdown = require('./Utils/parseMarkdown');
const parseTypedCodeLine = require('./Utils/parseTypedCodeLine');
const sortOrderPrefixedFilenames = require('./Utils/sortOrderPrefixedFilenames');
const createURLPathComponent = require('./Utils/createURLPathComponent');

const ContentArticle = require('./Views/ContentArticle');
const HeaderDocumentationsListItem = require('./Views/HeaderDocumentationsListItem');
const Page = require('./Views/Page');
const PaneTocCategory = require('./Views/PaneTocCategory');
const PaneTocCategoryEntry = require('./Views/PaneTocCategoryEntry');
const ReferenceArticle = require('./Views/ReferenceArticle');
const ReferenceArticleArgument = require('./Views/ReferenceArticleArgument');
const ReferenceArticleReturn = require('./Views/ReferenceArticleReturn');
const ReferenceArticleSignature = require('./Views/ReferenceArticleSignature');

// All directory paths should have a trailing slash
const PROJECT_DIR = __dirname + '/../';
const SOURCE_DIR = PROJECT_DIR + 'src/';
const INTERMEDIATE_DIR = PROJECT_DIR + 'tmp/';
const OUTPUT_DIR = PROJECT_DIR + 'dist/';

const URL_PATH_PREFIX = '/docs';

const DOCUMENTATION_NAMES = ['ooml', 'zQuery'];
const METADATA_FILE_NAME = '__metadata__.js';

// Ensure clean intermediate and output directories
fs.removeSync(INTERMEDIATE_DIR);
fs.removeSync(OUTPUT_DIR);

let documentations = DOCUMENTATION_NAMES.map(documentationName => {
    let documentationSourceDir = SOURCE_DIR + documentationName + '/';
    let documentationMetadata = require(documentationSourceDir + METADATA_FILE_NAME);
    let documentationLandingArticle = documentationMetadata.landingArticle;
    let documentationCategories = documentationMetadata.categories;

    return Object.freeze({
        name: documentationName,
        landingArticle: Object.freeze(documentationLandingArticle),
        categories: documentationCategories.map(category => {
            let categoryName = category.name;
            let categorySourceDir = documentationSourceDir + categoryName + '/';
            let categoryEntries = category.entries;

            let extraneousFilesInCategorySourceDir = new Set(fs.readdirSync(categorySourceDir));

            let processedEntries = categoryEntries.map(entryName => {
                let entryFilename = entryName + '.md';
                let entryFilePath = categorySourceDir + entryFilename;
                extraneousFilesInCategorySourceDir.delete(entryFilename);

                let stats;
                try {
                    stats = fs.lstatSync(entryFilePath);
                } catch (e) {
                    if (e.code === 'ENOENT') {
                        console.warn(entryFilePath + ' not found, creating...');
                        fs.writeFileSync(entryFilePath, '');
                        stats = fs.lstatSync(entryFilePath);
                    }
                }

                if (stats.isDirectory()) {
                    // If it's a directory, then it's a reference article
                    let entrySourceDir = entryFilePath + '/';

                    let description = fs.readFileSync(entrySourceDir + 'description.txt', 'utf8').trim();

                    let signatures = [];
                    if (fs.existsSync(entrySourceDir + 'signatures')) {
                        signatures = fs.readdirSync(entrySourceDir + 'signatures').filter(p => /\.txt$/.test(p)).sort(sortOrderPrefixedFilenames).map(f => {
                            let code = fs.readFileSync(entrySourceDir + 'signatures/' + f, 'utf8');

                            return Object.freeze({
                                definition: code,
                            });
                        });
                    }

                    let parameters = [];
                    if (fs.existsSync(entrySourceDir + 'arguments')) {
                        parameters = fs.readdirSync(entrySourceDir + 'arguments').filter(p => /\.md/.test(p)).sort(sortOrderPrefixedFilenames).map(f => {
                            let name = f.slice(f.indexOf('.') + 1, f.lastIndexOf('.'));
                            let markdown = fs.readFileSync(entrySourceDir + 'arguments/' + f, 'utf8');

                            return Object.freeze({
                                name: name,
                                definition: markdown,
                            });
                        });
                    }

                    let returns = [];
                    if (fs.existsSync(entrySourceDir + 'returns')) {
                        returns = fs.readdirSync(entrySourceDir + 'returns').filter(p => /\.md/.test(p)).sort(sortOrderPrefixedFilenames).map(f => {
                            let markdown = fs.readFileSync(entrySourceDir + 'returns/' + f, 'utf8');

                            return Object.freeze({
                                definition: markdown,
                            });
                        });
                    }

                    return Object.freeze({
                        name: entryName,
                        type: ARTICLE_TYPE_REFERENCE,
                        description: description,
                        signatures: signatures,
                        parameters: parameters,
                        returns: returns,
                    });

                } else {
                    // Otherwise, it's a content article
                    let content = fs.readFileSync(entryFilePath, 'utf8');

                    return Object.freeze({
                        name: entryName,
                        type: ARTICLE_TYPE_CONTENT,
                        content: content,
                    });
                }
            });

            if (extraneousFilesInCategorySourceDir.size > 0) {
                throw new Error(`Extraneous files in "${ categoryName }": ${ Array.from(extraneousFilesInCategorySourceDir).join(', ') }`);
            }

            return Object.freeze({
                name: categoryName,
                entries: processedEntries,
            });
        }),
    });
});

let generatedHtmlFiles = [];

for (let documentation of documentations) {
    let documentationName = documentation.name;
    let documentationLandingArticle = documentation.landingArticle;
    let documentationCategories = documentation.categories;

    let documentationsListItemsHtml = documentations.map(d => HeaderDocumentationsListItem({
        name: documentationName,
        url: `${ URL_PATH_PREFIX }/${ d }`,
        isActive: documentationName == d,
    })).join('');

    let articlePathsRelToUrlPrefix = Object.create(null);
    for (let category of documentationCategories) {
        let categoryName = category.name;
        let categoryEntries = category.entries;

        if (!articlePathsRelToUrlPrefix[categoryName]) {
            articlePathsRelToUrlPrefix[categoryName] = Object.create(null);
        }

        for (let entry of categoryEntries) {
            let entryName = entry.name;
            articlePathsRelToUrlPrefix[categoryName][entryName] = ['', documentationName, createURLPathComponent(categoryName), createURLPathComponent(entryName), 'index.html'].join('/');
        }
    }

    let documentationLandingArticleCategory = documentationLandingArticle.category;
    let documentationLandingArticleEntry = documentationLandingArticle.entry;

    fs.ensureDirSync(INTERMEDIATE_DIR + documentationName);
    fs.writeFileSync(INTERMEDIATE_DIR + documentationName + '/index.html', `
        <meta http-equiv="refresh" content="0; URL=${ URL_PATH_PREFIX + articlePathsRelToUrlPrefix[documentationLandingArticleCategory][documentationLandingArticleEntry].split('/').slice(0, -1).join('/') }">
    `);
    generatedHtmlFiles.push(documentationName + '/index.html');

    for (let category of documentationCategories) {
        let categoryName = category.name;
        let categoryEntries = category.entries;

        for (let entry of categoryEntries) {
            let entryName = entry.name;
            let entryType = entry.type;

            let articleHtml;

            if (entryType == ARTICLE_TYPE_REFERENCE) {

                let { description, signatures, parameters, returns } = entry;

                let signaturesHtml = signatures.map(s => ReferenceArticleSignature(parseTypedCodeLine(s.definition))).join('');

                let argumentsHtml = parameters.map(p => ReferenceArticleArgument(p.name, parseMarkdown(p.definition, true))).join('');

                let returnsHtml = returns.map(r => ReferenceArticleReturn(parseMarkdown(r.definition, true))).join('');

                articleHtml = ReferenceArticle({
                    category: categoryName,
                    name: entryName,
                    description: description,
                    signaturesHtml: signaturesHtml,
                    argumentsHtml: argumentsHtml,
                    returnsHtml: returnsHtml,
                });

            } else if (entryType == ARTICLE_TYPE_CONTENT) {

                let { content } = entry;

                let contentHtml = parseMarkdown(content, false);

                articleHtml = ContentArticle({
                    category: categoryName,
                    name: entryName,
                    contentHtml: contentHtml,
                });

            } else {
                throw new Error(`Unrecognised article type "${ entryType }"`);
            }

            // Yes, this is inefficient
            let tocCategoriesHtml = "";
            for (let tocCategory of documentationCategories) {
                let tocCategoryName = tocCategory.name;
                let tocCategoryEntries = tocCategory.entries;

                let tocCategoryEntriesHtml = "";

                for (let tocEntry of tocCategoryEntries) {
                    let tocEntryName = tocEntry.name;
                    let tocEntryDescription = tocEntry.description || tocEntryName;
                    let tocArticlePathRelToUrlPrefix = articlePathsRelToUrlPrefix[tocCategoryName][tocEntryName];

                    tocCategoryEntriesHtml += PaneTocCategoryEntry({
                        url: URL_PATH_PREFIX + tocArticlePathRelToUrlPrefix,
                        name: tocEntryName,
                        description: tocEntryDescription,
                        isActive: tocCategoryName == categoryName && entryName == tocEntryName,
                    });
                }

                tocCategoriesHtml += PaneTocCategory(categoryName, tocCategoryEntriesHtml);
            }

            let pageHtml = Page({
                viewportTitle: documentationName,
                documentationsListItemsHtml: documentationsListItemsHtml,
                tocCategoriesHtml: tocCategoriesHtml,
                articleHtml: articleHtml,
            });

            let articlePathRelToUrlPrefix = articlePathsRelToUrlPrefix[categoryName][entryName];

            fs.ensureDirSync(INTERMEDIATE_DIR + articlePathRelToUrlPrefix.split('/').slice(0, -1).join('/'));
            fs.writeFileSync(INTERMEDIATE_DIR + articlePathRelToUrlPrefix, pageHtml);
            generatedHtmlFiles.push(articlePathRelToUrlPrefix);
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

fs.removeSync(INTERMEDIATE_DIR);
