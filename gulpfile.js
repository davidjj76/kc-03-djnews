// require gulp modules
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
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

// default task
gulp.task('default', [sassConfig.compileSassTaskName], function() {

	// start browser sync server
	browserSync.init({
		server: './'
		// proxy: "127.0.0.1:8000"
	});

	// watch scss files changes and compile
    gulp.watch(sassConfig.watchFiles, [sassConfig.compileSassTaskName]);

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
