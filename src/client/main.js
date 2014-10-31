(function (root) {
    'use strict';

    require(['config'], function (config) {
        require.config(config);

        require([
            'App',
            'ember'
        ], function (App, Ember) {

            Ember.ENV = {
                HELPER_PARAM_LOOKUPS: true
            };

            root.App = App;

            App.deferReadiness();
            setTimeout(function () {
                require(['dashboard'], function () {
                    App.advanceReadiness();
                });
            }, 0);
        });
    });
})(this);
