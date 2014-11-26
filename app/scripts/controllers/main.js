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
            $scope.$on('$$ready', function () {
                $scope.isAvailable = false;
                if (window.plugin && window.plugin.notification && window.plugin.notification.local) {
                    $scope.isAvailable = true;
                }
            });
        }
    ]);