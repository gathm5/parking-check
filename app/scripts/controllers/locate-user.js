'use strict';

angular.module('parkingCheckApp')
    .controller('LocateUserCtrl', [
        '$scope',
        '$state',
        '$stateParams',
        function ($scope, $state, $stateParams) {
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
                $state.go('dashboard');
            });
        }
    ]);