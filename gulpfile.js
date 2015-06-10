var gulp = require('gulp'),
		browserify = require('gulp-browserify'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		coffee = require('gulp-coffee'),
		jade = require('gulp-jade'),
		jshint = require('gulp-jshint');

gulp.task('lint', ['coffee'], function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('coffee', function(){
	return gulp.src('src/coffee/*.coffee')
		.pipe(coffee())
		.pipe(gulp.dest('src/js/coffee'));
});

gulp.task('scripts', ['lint', 'coffee'], function(){
	return gulp.src('src/js/**/*.js')
		.pipe(concat('all.min.js'))
		.pipe(browserify())
		.pipe(uglify())
		.pipe(gulp.dest('build/development/js'));
});

gulp.task('jade', ['scripts'], function(){
	return gulp.src('src/templates/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('build/development'));
});

gulp.task('default', ['lint', 'jade']);
