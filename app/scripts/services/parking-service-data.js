'use strict';

angular.module('parkingCheckApp')
    .factory('$parkingData', [
        '$localStorage',
        function ($localStorage) {
            function readFromStorage(key) {
                if (!$localStorage[key]) {
                    $localStorage[key] = {
                        active: {},
                        history: []
                    };
                }
                return $localStorage[key];
            }

            function getActive() {
                return readFromStorage('parking-data').active;
            }

            function isActive() {
                return getActive().start;
            }

            function startParking(parkingData) {
                var db = readFromStorage('parking-data');
                db.active.start = parkingData;
            }

            function endActiveParking(parkingData) {
                var pushData = {
                    start: isActive(),
                    end: parkingData
                }
                var db = readFromStorage('parking-data');
                db.history.unshift(pushData);
                return true;
            }

            function getHistory() {
                return readFromStorage('parking-data').history;
            }

            return {
                start: startParking,
                end: endActiveParking,
                history: getHistory
            };
        }
    ]);
