// this is named 00_main, so that the enroute webresource servlet copies tthis code infront of all other scripts
'use strict';

(function() {
	var MODULE = angular.module('de.fraunhofer.abm',
			[ 'ngRoute', 'ngResource', 'ngCookies', // standard angular modules 
			  'ngCart',                // used to provide the shopping cart like functionality to create a new suite
			  'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.autoResize',
			  'ui.bootstrap',
			  'ngSanitize', 'ui.select', 
			  'angular-confirm',
			  'ui-notification',
			  'google-signin',
			  'ngAnimate'
			]);

	MODULE.config(['$routeProvider', 'GoogleSigninProvider', function($routeProvider, GoogleSigninProvider) {
		$routeProvider.when('/', { controller: mainProvider, templateUrl: 'template/home.htm'});
		$routeProvider.when('/search', { controller: mainProvider, templateUrl: '/template/search.htm'});
		$routeProvider.when('/about', { templateUrl: '/template/about.htm'});
		$routeProvider.when('/collection', { templateUrl: '/template/cart.htm'});
		$routeProvider.when('/editCollection/:id', { templateUrl: '/template/editCollection.htm'});
		$routeProvider.when('/login', { templateUrl: 'template/login.htm'});
		$routeProvider.when('/register', { templateUrl: '/template/register.htm'});
		$routeProvider.when('/registered', { templateUrl: '/template/registered.htm'});
		$routeProvider.when('/createCollection', { templateUrl: '/template/createCollection.htm'});
		$routeProvider.when('/addToCollection', { templateUrl: '/template/addToCollection.htm'});
		$routeProvider.when('/applyCriteria', { templateUrl: '/template/applyCriteria.htm'});
		//$routeProvider.when('/my', { templateUrl: '/template/my.htm'});
		$routeProvider.when('/filters', { templateUrl: '/template/filters.htm'});
		$routeProvider.when('/filterResult/:id', { templateUrl: '/template/filterResult.htm'});
		$routeProvider.when('/view/:id', { templateUrl: '/template/view.htm'});
		$routeProvider.otherwise('/');
		
		GoogleSigninProvider.init({
	        client_id: '1028525994000-2e188qbc7bgpmrdrqp0crfjaavn2o3oo.apps.googleusercontent.com',
	    });
	}]);
	
	MODULE.run( function($rootScope, $location, $cookies) {
		$rootScope.loading = false;	
		$rootScope.page = function() {
			return $location.path();
		}

		$rootScope.user = $cookies.get('user');
	});

	var mainProvider = function() {};
})();

