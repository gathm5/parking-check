'use strict';

angular.module('parkingCheckApp')
    .directive('geoLink', [
        '$config',
        function ($config) {
            return {
                template: function () {
                    var link = '<a class="map-link" '
                        + 'data-ng-href="{{prefix}}{{geo.latitude}},{{geo.longitude}}{{suffixLink}}"'
                        + ' data-rel="external" data-ng-transclude></a>';
                    return link;
                },
                restrict: 'E',
                transclude: true,
                replace: true,
                scope: {
                    geo: '=',
                    suffix: '='
                },
                link: function (scope) {
                    var deviceType = document.body.dataset.platform || 'web';
                    scope.deviceType = deviceType;
                    switch (deviceType.toLowerCase()) {
                        case 'android':
                            scope.prefix = 'geo:';
                            if (scope.suffix && false) {
                                scope.suffixLink = '?q=' + scope.suffix.latitude + ',' + scope.suffix.longitude + '&mode=w';
                            }
                            break;
                        case 'ios':
                            scope.prefix = 'comgooglemaps://';
                            break;
                        default:
                            scope.prefix = $config.map.linkType1;
                    }
                }
            };
        }
    ]);