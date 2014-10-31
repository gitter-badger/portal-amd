define(
    function () {
        'use strict';

        var DashboardRoute = Ember.Route.extend({
            model: function () {
                return {
                    id: 1,
                    hoursWorked: 378
                };
            },
            setupController: function (controller, model) {
                controller.set('content', model);
            }
        });

        return DashboardRoute;
    });