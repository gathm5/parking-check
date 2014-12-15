'use strict';

angular.module('parkingCheckApp')
    .directive('devicePlatform', [
        '$window',
        function ($window) {
            return {
                restrict: 'EA',
                link: function (scope, element) {
                    var deviceType = 'android';
                    if ($window.cordova) {
                        deviceType = $window.cordova.platformId;
                    }
                    element[0].setAttribute('data-platform', deviceType);
                }
            };
        }
    ]);