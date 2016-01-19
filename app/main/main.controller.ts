/// <reference path="../../typings/angularjs/angular.d.ts" />

(function(){
	'use strict';
	angular
		.module('morse')
		.controller('mainController', ['$scope', '$state', 'socket', '$timeout',
			function ($scope, $state, socket, $timeout) {
				
				socket.on('messages', function (data) {
					$timeout(function(){
						$scope.messages.push({
							dt: data.timestamp,
							msg: data.message
						});
					})
				});
				
				
				socket.emit('join', 'ppseprus');
				
				socket.emit('messages', {
					'timestamp': new Date(),
					'message': 'testing 123...'
				});
				
			}]);
})();