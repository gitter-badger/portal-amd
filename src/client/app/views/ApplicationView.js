define([
    'ember',
    'text!templates/applicationTemplate.hbs'
], function (Ember, applicationTemplate) {
    'use strict';

    var ApplicationView = Ember.View.extend({
        defaultTemplate: Ember.Handlebars.compile(applicationTemplate)
    });

    return ApplicationView;
});