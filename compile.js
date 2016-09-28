require('zcompile')({
	src: __dirname + '/src',
	dst: '/var/www/html',

	minifySelectors: false,
	files: [
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
		'docs/lib/marked.js',
		'docs/lib/highlight.js/highlight.pack.js',
		'docs/lib/highlight.js/styles/atom-one-light.css',
		'docs/search.png',
	],
});