'use strict';

angular.module('parkingCheckApp')
    .directive('parkingButton', function () {
        return {
            templateUrl: '/views/directives/parking-button.html',
            restrict: 'E',
            scope: {
                toggle: '='
            },
            replace: true,
            required: 'toggle',
            link: function postLink(scope) {
                scope.ClickParking = function () {
                    scope.toggle = !scope.toggle;
                };
            }
        };
    });