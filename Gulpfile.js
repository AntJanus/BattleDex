var gulp        = require('gulp'),
    rimraf      = require('rimraf'), //for cleaning
    uglify      = require('gulp-uglify'), //for JS
    concat      = require('gulp-concat'), // for whatever
    browserSync = require('browser-sync'),
    sass        = require('gulp-ruby-sass')
  ;

//vars
var build = 'build';
var src   = 'src';
var js    = 'src/js';
var scss  = 'src/scss';

//cleaning
gulp.task('clean:js', function(cb) {
  rimraf(build + '/js/', cb);
});

gulp.task('clean:css', function(cb) {
  rimraf(build + '/css/', cb);
});

gulp.task('clean', function(cb) {
  rimraf(build, cb);
});

gulp.task('sass', function() {
  return sass(scss, {
      loadPath: ['scss'],
      style: 'nested',
      bundleExec: true,
      unixNewlines: true
    })
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(gulp.dest('./' + build + '/css'))
  ;
});

gulp.task('copy', ['clean'], function() {
  var dirs = [
    src + '/**/**.*',
    '!'+js + '/**/**.*',
    '!'+scss + '/**/**.*'
  ];

  return gulp.src(dirs, {
      base: src
    })
    .pipe(gulp.dest(build))
  ;
});

gulp.task('uglify', ['copy'], function() {
  var jsFiles = [
    'bower_components/angular/angular.js',
    'bower_components/ui-router/release/angular-ui-router.js',
    'bower_components/angular-animate/angular-animate.js',
    js + '/**/**.js'
  ];

  return gulp.src(jsFiles, {
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

gulp.task('build', ['clean', 'copy', 'sass', 'uglify', 'browser-sync'], function() {
  console.log('Running');
});

gulp.task('default', ['build'], function() {

  gulp.watch([src + '/**/**.*', '!' + js, '!' + scss], ['copy', 'uglify', browserSync.reload]);

  gulp.watch([js + '/**/**.*'], ['uglify', browserSync.reload]);

  gulp.watch([scss + '/**/**.*'], ['sass', browserSync.reload]);
});
