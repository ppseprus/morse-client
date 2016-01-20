/// <reference path="../../typings/angularjs/angular.d.ts" />

(function(){
	'use strict';
	angular
		.module('morse')
		.controller('mainController', ['$state', '$scope', 'socket', '$filter',
			function ($state, $scope, socket, $filter) {
				
				//	initialise message container
				$scope.messages = [];
				
				//	initialise logging
				function logMessage(data){
					$scope.messages.push({
						ev: data.event.replace(':',''),
						dt: data.timestamp,
						usr: data.username,
						msg: data.message
					});
				}
				
				//	select events to listen to
				var eventsToListen = {
					'user:connect': true,
					'user:disconnect': true,
					'user:join': true,
					'message': true
				};
				
				//	initialise event listeners
				angular.forEach(eventsToListen, function(value, e){
					if(value) {
						socket.on(e, function(data){
							logMessage(data);
						});
					}
				});
				
				//	TEMPORARY
				socket.emit('user:join', {
					'username':'ppseprus'
				});
				
				//	message sending
				$scope.sendMessage = function(isValid) {
					if (isValid) {
						socket.emit('message', {
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