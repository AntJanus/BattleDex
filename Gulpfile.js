var gulp    = require('gulp'),
    rimraf  = require('rimraf'), //for cleaning
    uglify  = require('gulp-uglify'), //for JS
    concat  = require('gulp-concat'), // for whatever
    browserSync = require('browser-sync')
  ;

//vars
var build = 'build';
var src = 'src';
var js = 'src/js';

//cleaning
gulp.task('clean:js', function(cb) {
  rimraf(build + '/js/', cb);
});

gulp.task('clean', function(cb) {
  rimraf(build, cb);
});

gulp.task('copy', ['clean'], function() {
  var dirs = [
    src + '**/**.*',
    '!'+js
  ];

  return gulp.src(dirs, {
      base: src
    })
    .pipe(gulp.dest(build))
  ;
});

gulp.task('uglify', ['copy'], function() {

  return gulp.src(js + '/**/**.js', {
      base: src
    })
    .pipe(uglify({
      minify: true,
      mangle: false
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(build + '/js/'))
  ;
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: build
    }
  });
});

gulp.task('build', ['clean', 'copy', 'uglify', 'browser-sync'], function() {
  console.log('Running');
});

gulp.task('default', ['build'], function() {
  gulp.watch([src + '/**/**.*', '!' + js], ['copy', 'uglify', browserSync.reload]);
  gulp.watch([js + '/**/**.*'], ['uglify', browserSync.reload]);
});
