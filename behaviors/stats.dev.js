window.dashStats = window.dashStats || (function (environment) {
  "use strict";
  var model = function () {
    return {
      requests: {
        add: 0,
        clears: 0,
        counts: 0,
        get: 0,
        put: 0,
        remove: 0,
        update: 0,
        attribute: 0,
        behavior: 0,
        store: 0,
        stores: 0,
        entry: 0,
        entries: 0,
        index: 0,
        indexes: 0,
        database: 0,
        databases: 0,
        total: 0
      },
      time: {
        add: 0,
        clears: 0,
        counts: 0,
        get: 0,
        put: 0,
        remove: 0,
        update: 0,
        attribute: 0,
        behavior: 0,
        store: 0,
        stores: 0,
        entry: 0,
        entries: 0,
        index: 0,
        indexes: 0,
        database: 0,
        databases: 0,
        total: 0
      },
      expected: {
        add: 0,
        clears: 0,
        counts: 0,
        get: 0,
        put: 0,
        remove: 0,
        update: 0,
        attribute: 0,
        behavior: 0,
        store: 0,
        stores: 0,
        entry: 0,
        entries: 0,
        index: 0,
        indexes: 0,
        database: 0,
        databases: 0,
        total: 0
      },
      remaining: {
        add: 0,
        clears: 0,
        counts: 0,
        get: 0,
        put: 0,
        remove: 0,
        update: 0,
        attribute: 0,
        behavior: 0,
        store: 0,
        stores: 0,
        entry: 0,
        entries: 0,
        index: 0,
        indexes: 0,
        database: 0,
        databases: 0,
        total: 0
      },
      outcomes: {
        resolve: 0,
        notify: 0,
        error: 0
      },
      milliseconds: {
        total: NaN,
        start: NaN,
        elapsed: NaN,
        remaining: NaN
      },
      display: {
        elapsed: '',
        remaining: ''
      },
      metrics: {
        add: {
          average: NaN,
          rate: NaN,
          recent: []
        },
        clear: {
          average: NaN,
          rate: NaN,
          recent: []
        },
        count: {
          average: NaN,
          rate: NaN,
          recent: []
        },
        get: {
          average: NaN,
          rate: NaN,
          recent: []
        },
        put: {
          average: NaN,
          rate: NaN,
          recent: []
        },
        remove: {
          average: NaN,
          rate: NaN,
          recent: []
        },
        update: {
          average: NaN,
          rate: NaN,
          recent: []
        }
      },
      type: null,
      dom: {
        node: null
      }
    };
  },
    recents = 5,
    total = model();
  return function (state) {
    var context = state.context,
          theirs = this;
    console.log('checking', state.type);
    if (!this.contains(['resolve', 'notify', 'error'], state.type)) {
      console.log('starting', state.type);
      state.context.statistics = {
        total: total,
        request: model()
      };
      state.context.statistics.request.milliseconds.started = new Date().getTime();
      state.context.statistics.request.type = state.type;
      if ('count.entries' !== state.type && null !== state.type.match(/\.entries$/)) {
        var defd = this.deferred(),
          deferred = state.promise
          console.log('counting', state.context);
          theirs.api.count.entries({
			database: state.context.database,
			index: state.context.index,
			index_key: state.context.index_key,
			index_key_path: state.context.index_key_path,
			limit: state.context.limit,
			store: state.context.store,
			store_key_path: state.context.store_key_path,
          })((function(defrd) {
          	return function (ctx) {
	            console.log('counted the request', ctx, state.type);
	            //state.context.statistics.request.
	            defrd.resolve(state);
	        }
          }(defd)));
        state.deferred = defd.promise;
      }

    } else {
      state.context.statistics.request.milliseconds.finished = new Date().getTime();
      state.context.statistics.request.milliseconds.elapsed = state.context.statistics.request.milliseconds.finished - state.context.statistics.request.milliseconds.started;

      var pieces = state.context.statistics.request.type.split('.'),
        verb = pieces[0],
        noun = pieces[1];

      state.context.statistics.total.time[noun] += state.context.statistics.request.milliseconds.elapsed;
      state.context.statistics.total.time[verb] += state.context.statistics.request.milliseconds.elapsed;
      state.context.statistics.total.time.total += state.context.statistics.request.milliseconds.elapsed;
      state.context.statistics.request.outcomes[state.type] += 1;
      state.context.statistics.total.outcomes[state.type] += 1;
      state.context.statistics.request.requests[verb] += 1;
      state.context.statistics.total.requests[verb] += 1;
      state.context.statistics.request.requests[noun] += 1;
      state.context.statistics.total.requests[noun] += 1;
      state.context.statistics.request.requests.total += 1;
      state.context.statistics.total.requests.total += 1;
      state.context.statistics.request.metrics[verb].recent.unshift(state.context.statistics.request.milliseconds.elapsed);
      state.context.statistics.total.metrics[verb].recent.unshift(state.context.statistics.total.milliseconds.elapsed);
      if (state.context.statistics.request.metrics[verb].recent.length > recents) {
        state.context.statistics.request.metrics[verb].recent = state.context.statistics.request.metrics[verb].recent.slice(0, recents);

      }
      if (state.context.statistics.total.metrics[verb].recent.length > recents) {
        state.context.statistics.total.metrics[verb].recent = state.context.statistics.total.metrics[verb].recent.slice(0, recents);

      }
    }
    return state;
  };
}(self));