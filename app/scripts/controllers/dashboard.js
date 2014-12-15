'use strict';

angular.module('parkingCheckApp')
    .controller('DashboardCtrl', [
        '$scope',
        '$parking',
        '$geocode',
        '$config',
        '$timeout',
        '$rootScope',
        function ($scope, $parking, $geocode, $config, $timeout, $rootScope) {
            var timer;
            $scope.isParked = $parking.isStarted();
            $scope.parkingControl = function () {
                if ($scope.isParked) {
                    $scope.isParked = null;
                    $scope.location = null;
                    $timeout.cancel(timer);
                    $rootScope.$emit('$alert', {
                        message: 'Your parking session ended'
                    });
                    $geocode
                        .geocode($scope)
                        .then(function (location) {
                            $parking.parked(location, 'end');
                        });
                }
                else {
                    $rootScope.$emit('$alert', {
                        message: 'Registering your parking location'
                    });
                    $geocode
                        .geocode($scope)
                        .then(function (location) {
                            $parking.parked(location, 'start');
                            $scope.isParked = $parking.isStarted();
                            getParkInfo();
                        });
                }
            };

            function getParkInfo() {
                $scope.updateTime = false;
                $timeout(function () {
                    $scope.updateTime = true;
                });
                $geocode
                    .geocode($scope)
                    .then(function (location) {
                        $scope.location = location;
                    });
                getLocation();
            }

            function getLocation() {
                if ($scope.isParked) {
                    timer = $timeout(getParkInfo, $config.timer);
                }
            }

            getParkInfo();

            $scope.$on('$$pause', function () {
                $timeout.cancel(timer);
            });
            $scope.$on('$$resume', getParkInfo);
            $scope.$on('$$back', function () {
                navigator.app.exitApp();
            });
        }
    ]);