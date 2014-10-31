requirejs.config({
    "baseUrl": ".",
    "appDir": ".",
    "dir": "../../build/client",
    keepBuildDir: false,
    "shim": {
        "ember": {
            "deps": ["handlebars", "jquery"],
            "exports": "Ember"
        }
    },
    fileExclusionRegExp:/tests/,
    skipDirOptimize: true,
    preserveLicenseComments:true,

    "packages": [
        "dashboard"
    ],
    "paths": {
        "text": "vendor/requirejs-text/text",
        "hbs": "vendor/requirejs-plugins/hbs",

        "dashboard": "apps/dashboard",
        "App": "app/main",
        "models": "app/models",
        "views": "app/views",
        "controllers": "app/controllers",
        "templates": "app/templates",

        "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min",
        "handlebars": "http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.min.js",
        "ember": "http://cdnjs.cloudflare.com/ajax/libs/ember.js/1.7.0/ember.min.js"
    },

    "hbs": {
        "disableI18n": "true",
        "templateExtension": "html"
    },

    "optimize": "uglify2",
    "uglify2": {
        // does not do extra work to ensure IE8 works
        screw_ie8: true,
        // leaves line breaks
        beautify: true,
        // amount if indention per line
        // (set to zero - indentions are 4 spaces, and adds up
        // to a lot of bytes)
        indent_start: 0,
        indent_level: 0
    },

    "modules": [
        {
            name: 'App',
            path: 'app/main',
            exclude: [
                'ember',
                'handlebars',
                'jquery',
                'text'
            ],
            include: [
                'app/router'
            ]
        },
        {
            name: 'dashboard',
            exclude: [
                'app/main',
                'ember',
                'handlebars',
                'jquery',
                'text',
                'App'
            ]
        }
    ]
});