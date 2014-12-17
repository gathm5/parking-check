'use strict';

angular.module('parkingCheckApp')
    .constant('$transitConfig', {
        example: [
            'http://www.mapquestapi.com/directions/v2/route?key=Fmjtd%7Cluurn1uz2u%2Cbl%3Do5-9wyx50&from=37.973591,-122.532823&to=37.973489,-122.532030&routeType=pedestrian',
            'key=Fmjtd%7Cluurn1uz2u%2Cbl%3Do5-9wyx50',
            'callback=renderAdvancedNarrative',
            'ambiguities=ignore',
            'avoidTimedConditions=false',
            'doReverseGeocode=true',
            'outFormat=json',
            'routeType=fastest',
            'timeType=1',
            'enhancedNarrative=false',
            'shapeFormat=raw',
            'generalize=0',
            'locale=en_US',
            'unit=m',
            'from=Clarendon%20Blvd,%20Arlington,%20VA',
            'to=2400%20S%20Glebe%20Rd,%20Arlington,%20VA',
            'drivingStyle=2',
            'highwayEfficiency=21.0'
        ],
        url: 'http://www.mapquestapi.com/directions/v2/route?key=Fmjtd%7Cluurn1uz2u%2Cbl%3Do5-9wyx50',
        configuration: {
            ambiguities: 'ignore',
            routeType: 'pedestrian',
            from: 'Clarendon%20Blvd,%20Arlington,%20VA',
            to: '2400%20S%20Glebe%20Rd,%20Arlington,%20VA'
        }
    })
    .service('$transit', [
        '$http',
        '$transitConfig',
        function TransitServiceApi($http, $transitConfig) {
            // AngularJS will instantiate a singleton by calling 'new' on this function
            var serviceUrl = $transitConfig.url;
            var params = $transitConfig.configuration;

            this.get = function (fromGeo, toGeo) {
                params.from = fromGeo.latitude + ',' + fromGeo.longitude;
                params.to = toGeo.latitude + ',' + toGeo.longitude;
                return $http.get(serviceUrl, {
                    params: params
                });
            }
        }
    ]);