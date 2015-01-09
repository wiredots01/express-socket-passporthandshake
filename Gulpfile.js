var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var jstConcat = require('gulp-jst-concat');
var nodemon =  require('gulp-nodemon');
var jshint = require('gulp-jshint');
var inject = require('gulp-inject');


sources = {
  js: [
    './public/javascripts/app/**/*.js'
  ]
};


gulp.task('styles', function() {
  return gulp.src('source/sass/**/*.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch', ['develop'], function() {
  gulp.watch('source/sass/**/*.scss', ['styles']);
  gulp.watch('source/**/*.coffee', ['coffee']);
  gulp.watch('source/**/*.jade', ['jst']);
});

gulp.task('jst', function () {
  gulp.src('source/**/*.jade')
    .pipe(jade())
    .pipe(jstConcat('jst-app.js', {
      renameKeys: ['^.*views/(.*).html$', '$1']
    }))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('coffee', function() {
  gulp.src('source/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint());
});

gulp.task('jsinject', ['coffee'], function() {
  return gulp.src('./views/layout.jade').pipe(inject(gulp.src(sources.js), {
    ignorePath: 'public',
    read: false,
    starttag: '//- inject:js',
    endtag: '//- endinject'
  })).pipe(gulp.dest('./views'));
});

gulp.task('develop', ['styles', 'coffee', 'jst', 'jsinject'], function () {
  nodemon({ script: './bin/www', ext: 'html js', ignore: ['bower_components/**/*.js', 'node_modules/**/*.js', 'public/javascripts/dependencies/**/*.js'] })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!');
    });
});

gulp.task('default', ['develop', 'watch'], function() {

});


