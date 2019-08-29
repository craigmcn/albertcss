const gulp = require('gulp'),
  output = './dist'

// CSS
const sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename')

const inputScss = './src/**/*.scss'

const sassOptions = {
  dev: {
    errLogToConsole: true,
    outputStyle: 'expanded'
  },
  prod: {
    outputStyle: 'compressed'
  }
};

gulp.task('sass-dev', function () {
  return gulp.src(inputScss)
    .pipe(sass(sassOptions.dev).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(output))
});

gulp.task('sass-prod', function () {
  return gulp.src(inputScss)
    .pipe(sass(sassOptions.prod))
    .pipe(autoprefixer())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(output))
});

// JS
const browserify = require('browserify'),
  babelify = require("babelify"),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify')

const inputJs = 'src/js/scripts.js'

gulp.task('js-dev', () => {
  const b = browserify({
    entries: inputJs,
    debug: true
  })

  return b.transform(babelify.configure({
    presets: ["@babel/preset-env"]
  }))
    .bundle()
    .pipe(source('js/albertcss.js'))
    .pipe(buffer())
    .pipe(gulp.dest(output))
});

gulp.task('js-prod', () => {
  const b = browserify({
    entries: inputJs,
    debug: true
  })

  return b.transform(babelify.configure({
    presets: ["@babel/preset-env"]
  }))
    .bundle()
    .pipe(source('js/albertcss.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(output))
});

gulp.task('dev', gulp.parallel('js-dev', 'sass-dev'))
gulp.task('build', gulp.parallel('js-prod', 'sass-prod'))