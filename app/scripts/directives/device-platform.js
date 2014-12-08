'use strict';

angular.module('parkingCheckApp')
    .directive('devicePlatform', [
        '$window',
        function ($window) {
            return {
                restrict: 'EA',
                link: function (scope, element) {
                    var deviceType = 'web';
                    if ($window.device) {
                        deviceType = $window.device.platform;
                    }
                    element[0].setAttribut4e('data-platform', deviceType);
                }
            };
        }
    ]);