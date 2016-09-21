module.exports = function(grunt) {

    grunt.initConfig({

        /* Sass configuration */
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'auto'
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['honeycomb.scss'],
                    dest: 'dist/css',
                    ext: '.css'
                }]
            }
        },

        /* Automatically add vendor-prefixes to CSS using the "Can I Use" database. */
        // Use '$ npm update caniuse-db' to update the prefixes database.
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie >= 8'],
                map: true
            },
            css: {
                src: ['dist/css/honeycomb.css']
            }
        },

        /* JSHint - Check JS syntax */
        jshint: {
            options: {
                loopfunc: true,
                expr: true,
                esnext: true
            },
            scripts: ['src/**/*.js', '!src/*/vendor/**/*'],
        },

        /* Uglify - Minify JavaScript */
        uglify: {
            options: {
                mangle: true
            },
            scripts: {
                files: {
                    'dist/js/honeycomb.min.js' : 'dist/js/honeycomb.js'
                }
            }
        },

        browserify: {
            dist: {
                options: {
                    transform: [
                        ['babelify', {}]
                    ]
                },
                files: {
                    'dist/js/honeycomb.js': 'src/honeycomb.js'
                }
            }
        },

        clean: {
            fonts: ['dist/fonts']
        },

        copy: {
            redgateFonts: {
                files: [{
                    expand: true,
                    cwd: 'src/icons/vendor/redgate/',
                    src: '**',
                    dest: 'dist/fonts/redgate/'
                }]
            },
            slickFonts: {
                files: [{
                    expand: true,
                    cwd: 'src/carousel/vendor/slick/fonts/',
                    src: '**',
                    dest: 'dist/fonts/slick/'
                }]
            },
            robotoFonts: {
                files: [{
                    expand: true,
                    cwd: 'src/type/vendor/',
                    src: '**',
                    dest: 'dist/fonts/'
                }]
            },
            imagesNavigation: {
                files: [{
                    expand: true,
                    cwd: 'src/navigation/images/',
                    src: '**',
                    dest: 'dist/images/navigation/'
                }]
            }
        },

        /* Watch scss and js and process when they're updated */
        watch: {
            sass: {
                files: ['src/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'clean', 'copy']
            },
            js: {
                files: ['src/**/*.js'],
                tasks: ['jshint', 'browserify', 'uglify']
            }
        }

    });

    // Load task plugins.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');

    // Register the default task.
    grunt.registerTask('default', 'watch');

    // Build task
    // grunt.registerTask('build', ['sass', 'autoprefixer', 'clean', 'copy', 'jshint', 'uglify']);
    grunt.registerTask('build', ['sass', 'autoprefixer', 'clean', 'copy', 'jshint', 'browserify', 'uglify']);
};
