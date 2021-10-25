const gulp = require('gulp')
const gulpif = require('gulp-if')
const argv = require('minimist')(process.argv.slice(2))
const env = argv.env ? argv.env : 'development'
const output = {
    development: './tmp',
    production: './dist',
    netlify: './netlify',
}
const outputNetlify = `${output[env]}/albertcss`
const browserSync = require('browser-sync').create()

// CSS
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')

const inputScss = './src/**/*.scss'

const sassOptions = {
    default: {
        errLogToConsole: true,
        outputStyle: 'expanded',
    },
    minified: {
        outputStyle: 'compressed',
    },
}

gulp.task('sass', function () {
    return gulp
        .src(inputScss)
        .pipe(sass(sassOptions.default).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(output[env]))
        .pipe(gulpif(env === 'netlify', gulp.dest(outputNetlify)))
})

gulp.task('sass-min', function () {
    return gulp
        .src(inputScss)
        .pipe(sass(sassOptions.minified))
        .pipe(autoprefixer())
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(gulp.dest(output[env]))
        .pipe(gulpif(env === 'netlify', gulp.dest(outputNetlify)))
})

// JS
const browserify = require('browserify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')

const inputJs = 'src/js/scripts.js'

gulp.task('js', function () {
    const b = browserify({
        entries: inputJs,
        debug: false,
    })

    return b
        .transform(
            babelify.configure({
                presets: ['@babel/preset-env'],
                sourceMaps: false,
            }),
        )
        .bundle()
        .pipe(source('js/albert.js'))
        .pipe(buffer())
        .pipe(gulp.dest(output[env]))
        .pipe(gulpif(env === 'netlify', gulp.dest(outputNetlify)))
})

gulp.task('js-min', function () {
    const b = browserify({
        entries: inputJs,
        debug: true,
    })

    return b
        .transform(
            babelify.configure({
                presets: ['@babel/preset-env'],
            }),
        )
        .bundle()
        .pipe(source('js/albert.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true,
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(output[env]))
        .pipe(gulpif(env === 'netlify', gulp.dest(outputNetlify)))
})

// HTML
gulp.task('html', function () {
    return gulp
        .src('./src/**/*.html')
        .pipe(gulp.dest(output[env]))
        .pipe(gulpif(env === 'netlify', gulp.dest(outputNetlify)))
})

// Build
// production
gulp.task(
    'build',
    gulp.parallel(
        gulp.series('sass', 'sass-min'),
        gulp.series('js', 'js-min'),
        'html',
    ),
)
// development
gulp.task('develop', gulp.parallel('sass', 'js', 'html'))

// Reload browser
gulp.task('reload', (done) => {
    browserSync.reload()
    done()
})

// Browser sync
gulp.task('browserSync', () => {
    browserSync.init({
        port: 1233,
        server: './tmp',
        ui: false,
    })
    gulp.watch(
        ['src/css/**/*.scss', 'src/js/**/*.js', 'src/**/*.html'],
        gulp.series('develop', 'reload'),
    )
})

// Dev server
gulp.task('serve', gulp.series('develop', 'browserSync'))
