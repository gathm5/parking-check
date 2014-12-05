'use strict';

angular.module('parkingCheckApp')
    .controller('DashboardCtrl', [
        '$scope',
        '$parking',
        '$geocode',
        '$config',
        function ($scope, $parking, $geocode, $config) {
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
            $scope.mapLink = $config.map.linkType2;
            function onResume() {
                $geocode
                    .geocode($scope)
                    .then(function (location) {
                        $scope.current = {
                            location: location,
                            date: new Date()
                        };
                    });
                if ($scope.isParked) {
                    $scope.isParked = null;
                    $scope.isParked = $scope.parking;
                }
            }
            onResume();
            $scope.$on('$$focus', onResume);
            $scope.$on('$$resume', onResume);
        }
    ]);