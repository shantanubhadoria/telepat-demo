/*******************************************************************************
 *  Dependencies
 */
var gulp = require('gulp');
var log = require('gulp-util').log;
var rename = require('gulp-rename');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');
var opn = require('opn');

/*******************************************************************************
 *  Configurations
 */
var config = {
    watch: './src/**/*.*',
    server: {
        host: '0.0.0.0',
        port: '3000',
        path: 'dist/'
    },
    html: {
        src: ['./src/**.jade'],
        destination: 'dist/'
    },
    css: {
        src: './src/styles/style.styl',
        destination: 'dist/css'
    },
    js: {
        src: ['./src/js/**', './bower_components/telepat-js/dist/*'],
        destination: 'dist/js'
    }
};

/*******************************************************************************
 *  Webserver up and running
 */
gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            host: config.server.host,
            port: config.server.port,
            livereload: false,
            directoryListing: false
        }));
});

/*******************************************************************************
 *  Open the browser
 */
gulp.task('openbrowser', function() {
    opn('http://'+ config.server.host +':'+ config.server.port + config.server.path);
});

/*******************************************************************************
 *  Jade task (optional to change the name of the file)
 */
gulp.task('templates', function() {
    var locs = {};
    gulp.src(config.html.src)
        .pipe(plumber())
        .pipe(jade({ locals: locs }))
        //.pipe(rename('index.html'))
        .pipe(gulp.dest(config.html.destination));
});

/*******************************************************************************
 *  Watch task
 */
gulp.task('watch', function() {
    log('Watching files');
    gulp.watch(config.watch, ['build']);
});

/*******************************************************************************
 *  Command line task commands
 */
gulp.task('build', ['templates', 'styles', 'scripts']);
gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);
