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
        $urlRouterProvider.otherwise('/park');
        $stateProvider
            .state('app', {
                views: {
                    '@': {
                        templateUrl: '/views/app-page.html'
                    },
                    'Header@app': {
                        templateUrl: '/views/header.html',
                        controller: [
                            '$scope',
                            '$rootScope',
                            function ($scope, $rootScope) {
                                $scope.back = function () {
                                    console.log('Back button from button');
                                    $rootScope.$broadcast('$$back');
                                }
                            }
                        ]
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
                        templateUrl: '/views/parking.html',
                        controller: 'ParkingCtrl'
                    }
                }
            })
            .state('app.park.locate', {
                url: '/locate/:latitude/:longitude',
                views: {
                    'Content@app': {
                        templateUrl: '/views/locate-user.html',
                        controller: 'LocateUserCtrl'
                    }
                }
            })
            .state('app.history', {
                url: '/history',
                views: {
                    'Content@app': {
                        templateUrl: '/views/history.html',
                        controller: 'HistoryCtrl'
                    }
                }
            })
            .state('app.connect', {
                url: '/connect',
                views: {
                    'Content@app': {
                        templateUrl: '/views/connect.html',
                        controller: 'ConnectCtrl'
                    }
                }
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
        '$config',
        function ($rootScope, $state, $deviceListeners, NotificationService, $config) {
            $rootScope.$state = $state;
            $rootScope.$app = $config.app;
            $deviceListeners.init();
            $rootScope.$on('$$ready', function () {
                NotificationService.ready();
            });
        }
    ]);