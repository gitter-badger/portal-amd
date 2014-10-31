define([
    'ember',
    './views/ApplicationView',
    './controllers/ApplicationController',
    'app/router'
], function (Ember, ApplicationView, ApplicationController, Router) {
    'use strict';

    var App = Ember.Application.create({});

    App.ApplicationView = ApplicationView;
    App.ApplicationController = ApplicationController;
    App.Router = Router;

    App.LazyLoaderMixin = Ember.Mixin.create({
        beforeModel: function () {
            var appName = this.get('appName');
            if (!appName) {
                throw new Error('You must specify `appName` when using the LazyLoaderMixin!');
            } else if (!App.LazyLoaderMixin.loaded[appName]) {
                return new Ember.RSVP.Promise(function (resolve) {
                    require([appName], function () {
                        console.log('lazy loading.');
                        App.LazyLoaderMixin.loaded[appName] = true;

                        resolve();
                    });
                });
            }
        }
    });

    App.LazyLoaderMixin.loaded = {};

    App.DashboardRoute = Ember.Route.extend(App.LazyLoaderMixin, { appName: 'dashboard' });

    return App;

});