/// <reference path="../typings/angularjs/angular.d.ts" />

(function() {
    'use strict';
    
    angular
        .module('morse', [
            'ui.router'
        ]);
    
    angular
        .module('morse')
        .config([
            '$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                
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
                    
        }])
        .run([
            'IO_CONFIG', 'socketService',
            function(IO_CONFIG, socketService){
                
                socketService.connect(IO_CONFIG.ip, IO_CONFIG.port);
                socketService.disconnect();
                
        }]);
    
})();



		