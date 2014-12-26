'use strict';

angular.module('parkingCheckApp')
    .controller('ParkingCtrl', [
        '$scope',
        '$state',
        '$parkingData',
        '$geocode',
        '$rootScope',
        function ($scope, $state, $parkingData, $geocode, $rootScope) {
            var activeParking = $parkingData.current();
            var mode = {
                parkNow: false,
                completed: true
            };
            $scope.isParked = !!activeParking.start;

            $scope.parkingImage = activeParking.image;
            $scope.extras = activeParking.extras || {
                level: null,
                slot: null,
                notes: null
            };

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
                if (activeParking.start) {
                    $state.go('app.park.locate', {
                        latitude: activeParking.start.coords.latitude,
                        longitude: activeParking.start.coords.longitude
                    });
                }
            };

            function onSuccess(imageURI) {
                $scope.parkingImage = 'data:image/jpeg;base64,' + imageURI;
                $parkingData.takePic($scope.parkingImage);
                onFail('Saving image inside the app');
            }

            function onFail(message) {
                $rootScope.$emit('$alert', {
                    message: message,
                    showTime: 3 * 1000
                });
            }

            $scope.needExtra = false;
            $scope.saveExtra = function () {
                if ($scope.needExtra) {
                    $parkingData.addExtras($scope.extras);
                }
                $scope.needExtra = false;
            };
            $scope.cancelExtra = function () {
                $scope.needExtra = false;
            };
            $scope.addNotes = function () {
                $scope.needExtra = !$scope.needExtra;
            };

            $scope.clickPicture = function () {
                if (window.navigator && navigator.camera) {
                    navigator.camera.getPicture(onSuccess, onFail, {
                        quality: 100,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG,
                        targetWidth: 100,
                        targetHeight: 100,
                        popoverOptions: null,
                        saveToPhotoAlbum: false
                    });
                }
                else {
                    onFail('Camera plugin unavailable');
                }
            };
        }
    ]);