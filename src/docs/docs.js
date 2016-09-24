(function() {
	"use strict";

	$.ajax({
		url: '../docs.html',
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

								entry_name = $xml_entry.find('name').text();

							$html_entry.text(entry_name);
						});
					});
				}
			});
		}
	};
})();