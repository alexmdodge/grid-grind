'use strict';

/* globals require */

/*************************************************************************
 *
 * REQUIRED MODULES
 *
 *************************************************************************
 *
 * To use specific gulp modules they are saved in named objects. They
 * should be named the same as the module for better readability.
 *
 * NOTE: If you are not familiar defining multiple variables at once, you
 *       can use commas instead of writing var each time for each declaration.
 *
 *************************************************************************/

var gulp   = require("gulp"),
  exorcist   = require('exorcist'),
  path    = require("path"),
  fs = require('fs'),
  mapfile = path.join(__dirname, 'mainGame.js.map'),
  del     = require("del"),
  uglify  = require("gulp-uglify"),
  rename  = require("gulp-rename"),
  compass = require("gulp-compass"),
  plumber = require("gulp-plumber"),
  browserSync = require("browser-sync"),
  browserify  = require("browserify"),
  source      = require("vinyl-source-stream"),
  reload      = browserSync.reload;

/*************************************************************************
 *
 * TASKS
 *
 *************************************************************************
 *
 * In this section all of the tasks are defined. Each of these does a
 * specific thing, like watch javascript or css files. It can also compile
 * or trigger browser sync.
 *
 * On the command line you can trigger individual tasks with
 *    $ gulp taskName
 *
 * Some of the general globs or search patterns (similar to regex) which
 * are most commonly used can be found below,
 *    css/*.css      --> Matches all files ending in css
 *    css/** /*.css  --> All files ending in css in all child directories
                         (no spaces, needed for comment)
 *    !css/style.css --> excludes files
 *    *.+(js|css)    --> Matches all files in root ending in js or css
 *
 * NOTE: The browser sync module has a reload object which is placed at
 *       the end of each tasks to properly updated the browsers.
 *************************************************************************



/* * * * * * * * * * JAVASCRIPT TASKS * * * * * * * * * * * * * * * * * *
 * Plumber allows the gulp loop to continue running instead of throwing
 * an error and closing.
 *
 * This set of globs for the source files only takes js files and ignores
 * minified versions (most likely would be vendor js)
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('test-scripts', function() {
   var bundleStream = browserify("./app/js/game.js",{debug: true})
    .transform("babelify",{presets: ["es2015"]})
    .bundle();

   bundleStream
      .pipe(exorcist('app/js/mainGame.js.map'))
      .pipe(source('app/js/game.js'))
      .pipe(rename('mainGame.js'))
      .pipe(gulp.dest('app/js/'))
      .pipe(plumber())
      .pipe(reload({stream:true}));
});

gulp.task('build-scripts',['clean:dist'], function() {
   gulp.src(['app/js/**/*.js', '!app/js/**/min.js'])
      .pipe(plumber())
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
      .pipe(reload({stream:true}));
});



/* * * * * * * * * * CSS & SASS TASKS * * * * * * * * * * * * * * * * * *
 * The SASS files in the projects are compiled using compass, as it can
 * pre-minify the files without a separate compiler.
 *
 * These tasks compile the SCSS.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('test-css', function() {
   gulp.src('app/css/*.css')

      .pipe(plumber())
      .pipe(reload({stream:true}));
});


gulp.task('build-css',['clean:dist'], function() {
   gulp.src('app/css/*.css')

      .pipe(plumber())
      .pipe(gulp.dest('dist/css/'))
      .pipe(reload({stream:true}));
});

// This task copies css vendor files that do not need to be compiled
// It excludes the test build compile of the main styles sheet. Eventually
// it will all just be one large sass sheet with imports from all the css
// vendors
gulp.task('build-css-vendor',['clean:dist'], function() {
   gulp.src(['app/css/*.css','!app/css/app.css'])
      .pipe(plumber())
      .pipe(gulp.dest('dist/css/'));
});

/* * * * * * * * * * HTML TASKS * * * * * * * * * * * * * * * * * * * * * *
 * These tasks simply load the changed html files. This is combined with
 * the browser sync and watch tasks later
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('test-html', function() {
   gulp.src('app/**/*.html')
   .pipe(reload({stream:true}));
});

gulp.task('build-html',['clean:dist'], function() {
   gulp.src('app/**/*.html')
   .pipe(gulp.dest('dist/'))
   .pipe(reload({stream:true}));
});

/* * * * * * * * * * BROWSER SYNC TASKS * * * * * * * * * * * * * * * * * *
 * Sets the base directory for browser sync to monitor changes and create
 * a server from.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('browser-sync', function() {
   browserSync({
      server: {
         baseDir: "./app/",
      }
   });
});

gulp.task('browser-sync-build',['clean:dist'], function() {
   browserSync({
      server: {
         baseDir: "./dist/",
      }
   });
});


/* * * * * * * * * * FOLDER CLEAN UP * * * * * * * * * * * * * * * * * * *
 * The del module allows you to use globs to delete folders and files.
 * In this case we clean up each folder in the dist directory. I still need
 * to set up at some point a gulp sequence tasks so the cleaning task runs
 * first.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('clean:dist', function (callBack) {
  return del([
   // Remove the index file
   'dist/index.html',
   // Remove all previously compiled css
   'dist/css/**/*',
   // Removed all minified and compiled js
   'dist/js/**/*',
   // Remove all images, fonts, and dependencies
   'dist/images/**/*',
   'dist/fonts/**/*',
   'dist/bower_components/**/*'
  ], callBack);
});

/* * * * * * * * * * MOVE AND COPY * * * * * * * * * * * * * * * * * * *
 * These tasks move and copy the files which were set up in the initial build,
 * but then were not modified or minified (yet).
 *
 * The bower components are also copied but these will eventually be concatenated
 * then fed through the js compiler
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('build-fonts',['clean:dist'], function() {
   gulp.src('app/fonts/**/*.{ttf,woff,woff2,eof,eot,otf,svg}')
   .pipe(gulp.dest('dist/fonts'));
});

gulp.task('build-images',['clean:dist'], function() {
   gulp.src('app/img/**/*.{png,jpg,ico,svg}')
   .pipe(gulp.dest('dist/img'));
});

gulp.task('build-bower',['clean:dist'], function() {
   gulp.src('app/bower_components/**/*')
   .pipe(gulp.dest('dist/bower_components/'));
});

/*************************************************************************
 *
 * WATCH AND DEFAULT TASKS
 *
 *************************************************************************
 *
 * In this section the gulp command will remain 'loaded' in the command
 * line and will continue to monitor changes. When a file matching the glob
 * is detected, then it runs the corresponding tasks.
 *
 * The default tasks will run all connected tasks when the gulp command
 * is typed in the terminal. The build task will run everything that minifies
 * and checks the code.
 *
 *************************************************************************

/* * * * * * * * * * WATCH TASKS * * * * * * * * * * * * * * * * * * * */

gulp.task('watch', function() {
	gulp.watch(['app/js/**/*.js','!app/js/mainGame.js'], ['test-scripts']);
	gulp.watch('app/css/*.css', ['test-css']);
   gulp.watch('app/**/*.html', ['test-html']);
});

/* * * * * * * * * * LAYERED TASKS * * * * * * * * * * * * * * * * * * */

gulp.task('default', ['test-scripts', 'watch', 'test-css', 'test-html', 'browser-sync']);

// For a fully clean build, run clean:dist first
gulp.task('build', ['clean:dist','build-images', 'build-fonts', 'build-scripts', 'build-css',
   'build-html', 'browser-sync-build', 'build-css-vendor', 'build-bower']);
