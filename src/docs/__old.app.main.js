/*
 * FOLLOWING CODE IS RUN IN A FUNCTION CONTEXT
 *
 * See app.js for available functions and constants
 */

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
	hashManuallyChanged = false;

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

	document.title = `${currentListing}${VIEWPORT_TITLE_SUFFIX}`;

	$( '#app-listings a[href$="' + currentListing + '"]' )
		.on('click', e => e.preventDefault())
		.closest('li')
		.classes('active', true);

	let docxml;

	try {
		let req = await fetch('./doc.xml');
		docxml = await req.text();
	} catch (err) {
		// TODO
		return;
	}

	var $xml = $(xml, 'xml');

	for (let category of docxml.children) {
		let $category = $( '#template-toc-category' ).import().appendTo( '#toc-categories' );
		let categoryName = category.attributes.name.value;
	}

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