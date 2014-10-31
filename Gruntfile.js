module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        projectDir: __dirname + '/',
        buildDir: '<%= projectDir %>build/',
        environment: grunt.option('environment') || 'local',
        buildName: grunt.option('buildName') || 'local',
        buildNumber: grunt.option('buildNumber') ||
            '<%= grunt.template.today(\'yyyymmdd_HHmmss\') %>',
        buildVersion: '0.1',

        clean: {
            cleanVendor: {
                src: ['src/client/vendor']
            },
            clientBuild: {
                src: ['<%= buildDir %>']
            },
            clientTemp: {
                src: ['<%= buildDir %>temp/']
            }
        },
        copy: {
            clientDirToTemp: {
                files: [
                    {
                        cwd: '<%= projectDir %>src/client/',
                        src: ['**/*.js', '**/*.config', '**/*.json', '**/*.css',
                            '**/*.htm', '**/*.html',
                            '**/*.hbs', '**/*.png', '**/*.gif', '**/*.jpg',
                            '**/*.jpeg', '**/*.map'],
                        dest: '<%= buildDir %>temp/client',
                        expand: true,
                        flatten: false
                    }
                ]
            },
            serverDirToStaged: {
                files: [
                    {
                        cwd: '<%= projectDir %>src/server/',
                        src: ['**/*.js', '**/*.config', '**/*.json', '**/*.css',
                            '**/*.htm', '**/*.html',
                            '**/*.hbs', '**/*.png', '**/*.gif', '**/*.jpg',
                            '**/*.jpeg', '**/*.map'],
                        dest: '<%= buildDir %>staged/server',
                        expand: true,
                        flatten: false
                    }
                ]
            }
        },
        less: {
            development: {
                files: {
                    'src/client/styles/app.css': 'src/client/styles/app.less'
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: '<%= buildDir %>temp/client/build.js',
                    dir: '<%= buildDir %>staged/client/',
                    baseUrl: '.',
                    appDir: '<%= buildDir %>temp/client',
                    done: function (done, output) {
                        var duplicates = require('rjs-build-analysis').duplicates(output);

                        if (duplicates.length > 0) {
                            grunt.log.subhead('Duplicates found in requirejs build:');
                            grunt.log.warn(duplicates);
                            return done(
                                new Error(
                                        'r.js built duplicate modules, ' +
                                        'please check the excludes option.'));
                        }

                        done();
                    }
                }
            }
        },
        jshint: {
            client: {
                src: [
                    /* directory to run jshint on */
                    'src/client/**/*.js',

                    /* directories & files to ignore */
                    '!src/client/build.js',
                    '!src/client/vendor/**'
                ],
                options: {
                    jshintrc: '.jshintrc'
                }
            },
            gruntfile: {
                src: [ 'Gruntfile.js' ],
                options: {
                    jshintrc: '.jshintrc'
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.dashboard.conf.js'
            }
        },

        bowercopy: {
            options: {
                srcPrefix: 'bower_components'
            },
            scripts: {
                options: {
                    destPrefix: 'src/client/vendor'
                },
                files: {
                    'jquery/jquery.js': 'jquery/dist/jquery.min.js',
                    'jquery/jquery.min.map': 'jquery/dist/jquery.min.map',
                    'ember/ember.js': 'ember/ember.min.js',
                    'handlebars/handlebars.js': 'handlebars/handlebars.min.js',
                    'requirejs/require.js': 'requirejs/require.js',
                    'requirejs-text/text.js': 'requirejs-text/text.js'
                }
            }
        },

        aws: grunt.file.readJSON("credentials.json"),
        s3: {
            options: {
                accessKeyId: '<%= aws.accessKeyId %>',
                secretAccessKey: '<%= aws.secretAccessKey %>',
                bucket: 'paycor.portal',
                createBucket: '<%= buildVersion %>',
                concurrency: '20',
                cacheTTL: Infinity,
                enableWeb: true,
                region: 'us-east-1',
                gzip: false,
                params: {
                    cacheControl: '654654654',
                    Expires: (new Date()) + 1000000
                }
            },
            build: {
                cwd: 'build/staged/',
                src: '**',
                dest: 'app/<%= buildVersion %>/'
            }
        },
        
//        compress: {
//            main: {
//                options: {
//                    mode: 'gzip'
//                },
//                expand: true,
//                cwd: 'build/staged/',
//                src: ['**/*'],
//                dest: 'build/staged-compressed/'
//            }
//        }
    });

    //The below was taken from to automatically load grunt tasks
    //http://bdadam.com/blog/automatically-loading-grunt-tasks-with-matchdep.html
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask('resolveBuildName', function () {
        var formatBuildNumber = function () {
                var buildNumber = grunt.config('buildNumber');

                if (grunt.config('buildName') === 'local') {
                    // for local buildNumber is yyyymmdd_hhmmss
                    return 'local.' + buildNumber;
                }

                return buildNumber;
            },
            newBuildVersion = grunt.config('buildVersion') + '.' + formatBuildNumber();
        console.log('Building new version: ', newBuildVersion);
        grunt.config.set('buildVersion', newBuildVersion);
    });
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('compileLess', function () {
        grunt.task.run('less:development');
    });
    grunt.registerTask('copyAndCleanFiles', function () {
        grunt.task.run('clean:clientBuild');
        grunt.task.run('copy:clientDirToTemp');
        grunt.task.run('copy:serverDirToStaged');
    });
    grunt.registerTask('default', ['run']);
    grunt.registerTask('run', function () {
        grunt.task.run('lint');
        console.log('need to build out this task');
    });
    grunt.registerTask('test', ['lint', 'karma']);
    grunt.registerTask('deployToAmazon', ['s3']);
    grunt.registerTask('bower', ['bowercopy']);

    grunt.registerTask('build', function () {
        grunt.task.run('resolveBuildName');
        grunt.task.run('clean:cleanVendor');
        grunt.task.run('lint');
        grunt.task.run('bower');

        grunt.task.run('karma');

        grunt.task.run('compileLess');
        grunt.task.run('copyAndCleanFiles');
        grunt.task.run('requirejs');
        grunt.task.run('clean:clientTemp');
//        grunt.task.run('compress:main');

        if (grunt.option('deploy') === true) {
            console.log('preparing to deploy');
            grunt.task.run('deployToAmazon');
        }
    });
};
