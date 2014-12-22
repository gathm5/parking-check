'use strict';

angular.module('parkingCheckApp')
    .controller('LocateUserCtrl', [
        '$scope',
        '$state',
        '$stateParams',
        '$rootScope',
        function ($scope, $state, $stateParams, $rootScope) {
            var params = $stateParams.location;
            params = params.split(',');
            var fromGeo = {
                latitude: params[0],
                longitude: params[1],
                icon: '/images/map-icon-blue.png',
                title: 'From'
            };
            var toGeo = {
                latitude: params[2],
                longitude: params[3],
                icon: '/images/map-icon-red.png',
                title: 'To'
            };
            $scope.mapConfig = {
                zoom: 18,
                center: fromGeo,
                markers: [
                    fromGeo,
                    toGeo
                ]
            };
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