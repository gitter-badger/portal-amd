define([
    'ember',
    'text!./../templates/dashboard.hbs'
], function (Ember, dashboardTemplate) {
    'use strict';

    var DashboardView = Ember.View.extend({
        template: Ember.Handlebars.compile(dashboardTemplate)
    });

    return DashboardView;
});