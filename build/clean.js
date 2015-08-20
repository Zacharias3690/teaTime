var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var config = require('./config');

var appFilename = [config.dest.prefix, config.dest.appPrefix].join('.');

gulp.task('clean', function() {
    return gulp.src(config.dest + "/**/*.*", {read: false})
        .pipe(rimraf());
});

gulp.task('clean-js', function() {
    return gulp.src(config.dest + '/' + appFilename + '.js', {read: false})
        .pipe(rimraf());
});

gulp.task('clean-css', function() {
    return gulp.src(config.dest + '/' + appFilename + '.css', {read: false})
        .pipe(rimraf());
});

gulp.task('clean-html', function() {
    return gulp.src(config.dest + '/' + appFilename + 'templates.js', { read: false})
        .pipe(rimraf());
});