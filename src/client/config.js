define({
    "appName": "App",
    "baseUrl": ".",
    "appDir": ".",
    "shim": {
        "ember": {
            "deps": ["handlebars", "jquery"],
            "exports": "Ember"
        }
    },
    "packages": [
        "dashboard"
    ],
    "paths": {
        "text": "vendor/requirejs-text/text",
        "domReady": "vendor/requirejs-domready/domReady",

//        "dashboard": "https://s3.amazonaws.com/paycor/main.js?123654",
        "dashboard": "apps/dashboard",
        "App": "app/main",
        "models": "app/models",
        "views": "app/views",
        "controllers": "app/controllers",
        "templates": "app/templates",

        /*
         vendor libs
         */
        "jquery": "vendor/jquery/jquery",
        "handlebars": "vendor/handlebars/handlebars",
        "ember": "vendor/ember/ember"
    }
});