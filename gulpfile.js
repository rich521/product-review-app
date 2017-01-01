var autoprefixer = require('gulp-autoprefixer'),
    axios = require("axios"),
    browserSync = require('browser-sync'),
    cleanCSS = require('gulp-clean-css'),
    gulp = require('gulp'),
    history = require('connect-history-api-fallback'),
    path = require('path'),
    sass = require('gulp-sass'),
    webpack = require('webpack-stream');

// Paths
var sassPath = 'src/sass/**/*.scss',
    cssPath = 'dist/css/';

// Watch all files when changing live 
gulp.task('default', function() {
    browserSync.init({
        browser: 'google chrome',
        open: false,
        port: 3000,
        server: {
            baseDir: './dist',
            middleware: [
                history({ verbose: true })            ],
        }
    });
    gulp.watch('./src/js/**/*.js', ['js-watch']);
    gulp.watch(sassPath, ['sass']);
    gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

gulp.task('public', function() {
    browserSync.init({
        browser: "google chrome",
        server: "./dist"
    });
});

var jsSrc = 'src/js/bundle.js';
gulp.task('react', function() {
    return gulp.src(jsSrc)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/js/'));
});

//Only runs after react & minify is complete
gulp.task('js-watch', ['react'], function(done) {
    console.log("js changining!");
    browserSync.reload();
    done();
});

gulp.task('sass', function() {
    gulp.src(sassPath)
        .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        // .pipe(gulp.dest(cssDest))
        .pipe(cleanCSS())
        .pipe(gulp.dest(cssPath))
        .pipe(browserSync.stream());
});
