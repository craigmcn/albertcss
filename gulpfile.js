const gulp = require('gulp'),
  output = './dist'

// CSS
const sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename')

const inputScss = './src/**/*.scss'

const sassOptions = {
  default: {
    errLogToConsole: true,
    outputStyle: 'expanded'
  },
  minified: {
    outputStyle: 'compressed'
  }
};

gulp.task('sass', done => {
  return gulp.src(inputScss)
    .pipe(sass(sassOptions.default).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(output))
  done()
});

gulp.task('sass-min', done => {
  return gulp.src(inputScss)
    .pipe(sass(sassOptions.minified))
    .pipe(autoprefixer())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(output))
  done()
});

// JS
const browserify = require('browserify'),
  babelify = require("babelify"),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify')

const inputJs = 'src/js/scripts.js'

gulp.task('js', done => {
  const b = browserify({
    entries: inputJs,
    debug: false
  })

  return b.transform(babelify.configure({
    presets: ["@babel/preset-env"],
    sourceMaps: false
  }))
    .bundle()
    .pipe(source('js/albertcss.js'))
    .pipe(buffer())
    .pipe(gulp.dest(output))
  done()
});

gulp.task('js-min', done => {
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
  done()
});

gulp.task('assets', gulp.parallel(
  gulp.series('sass', 'sass-min'),
  gulp.series('js', 'js-min')
))