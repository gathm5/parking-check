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
                longitude: params[1]
            };
            var toGeo = {
                latitude: params[2],
                longitude: params[3],
                icon: 'icon.png'
            };
            $scope.mapConfig = {
                zoom: 4,
                center: fromGeo,
                markers: [
                    fromGeo,
                    toGeo
                ]
            };
        }
    ]);