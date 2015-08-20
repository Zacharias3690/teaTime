var gulp = require('gulp');
var watch = require('gulp-watch');

var dir = require('require-dir')('./build');
var config = dir.config;

gulp.task('default', ['build', 'bower'], function() {

    watch(config.app.js, function() {
        gulp.start('build-js');
        gulp.start('jshint');
    });

    watch(config.app.css, function() {
        gulp.start('build-css');
    });

    watch(config.app.html, function() {
        gulp.start('build-html');
    });
});

gulp.task('publish', ['publish-app', 'publish-bower'], function() {

});