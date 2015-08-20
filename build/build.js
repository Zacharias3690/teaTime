var gulp = require('gulp');
var babel = require('gulp-babel');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var config = require('./config');
var sass = require('gulp-sass');
var templateCache = require('gulp-angular-templatecache');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var cache = require('gulp-cached');
var remember = require('gulp-remember');
var uglify = require('gulp-uglify');

var appFilename = [config.dest.prefix, config.dest.appPrefix].join(".");

gulp.task('build', function(cb) {
    runSequence('clean', ['build-js', 'build-css', 'build-html', 'move-resources', 'jshint'], cb);
});

gulp.task('publish-app', function(cb) {
    runSequence('clean', ['publish-js', 'build-css', 'build-html', 'move-resources', 'jshint'], cb);
});

gulp.task('build-js', ['clean-js'], function() {
    return gulp.src(config.app.js)
        .pipe(cache('build'))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(ngAnnotate())
        .pipe(remember('build'))
        .pipe(concat(appFilename + '.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest.base));
});

gulp.task('publish-js', ['clean-js'], function() {
    return gulp.src(config.app.js)
        .pipe(plumber())
        .pipe(babel())
        .pipe(ngAnnotate())
        .pipe(concat(appFilename + '.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.dest.base));
});

gulp.task('jshint', function() {
    return gulp.src(config.app.js)
        .pipe(cache('hint'))
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-css', ['clean-css'], function() {
    return gulp.src(config.app.css)
        .pipe(cache('css'))
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(remember('css'))
        .pipe(concat(appFilename + '.css'))
        .pipe(sass({includePaths: config.app.cssInclude}))
        .pipe(gulp.dest(config.dest.base));
});

gulp.task('build-html', ['clean-html'], function() {
    return gulp.src(config.app.html)
        .pipe(templateCache(appFilename + '.templates.js', {module: config.app.templateName, standalone: true}))
        .pipe(gulp.dest(config.dest.base));
});

gulp.task('move-resources', ['clean'], function() {
    return gulp.src(config.app.resources)
        .pipe(gulp.dest(config.dest.base));
});

function handleError(err) {
    console.log();
    console.log();
    console.log(gutil.colors.red('-------------------------------------'));
    console.log(gutil.colors.red("Error:"), gutil.colors.red(err.message));
    console.log(gutil.colors.red("Plugin:"), gutil.colors.red(err.plugin));
    console.log(err.fileName);
    console.log(gutil.colors.gray("\tLine Number: " + err.lineNumber));
    console.log(gutil.colors.red('-------------------------------------'));

    console.log();
    console.log();
    this.emit('end');
}