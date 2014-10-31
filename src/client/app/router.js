define([
    'ember'
], function (Ember) {
    'use strict';

    var Router = Ember.Router.extend({
        root: Ember.Route.extend({
            index: Ember.Route.extend({
                route: '/'
            })
        })
    });

    Router.map(function () {
        this.resource('employee');
        this.resource('dashboard');
    });

    return Router;
});