/// <reference path="../typings/angularjs/angular.d.ts">

(function() {
    'use strict';
    
    angular
        .module('morse', [
            'ui.router'
        ]);
    
    angular
        .module('morse')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            
            $urlRouterProvider.otherwise('/main');
            
            $stateProvider 
                .state('main', {
                    url: '/main',
                    views: {
                        'main': {
                            templateUrl: 'app/main/main.html',
                            controller: 'mainController'
                        }
                    },
                    params: {
                        inputText: ''
                    }
                    
                });
                
        }]);
    
})();