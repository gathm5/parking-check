'use strict';

angular.module('parkingCheckApp')
    .filter('parkingTime', function () {
        return function (input) {
            if (!input) {
                return;
            }
            var date = moment(input);
            return date.fromNow();
        };
    });