'use strict';

angular.module('parkingCheckApp')
    .factory('$parkingData', [
        '$localStorage',
        function ($localStorage) {
            var storageKey = 'parking-data';

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

            function addImageToStorage(picUri) {
                $localStorage[storageKey].active.image = picUri;
            }

            function addExtrasToStorage(extras) {
                $localStorage[storageKey].active.extras = extras;
            }

            function getActive() {
                return readFromStorage(storageKey).active;
            }

            function isActive() {
                return getActive().start;
            }

            function startParking(parkingData) {
                var db = readFromStorage(storageKey);
                db.active.start = parkingData;
                storeInStorage(storageKey, db);
            }

            function endActiveParking(parkingData) {
                var pushData = {
                    start: isActive(),
                    end: parkingData
                };
                var db = readFromStorage(storageKey);
                db.history.unshift(pushData);
                db.active = {};
                storeInStorage(storageKey, db);
                return pushData;
            }

            function getHistory() {
                return readFromStorage(storageKey).history;
            }

            return {
                current: getActive,
                started: isActive,
                start: startParking,
                end: endActiveParking,
                history: getHistory,
                takePic: addImageToStorage,
                addExtras: addExtrasToStorage
            };
        }
    ]);