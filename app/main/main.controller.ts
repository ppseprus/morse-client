/// <reference path="../../typings/angularjs/angular.d.ts" />

(function(){
	'use strict';
	angular
		.module('morse')
		.controller('mainController', [
			'$state', '$scope', '$filter', 'socketService', '$location', '$anchorScroll',
			function ($state, $scope, $filter, socketService, $location, $anchorScroll) {
				
				$scope.username = 'ppseprus';
				
				$scope.s = socketService;
				
				$scope.messages = [];
				
				//	initialise logging
				function logMessage(data){
					$scope.messages.push({
						ev: data.event.replace(':',''),
						dt: data.timestamp,
						usr: data.username,
						msg: data.message
					});
					
					$location.hash('bottom');
					$anchorScroll();
				}
				
				//	select events to listen to
				var eventsToListen = {
					'user:connect': true,
					'user:disconnect': true,
					'user:join': true,
					'youare': false,
					'message': true
				};
				
				//	initialise event listeners
				angular.forEach(eventsToListen, function(value, e){
					if(value) {
						socketService.on(e, function(data){
							logMessage(data);
						});
						
					}
				});
				
				//	TEMPORARY
				socketService.emit('user:join', {
					'username': $scope.username
				});
				
				socketService.on('youare', function(data){
					$scope.username = data.message;
				});
				
				//	message sending
				$scope.sendMessage = function(isValid) {
					if (isValid) {
						socketService.emit('message', {
							'timestamp': $filter('date')(new Date, 'HH:mm:ss.sss', 'UTC'),
							'message': $scope.message
						});
						
						$scope.message = '';
						
						$scope.console.$setPristine();
						$scope.console.$setUntouched();
					}
				};
				
			}]);
})();