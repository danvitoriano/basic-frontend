// Gulpfile.js

// module requires
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch');

// Task HTML -----------------------------------------------------

var htmlFiles = 'src/*.html';
var htmlDest = 'dist/';

gulp.task('html', function() {
    return gulp.src(htmlFiles)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(htmlDest))
    .pipe(connect.reload());   
});

// Task Style -----------------------------------------------------

var cssFiles = 'src/assets/styles/styles.less';
var cssDest = 'dist/assets/css';

gulp.task('styles', function() {
    return gulp.src(cssFiles)
    .pipe(concat('styles.css'))
    .pipe(less())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(cssDest))   
    .pipe(connect.reload());
});

// Task JavaScript -----------------------------------------------------

var jsFiles = [
    'node_modules/jquery/dist/jquery.js', 
    'node_modules/bootstrap/dist/js/bootstrap.js', 
    'src/assets/scripts/**/*.js'
]; 
var jsDest = 'dist/assets/js';

gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
    .pipe(concat('scripts.js'))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest))
    .pipe(connect.reload());
});

// Task Images -----------------------------------------------------

var imgFiles = ['src/assets/images/**/*']; 
var imgDest = 'dist/assets/img';

gulp.task('images', function() {  
    return gulp.src(imgFiles)
    .pipe(gulp.dest(imgDest))
    .pipe(connect.reload());
});

// Task data  -----------------------------------------------------

var dataFiles = ['src/assets/data/*.json']; 
var dataDest = 'dist/assets/data';

gulp.task('data', function() {  
    return gulp.src(dataFiles)
    .pipe(gulp.dest(dataDest))
    .pipe(connect.reload());
});


// Task Server Reload -----------------------------------------------------

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});


// Task Watch -----------------------------------------------------

gulp.task('watch', function () {
  gulp.watch(['src/*.html'], ['html']);
  gulp.watch(['src/assets/**/*.less'], ['styles']);
  gulp.watch(['src/assets/**/*.js'], ['scripts']);
  gulp.watch(['src/assets/images/**/*'], ['images']);
  gulp.watch(['src/assets/data/*.json'], ['data']);
});

// Gulp task -----------------------------------------------------

gulp.task('default', ['connect', 'watch', 'html', 'styles', 'scripts', 'images', 'data' ]);


gulp.task('default', ['connect', 'watch', 'html', 'styles', 'scripts', 'images', 'data' ]);


