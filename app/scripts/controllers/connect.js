'use strict';

angular.module('parkingCheckApp')
    .controller('ConnectCtrl', [
        '$scope',
        '$state',
        '$parkingData',
        function ($scope, $state, $parkingData) {
            $scope.$on('$$back', function () {
                $state.go('app.park');
            });
            $scope.active = $parkingData.current();
            //http://api.parkwhiz.com/search/?destination=37.8100,-122.4104&key=840e0ffb46613429dd2e90c99316ff50
        }
    ]);
