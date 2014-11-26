'use strict';

angular.module('parkingCheckApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ngTouch',
        'ngAnimate',
        'ui.router',
        'gsDirectives'
    ])
    .constant('$config', {
        app: {
            name: 'Parking Check'
        },
        package: {
            name: 'com.parkingcheck.gautham'
        },
        api: {
            'forecast': {
                prefix: 'https:/',
                url: 'api.forecast.io',
                action: 'forecast',
                key: '2c4acbc487d15a1af0df88daa4265237'
            },
            'open': {
                prefix: 'http:/',
                url: 'openweathermap.org/data/2.1',
                action: 'find/city?q=',
                key: null
            }
        }
    })
    .config(function ($stateProvider, $urlRouterProvider, $compileProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: '/views/main.html',
                controller: 'MainCtrl'
            });
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|geo|javascript):/);
    })
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
    });