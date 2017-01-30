const babel = require('babel-core');
const fs = require('fs-extra');

fs.removeSync(__dirname + '/dist');

require('zcompile')({
	source: __dirname + '/src',
	destination: __dirname + '/dist',

	minifySelectors: false,
	onloadjs: function(code) {
		return babel.transform(code, { presets: ['latest'] }).code;
	},
	files: [
		'docs/lib/fetch-polyfill.js', // Needs minification

		'docs/index.html',
		'docs/index.css',

		'docs/app/app.css',
		'docs/app/app.js',
		'docs/app/app.html',

		'docs/zQuery/index.html',
		'docs/zQuery/doc.json',
        //
		'docs/zVex/index.html',
	],

	copy: [
		'docs/lib/ooml.js',
		'docs/lib/babel-polyfill.js',
		'docs/lib/marked.js',
		'docs/lib/highlight.js/highlight.pack.js',
		'docs/lib/highlight.js/styles/atom-one-light.css',
		'docs/images/search.png',
	],
});
