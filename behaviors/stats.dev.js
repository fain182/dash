window.dashStats = window.dashStats || (function(w) {
	"use strict";
	return function(ctx) {
		var promise = this.deferred(),
		    deferred = ctx.promise;
		console.log('running plugin',promise,deferred);
		if ( null !== deferred ) {
		console.log('deferred');
		deferred( function( state ) {
			console.log('theirs resolved', state);
			setTimeout( function() {
				console.log('module before and after callback', state);
				promise.resolve(state);
			}, 0 );
		} );
		ctx.deferred = promise;
		}
		return ctx;
	};
	return [ function(ctx) {
		console.log('module before callback');
		return ctx;
	}, function(ctx) {
		console.log('module after callback');
		return ctx;
	} ];
}(window));