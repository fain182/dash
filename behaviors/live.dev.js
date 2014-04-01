window.dashLive = window.dashLive || (function (environment) {
  "use strict";
  var that,
      liveMap = {},
      live = function(ste) {
        var ctx = ste.context,
          fn = function(live_ctx) {
            if (!liveMap[ ste.context.liveid ] ||( !!live_ctx.context && !!live_ctx.context.zombie)) {
              return live_ctx;
            }
            var ditto = that.clone(ste);
            ditto.type = 'notify';
            ditto.method = live_ctx.method;
            ditto.context = live_ctx.context;
            ditto.context.zombie = 'braaains';
            liveMap[ ste.context.liveid ].resolve(ditto);
          };
        fn.ready = false;
        return fn;
      };
  return [ function (state) {
    that = this;
    if(this.isnt(state.context.live, true)) {
      return state;
    }
    state.context.liveid = this.random();
    var lives = live(this.clone(state));
    liveMap[ state.context.liveid ] = lives;
    if (this.isArray(state.context.changes)) {
      state.context.changes.push(lives);
    } else if (this.isFunction(state.context.changes)) {
      state.context.changes = [state.context.changes, lives];
    } else {
      state.context.changes = [lives];
    }
    return state;
  }, function (state) {
    that = this;
    if(this.isEmpty(state.context.liveid)) {
      return state;
    }
    var promise = state.promise,
        removeChanges = function(ste) {
          if(that.isArray(ste.context.changes)) {
            that.each(ste.context.changes, function(el, i) {
              if (that.is(ste, liveMap[ ste.context.liveid ])) {
                delete ste.context.changes[ i ];
              }
            });
          }
          delete ste.context.liveid;
          return ste;
        };
    if (this.contains(['resolve', 'error'], state.type)) {
      liveMap[ state.context.liveid ] = this.deferred();
    }
    state.promise(function(ctx) {
      deferred.resolve(removeChanges(ctx));
    }, function(ctx) {
      deferred.error(removeChanges(ctx));
    }, function(ctx) {
      deferred.notify(removeChanges(ctx));
    });
    state.promise = liveMap[ state.context.liveid ].promise;
    return removeChanges(state);
  } ];
}(self));
