/// <reference path="../../typings/angularjs/angular.d.ts" />

(function(){
	'use strict';
	angular
		.module('morse')
		.factory('socket', ['IO_CONFIG', '$rootScope', function(IO_CONFIG, $rootScope){
			var socket = io.connect(IO_CONFIG.ip+':'+IO_CONFIG.port);
			return {
				
				
				on: function (eventName, callback) {
					socket.on(eventName, function () {  
						var args = arguments;
						$rootScope.$apply(function () {
							callback.apply(socket, args);
						});
					});
				},
				
				
				emit: function (eventName, data, callback) {
					socket.emit(eventName, data, function () {
						var args = arguments;
						$rootScope.$apply(function () {
							if (callback) {
								callback.apply(socket, args);
							}
						});
					});
				}
				
				
			};
		}]);
})();