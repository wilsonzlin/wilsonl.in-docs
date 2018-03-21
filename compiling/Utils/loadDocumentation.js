"use strict";

const fs = require('fs-extra');
const sortNumerically = require('./sortNumerically');
const sortOrderPrefixedFilenames = require('./sortOrderPrefixedFilenames');
const createURLPathComponent = require('./createURLPathComponent');
const nullableStat = require('./nullableStat');
const nullableReaddir = require('./nullableReaddir');

const {

  ARTICLE_TYPE_CONTENT,
  ARTICLE_TYPE_REFERENCE,

  SOURCE_DIR,

  METADATA_FILE_NAME,

} = require('../constants');

class ReferenceArticleSignature {
  constructor(definition) {
    this.definition = definition;

    Object.freeze(this);
  }
}

class ReferenceArticleParameter {
  constructor(name, definition) {
    this.name = name;
    this.definition = definition;

    Object.freeze(this);
  }
}

class ReferenceArticleReturn {
  constructor(definition) {
    this.definition = definition;

    Object.freeze(this);
  }
}

class Article {
  constructor(type, documentation, category, name) {
    if (Object.getPrototypeOf(this) === Article.prototype) {
      throw new Error(`Article is an abstract class`);
    }

    this.type = type;
    this.documentation = documentation;
    this.category = category;
    this.name = name;

    let pathComponents = [category, name];
    // urlDirPath must have trailing slash, as S3 Website will redirect no-trailing-slash to trailing-slash
    this.urlDirPath = documentation.urlDirPath + pathComponents.map(createURLPathComponent).join('/') + '/';
  }
}

class ReferenceArticle extends Article {
  constructor(documentation, category, name) {
    super(ARTICLE_TYPE_REFERENCE, documentation, category, name);

    this.description = undefined;
    this.signatures = [];
    this.parameters = [];
    this.returns = [];

    Object.seal(this);
  }

  addSignature(signature) {
    this.signatures.push(signature);
  }

  addParameter(parameter) {
    this.parameters.push(parameter);
  }

  addReturn(ret) {
    this.returns.push(ret);
  }
}

class ContentArticle extends Article {
  constructor(documentation, category, name) {
    super(ARTICLE_TYPE_CONTENT, documentation, category, name);

    this.content = undefined;

    Object.seal(this);
  }
}

class Documentation {
  constructor(name, major, minor) {
    this.name = name;
    this.major = major;
    this.minor = minor;

    this.orderOfCategories = undefined;
    this.articlesByCategory = new Map();

    this.articles = new Set();
    // urlDirPath must have trailing slash, as S3 Website will redirect no-trailing-slash to trailing-slash
    this.urlDirPath = '/' + [name, major, minor].map(createURLPathComponent).join('/') + '/';

    Object.seal(this);
  }

  setCategories(orderOfCategories) {
    if (!Array.isArray(orderOfCategories) || orderOfCategories.length < 1) {
      throw new TypeError(`Invalid categories array`);
    }

    this.orderOfCategories = orderOfCategories.slice();
    orderOfCategories.forEach(category => {
      this.articlesByCategory.set(category, []);
    });
  }

  addArticle(article) {
    if (this.orderOfCategories === undefined) {
      throw new Error(`Categories has not been set yet`);
    }

    let category = article.category;
    if (!this.articlesByCategory.has(category)) {
      throw new ReferenceError(`The "${category}" category does not exist`);
    }

    this.articles.add(article);
    this.articlesByCategory.get(category).push(article);
  }

  getLandingArticle() {
    let firstCategory = this.orderOfCategories[0];
    return this.articlesByCategory.get(firstCategory)[0];
  }
}

