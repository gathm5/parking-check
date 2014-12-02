'use strict';

angular.module('parkingCheckApp')
    .directive('parkingButton', function () {
        return {
            templateUrl: '/views/directives/parking-button.html',
            restrict: 'E',
            scope: {
                clicker: '='
            },
            replace: true,
            required: 'clicker'
        };
    });