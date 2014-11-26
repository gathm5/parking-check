'use strict';

angular.module('parkingCheckApp')
    .controller('MainCtrl', [
        '$scope',
        '$geocode',
        function ($scope, $geocode) {
            $scope.locate = function () {
                $geocode
                    .geocode($scope, {
                        timeout: 10 * 1000
                    })
                    .then(function (position) {
                        $scope.position = position;
                    });
            };
        }
    ]);