const loadDocumentation = (documentationName) => {
  let documentationSourceDir = SOURCE_DIR + documentationName + '/';
  let documentationCommonSourceDir = documentationSourceDir + '_common/';

  let versions = new Set();

  let majorNumbers = fs.readdirSync(documentationSourceDir).map(v => Number.parseInt(v, 10)).filter(v => !Number.isNaN(v)).sort(sortNumerically);

  majorNumbers.forEach(majorNumber => {
    let majorSourceDir = documentationSourceDir + majorNumber + '/';
    let majorCommonSourceDir = majorSourceDir + '_common/';

    let minorVersions = fs.readdirSync(majorSourceDir).map(v => Number.parseInt(v, 10)).sort(sortNumerically);

    minorVersions.forEach(minorNumber => {
      let minorSourceDir = majorSourceDir + minorNumber + '/';

      let doc = new Documentation(documentationName, majorNumber, minorNumber);
      versions.add(doc);

      let metadata = require(minorSourceDir + METADATA_FILE_NAME);

      let orderOfCategories = metadata.categories.map(c => c.name);
      doc.setCategories(orderOfCategories);

      let substituteVariables = content => {
        return content
          .replace(/<VAR\[([A-Z0-9\-_]+)\]>/g, (_, variableName) => {
            switch (variableName) {
              case "VERSION-MAJOR":
                return majorNumber;

              case "VERSION-MINOR":
                return minorNumber;

              default:
                throw new ReferenceError(`Unrecognised variable "${variableName}"`);
            }
          });
      };

      metadata.categories.forEach(categoryMetadata => {
        let categoryName = categoryMetadata.name;
        let categorySourceDir = minorSourceDir + categoryName + '/';

        let categoryEntriesMetadata = categoryMetadata.entries;

        let extraneousFilesInCategorySourceDir = new Set(nullableReaddir(categorySourceDir));

        categoryEntriesMetadata.forEach(entryName => {

          let entryFSName = entryName + '.md';
          let originalEntryFSPath = categorySourceDir + entryFSName;
          let entryFSPath = originalEntryFSPath;
          let stats;

          extraneousFilesInCategorySourceDir.delete(entryFSName);

          stats = nullableStat(originalEntryFSPath);
          if (!stats) {
            // Look in common directory for major version
            entryFSPath = `${majorCommonSourceDir}${categoryName}/${entryFSName}`;
            stats = nullableStat(entryFSPath);
          }
          if (!stats) {
            // Look in common directory for documentation
            entryFSPath = `${documentationCommonSourceDir}${categoryName}/${entryFSName}`;
            stats = nullableStat(entryFSPath);
          }
          if (!stats) {
            entryFSPath = originalEntryFSPath;
            throw new ReferenceError(`${entryFSPath} not found`);
          }

          let article;

          if (stats.isDirectory()) {
            // If it's a directory, then it's a reference article
            let entrySourceDir = entryFSPath + '/';

            article = new ReferenceArticle(doc, categoryName, entryName);

            article.description = fs.readFileSync(entrySourceDir + 'description.txt', 'utf8').trim();

            if (fs.existsSync(entrySourceDir + 'signatures')) {
              fs.readdirSync(entrySourceDir + 'signatures').filter(p => /\.txt$/.test(p)).sort(sortOrderPrefixedFilenames).forEach(f => {
                let code = fs.readFileSync(entrySourceDir + 'signatures/' + f, 'utf8');

                article.addSignature(new ReferenceArticleSignature(code));
              });
            }

            if (fs.existsSync(entrySourceDir + 'arguments')) {
              fs.readdirSync(entrySourceDir + 'arguments').filter(p => /\.md/.test(p)).sort(sortOrderPrefixedFilenames).forEach(f => {
                let name = f.slice(f.indexOf('.') + 1, f.lastIndexOf('.'));
                let markdown = fs.readFileSync(entrySourceDir + 'arguments/' + f, 'utf8');

                article.addParameter(new ReferenceArticleParameter(name, markdown));
              });
            }

            if (fs.existsSync(entrySourceDir + 'returns')) {
              fs.readdirSync(entrySourceDir + 'returns').filter(p => /\.md/.test(p)).sort(sortOrderPrefixedFilenames).forEach(f => {
                let markdown = fs.readFileSync(entrySourceDir + 'returns/' + f, 'utf8');

                article.addReturn(new ReferenceArticleReturn(markdown));
              });
            }

          } else {
            // Otherwise, it's a content article

            article = new ContentArticle(doc, categoryName, entryName);

            article.content = substituteVariables(fs.readFileSync(entryFSPath, 'utf8'));
          }

          doc.addArticle(article);
        });

        if (extraneousFilesInCategorySourceDir.size > 0) {
          throw new Error(`Extraneous files in "${documentationName}/${majorNumber}/${minorNumber}/${categoryName}": ${Array.from(extraneousFilesInCategorySourceDir).join(', ')}`);
        }
      });
    });
  });

  return versions;
};

module.exports = loadDocumentation;
