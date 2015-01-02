'use strict';

angular.module('parkingCheckApp')
    .controller('DashboardCtrl', [
        '$scope',
        '$parking',
        '$transit',
        '$geocode',
        '$config',
        '$timeout',
        '$rootScope',
        '$state',
        function ($scope, $parking, $transit, $geocode, $config, $timeout, $rootScope, $state) {
            var timer;
            $scope.isParked = $parking.isStarted();
            $scope.parkingControl = function () {
                if ($scope.isParked) {
                    $scope.isParked = null;
                    $scope.location = null;
                    $scope.mapReady = null;
                    $timeout.cancel(timer);
                    $rootScope.$emit('$alert', {
                        message: 'Your parking session ended',
                        showTime: 3 * 1000
                    });
                    $geocode
                        .geocode($scope)
                        .then(function (location) {
                            $parking.parked(location, 'end');
                        });
                }
                else {
                    $rootScope.$emit('$alert', {
                        message: 'Registering your parking location',
                        showTime: 3 * 1000
                    });
                    $geocode
                        .geocode($scope)
                        .then(function (location) {
                            $parking.parked(location, 'start');
                            $scope.isParked = $parking.isStarted();
                            getParkInfo();
                        },
                        function (error) {
                            $rootScope.$emit('$alert', {
                                message: error,
                                showTime: 3 * 1000
                            });
                        });
                }
            };

            $scope.getWalkable = function () {
                getParkInfo(function () {
                    $transit
                        .get($scope.location.coords, $scope.isParked.location.coords)
                        .then(function (data) {
                            if (data.status === 200) {
                                $scope.walking = data.data.route;
                            }
                        });
                });
            };

            $scope.locateInMap = function () {
                locate($scope.location.coords, $scope.isParked.location.coords);
            };

            function getParkInfo(clb) {
                if ($scope.isParked) {
                    $geocode
                        .geocode($scope)
                        .then(function (location) {
                            $scope.location = location;
                            if (clb) {
                                clb();
                            }
                            $scope.mapReady = true;
                        }, function (bug) {
                            console.log('bug found: ', bug);
                        });
                }
            }

            function locate(fromGeo, toGeo) {
                $state.go('app.park.locate', {
                    location: [fromGeo.latitude, fromGeo.longitude, toGeo.latitude, toGeo.longitude].join(',')
                });
            }

            getParkInfo();
            $scope.$on('$$resume', getParkInfo);
            $scope.$on('$$back', function () {
                navigator.app.exitApp();
            });
        }
    ]);