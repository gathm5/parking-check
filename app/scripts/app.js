'use strict';

angular.module('parkingCheckApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ngTouch',
        'ngAnimate',
        'ui.router',
        'gsDirectives',
        'ngStorage'
    ])
    .constant('$config', {
        app: {
            name: 'Parking Check'
        },
        package: {
            name: 'com.parkingcheck.gautham'
        },
        api: {
            prefix: 'http:/',
            url: 'api.parkwhiz.com',
            action: 'search?q=',
            key: null
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
    .run([
        '$rootScope',
        '$state',
        '$deviceListeners',
        'NotificationService',
        function ($rootScope, $state, $deviceListeners, NotificationService) {
            $rootScope.$state = $state;
            $deviceListeners.init();
            $rootScope.$on('$$ready', function () {
                NotificationService.ready();
            });
        }
    ]);