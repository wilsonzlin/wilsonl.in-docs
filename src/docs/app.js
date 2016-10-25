(async function() {
	"use strict";

	const VIEWPORT_TITLE_SUFFIX = ' | wilsonl.in';

	var currentListing;

	try {
		let req = await fetch('../app.html');
		let html = await req.text();

		$( document.body ).html( html );
		main();
	} catch (err) {
		// TODO
		return;
	}

	function parseMarkdown(mdText) {
		var renderer = new marked.Renderer();
		renderer.code = function(code, language) {
			var html;

			if (language && language.indexOf('_wldoc_') == 0) {
				switch (language.slice(7)) {
					case 'typedline':
						html = parseTypedCodeLine(code);
						break;
				}
			} else if (language) {
				html = hljs.highlight(language, code, true).value;
			} else {
				html = $.escape.HTML( code );
			}
			return `<pre>${ html }</pre>`;
		};
		renderer.paragraph = function(text) {
			return marked(text).slice(3, -5); // Remove <p> wrapping
		};
		return marked(mdText, { renderer: renderer });
	}

	function parseTypedCodeLine(codeText) {
		return codeText
			.replace(/([| ])((?:[A-Z][a-z0-9_]+)+|zQuery|function|int|float|number|string|bool|object|array)/g, (_, charBefore, type) => `${charBefore}<span class=type>${ type }</span>`);
	}

	function loadArticle($articleEntry) {
		// Function may be called by DOM element event handler or manually
		var articleEntryElem = this || $articleEntry.get(0);

		// Update viewport
		document.body.scrollTop = 0; // Chrome
		document.documentElement.scrollTop = 0; // Firefox
		document.title = `${articleEntryElem.articleName} - ${currentListing}${VIEWPORT_TITLE_SUFFIX}`;

		// Load article
		$( 'article' ).empty();
		articleEntryElem.$article.appendTo( 'article' );

		// Add hash to URL without creating history
		history.replaceState(undefined, undefined, '#' + articleEntryElem.articleName);
	}

	$( '#toc-categories' )
		.on('click', '.toc-category-label', function() {
			$(this).classes(['active']);
		})
		.on('click', '.toc-category-entry', function() {
			loadArticle.call(this);
			$( 'nav' ).classes('mobile-visible', false);
		});

	$( '.toc-control' )
		.on('click', function() {
			$( '.toc-category-label' )
				.classes('active', this.value == 'expand all');
		});

	$( 'article' )
		.on('click', '.category', e => {
			$( 'nav' ).classes('mobile-visible', true);
		});

	<ZC-IMPORT[class-category]>
	<ZC-IMPORT[class-entry]>

	async function main() {
		<ZC-IMPORT[main]>
	}
})();