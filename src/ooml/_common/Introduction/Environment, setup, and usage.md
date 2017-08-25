The easiest way to set up and use ooml is just to load it via a `<script>` tag:

```html
<script src="https://wilsonl.in/ooml.<VAR[VERSION-MAJOR]>.<VAR[VERSION-MINOR]>.js"></script>
```

Every version of ooml is available directly from a CDN. They can be accessed using one of the following URL formats:

- [https://wilsonl.in/ooml.latest.js](https://wilsonl.in/ooml.latest.js) for the very latest version
- [https://wilsonl.in/ooml.X.js](https://wilsonl.in/ooml.X.js) for the latest version with major number X
- [https://wilsonl.in/ooml.X.Y.js](https://wilsonl.in/ooml.X.Y.js) for the latest version with major number X and minor number Y
- [https://wilsonl.in/ooml.X.Y.Z.js](https://wilsonl.in/ooml.X.Y.Z.js) for version X.Y.Z

[Compatibility and versioning](#Compatibility and versioning) describes how versioning works.

Alternatively, ooml also available as a package on [npm](https://www.npmjs.com/package/ooml) and [yarn](https://yarn.fyi/ooml) (both point to the same package). The ooml.js file is located at `dist/ooml.js` in the package; it is already minified and optimised, and can be loaded directly in the browser. ooml is compatible with most bundling and loader tools.

Directions for compiling ooml.js from source can be found on the [project's README on GitHub](https://github.com/lerouche/ooml).

ooml has no dependencies, and does not require the use of any specific tool or toolchain. However, ooml's requirement that all classes be declared in one file may not be desired. To help with this, [zc](https://wilsonl.in/zc/) (another project) is a preprocessor that can combine multiple files and run optimisations, essentially acting as a bundler. This allows a namespace declaration to be broken up into separate, self-containing folders and/or files. This is described on the [Using with zc](https://wilsonl.in/ooml/guides/using-with-zc/) ooml guide.
