'use strict';

angular.module('parkingCheckApp')
    .directive('smsSend', function () {
        return {
            template: '<a class="sms-link" ng-href="link">{{title}}</a>',
            restrict: 'E',
            replace: true,
            scope: {
                message: '@',
                title: '@'
            },
            link: function postLink(scope) {
                var link = 'sms:?body=' + scope.message;
                scope.link = link;
            }
        };
    });
