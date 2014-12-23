'use strict';

angular.module('parkingCheckApp')
    .factory('$deviceListeners', [
        '$document',
        '$rootScope',
        function ($document, $rootScope) {

            function init() {
                //Device Ready
                $document[0].addEventListener('deviceReady', function (e) {
                    $rootScope.$broadcast('$$ready', {
                        eventDefault: e
                    });
                    if (window.cordova && window.cordova.plugins.Keyboard) {
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    }
                });
                //Back button
                $document[0].addEventListener('backbutton', function (e) {
                    $rootScope.$broadcast('$$back', {
                        eventDefault: e
                    });
                });
                //Menu Button
                $document[0].addEventListener('menubutton', function (e) {
                    $rootScope.$broadcast('$$menu', {
                        eventDefault: e
                    });
                });
                //Blur
                $document[0].addEventListener('blur', function (e) {
                    $rootScope.$broadcast('$$blur', {
                        eventDefault: e
                    });
                });
                //Focus
                $document[0].addEventListener('focus', function (e) {
                    $rootScope.$broadcast('$$focus', {
                        eventDefault: e
                    });
                });
                //Pause
                $document[0].addEventListener('pause', function (e) {
                    $rootScope.$broadcast('$$pause', {
                        eventDefault: e
                    });
                });
                //Resume
                $document[0].addEventListener('resume', function (e) {
                    $rootScope.$broadcast('$$resume', {
                        eventDefault: e
                    });
                });
                //online
                $document[0].addEventListener('online', function (e) {
                    $rootScope.$broadcast('$$online', {
                        eventDefault: e
                    });
                });
                //offline
                $document[0].addEventListener('offline', function (e) {
                    $rootScope.$broadcast('$$offline', {
                        eventDefault: e
                    });
                });
            }

            // Public API here
            return {
                init: init
            };
        }
    ]);