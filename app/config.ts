/// <reference path="../typings/angularjs/angular.d.ts" />

(function(){
	'use strict';
    
    angular
        .module('morse')
		.constant('IO_CONFIG', {
			ip: 'http://localhost',
			port: '3000'
		});
})();