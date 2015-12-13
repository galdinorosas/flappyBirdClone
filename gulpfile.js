var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');

// To run broswer sync (to make browser auto-update the browser to visually see changes instantly)
// open a new tab in terminal and run this code: browser-sync start --server --files "css/*.css,index.html"


gulp.task('jshint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'));
});


// Compile Sass task
gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch('js/*.js', ['jshint']);
  gulp.watch('scss/*.scss', ['sass']);
});



gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return browserify('js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src('css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
});

// Image optimization task
gulp.task('images', function() {
  return gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles', 'images','minify-css']);

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);

