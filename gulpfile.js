var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');

gulp.task('build-app', function () {
    return gulp
		.src('./app/**/*.ts')
        .pipe(ts({
                noImplicitAny: true,
                out: 'main.min.js'
            }))
		.pipe(uglify())
        .pipe(gulp.dest('./build'));
});

gulp.task('build-scss', function () {
    return gulp
		.src('./assets/sass/*.scss')
        .pipe(sass({
                outputStyle: 'compressed'
            }))
        .pipe(gulp.dest('./build'));
});

gulp.task('build', ['build-app', 'build-scss'], function() {});


gulp.task('default', [], function() {});