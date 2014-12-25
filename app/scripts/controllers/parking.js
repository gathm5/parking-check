'use strict';

angular.module('parkingCheckApp')
    .controller('ParkingCtrl', [
        '$scope',
        '$state',
        '$parkingData',
        '$geocode',
        function ($scope, $state, $parkingData, $geocode) {
            var activeParking = $parkingData.started();
            var mode = {
                parkNow: false,
                completed: true
            };
            $scope.isParked = !!activeParking;
            $scope.parkingControl = function () {
                if ($scope.isParked === mode.parkNow) {
                    $scope.isParked = mode.completed;
                    $geocode
                        .geocode($scope)
                        .then(function (location) {
                            $parkingData.start(location);
                        });
                }
                else if ($scope.isParked === mode.completed) {
                    $scope.isParked = mode.parkNow;
                    $parkingData.end({
                        timestamp: new Date().getTime()
                    });
                }
            };
            $scope.openInMaps = function () {
                if (activeParking) {
                    $state.go('app.park.locate', {
                        latitude: activeParking.coords.latitude,
                        longitude: activeParking.coords.longitude
                    });
                }
            };

            function onSuccess(imageData) {
                $scope.parkingImage = "data:image/jpeg;base64," + imageData;
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }

            $scope.clickPicture = function () {
                navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL
                });
            };
        }
    ]);