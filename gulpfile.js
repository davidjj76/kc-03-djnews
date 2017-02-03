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
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var imagemin = require('gulp-imagemin');
var responsive = require('gulp-responsive');
var rename = require('gulp-rename');

// tasks configuration variables

// sass compile configuration
var sassConfig = {
	taskName: 'compile-sass',
	watchFiles: './src/scss/*.scss',
	entryPoint: './src/scss/style.scss',
	dest: './dist/',
	includePaths: ['node_modules/font-awesome/scss']
};

// js task
var jsConfig = {
	taskName: 'concat-js',
	watchFiles: './src/js/*.js',
	entryPoint: './src/js/main.js',
	concatFile: 'main.js',
	dest: './dist/'
};

// minify js task
var uglifyConfig = {
	taskName: 'uglify',
	src: './dist/main.js',
	uglifyFile: 'main.min.js',
	dest: './dist/'	
};

// images task
var imagesConfig = {
	taskName: 'optimize-images',
	src: 'src/img/*',
	dest: './dist/img',
	responsive: {
		'user-*.jpg': [{
			width: 60,
			rename: { suffix: '-60px' }
		}],
		'new-*.jpg': [{
			width: 420,
			rename: { suffix: '-420px' }
		}, {
			width: 375,
			rename: { suffix: '-375px' }
		}, {
			width: 300,
			rename: { suffix: '-300px' }
		}],
		'det-*.jpg': [{
			withoutEnlargement: false,
			width: 960,
			rename: { suffix: '-960px' }
		}, {
			withoutEnlargement: false,
			width: 768,
			rename: { suffix: '-768px' }
		}, {
			width: 420,
			rename: { suffix: '-420px' }
		}, {
			width: 375,
			rename: { suffix: '-375px' }
		}, {
			width: 300,
			rename: { suffix: '-300px' }
		}]
	}
}

// icons task
var iconsConfig = {
	taskName: 'icons',
	src: 'node_modules/font-awesome/fonts/**.*',
	dest: './dist/fonts'
}


// default task
gulp.task('default', [
	sassConfig.taskName, 
	jsConfig.taskName,
	imagesConfig.taskName,
	iconsConfig.taskName,
	], function() {

		// start browser sync server
		browserSync.init({
			proxy: "127.0.0.1:8000"
		});

		// watch scss files changes and compile
	    gulp.watch(sassConfig.watchFiles, [sassConfig.taskName]);

	    // watch js files changes and concatenate
	    gulp.watch(jsConfig.watchFiles, [jsConfig.taskName]);

	    // watch html files changes and reload server
	    gulp.watch('./*.html', function() {
	    	browserSync.reload();
	    	notify().write('Browser reloaded!!!');
	    });
	}
);

// sass compile task
gulp.task(sassConfig.taskName, function() {
	gulp.src(sassConfig.entryPoint)
	.pipe(sourcemaps.init())
	.pipe(sass({ includePaths: sassConfig.includePaths }).on('error', function(error) {
		return notify().write(error);
	}))
	.pipe(postcss([autoprefixer(), cssnano()]))
	.pipe(sourcemaps.write('./'))	
	.pipe(gulp.dest(sassConfig.dest))
	.pipe(browserSync.stream())
	.pipe(notify('SASS Compiled!!!'));
});

// js concatenate task
gulp.task(jsConfig.taskName, function() {
	gulp.src(jsConfig.entryPoint)
	.pipe(tap(function(file) {
		file.contents = browserify(file.path, { debug: true }).bundle().on('error', function(error) {
			return notify().write(error);
		});
	}))
	.pipe(buffer())
	.pipe(sourcemaps.init({ loadMaps: true }))
	.pipe(gulp.dest(jsConfig.dest))
	.pipe(rename(uglifyConfig.uglifyFile))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(uglifyConfig.dest))	
	.pipe(notify('JS Concatenated & Minified!!!'))
	.pipe(browserSync.stream());
});

// minify js
gulp.task(uglifyConfig.taskName, function() {
	gulp.src(uglifyConfig.src)
	.pipe(uglify())
	.pipe(gulp.dest(uglifyConfig.dest))
	.pipe(notify('JS Minified!!!'))
});

// optimize images
gulp.task(imagesConfig.taskName, function() {
	gulp.src(imagesConfig.src)
	.pipe(responsive(imagesConfig.responsive, { errorOnUnusedImage: false, passThroughUnused: true }))
	.pipe(imagemin())
	.pipe(gulp.dest(imagesConfig.dest))
});

// font awesome icons
gulp.task(iconsConfig.taskName, function() {
	gulp.src(iconsConfig.src)
    .pipe(gulp.dest(iconsConfig.dest));
});
