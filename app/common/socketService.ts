/// <reference path="../../typings/angularjs/angular.d.ts" />

(function(){
	'use strict';
	angular
		.module('morse')
		.service('socketService', [
			'$rootScope',
			function($rootScope){
				
				var socket;// = io();
				
				/*socket.on('error', function(err){
					console.log('error', err)
				});
				
				socket.on('connect_error', function(err){
					console.log('connect_error', err)
				});
				
				socket.on('connect_failed', function(err){
					console.log('connect_failed', err)
				});*/
				
				/**
					Declaring functions for the API
				
				**/
				
				function connect(ip, port){
					socket = io.connect(ip+':'+port);	
				};
				
				function disconnect(){
					if(socket.connected){
						socket.disconnect();
					}
				};
				
				function id() {
					return socket.id;
				};
				
				function connected() {
					return socket.connected;
				};
				
				function disconnected() {
					return socket.disconnected;
				};
				
				function on(eventName, callback) {
					socket.on(eventName, function () {  
						var args = arguments;
						$rootScope.$apply(function () {
							callback.apply(socket, args);
						});
					});
				};
				
				function emit(eventName, data, callback) {
					socket.emit(eventName, data, function () {
						var args = arguments;
						$rootScope.$apply(function () {
							if (callback) {
								callback.apply(socket, args);
							}
						});
					});
				};
				
				/**
					Returning the API
				
				**/
				
				return {
					connect: connect,
					disconnect: disconnect,
					id: id,
					connected: connected,
					disconnected: disconnected,
					on: on,
					emit: emit
				};
				
		}]);
})();