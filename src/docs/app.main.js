/*
 * FOLLOWING CODE IS RUN IN A FUNCTION CONTEXT
 *
 * See app.js for available functions and constants
 */

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
		let res = await req.text();

		docxml = $( res, 'xml' );
	} catch (err) {
		// TODO
		return;
	}

	for (let catxml of docxml.children()) {
		let category = new Category( catxml.attr('name') );

		for (let entxml of catxml.children()) {
			let entry = new Entry({
				name: entxml.children( 'name' ).text(),
				description: entxml.children( 'description' ).text(),
				versions: entxml.children( 'versions' ).text(),
				sigs: entxml.find( 'signature' ).text( true ),
				args: entxml.find( 'argument' ).get().map(arg => {
					return {
						name: arg.querySelector( 'name' ).textContent,
						description: arg.querySelector( 'description' ).textContent,
					};
				}),
				rets: entxml.find( 'return' ).text( true ),
			});

			category.addEntry(entry);
			articles[entry.name] = entry.$.entry;
		}
	}

	var currentHash = location.hash.slice(1),
		hashArticle = articles[currentHash];

	if (hashArticle) loadArticle(hashArticle);
}