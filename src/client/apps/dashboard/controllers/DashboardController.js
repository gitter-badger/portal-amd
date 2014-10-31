define([
    'ember'
], function (Ember) {
    'use strict';

    var DashboardController = Ember.ObjectController.extend({
        newProperty: 'some value here to test later',
        usersLoggedIn: 132
    });

    return DashboardController;
});