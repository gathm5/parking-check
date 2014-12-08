'use strict';

angular.module('parkingCheckApp')
    .directive('geoLink', [
        '$config',
        function ($config) {
            return {
                template: function () {
                    return '<a data-ng-transclude="" href="{{prefix}}{{geo.latitude}},{{geo.longitude}}"></a>';
                },
                restrict: 'E',
                transclude: true,
                replace: true,
                scope: {
                    geo: '='
                },
                link: function (scope) {
                    var deviceType = document.body.dataset.platform || 'web';
                    switch (deviceType.toLowerCase()) {
                        case 'android':
                            scope.prefix = 'geo:';
                            break;
                        case 'ios':
                            scope.prefix = 'map:';
                            break;
                        default:
                            scope.prefix = $config.map.linkType1;
                    }
                }
            };
        }
    ]);