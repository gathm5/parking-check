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
            function call(destination) {
                var url = $config.api.builder(destination);
                $http
                    .get(url)
                    .then(function (output) {
                        $scope.parking = output.data;
                    });
            }

            $scope.customLocation = null;

            $scope.findNearMe = function () {
                $rootScope.$emit('$alert', {
                    message: 'Searching for parking near your current location',
                    showTime: 5 * 1000
                });
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
                    }, function (update) {
                        $rootScope.$emit('$alert', {
                            message: update,
                            showTime: 3 * 1000
                        });
                    });
            };

            $scope.findParking = function () {
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