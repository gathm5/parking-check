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
        'ngStorage',
        'ngMap'
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
        },
        map: {
            linkType1: 'https://www.google.com/maps/dir/Current+Location/',
            linkType2: 'https://maps.google.com/maps?saddr=Current+Location&dirflg=w&daddr='
        },
        timer: 5 * 1000
    })
    .config(function ($stateProvider, $urlRouterProvider, $compileProvider) {
        $urlRouterProvider.otherwise('/dashboard');
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: '/views/main.html',
                controller: 'MainCtrl'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: '/views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .state('locate', {
                url: '/locate/:location',
                templateUrl: '/views/locate-user.html',
                controller: 'LocateUserCtrl'
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