/**
 *  Gulpfile for managing/building front-end services.
 *
 *  run `gulp watch` to watch for all changes in ./public/css and ./public/js
 *
 */

// Gulp dependencies
var gulp = require('gulp'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    stringify = require('stringify'),
    minifycss = require('gulp-minify-css');

function logErrorAndIgnore(err) {
    console.log(err.toString());
    this.emit('end');
}

// Path config to CSS/JS/etc.
var paths = {
    js: {
        main: "./public/js/main.js",
        source: "./public/js/**/*.js",
        target: "./public/build/js/",
        name: "questioneer.js"
    },
    css: {
        source: "./public/css/**/*.scss",
        target: "./public/build/css/"
    }
};

gulp.task('scripts', function () {
    // Run browserify on the main file and send to the target destination
    var bundler = browserify({
        entries: [paths.js.main]
    });

    var bundle = function () {
        return bundler
            .transform(stringify(['.html']))
            .bundle()
            .pipe(source(paths.js.name))
            .pipe(gulp.dest(paths.js.target));
    };

    return bundle();
});

/*
gulp.task('scripts', function () {
    // Run browserify on the main file and send to the target destination
    return browserify(paths.js.main)
        .bundle()
        .pipe(source('scripts.js'))
        .on('error', logErrorAndIgnore)
        // TODO: uglify for non dev
        .pipe(gulp.dest(paths.js.target));
});
*/

gulp.task('sass', function () {
    return gulp.src(source)
      .pipe(sass())
      .on("error", logErrorAndIgnore)
      .pipe(minifycss())
      // pipe to build
      .pipe(gulp.dest(paths.css.target));
});

gulp.task('watch', function() {
    // When files change, update
    gulp.watch(paths.js.source, ['scripts']);
    gulp.watch(paths.css.source, ['sass']);
});