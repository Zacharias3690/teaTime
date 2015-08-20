var gulp = require('gulp');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var minCss = require('gulp-minify-css');
var order = require('gulp-order');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var config = require('./config');
var debug = require('gulp-debug');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');

var vendorFilename = [config.dest.prefix, config.dest.vendorPrefix].join(".");

gulp.task('bower', function(cb) {
    runSequence('clean', ['bower-js', 'bower-css', 'bower-resources'], cb);
});

gulp.task('publish-bower', function(cb) {
    runSequence('clean', ['bower-js-publish', 'bower-css', 'bower-resources'], cb);
});

gulp.task('bower-js', ['clean'], function() {

    var minFilter = filter(['!**/*.min.js'], {restore: true});

    var bowerFiles = gulp.src(mainBowerFiles("**/*.js"), {base: 'bower_components'});

    var libFiles = gulp.src(config.vendor.libs.js);

    return merge(bowerFiles, libFiles)
        .pipe(sourcemaps.init())
        .pipe(order(config.vendor.order))
        .pipe(concat(vendorFilename + ".js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest.base));
});

gulp.task('bower-js-publish', ['clean'], function() {

    var minFilter = filter(['!**/*.min.js']);

    var bowerFiles = gulp.src(mainBowerFiles(), {base: 'bower_components'})
        .pipe(filter("**/*.js"));

    var libFiles = gulp.src(config.vendor.libs.js);

    return merge(bowerFiles, libFiles)
        .pipe(sourcemaps.init())
        .pipe(order(config.vendor.order))
        .pipe(concat(vendorFilename + '.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest.base));
});

gulp.task('bower-css', ['clean'], function() {

    var minFilter = filter(['!**/*.min.css'], {restore: true});
    var libFilter = filter(['!**/*.min.css'], {restore: true});

    var bowerFiles = gulp.src(mainBowerFiles('**/*.css'), { base: 'bower_components'})
        .pipe(minFilter)
        .pipe(minCss())
        .pipe(minFilter.restore);

    var libFiles = gulp.src(config.vendor.libs.css)
        .pipe(libFilter)
        .pipe(minCss())
        .pipe(libFilter.restore);

    return merge(bowerFiles, libFiles)
        .pipe(concat(vendorFilename + '.css'))
        .pipe(gulp.dest(config.dest.base));
});

gulp.task('bower-resources', ['clean'], function() {
    return gulp.src(config.vendor.fonts)
        .pipe(gulp.dest(config.dest.base + "/fonts"));
});