// Karma configuration
// Generated on Fri Sep 19 2014 12:16:15 GMT-0500 (CDT)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['requirejs', 'jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'src/client/apps/dashboard/tests/test-main.js',
            {pattern: 'src/client/apps/**/tests/unit/*_test.js', included: false},
            {pattern: 'src/client/apps/dashboard/controllers/*.js', included: false},
            {pattern: 'src/client/vendor/handlebars/handlebars.js', included: false},
            {pattern: 'src/client/vendor/ember/ember.js', included: false},
            {pattern: 'src/client/vendor/jquery/jquery.js', included: false},
//      {pattern: './test/**/*_test.js', included: false},
            //   {pattern: 'src/client/**/*.js', included: false}
        ],

        // list of files to exclude
        exclude: [
            'src/client/main.js'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/client/apps/dashboard/controllers/DashboardController.js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun:true
    });
};
