class Entry {
	constructor({ name, description, versions, sigs, args, rets }) {
		let $ent = $( '#template-toc-category-entry' ).import().databind({
			name: name,
			description: description,
		}, true);

		let $art = $( '#template-article' ).import().databind({
			name: name,
			description: description,
			versions: versions,
		}, true);

		let $artSynopsis = $art.filter( '.section-synopsis' );
		let $artArguments = $art.find( '.arguments-list' );
		let $artReturns = $art.find( '.returns-list' );

		for (let sig of sigs) {
			let $sig = $( '#template-article-signature' ).import().appendTo( $artSynopsis );
			$sig.html( parseTypedCodeLine(sig) );
		}

		if (!args.length) $artArguments.closest( 'section' ).display( false );
		for (let arg of args) {
			let $arg = $( '#template-article-argument' ).import().databind({
				name: arg.name,
				description: parseMarkdown( arg.description ),
			}, true).appendTo( $artArguments );
		}

		for (let ret of rets) {
			let $ret = $( '#template-article-return' ).import().appendTo( $artReturns );
			$ret.html( parseMarkdown(ret) );
		}

		$ent.prop('$article', $art);
		$ent.prop('articleName', name);

		this.name = name;
		this.$ = {
			entry: $ent,
			article: $art,
		};
	}
}