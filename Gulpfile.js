/**
 * Oqto
 *
 *	Gulpfile / build script for Oqto
 *
 *  I hate Gulp...
 */

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var peg = require('gulp-peg');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var shell = require('gulp-shell');

gulp.task('clean', function() {
	gulp.src(
		[
			'bin',
			'lib',
			'dev'
		], {read: false})
		.pipe(clean());
});

gulp.task('build-deps', function() {
	console.log('Building dependencies (this might take a second...)');
	gulp.src('')
		.pipe(shell(
			[
				'npm install',
				'bower install',
				'grunt'
			],
			{cwd: process.cwd() + '/deps/ace-pegjs'}
			));
});

// Gulp is stupid.
gulp.task('dep-pegace', ['build-deps'], function() {
	gulp.src('./deps/ace-pegjs/target/**/*')
		.pipe(rename(function(path) {
			path.dirname = path.dirname.replace('deps/ace-pegjs/target/', '')
		}))
		.pipe(gulp.dest('./dev/peg/ace-peg'));
});

// Gulp is really, really stupid.
gulp.task('dep-ace', function() {
	gulp.src('./deps/ace/src-noconflict/**/*')
		.pipe(rename(function(path) {
			path.dirname = path.dirname.replace('deps/ace/src-noconflict/', '')
		}))
		.pipe(gulp.dest('./dev/peg/ace'));
});

gulp.task('deps', ['dep-ace', 'dep-pegace'], function () {});

gulp.task('src-dev-coffee', function() {
	gulp.src('./src/dev/**/*.coffee')
		.pipe(coffee())
		.pipe(rename(function(path) {
				path.dirname = path.dirname.replace('src/dev/', '')
			}))
		.pipe(gulp.dest('./dev/'));
});

gulp.task('src-dev', ['src-dev-coffee'], function() {
	gulp.src('./src/dev/**/*')
		.pipe(rename(function(path) {
				path.dirname = path.dirname.replace('src/dev/', '')
			}))
		.pipe(gulp.dest('./dev/'));
});

gulp.task('src-lib', function() {
	gulp.src('./src/lib/**/*.coffee')
		.pipe(coffee())
		.pipe(rename(function(path) {
				path.dirname = path.dirname.replace('src/lib/', '')
			}))
		.pipe(gulp.dest('./lib/'));
});

gulp.task('src-bin', function() {
	gulp.src('./src/oqto.coffee')
		.pipe(coffee())
		.pipe(rename(function(path) {
				path.dirname = path.dirname.replace('src/', '')
			}))
		.pipe(gulp.dest('./bin/'));
});

gulp.task('src', ['src-dev', 'src-bin', 'src-lib'], function() {});

gulp.task('default', ['clean'], function() {
	gulp.start('deps', 'src');
});