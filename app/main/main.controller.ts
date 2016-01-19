/// <reference path="../../typings/angularjs/angular.d.ts" />

(function(){
	'use strict';
	angular
		.module('morse')
		.controller('mainController', ['$scope', '$state', 'socket',
			function ($scope, $state, socket) {
				
				socket.on('messages', function (data) {
					$scope.messages.push({
						dt: data.timestamp,
						msg: data.message
					});
					$scope.users.push(data.name);
				});
				
			}]);
})();