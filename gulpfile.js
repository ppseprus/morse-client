var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
//var sass = require('gulp-sass');

gulp.task('build-js', function () {
    return gulp
		.src('./app/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'main.min.js'
        }))
		.pipe(uglify())
        .pipe(gulp.dest('build'));
});

//gulp.task('watch-js', ['build-js'], function() {
//	gulp.watch('./app/**/*.ts', ['ts-js']);
//});

// default task
gulp.task('default', [], function() {
		
	// default task
});