
angular.module('firebaseApp', ['ngRoute', 'firebase'])

	.constant('API', {
		firebaseUrl: 'https://sinkapp.firebaseio.com/'
	})

	.config(['$routeProvider', function($routeProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'templates/home.html',
				controller: 'homeController'
			})
			.when('/admin', {
				templateUrl: 'templates/admin.html',
				controller: 'adminController'
			})
			.otherwise({
				redirectTo: '/'
			})
	}])

	.factory('firebaseService', function(API) {

		function getFirebaseRef() {
			var ref = new Firebase(API.firebaseUrl + 'messages');
			return ref;
		}

		return {
			getFirebaseRef: getFirebaseRef
		}

	})

	.controller('adminController', ['$scope', '$firebaseArray', 'firebaseService', 

		function($scope, $firebaseArray, firebaseService) {
		
			var fireRef = firebaseService.getFirebaseRef();	
			$scope.messages = $firebaseArray(fireRef);

		    $scope.addMessage = function() {

		    	$scope.messages.$add({
		    		text: $scope.newMessage
		    	});

		    	$scope.newMessage = "";
		    };
		}
	])

	.controller('homeController', ['$scope', '$firebaseArray', 'firebaseService', 

		function($scope, $firebaseArray, firebaseService) {
		
			var fireRef = firebaseService.getFirebaseRef();	
			$scope.messages = $firebaseArray(fireRef);
		}
	]);