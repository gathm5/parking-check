'use strict';

angular.module('parkingCheckApp')
    .controller('SearchParkingCtrl', [
        '$scope',
        '$geocode',
        '$state',
        'ParkingSearchData',
        '$rootScope',
        function ($scope, $geocode, $state, ParkingSearchData, $rootScope) {
            $scope.customLocation = ParkingSearchData.lastActiveSearch;
            $scope.searching = {};
            $scope.failure = {};

            function call(destination) {
                ParkingSearchData
                    .callApi(destination)
                    .then(function (output) {
                        $scope.parking = output;
                        $scope.searching.started = false;
                        $rootScope.$emit('$alertCancel');
                    }, function (reason) {
                        $scope.failure.reason = reason;
                        $scope.searching.started = false;
                    });
            }

            $scope.findNearMe = function () {
                $rootScope.$emit('$alert', {
                    message: 'Searching for parking near your current location',
                    showTime: 5 * 1000
                });
                $scope.searching.started = true;
                $scope.parking = null;
                $geocode
                    .geocode($scope)
                    .then(function (location) {
                        call({
                            destination: location.coords.latitude + ',' + location.coords.longitude,
                            type: 0
                        });
                    }, function (reject) {
                        $rootScope.$emit('$alert', {
                            message: reject,
                            showTime: 3 * 1000
                        });
                        $scope.searching.started = false;
                    }, function (update) {
                        $rootScope.$emit('$alert', {
                            message: update,
                            showTime: 3 * 1000
                        });
                        $scope.searching.started = false;
                    });
            };

            $scope.findParking = function () {
                $scope.searching.started = true;
                $scope.parking = null
                $rootScope.$emit('$alert', {
                    message: 'Searching for parking places',
                    showTime: 3 * 1000
                });
                if ($scope.customLocation) {
                    call({
                        destination: $scope.customLocation,
                        type: 1
                    });
                }
            };

            $scope.$on('$$back', function () {
                $state.go('app.park');
            });

            if ($scope.customLocation && typeof $scope.customLocation === 'string') {
                call({
                    destination: $scope.customLocation
                });
            }
        }
    ]);