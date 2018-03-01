"use strict";

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const merge = require('merge-stream');
const babel = require("gulp-babel");
const config = require('./seeds/gulp/config');

/* Allow gulp to log errors without needed to be restarted */
function logError(err){
  console.log(err);
  return this.emit('end');
}

/* Compile all Sass files */
gulp.task('sass', () => {
  let tasks = config.sass.dirs().map(f => {
    return gulp.src(f.src)
      .pipe(sass().on('error', logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest(f.dest))
      .pipe(browserSync.stream());
  });
  
  return merge(tasks);
});

/* Transpile JS files */
gulp.task("babel", () => {
  let tasks = config.js.dirs().map(f => {
    return gulp.src(f.src)
      .pipe(babel().on('error', logError))
      .pipe(gulp.dest(f.dest))
      .pipe(browserSync.stream());
  });

  return merge(tasks);
});

/* Watch files for changes and serve Browser Sync */
gulp.task('serve', function() {
  let sassSrc = config.sass.dirs().map(f => f.src);
  let jsSrc = config.js.dirs().map(f => f.src);
  
  browserSync.init({ 
    proxy: 'localhost:5000',
    logFileChanges: false,
  });

  gulp.watch(sassSrc, ['sass']);  // if any file changes, all are reloaded
  gulp.watch(jsSrc, ['babel']);
  gulp.watch(config.html.src).on('change', browserSync.reload);

});

/* This task runs automatically when we run gulp */
gulp.task('default', ['sass', 'babel', 'serve']);






// import changed from 'gulp-changed'
// import sourcemaps from 'gulp-sourcemaps'

// export function buildJs () {
//   return gulp.src(jsSrc)
//     .pipe(changed(distDir))
//     .pipe(sourcemaps.init())
//     .pipe(babel({modules}).on('error', logError))
//     .pipe(concat('all.min.js'))
//     .pipe(uglify().on('error', logError))
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest(distDir))
// }
