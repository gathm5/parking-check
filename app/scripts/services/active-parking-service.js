'use strict';

angular.module('parkingCheckApp')
    .service('$parking', [
        '$localStorage',
        function ActiveParkingService($localStorage) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            if (!$localStorage.parkings) {
                $localStorage.parkings = [];
            }

            function register(location, mode) {
                $localStorage[mode] = {
                    location: location, date: new Date()
                };
            }

            function clear() {
                $localStorage.started = null;
                $localStorage.ended = null;
            }

            this.isStarted = function () {
                return $localStorage.started;
            };

            this.isEnded = function () {
                return $localStorage.ended;
            };

            this.parked = function (location, mode) {
                if (mode === 'start') {
                    register(location, 'started');
                }
                else if (mode === 'end') {
                    register(location, 'ended');
                    $localStorage.parkings.push({
                        start: $localStorage.started,
                        end: $localStorage.ended
                    });
                    clear();
                }
            };
        }
    ]);