'use strict';

angular.module('parkingCheckApp')
    .directive('parkingListItem', function () {
        return {
            templateUrl: '/views/directives/parking-list-item.html',
            restrict: 'E',
            scope: {
                parking: '=listItem'
            },
            replace: true,
            required: 'listItem'
        };
    });