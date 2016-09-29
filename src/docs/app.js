(function() {
	"use strict";

	$.ajax({
		url: '../app.html',
		success: function(data) {
			$( document.body ).html(data);
			init();
		}
	});

	function parseDocText(xmlNode) {
		var renderer = new marked.Renderer();
		renderer.code = function(code) {
			// return '<pre>' + parseCodeBlock(code) + '</pre>';
			return '<pre>' + hljs.highlight('js', code, true).value + '</pre>';
		};
		renderer.paragraph = function(text) {
			return marked(text).slice(3, -5); // Remove <p> wrapping
		};
		return marked(xmlNode.textContent, { renderer: renderer });
	}

	function parseCodeBlock(codeText) {
		return codeText
			.replace(/ ([A-Z][a-z0-9_]+|function|int|float|string|bool|object|array)/g, function(match) {
				return ' <span class=type>' + match.slice(1) + '</span>';
			});
	}

	var init = function() {
		var currentListing;

		var listings = ['zQuery', 'zVex', 'zSelectPro', 'zc', 'StackUI', 'JSVF'].map(function(listing) {
			var matchesURI = RegExp('^\\/docs\\/' + listing + '(\\/?$|\\/.+)');
			if (matchesURI.test(location.pathname)) {
				currentListing = listing;
			}
			return {
				title: listing,
				matchesURI: matchesURI
			};
		});

		var articles = {},
			hashManuallyChanged = false,
			loadArticle = function($articleEntry) {
				var articleEntryElem = this || $articleEntry.get(0);

				document.body.scrollTop = 0;
				document.title = articleEntryElem.articleName + ' - ' + currentListing + ' | wilsonl.in';
				$( 'article' ).empty();
				articleEntryElem.$article.appendTo( 'article' );
				history.replaceState(undefined, undefined, '#' + articleEntryElem.articleName);
			};

		// $(window)
		// 	.on('hashchange', function() {
		// 		if (hashManuallyChanged) {
		// 			hashManuallyChanged = false;
		// 		} else {
		// 			var currentHash = location.hash.slice(1),
		// 				hashArticle = articles[currentHash];
		//
		// 			if (hashArticle) {
		// 				loadArticle(hashArticle);
		// 			} else {
		// 				document.title = currentListing + ' | wilsonl.in';
		// 				$( 'article' ).empty();
		// 			}
		// 		}
		// 	});

		$( '#toc-categories' )
			.on('click', '.toc-category-label', function() {
				$(this).classes(['active']);
			})
			.on('click', '.toc-category-entry', loadArticle);

		$( '.toc-control' )
			.on('click', function() {
				$( '.toc-category-label' )
					.classes('active', this.value == 'expand all');
			});

		if (currentListing) {
			document.title = currentListing + ' | wilsonl.in';
			$( '#app-listings a[href$="' + currentListing + '"]' )
				.on('click', function(e) { e.preventDefault() })
				.closest('li')
				.classes('active', true);

			$.ajax({
				url: './doc.xml',
				success: function(xml) {
					var $xml = $(xml, 'xml');

					$xml.children('category').each(function(category) {
						var $html_cat = $( '#template-toc-category' )
								.import()
								.appendTo( '#toc-categories' ),
							$xml_cat = $(category),

							category_name = $xml_cat.attr('name');

						$html_cat
							.filter('.toc-category-label')
							.text(category_name);

						var $html_cat_entries = $html_cat
								.find('.toc-category-entries');

						$xml_cat.children('entry').each(function(entry) {
							var $html_entry = $( '#template-toc-category-entry' )
									.import()
									.appendTo( $html_cat_entries ),
								$xml_entry = $(entry),

								entry_name = $xml_entry.children('name').text(),
								entry_desc = $xml_entry.children('description').text();

							$html_entry.text(entry_name).prop('title', entry_desc);

							var $article = $( '#template-article' ).import();

							$article.find('h1').text(entry_name);
							$article.find('.versions').text($xml_entry.find('versions').text());

							$article.find('.description').text(entry_desc);

							var $synopsis = $article.filter( '.section-synopsis' );
							$xml_entry.find('signature code').each(function(codeElem) {
								$( '#template-article-signature' )
									.import()
									.appendTo( $synopsis.get() )
									.html( parseCodeBlock(codeElem.textContent) );
							});

							var $args = $article.find('.arguments-list'),
								$rets = $article.find('.returns-list');

							$xml_entry.find('argument').each(function(arg) {
								var $arg = $( '#template-article-argument' ).import().appendTo($args);

								$arg.filter('.argument-name').text(
									$(arg).find('name').text()
								);

								$arg.find('.argument-description').html(
									parseDocText( $(arg).find('description').get(0) )
								);
							});
							if (!$xml_entry.find('?argument')) {
								$args.closest('section').display(false);
							}

							$xml_entry.find('return').each(function(ret) {

								var $ret = $( '#template-article-return' ).import().appendTo($rets);
								var html = parseDocText(ret);
								$ret.html(html);
							});

							$html_entry.prop('$article', $article);
							$html_entry.prop('articleName', entry_name);
							articles[entry_name] = $html_entry;
						});
					});

					var currentHash = location.hash.slice(1),
						hashArticle = articles[currentHash];

					if (hashArticle) loadArticle(hashArticle);
				}
			});
		}
	};
})();