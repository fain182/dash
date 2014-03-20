window.dashMatch = window.dashMatch || (function (environment) {
  "use strict";
  return [ null, function (state) {
    if(this.isEmpty(state.context.match)) {
      return state;
    }
    var promise = state.promise,
        deferred = this.deferred(),
	that = this,
	reduce = function(expression, context) {
		var maybeReduce = function(expr) {
			if (that.isFunction(expr)) {
				expr = that.apply(expr, [context], that);
			}
			if (that.isObject(expr)) {
				that.iterate(expr, function(key, value) {
					expr[key] = maybeReduce(value);
				});
			}
			return expr;
		}
		return maybeReduce(expression);	
	},
	match = function(expr, data) {
		var matches = false;
		console.log('match?', data, expr);
		that.iterate(expr, function(key, val) { 
			if ( that.isRegEx(val) ) {
				console.log("REGEX",key,val);
			} else {
				console.log('normal',key,val);
			}
		} );
		return matches;
	},
	reduced;
    promise(function(context) {
      //context.type = null;
	reduced = reduce(state.context.match, context);
	console.log('reduced', match(reduced, state.context.entry) );
      deferred.resolve(context);
    });
    state.promise = deferred.promise;
    return state;
  } ];
}(self));
