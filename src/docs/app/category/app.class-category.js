class Category {
	constructor(name) {
		let $cat = $( '#template-toc-category' ).import().appendTo( '#toc-categories' );
		$cat.filter( '.toc-category-label' ).text(name);

		this.name = name;
		this.entries = {};
		this.$ = {
			category: $cat,
			entries: $cat.find( '.toc-category-entries' ),
		};
	}

	addEntry(entry) {
		if (!(entry instanceof Entry)) {
			throw new TypeError("Entry provided not an Entry instance");
		}

		entry.$.entry.appendTo( this.$.entries );
	}
}