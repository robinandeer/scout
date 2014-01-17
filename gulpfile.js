var gulp = require('gulp');

// Load all gulp tasks from 'package.json'
//var tasks = require('gulp-load-tasks')();
var sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

// Compile SCSS files
gulp.task('sass', function() {
  gulp.src('./app/styles/app.scss')
      .pipe(sass())
      .pipe(gulp.dest('./.tmp/app.css'));
});

// Compile CoffeeScript
gulp.task('coffee', function() {
  gulp.src('./app/');
});

// Default task
gulp.task('default', function() {
  gulp.run('sass', 'coffee');

  // Watch for changes to our SCSS
  gulp.watch('./app/styles/**/*.scss');
});
