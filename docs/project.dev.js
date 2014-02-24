var dashApp = angular.module('dashApp', [ 'ngRoute' ]);

dashApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/about', {
            templateUrl: '/docs/templates/about.html',
            controller: 'dashAppAboutController'
        }).
        when('/docs', {
            templateUrl: '/docs/templates/docs.html',
            controller: 'dashAppDocsController'
        }).
        when('/docs/:doc1', {
            templateUrl: '/docs/templates/docs.html',
            controller: 'dashAppDocsController'
        }).
        when('/docs/:doc1/:doc2', {
            templateUrl: '/docs/templates/docs.html',
            controller: 'dashAppDocsController'
        }).
        when('/docs/:doc1/:doc2/:doc3', {
            templateUrl: '/docs/templates/docs.html',
            controller: 'dashAppDocsController'
        }).
        when('/docs/:doc1/:doc2/:doc3/:doc4', {
            templateUrl: '/docs/templates/docs.html',
            controller: 'dashAppDocsController'
        }).
        when('/', {
            templateUrl: '/docs/templates/splash.html',
            controller: 'dashAppSplashController'
        }).
        otherwise({
            redirectTo: '/docs'
        });
}]);

dashApp.controller( 'dashAppController', [ '$location', '$scope', function( $location, $scope ) {
    $scope.isSplash = function() {
        return '/' === $location.path();
    };
    $scope.isDocs = function() {
        return '/docs' === $location.path();
    };
    $scope.isAbout = function() {
        return '/about' === $location.path();
    };
}]);

dashApp.controller('dashAppAboutController', [ function() {
    console.log('about controller');
}]);

