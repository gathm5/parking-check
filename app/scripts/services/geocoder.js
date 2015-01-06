'use strict';

(function () {
    navigator.geolocation.getAccurateCurrentPosition = function (geolocationSuccess, geolocationError, geoprogress, options) {
        var lastCheckedPosition,
            locationEventCount = 0,
            watchID,
            timerID;

        options = options || {};

        var checkLocation = function (position) {
            lastCheckedPosition = position;
            locationEventCount = locationEventCount + 1;
            // We ignore the first event unless it's the only one received because some devices seem to send a cached
            // location even when maxaimumAge is set to zero
            if ((position.coords.accuracy <= options.desiredAccuracy) && (locationEventCount > 1)) {
                clearTimeout(timerID);
                navigator.geolocation.clearWatch(watchID);
                foundPosition(position);
            } else {
                geoprogress(position);
            }
        };

        var stopTrying = function () {
            navigator.geolocation.clearWatch(watchID);
            foundPosition(lastCheckedPosition);
        };

        var onError = function (error) {
            clearTimeout(timerID);
            navigator.geolocation.clearWatch(watchID);
            geolocationError(error);
        };

        var foundPosition = function (position) {
            geolocationSuccess(position);
        };

        if (!options.maxWait)            options.maxWait = 10000; // Default 10 seconds
        if (!options.desiredAccuracy)    options.desiredAccuracy = 20; // Default 20 meters
        if (!options.timeout)            options.timeout = options.maxWait; // Default to maxWait

        options.maximumAge = 0; // Force current locations only
        options.enableHighAccuracy = true; // Force high accuracy (otherwise, why are you using this function?)

        watchID = navigator.geolocation.watchPosition(checkLocation, onError, options);
        timerID = setTimeout(stopTrying, options.maxWait); // Set a timeout that will abandon the location loop
    };
}());

angular.module('parkingCheckApp')
    .factory('$geocode', [
        '$config',
        '$q',
        function GeoLocationService($config, $q) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            function errorHandler(error, $scope, deferred) {
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
            }

            return {
                geocode: function ($scope, options) {
                    var deferred = $q.defer();
                    var geoOptions = {
                        enableHighAccuracy: true,
                        timeout: $config.geoConfig.timeout,
                        maximumAge: 0
                    };
                    if (options && options.timeout) {
                        geoOptions.timeout = options.timeout;
                    }
                    if (navigator && navigator.geolocation) {
                        if (navigator.geolocation.getAccurateCurrentPosition && $config.geoConfig.alternate) {
                            navigator.geolocation.getAccurateCurrentPosition(function (position) {
                                $scope.$apply(function () {
                                    deferred.resolve(position);
                                });
                            }, function (error) {
                                errorHandler(error, $scope, deferred);
                            }, function (update) {
                                $scope.$apply(function () {
                                    if (update.coords) {
                                        deferred.resolve(update);
                                    }
                                    else {
                                        deferred.notify(update);
                                    }
                                });
                            }, geoOptions);
                        }
                        else {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                $scope.$apply(function () {
                                    deferred.resolve(position);
                                });
                            }, function (error) {
                                errorHandler(error, $scope, deferred);
                            }, geoOptions);
                        }
                    }
                    else {
                        deferred.reject('Browser does not support location services');
                    }
                    return deferred.promise;
                },
                watch: function ($scope, options) {
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
                        navigator.geolocation.watchPosition(function (position) {
                            $scope.$apply(function () {
                                deferred.resolve(position);
                            });
                        }, function (error) {
                            errorHandler(error, $scope, deferred);
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