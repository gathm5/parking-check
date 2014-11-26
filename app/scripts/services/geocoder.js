'use strict';

angular.module('parkingCheckApp')
    .factory('$geocode', [
        '$q',
        function GeoLocationService($q) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            return {
                geocode: function ($scope, options) {
                    var deferred = $q.defer();
                    var geoOptions = {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    };
                    if (options && options.timeout) {
                        geoOptions.timeout = options.timeout;
                    }
                    if (navigator && navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            $scope.$apply(function () {
                                deferred.resolve(position);
                            });
                        }, function (error) {
                            switch (error.code) {
                                case 1:
                                    $scope.$apply(function () {
                                        deferred.reject('You have rejected access to your location!');
                                    });
                                    break;
                                case 2:
                                    $scope.$apply(function () {
                                        deferred.reject('Unable to determine your location. Please try again!');
                                    });
                                    break;
                                case 3:
                                    $scope.$apply(function () {
                                        deferred.reject('Unable to determine your location. Please make sure your GPS is enabled!');
                                    });
                                    break;
                            }
                        }, geoOptions);
                    }
                    else {
                        deferred.reject('Browser does not support location services');
                    }
                    return deferred.promise;
                }
            };
        }
    ]);