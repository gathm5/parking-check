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
        'ngMap',
        'ionic'
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
        $urlRouterProvider.otherwise('/park');
        $stateProvider
            .state('app', {
                views: {
                    '@': {
                        templateUrl: '/views/app-page.html'
                    },
                    'Header@app': {
                        templateUrl: '/views/header.html'
                    },
                    'Footer@app': {
                        templateUrl: '/views/footer.html'
                    }
                }
            })
            .state('app.park', {
                url: '/park',
                views: {
                    'Content@app': {
                        templateUrl: '/views/dashboard.html',
                        controller: 'DashboardCtrl'
                    }
                }
            })
            .state('app.history', {
                url: '/history',
                views: {
                    'Content@app': {
                        templateUrl: '/views/dashboard.html',
                        controller: 'DashboardCtrl'
                    }
                }
            })
            .state('app.connect', {
                url: '/connect'
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
        '$ionicPlatform',
        function ($rootScope, $state, $deviceListeners, NotificationService, $ionicPlatform) {
            $rootScope.$state = $state;
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
            });
            $deviceListeners.init();
            $rootScope.$on('$$ready', function () {
                NotificationService.ready();
            });
        }
    ]);