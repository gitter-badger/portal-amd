define([
    'App',
    './views/DashboardView',
    './controllers/DashboardController',
    './route'
], function (App, DashboardView, DashboardController, Route) {
    'use strict';

    App.DashboardView = DashboardView;
    App.DashboardController = DashboardController;
    App.DashboardRoute = Route;
});