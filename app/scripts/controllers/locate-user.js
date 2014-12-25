'use strict';

angular.module('parkingCheckApp')
    .controller('LocateUserCtrl', [
        '$scope',
        '$state',
        '$stateParams',
        '$geocode',
        '$rootScope',
        function ($scope, $state, $stateParams, $geocode, $rootScope) {
            var geo = {
                latitude: $stateParams.latitude,
                longitude: $stateParams.longitude
            };

            var toGeo = {
                latitude: geo.latitude,
                longitude: geo.longitude,
                icon: 'images/map-icon-red.png',
                title: 'To'
            };
            $rootScope.$emit('$alert', {
                message: 'Locating your current location',
                showTime: 3 * 1000
            });
            $geocode
                .geocode($scope)
                .then(function (location) {
                    var fromGeo = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        icon: 'images/map-icon-blue.png',
                        title: 'From'
                    };
                    $scope.mapConfig = {
                        zoom: 18,
                        center: fromGeo,
                        markers: [
                            fromGeo,
                            toGeo
                        ]
                    };
                });
            $scope.$on('$$back', function () {
                $state.go('app.park');
            });
            $rootScope.header = {
                back: {
                    label: 'back',
                    title: 'Locate User',
                    align: 'right'
                }
            };
            $scope.$on('$destroy', function () {
                $rootScope.header = null;
            });
        }
    ]);