(function() {
	"use strict";

	$.ajax({
		url: '../app.html',
		success: function(data) {
			$( document.body ).html(data);
			init();
		}
	});

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

		$( '#toc-categories' )
			.on('click', '.toc-category-label', function() {
				$(this).classes(['active']);
			})
			.on('click', '.toc-category-entry', function() {

				$( 'article' ).empty();
				this.$article.appendTo( 'article' );
			});

		$( '.toc-control' )
			.on('click', function() {
				$( '.toc-category-label' )
					.classes('active', this.value == 'expand all');
			});

		if (currentListing) {
			document.title = currentListing + ' | wilsonl.in';
			$( '#app-listings a[href$="' + currentListing + '"]' )
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
							$article.find('.signature').text($xml_entry.find('signature code').text());
							var $args = $article.find('.arguments-list');

							$xml_entry.find('argument').each(function(arg) {
								arg = $(arg);

								var $arg = $( '#template-article-argument' ).import().appendTo($args);
								$arg.filter('.argument-name').text(arg.find('name').text());
								$arg.find('.argument-description').text(arg.find('description').text());
							});

							$html_entry.prop('$article', $article);
						});
					});
				}
			});
		}
	};
})();