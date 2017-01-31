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
		'lib/fetch-polyfill.js', // Needs minification

		'index.html',
		'index.css',

		'app/app.css',
		'app/app.js',
		'app/app.html',

		'zQuery/index.html',
		'zQuery/doc.json',

		'zVex/index.html',
	],

	copy: [
		'lib/ooml.js',
		'lib/babel-polyfill.js',
		'lib/marked.js',
		'lib/highlight.js/highlight.pack.js',
		'lib/highlight.js/styles/atom-one-light.css',
		'images/search.png',
	],
});
