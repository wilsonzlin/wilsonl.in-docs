"use strict";

const createURLPathComponent = path => {
    path = path.replace(/[`~!@#\$%\^&\*\(\)\+=\{\}\[\]\|\\:;'"<>\?,\.\/]/g, '');
    path = path.replace(/ /g, '-');
    // Replace contiguous hyphens with single one
    path = path.replace(/-+/g, '-');
    path = path.toLocaleLowerCase();
    path = encodeURIComponent(path);

    return path;
};

module.exports = createURLPathComponent;
