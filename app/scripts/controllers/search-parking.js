'use strict';

angular.module('parkingCheckApp')
    .controller('SearchParkingCtrl', [
        '$scope',
        '$config',
        '$http',
        '$geocode',
        '$state',
        '$rootScope',
        function ($scope, $config, $http, $geocode, $state, $rootScope) {
            $scope.customLocation = null;
            $scope.searching = {};
            $scope.failure = {};

            function call(destination) {
                var url = $config.api.builder(destination);
                $http
                    .get(url)
                    .then(function (output) {
                        $scope.parking = output.data;
                        $scope.searching.started = false;
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
                $geocode
                    .geocode($scope)
                    .then(function (location) {
                        call({
                            destination: location.coords.latitude + ',' + location.coords.longitude
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
                $rootScope.$emit('$alert', {
                    message: 'Searching for parking places',
                    showTime: 5 * 1000
                });
                if ($scope.customLocation) {
                    call({
                        destination: $scope.customLocation
                    });
                }
            };

            $scope.$on('$$back', function () {
                $state.go('app.park');
            });
        }
    ]);