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

            function storeInStorage(key, value) {
                if ($localStorage[key] && value) {
                    $localStorage[key] = value;
                }
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
                storeInStorage('parking-data', db);
            }

            function endActiveParking(parkingData) {
                var pushData = {
                    start: isActive(),
                    end: parkingData
                };
                var db = readFromStorage('parking-data');
                db.history.unshift(pushData);
                db.active = {};
                storeInStorage('parking-data', db);
                return pushData;
            }

            function getHistory() {
                return readFromStorage('parking-data').history;
            }

            return {
                current: getActive,
                started: isActive,
                start: startParking,
                end: endActiveParking,
                history: getHistory
            };
        }
    ]);