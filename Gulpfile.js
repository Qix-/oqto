/**
 * Oqto
 *
 *	Gulpfile / build script for Oqto
 *
 *  I hate Gulp...
 */

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var pegcoffee = require('pegjs-coffee-plugin');
var peg = require('gulp-peg');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var shell = require('gulp-shell');
var preprocess = require('gulp-preprocess');

gulp.task('clean', function() {
	gulp.src(
		[
			'bin',
			'lib',
			'dev'
		], {read: false})
		.pipe(clean());
});

gulp.task('src-lib', function() {
	gulp.src('./src/lib/**/*.coffee')
		.pipe(coffee())
		.pipe(rename(function(path) {
				path.dirname = path.dirname.replace('src/lib/', '')
			}))
		.pipe(gulp.dest('lib'));
});

gulp.task('src-bin', function() {
	gulp.src('./src/oqto.coffee')
		.pipe(coffee())
		.pipe(rename(function(path) {
				path.dirname = path.dirname.replace('src/', '')
			}))
		.pipe(gulp.dest('bin'));
});

gulp.task('src-grammar', function() {
	gulp.src('./src/grammar/oqto-ccs.peg')
		.pipe(preprocess())
		.pipe(peg({plugins:[pegcoffee]}))
		.pipe(rename(function(path) {
				path.dirname = path.dirname.replace('src/', '')
			}))
		.pipe(gulp.dest('lib/grammar'));
});

gulp.task('watch-grammar', function() {
	gulp.watch('src/grammar/**/*.peg', ['src-grammar']);
});

gulp.task('default', ['src-bin', 'src-lib', 'src-grammar'], function() {});