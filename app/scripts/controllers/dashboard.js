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
        function ($scope, $parking, $transit, $geocode, $config, $timeout, $rootScope) {
            var timer;
            $scope.isParked = $parking.isStarted();
            $scope.parkingControl = function () {
                if ($scope.isParked) {
                    $scope.isParked = null;
                    $scope.location = null;
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
                                console.log($scope.walking);
                            }
                        });
                });
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
                        });
                }
            }

            getParkInfo();
            $scope.$on('$$resume', getParkInfo);
            $scope.$on('$$back', function () {
                navigator.app.exitApp();
            });
        }
    ]);