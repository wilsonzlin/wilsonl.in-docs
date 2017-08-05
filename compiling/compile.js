"use strict";

const fs = require('fs-extra');
const zc = require('zcompile');
const escapeHTML = require('./Utils/escapeHTML');
const parseMarkdown = require('./Utils/parseMarkdown');
const parseTypedCodeLine = require('./Utils/parseTypedCodeLine');
const sortOrderPrefixedFilenames = require('./Utils/sortOrderPrefixedFilenames');

const HeaderListing = require('./Views/HeaderListing');
const ReferenceArticle = require('./Views/ReferenceArticle');
const ContentArticle = require('./Views/ContentArticle');
const PaneTocCategory = require('./Views/PaneTocCategory');

// All directory paths should have a trailing slash
const PROJECT_DIR = __dirname + '/../';
const SOURCE_DIR = PROJECT_DIR + 'src/';
const OUTPUT_DIR = PROJECT_DIR + 'dist/';

const DOCUMENTATION_LISTINGS = ['ooml', 'zQuery'];
const METADATA_FILE_NAME = '__metadata__.js';

// Ensure clean output directory
fs.removeSync(OUTPUT_DIR);

let listingsViewHtml = DOCUMENTATION_LISTINGS.map(f => HeaderListing(f)).join("");
let generatedHtmlFiles = [];

for (let listing of DOCUMENTATION_LISTINGS) {
    let documentationSourceDir = SOURCE_DIR + listing + '/';
    let categories = require(documentationSourceDir + METADATA_FILE_NAME);
    let categoriesHtml = "";

    let lastUsedArticleId = 0;

    for (let category of categories) {
        let categoryName = category.name;
        let categorySourceDir = documentationSourceDir + categoryName + '/';
        let categoryFiles = new Set(fs.readdirSync(categorySourceDir));

        let categoryEntries = category.entries.map(entry => {
            let entryFilename = `${entry}.md`;
            let entryFilePath = categorySourceDir + entryFilename;
            categoryFiles.delete(entryFilename);

            let articleHtml;
            let articleId = ++lastUsedArticleId;
            let ret;

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
                // If it's a directory, then it's a reference
                let entrySourceDir = entryFilePath + '/';

                let versions = fs.readFileSync(entrySourceDir + 'versions.txt', 'utf8').trim();
                let description = fs.readFileSync(entrySourceDir + 'description.txt', 'utf8').trim();

                let signatures;
                if (fs.existsSync(entrySourceDir + 'signatures')) {
                    signatures = fs.readdirSync(entrySourceDir + 'signatures').filter(p => /\.txt$/.test(p)).sort(sortOrderPrefixedFilenames).map(f => {
                        let code = fs.readFileSync(entrySourceDir + 'signatures/' + f, 'utf8');

                        return { html: parseTypedCodeLine(code) };
                    });
                }

                let args;
                if (fs.existsSync(entrySourceDir + 'arguments')) {
                    args = fs.readdirSync(entrySourceDir + 'arguments').filter(p => /\.md/.test(p)).sort(sortOrderPrefixedFilenames).map(f => {
                        let name = f.slice(f.indexOf('.') + 1, f.lastIndexOf('.'));
                        let markdown = fs.readFileSync(entrySourceDir + 'arguments/' + f, 'utf8');

                        return { name: name, html: parseMarkdown(markdown, true) };
                    });
                }

                let returns;
                if (fs.existsSync(entrySourceDir + 'returns')) {
                    returns = fs.readdirSync(entrySourceDir + 'returns').filter(p => /\.md/.test(p)).sort(sortOrderPrefixedFilenames).map(f => {
                        let markdown = fs.readFileSync(entrySourceDir + 'returns/' + f, 'utf8');

                        return { html: parseMarkdown(markdown, true) };
                    });
                }

                articleHtml = ReferenceArticle(categoryName, entry, versions, description, signatures, args, returns);

                ret = { id: articleId, name: entry, description: description };

            } else {
                // Otherwise, it's a content article
                let contentHtml = parseMarkdown(fs.readFileSync(entryFilePath, 'utf8'));

                articleHtml = ContentArticle(categoryName, entry, "", contentHtml);

                ret = { id: articleId, name: entry, description: entry };
            }

            fs.writeFileSync(documentationSourceDir + articleId + '.html', articleHtml);
            generatedHtmlFiles.push(`${ listing }/${ articleId }.html`);
            return ret;
        });

        if (categoryFiles.size > 0) {
            throw new Error(`Extraneous files in "${ categoryName }": ${ Array.from(categoryFiles).join(', ') }`);
        }

        categoriesHtml += PaneTocCategory(categoryName, categoryEntries);
    }

    fs.writeFileSync(documentationSourceDir + 'index.html', fs.readFileSync(SOURCE_DIR + '__zc_common__/index.html', 'utf8')
        .replace(/\{\{ *viewportTitle *\}\}/g, escapeHTML(listing))
        .replace(/\{\{ *headerListings *\}\}/g, listingsViewHtml)
        .replace(/\{\{ *tocCategories *\}\}/g, categoriesHtml)
    );
    generatedHtmlFiles.push(listing + '/index.html');
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
        '_common/article.css',
    ].concat(generatedHtmlFiles),
});

generatedHtmlFiles.forEach(p => fs.removeSync(SOURCE_DIR + p));
