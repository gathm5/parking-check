'use strict';

angular.module('parkingCheckApp')
    .controller('ConnectCtrl', [
        '$scope',
        '$state',
        function ($scope, $state) {
            $scope.$on('$$back', function () {
                $state.go('app.park');
            });
        }
    ]);
