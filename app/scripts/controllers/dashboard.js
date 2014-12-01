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
            $scope.$watch('isParked', function (toggle) {
                if (!angular.isUndefined(toggle)) {
                    if (toggle) {
                        $geocode
                            .geocode($scope)
                            .then(function (location) {
                                $parking.parked(location, 'start');
                                $scope.parking = $parking.isStarted();
                            });
                    }
                    else {
                        $geocode
                            .geocode($scope)
                            .then(function (location) {
                                $parking.parked(location, 'end');
                                $scope.parking = null;
                            });
                    }
                }
            });
        }
    ]);