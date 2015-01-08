'use strict';

angular.module('parkingCheckApp')
    .filter('ignorePartialResult', function () {
        return function (input, part) {
            if (part === 'country') {
                input = input.replace(/, united states/ig, '');
            }
            return input;
        };
    });