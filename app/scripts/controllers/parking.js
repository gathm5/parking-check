'use strict';

angular.module('parkingCheckApp')
    .controller('ParkingCtrl', [
        '$scope',
        function ($scope) {
            $scope.isParked = true;
            $scope.parkingControl = function () {
                $scope.isParked = !$scope.isParked;
            };
        }
    ]);