(function(){
	'use strict';
	ddescribe("get.store", function() {
		var start_time = new Date().getTime(),
			db_name = 'store-get-test-' + start_time,
			store_name = 'store-get-test-store-' + start_time,
			store_key_path = 'storeGetTestKeyPath' + start_time,
			isFinished = false,
			dashIsFinished = function() { 
				return isFinished;
			},
			error = false,
			success = false,
			notify = false,
			prectx,
			ctx;	
		it( 'should open a database then add and then get a store', function() {
            dash.add.store({ database: db_name, store: store_name, store_key_path: store_key_path })
            .commit(function(context){
                dash.get.store(context)
                .then(function(context) {
                    ctx = context;
                    success = true;
                    isFinished = true;
                }, function(context) {
                    ctx = context;
                    error = true;
                    isFinished = true;
                }, function(context) {
                    notify = true;
                });
            }, function(context) {
                ctx = context;
                error = true;
            }, function(context) {
                notify = true;
            });

			waitsFor(dashIsFinished, 'the get.store operation to finish', 10000);
			runs(function() {
				ddescribe('get.store should finish cleanly', function() {
					beforeEach(function() {
						this.context = ctx;
						this.setup = prectx;
						this.success = success;
						this.error = error;
						this.notify = notify;
						this.dbname = db_name;
						this.storename = store_name;
					});
					
					it("get.store should be a success", function() {
						expect(this.notify).toBe(false);
						expect(this.error).toBe(false);
						expect(this.context.error).toBeUndefined();
						expect(this.success).toBe(true);
					});

					it("get.store should have the correct references", function() {
						expect(this.context.db instanceof IDBDatabase).toBe(true);
						expect(this.context.objectstore instanceof IDBObjectStore).toBe(true);
					});
					
					it("get.store should have the correct parent/child relationship", function() {
						expect(this.context.db.objectStoreNames.contains(this.context.store)).toBe(true);
					});

					it("get.store references should be the db and store we asked for", function(){
						expect(this.context.db.name).toBe(this.dbname);
						expect(this.context.objectstore.name).toBe(this.storename);
					});

				});
			});

		});
	});
}());

