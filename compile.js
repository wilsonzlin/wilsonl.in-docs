const babel = require('babel-core');

require('zcompile')({
	src: __dirname + '/src',
	dst: '/var/www/html',

	minifySelectors: false,
	onloadfile: function(code, ext, path) {
		if (ext == 'js' && !/\/lib\//.test(path)) { // Don't babelify external JS libraries
			return babel.transform(code, { presets: ['latest'] }).code;
		}
	},
	files: [
		'docs/lib/fetch-polyfill.js', // Needs minification

		'docs/index.html',
		'docs/index.css',

		'docs/app.css',
		'docs/app.js',
		'docs/app.html',

		'docs/zQuery/index.html',
		'docs/zQuery/doc.xml',

		'docs/zVex/index.html',
		'docs/zVex/doc.xml',
	],
	debug: process.argv.slice(2).some(arg => /^debug$/.test(arg)),

	copy: [
		'docs/lib/babel-polyfill.js',
		'docs/lib/marked.js',
		'docs/lib/highlight.js/highlight.pack.js',
		'docs/lib/highlight.js/styles/atom-one-light.css',
		'docs/search.png',
	],
});