'use strict';

angular.module('parkingCheckApp')
    .directive('screenSize', function () {
        return {
            restrict: 'A',
            scope: {
                screenSize: '@'
            },
            link: function postLink(scope, element) {
                function resize() {
                    if (scope.screenSize) {
                        element.css({
                            height: (window.innerHeight - parseFloat(scope.screenSize)) + 'px'
                        });
                    }
                }

                resize();
                window.addEventListener('deviceorientation', resize, false);
            }
        };
    });