/* eslint-env node */

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('default', ['watch']);

gulp.task('watch', ['server'], function() {
    gulp.watch('./*.html', browserSync.reload);
    gulp.watch('./js/**/*.js', browserSync.reload);
});

gulp.task('inject', function() {
    return gulp
        .src('./css/**/*.css')
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp
        .src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

// on windows use 'chrome' instead of 'google chrome'
gulp.task('server', function() {
    browserSync.init({
        browser: ['google chrome'],
        open: 'local',
        server: {
            baseDir: '.'
        }
    });
});
