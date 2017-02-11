const babel = require('babel-core');
const fs = require('fs-extra');

const SRC_DIR = __dirname + '/src';

fs.removeSync(__dirname + '/dist');

const JS_DOC_FOLDERS = ['OOML'];

JS_DOC_FOLDERS.forEach(dir => {
	dir = `${SRC_DIR}/${dir}`;

	let js = fs.readFileSync(`${dir}/doc.js`, 'utf8');
	js = js.replace(/<ZC-IMPORT\[(.*?)\]>/g, (_, subfile) => {
		let content = fs.readFileSync(`${dir}/doc.${subfile}.js`);
		return content;
	});

	let json = Function('"use strict";return ' + js)();
	json = JSON.stringify(json);

	fs.writeFileSync(`${dir}/doc.json`, json);
});

require('zcompile')({
	source: SRC_DIR,
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

		'OOML/index.html',
		'OOML/doc.json',
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

JS_DOC_FOLDERS.forEach(dir => {
	fs.unlinkSync(`${SRC_DIR}/${dir}/doc.json`);
});
