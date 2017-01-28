// require gulp modules
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var sourcemaps = require('gulp-sourcemaps');

// tasks configuration variables

// sass compile configuration
var sassConfig = {
	compileSassTaskName: 'compile-sass',
	watchFiles: './src/scss/*.scss',
	entryPoint: './src/scss/style.scss',
	dest: './dist/',
	includePaths: ['node_modules/bootstrap-sass/assets/stylesheets', 'node_modules/hamburgers/_sass/hamburgers']
};

// js task
var jsConfig = {
	concatJsTaskName: 'concat-js',
	watchFiles: './src/js/*.js',
	entryPoint: './src/js/main.js',
	concatFile: 'main.js',
	dest: './dist/'
};

// default task
gulp.task('default', [sassConfig.compileSassTaskName, jsConfig.concatJsTaskName], function() {

	// start browser sync server
	browserSync.init({
		server: './'
		// proxy: "127.0.0.1:8000"
	});

	// watch scss files changes and compile
    gulp.watch(sassConfig.watchFiles, [sassConfig.compileSassTaskName]);

    // watch js files changes and concatenate
    gulp.watch(jsConfig.watchFiles, [jsConfig.concatJsTaskName]);

    // watch html files changes and reload server
    gulp.watch('./*.html', function() {
    	browserSync.reload();
    	notify().write('Browser reloaded!!!');
    });
});

// sass compile task
gulp.task(sassConfig.compileSassTaskName, function() {
	gulp.src(sassConfig.entryPoint)
	.pipe(sourcemaps.init())
	.pipe(sass({ includePaths: sassConfig.includePaths }).on('error', function(error) {
		return notify().write(error);
	}))
	.pipe(sourcemaps.write('./'))	
	.pipe(gulp.dest(sassConfig.dest))
	.pipe(browserSync.stream())
	.pipe(notify('SASS Compiled!!!'));
});

// js concatenate task
gulp.task(jsConfig.concatJsTaskName, function() {
	gulp.src(jsConfig.entryPoint)
	.pipe(tap(function(file) {
		file.contents = browserify(file.path, { debug: true }).bundle().on('error', function(error) {
			return notify().write(error);
		});
	}))
	.pipe(buffer())
	.pipe(sourcemaps.init({ loadMaps: true }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(jsConfig.dest))
	.pipe(notify('JS Concatenated!!!'))
	.pipe(browserSync.stream());
});