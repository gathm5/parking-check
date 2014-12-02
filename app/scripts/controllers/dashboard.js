'use strict';

angular.module('parkingCheckApp')
    .controller('DashboardCtrl', [
        '$scope',
        '$parking',
        '$geocode',
        function ($scope, $parking, $geocode) {
            if ($parking.isStarted() || $parking.isEnded()) {
                $scope.isParked = $parking.isStarted();
                if ($scope.isParked) {
                    $scope.parking = $scope.isParked;
                }
            }
            $scope.parkingControl = function () {
                if ($scope.isParked) {
                    $geocode
                        .geocode($scope)
                        .then(function (location) {
                            $parking.parked(location, 'end');
                            $scope.parking = null;
                            $scope.isParked = null;
                        });
                }
                else {
                    $geocode
                        .geocode($scope)
                        .then(function (location) {
                            $parking.parked(location, 'start');
                            $scope.parking = $parking.isStarted();
                            $scope.isParked = $scope.parking;
                        });
                }
            };
            function onResume() {
                if ($scope.isParked) {
                    $geocode
                        .geocode($scope)
                        .then(function (location) {
                            $scope.current = {
                                location: location,
                                date: new Date()
                            };
                        });
                    $scope.isParked = null;
                    $scope.isParked = $scope.parking;
                }
            }

            $scope.$on('$$focus', onResume);
            $scope.$on('$$resume', onResume);
        }
    ]);