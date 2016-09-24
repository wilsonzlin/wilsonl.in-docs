require('zcompile')({
	src: __dirname + '/src',
	dst: '/var/www/html',

	minifySelectors: false,
	files: [
		'docs/index.html',
		'docs/index.css',

		'docs/docs.css',
		'docs/docs.js',
		'docs/docs.html',

		'docs/zQuery/index.html',
	],
	debug: process.argv.slice(2).some(arg => /^debug$/.test(arg)),

	copy: [
		'docs/search.png',

		'docs/zQuery/doc.xml',
	],
});