dashApp.controller('dashAppDocsController', [ '$scope', '$http', '$templateCache', '$routeParams', function( $scope, $http, $templateCache, $routeParams ) {
    $scope.parentSelected = function(parent) {
        var current = $scope.currentTopic();
        return parent.path === current;
    };
    $scope.currentTopic = function() {
        var params = [];
        if ($routeParams.doc1) {
            params.push($routeParams.doc1);
        }
        if ($routeParams.doc2) {
            params.push($routeParams.doc2);
        }
        if ($routeParams.doc3) {
            params.push($routeParams.doc3);
        }
        if ($routeParams.doc4) {
            params.push($routeParams.doc4);
        }
        return params.join('/');
    };
    $scope.parentShowing = function(obj, child) {
        var params = [],
            match,
            regx,
            current,
            others;
        if ($routeParams.doc1) {
            params.push($routeParams.doc1);
        }
        if ($routeParams.doc2) {
            params.push($routeParams.doc2);
        }
        if ($routeParams.doc3) {
            params.push($routeParams.doc3);
        }
        if ($routeParams.doc4) {
            params.push($routeParams.doc4);
        }
        current = params.join('\/');
        if ( '' === current ) {
            return false;
        }
        regx = new RegExp( '^' + current );
        match = ( null !== obj.path.match( regx ) ) ? true : false;
        others = child.path.split('/');
        others.pop();
        others = others.join('/');
        regx = new RegExp( '^' + others);
        return match || ( null !== current.match( regx ) ) ? true : false;
    };


    $scope.documents = [
        { path: 'overview',
            children: [
                { 'path': 'overview',
                    'title': 'Overview',
                    'default': true,
                    'children': [
                        { 'path': 'general/security',
                            'title': 'Security'
                        },
                        { 'path': 'general/transactions',
                            'title': 'Transactions',
                            'children': [ { 'path': 'general/transaction/requests',
                                'title': 'Requests'
                            } ]
                        }
                    ]
                },
                { 'path': 'databases',
                    'title': 'Databases',
                    'children': [
                        { 'path': 'database/opening',
                            'title': 'Opening',
                            'demos': [ {
                                'title': 'Opening A Database Example: Simple Case',
                                'id': 'dashdb/ZCngL'
                            } ]
                        },
                        { 'path': 'database/closing',
                            'title': 'Closing',
                            'demos': [
                                {
                                    'title': 'Closing A Database Example: Simple Case',
                                    'id': 'dashdb/SFYx5'
                                }
                            ]
                        },
                        { 'path': 'database/removing',
                            'title': 'Removing',
                            'demos': [ {
                                'title': 'Removing A Database Example: Simple Case',
                                'id': 'dashdb/retKS'
                            } ]
                        },
                        { 'path': 'database/getting',
                            'title': 'Getting',
                            'demos': [
                                { 'title': 'Getting Existing Databases Example: Simple Case',
                                    'id': 'dashdb/5ZWMg'
                                }
                            ]
                        } ]
                },
                { 'path': 'stores',
                    'title': 'Stores',
                    'children': [
                        { 'path': 'objectstore/clearing', 'title': 'Clearing',
                            'demos': [ {
                                'title': 'Clearing An Object Store Example: Simple Case',
                                'id': 'dashdb/YCj4Q'
                            } ] },
                        { 'path': 'objectstore/creating', 'title': 'Creating',
                            'demos': [ {
                                'title': 'Creating An Object Store Example: Simple Case',
                                'id': 'dashdb/8mCew'
                            } ] },
                        { 'path': 'objectstore/getting', 'title': 'Getting',
                            'demos': [ {
                                'title': 'Getting An Object Store Example: Simple Case',
                                'id': 'dashdb/LJqjA'
                            } ] },
                        { 'path': 'objectstore/iteration', 'title': 'Iterating',
                            'demos': [ {
                                'title': 'Getting Multiple Object Stores Example: Simple Case',
                                'id': 'dashdb/ZCngL'
                            } ] },
                        { 'path': 'objectstore/removing', 'title': 'Removing',
                            'demos': [ {
                                'title': 'Removing An Object Store Example: Simple Case',
                                'id': 'dashdb/Zcw46'
                            } ] }
                    ]
                },

                { 'path': 'keys',
                    'title': 'Keys',
                    'children': [
                        { 'path': 'key/ranges',
                            'title': 'Keyranges',
                            'children': [
                                { 'path': 'key/range/bounds',
                                    'title': 'Bounds' },
                                { 'path': 'key/range/direction',
                                    'title': 'Direction' }
                            ]
                        },
                        { 'path': 'key/cursors',
                            'title': 'Cursors',
                            'children': []
                        } ]
                },
                { 'path': 'indexes',
                    'title': 'Indexes',
                    'children': [
                        { 'path': 'index/creating',
                            'title': 'Creating',
                            'demos': [ {
                                'title': 'Creating An Index Example: Simple Case',
                                'id': 'dashdb/kM4sQ'
                            } ] },
                        { 'path': 'index/getting',
                            'title': 'Getting',
                            'demos': [ {
                                'title': 'Getting An Index Example: Simple Case',
                                'id': 'dashdb/2vqYW'
                            } ]},
                        { 'path': 'index/iterating',
                            'title': 'Iterating',
                            'demos': [ {
                                'title': 'Getting Multiple Indexes Example: Simple Case',
                                'id': 'dashdb/2FmJg'
                            } ] },
                        { 'path': 'index/removing',
                            'title': 'Removing',
                            'demos': [ {
                                'title': 'Removing An Index Example: Simple Case',
                                'id': 'dashdb/2td5q'
                            } ]
                        }
                    ]
                },
                { 'path': 'entries',
                    'title': 'Entries',
                    'children': [
                        { 'path': 'entry/adding',
                            'title': 'Adding',
                            'demos': [ {
                                'title': 'Adding An Object To An Object Store Example: Simple Case',
                                'id': 'dashdb/LD42e'
                            } ] },
                        { 'path': 'entry/getting',
                            'title': 'Getting',
                            'demos': [ {
                                'title': 'Getting An Object From An Object Store Example: Simple Case',
                                'id': 'dashdb/ALXu8'
                            },
                                {
                                    'title': 'Getting Multiple Objects From A Database Example: Simple Case',
                                    'id': 'dashdb/R8ZL4'
                                } ] },
                        { 'path': 'entry/putting',
                            'title': 'Putting',
                            'demos': [ {
                                'title': 'Putting An Object Into An Object Store Example: Simple Case',
                                'id': 'dashdb/zHLWL'
                            } ] },
                        { 'path': 'entry/removing',
                            'title': 'Removing',
                            'demos': [ {
                                'title': 'Removing An Object From An Object Store Example: Simple Case',
                                'id': 'dashdb/Gb2CC'
                            },
                                {
                                    'title': 'Removing Multiple Objects From A Database Example: Simple Case',
                                    'id': 'dashdb/H6r9x'
                                } ] },
                        { 'path': 'entry/updating',
                            'title': 'Updating',
                            'demos': [ {
                                'title': 'Updating Multiple Objects In A Database Example: Simple Case',
                                'id': 'dashdb/dqx4R'
                            } ] }
                    ]
                },
            ]
        }
    ];
    $scope.emptyPath = function() {
        return '' === $scope.currentTopic();
    };
    var getPath = function(path) {
        return ['/documentation/', path, '.md' ].join('');
    }
    $scope.documentContent = function(path) {
        return $templateCache.get(getPath(path))[1];
    }
    $scope.currentDocument = function() {
        var topic = $scope.currentTopic(),
            found = false;
        _.map($scope.documents, function(item) {
            if (item.path === topic) {
                found = item;
                return;
            }
            if(item.children) {
                _.map(item.children, function(item2) {
                    if (item2.path === topic) {
                        found = item2;
                        return;
                    }
                    if (item2.children) {
                        _.map(item2.children, function(item3) {
                            if(item3.path === topic) {
                                found = item3;
                                return;
                            }
                            if (item3.children) {
                                _.map(item3.children, function(item4) {
                                    if(item4.path === topic) {
                                        found = item4;
                                        return;
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
        return found;
    }
    var process = function(item) {
        $http.get( getPath(item.path), { cache: $templateCache } );
        if (!item.children) {
            return;
        } else {
            _.map(item.children, function(datum) {
                process(datum);
            });
        }
    };
    _.map( $scope.documents, process );

}]);

dashApp.controller('dashAppDocsContentController', [ '$routeParams', '$scope', function( $routeParams, $scope ) {
    $scope.pathLevel = function(obj) {
        var current = $scope.currentTopic();
        return (true === obj.default && '' === current) || obj.path === current;
    };
}]);

dashApp.controller('dashAppDocsSidebarController', [ '$routeParams', '$scope', function($routeParams, $scope) {

}]);

dashApp.controller('dashAppDocsDemosController', [ '$scope', '$sce', function( $scope, $sce ) {
    $scope.demos = function() {
        var current = $scope.currentDocument(),
            stack = current.demos || [];
        _.map(current.children || [], function(child) {
            stack.push.apply(stack, child.demos || []);
        });
        return stack;
    };
    $scope.demoUrl = function(demo) {
        return $sce.trustAsResourceUrl('http://jsfiddle.net/' + demo.id + '/embedded');
    };
}]);


dashApp.directive('dashSplash', [ 'dashAppSplashBroadcast', function(dashAppSplashBroadcast) { 
    return {
        scope: {},
        restrict: 'AE',
        compile: function() {
            console.log('dashSplash setup');
            var el = document.createElement('div'),
                layout/* = IMDBSystem(el, $('#dash-splash').width(), $('#dash-splash').height(), function(data) {
		    dash.get.entry({
			database: 'dash-demo',
			store: 'imdb',
			key: data,
			store_key_path: 'id'
		    })
		    (function(context) {
			console.log('got entry', context);
			dashAppSplashBroadcast.current(context.entry);
		    }, function(context) {
			console.log('missing entry', context);
		    });
		})*/;
            el.setAttribute('id', 'dash-splash-container');
            return function link(scope, element, attrs) {
                element[0].appendChild(el);
                //layout();
            };
        }
    };
} ] );

dashApp.factory( 'dashAppSplashBroadcast', function() {
	stack = [];
	return {
		current: function(data) {
			var x = 0, xlen = stack.length;
			for ( x = 0; x < xlen; x += 1 ) {
				stack[ x ].apply( stack[ x ], [ data ] );
			}
		},
		subscribe: function(cb) {
			stack.push(cb);
		}
	};
});

dashApp.controller('dashAppSplashController', [ '$scope', '$http', function( $scope, $http ) {
    console.log('splash controller');
    var start = 2013,
        stack = [],
        in_progress = false,
        processNext = function() {
            if(!in_progress && stack.length > 0) {
                in_progress = true;
                doNext(stack.shift());
            }
        },
        doNext = function(next) {
            dash.add.entry({
                database: 'dash-demo',
                store: 'imdb',
                auto_increment: true,
                store_key_path: 'id',
                data: next
            })
            (function(context) {
                in_progress = false;
                console.log(context.key);
                processNext();
            }, function(context) {
                in_progress = false;
                processNext();
            });
        },
        key = 'dash-demo-installed-2',
        dashInstalled = localStorage.getItem(key);
    if (!dashInstalled) {
        for (; start > 2000; start -= 1) {
            localStorage.setItem(key, 'YES');
            $http( {
                method: 'GET',
                url: '/docs/demo/data/' + start + '.json'
            }).success(function(data, status, headers, config) {
                stack.push.apply(stack, data);
                console.log('stack length', stack.length);
                processNext();
            }).error( function(data, status, headers, config) {
                console.log('error',data, status, headers, config);
            });
        }
    }

}]);


dashApp.directive('dashSplashOverlay', [ 'dashAppSplashBroadcast', function( dashAppSplashBroadcast ) { 
    return {
        scope: {},
        restrict: 'AE',
	templateUrl: '/docs/templates/overlay.html',
        compile: function() {
            console.log('dashSplash overlay setup');
            return function link(scope, element, attrs) {
		scope.data = {
			se: '',
			ep: ''
		};
		scope.range = 2016;
		scope.sort = 'from';
		scope.stats = function() {
			if ( scope.statsData ) {

			} else {
				return 'data';
			};
		};
		scope.estimate = function() {
			if ( 'from' === scope.sort ) {
				return scope.files[ scope.range ];
			} else {
				console.log('since');
				var values = [],
				    start = false;
				console.log('files',scope.files);
				for ( file in scope.files) {
					console.log('cjecking',file);
					if ( false === start && scope.files.hasOwnProperty( file ) ) {
						if ( file === scope.range.toString() ) {
							start = true;
						}
					}
					if ( start ) {
						values.push( scope.files[ file ] );
					}
				};
				console.log('SUM',values);
				return 'tricky';
			}
		};
		scope.files = { 
			'1880': '79',
			'1887': '82',
			'1888': '364',
			'1889': '198',
			'1890': '374',
			'1891': '580',
			'1892': '589',
			'1893': '134',
			'1894': '6.3K',
			'1895': '7.6K',
			'1896': '48K',
			'1897': '85K',
			'1898': '124K',
			'1899': '128K',
			'1900': '133K',
			'1901': '133K',
			'1902': '131K',
			'1903': '194K',
			'1904': '130K',
			'1905': '117K',
			'1906': '103K',
			'1907': '114K',
			'1908': '181K',
			'1909': '209K',
			'1910': '282K',
			'1911': '377K',
			'1912': '500K',
			'1913': '578K',
			'1914': '542K',
			'1915': '512K',
			'1916': '379K',
			'1917': '281K',
			'1918': '229K',
			'1919': '226K',
			'1920': '248K',
			'1921': '224K',
			'1922': '191K',
			'1923': '160K',
			'1924': '161K',
			'1925': '173K',
			'1926': '177K',
			'1927': '178K',
			'1928': '172K',
			'1929': '172K',
			'1930': '155K',
			'1931': '153K',
			'1932': '152K',
			'1933': '143K',
			'1934': '154K',
			'1935': '153K',
			'1936': '169K',
			'1937': '173K',
			'1938': '169K',
			'1939': '152K',
			'1940': '131K',
			'1941': '132K',
			'1942': '127K',
			'1943': '113K',
			'1944': '104K',
			'1945': '101K',
			'1946': '117K',
			'1947': '136K',
			'1948': '176K',
			'1949': '253K',
			'1950': '331K',
			'1951': '408K',
			'1952': '461K',
			'1953': '502K',
			'1954': '543K',
			'1955': '617K',
			'1956': '657K',
			'1957': '727K',
			'1958': '746K',
			'1959': '804K',
			'1960': '849K',
			'1961': '833K',
			'1962': '762K',
			'1963': '842K',
			'1964': '846K',
			'1965': '956K',
			'1966': '1.0M',
			'1967': '1.1M',
			'1968': '997K',
			'1969': '6.9M',
			'1970': '975K',
			'1971': '1008K',
			'1972': '943K',
			'1973': '1008K',
			'1974': '987K',
			'1975': '996K',
			'1976': '1004K',
			'1977': '1012K',
			'1978': '1.1M',
			'1979': '1.1M',
			'1980': '1.1M',
			'1981': '1016K',
			'1982': '1.1M',
			'1983': '1.1M',
			'1984': '1.2M',
			'1985': '1.4M',
			'1986': '1.4M',
			'1987': '1.5M',
			'1988': '1.4M',
			'1989': '1.6M',
			'1990': '1.6M',
			'1991': '1.7M',
			'1992': '1.8M',
			'1993': '2.0M',
			'1994': '2.2M',
			'1995': '2.6M',
			'1996': '2.6M',
			'1997': '2.9M',
			'1998': '3.3M',
			'1999': '3.6M',
			'2000': '3.8M',
			'2001': '4.2M',
			'2002': '4.5M',
			'2003': '5.0M',
			'2004': '6.2M',
			'2005': '7.0M',
			'2006': '8.0M',
			'2007': '8.9M',
			'2008': '9.3M',
			'2009': '9.9M',
			'2010': '11M',
			'2011': '13M',
			'2012': '14M',
			'2013': '13M',
			'2014': '2.0M',
			'2015': '155K',
			'2016': '21K',
			'2017': '4.1K',
			'2018': '1.3K',
			'2019': '294',
			'2020': '150',
			'2021': '67'
		} 
		scope.sorts = [ {
			name: 'from',
			display: 'from',
			selected: 'from' === scope.sort ? 'selected' : ''
		}, {
			name: 'since',
			display: 'since',
			selected: 'since' === scope.sort ? 'selected' : ''
		} ];
		scope.verb = 'explore';
		scope.layout = function() {
			console.log('layout');
		};
		console.log('default data',scope.data);
		dashAppSplashBroadcast.subscribe(function(data) {
			scope.$apply( function() {
				console.log('updated data', data);
				scope.data = data;
			} );
		});
            };
        }
    };
} ]  );




dashApp.directive('markdown', function () {
    var converter = new Showdown.converter();
    return {
        restrict: 'AE',
        link: function (scope, element, attrs) {
            if (attrs.markdown) {
                scope.$watch(attrs.markdown, function (newVal) {
                    if (!newVal) {
                        return;
                    }
                    var html = converter.makeHtml(newVal);
                    element.html(html);
                });
            } else {
                var text = element.text(),
                    html = text ? converter.makeHtml(element.text()) : '';
                element.html(html);
            }
        }
    };
});
