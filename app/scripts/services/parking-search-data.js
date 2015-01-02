'use strict';

angular.module('parkingCheckApp')
    .service('ParkingSearchData', [
        '$q',
        '$http',
        '$sessionStorage',
        '$config',
        function ParkingSearchData($q, $http, $sessionStorage, $config) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            var that = this;

            this.lastActiveSearch = null;

            this.callApi = function (destination) {

                var url = $config.api.builder(destination);
                var deferred = $q.defer();

                $sessionStorage.parkingSearches = $sessionStorage.parkingSearches || {};

                if ($sessionStorage.parkingSearches &&
                    $sessionStorage.parkingSearches[destination.destination] &&
                    Math.floor(moment.duration(moment().diff(moment($sessionStorage.parkingSearches[destination.destination].cacheTime))).asMinutes()) < 5) {
                    that.lastActiveSearch = destination.destination;
                    deferred.resolve($sessionStorage.parkingSearches[destination.destination].data)
                }
                else {
                    $http
                        .get(url)
                        .then(function (output) {
                            if (output.data.parking_listings) {
                                $sessionStorage.parkingSearches[destination.destination] = {
                                    cacheTime: new Date().getTime(),
                                    data: output.data
                                };
                                deferred.resolve(output.data);
                                that.lastActiveSearch = destination.destination;
                            }
                            else {
                                deferred.reject('No parking information found.');
                                that.lastActiveSearch = destination.destination;
                            }
                        }, function (reason) {
                            deferred.reject(reason);
                            that.lastActiveSearch = null;
                        });
                }
                return deferred.promise;
            }
        }
    ]);