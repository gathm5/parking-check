'use strict';

angular.module('parkingCheckApp')
    .controller('HistoryCtrl', [
        '$scope',
        '$state',
        '$parkingData',
        function ($scope, $state, $parkingData) {
            $scope.$on('$$back', function () {
                $state.go('app.park');
            });
            $scope.history = $parkingData.history();
        }
    ]);