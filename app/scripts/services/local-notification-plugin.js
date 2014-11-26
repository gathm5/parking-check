'use strict';

angular.module('parkingCheckApp')
    .service('NotificationService', [
        function LocalNotificationPlugin() {
            // AngularJS will instantiate a singleton by calling "new" on this function
            function add(notification, callback, $scope) {
                window.plugin.notification.local.add({
                    id: notification.id,  //(String) A unique id of the notifiction
                    date: notification.date,    //(Date) This expects a date object
                    message: notification.message,  //(String) The message that is displayed
                    title: notification.title,  //(String) The title of the message
                    repeat: notification.repeat,  //(String) Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
                    badge: notification.badge,  //(Number) Displays number badge to notification
                    sound: notification.sound,  //(String) A sound to be played
                    json: notification.json,  //(String) Data to be passed through the notification
                    autoCancel: notification.autoCancel || true, //(Boolean) Setting this flag and the notification is automatically canceled when the user clicks it
                    ongoing: notification.ongoing || true //(Boolean) Prevent clearing of notification (Android only)
                }, callback, $scope);
            }

            this.ready = function () {

            };
        }
    ]);
