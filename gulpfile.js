const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const notify = require("gulp-notify");
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

// styles 
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

// scripts
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js')

// create path
const paths = {
    root: './build',
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'build/assets/styles/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/assets/scripts/'
    },
    libs: {
        src: 'src/libs/**/*.*',
        dest: 'build/assets/libs/'
    },
    templates: {
        src: 'src/templates/**/*.pug',
        dest: 'build/assets/'
    },
    images: {
        src: 'src/img/**/*.*',
        dest: 'build/assets/img/'
    },
    fonts: {
        src: 'src/fonts/**/*.*',
        dest: 'build/assets/fonts/'
    },
    svg:{
        src: 'src/img/icons/**/*.svg',
        dest: 'build/assets/img/'
    }
};

//config svg sprite
const config = {
    mode: {
        symbol: {
            sprite: "../sprite.svg"
        }
    }
};

// pug
function templates() {
    return gulp.src('./src/templates/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}

// scss
function styles() {
    return gulp.src('./src/styles/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths,
            outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())        
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest))       
}

// webpack
function scripts() {
    return gulp.src('src/scripts/main.js')
        .pipe(plumber())  
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
}

// clear build
function clean() {
    return del(paths.root);
}

// move images
function images() {
    return gulp.src(paths.images.src)
        // .pipe(imagemin(
        //     [
        //         imagemin.gifsicle({interlaced: true}),
        //         imagemin.jpegtran({progressive: true}),
        //         imagemin.optipng({optimizationLevel: 5}),
        //         imagemin.svgo({plugins: [{removeViewBox: true}]})
        //     ]
        // ))
        .pipe(gulp.dest(paths.images.dest));
}

// move fonts
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

// move libs
function libs() {
    return gulp.src(paths.libs.src)
        .pipe(gulp.dest(paths.libs.dest));
}

// следим за src и запускаем таски
function watch() {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.fonts.src, fonts);
    gulp.watch(paths.libs.src, libs);
}

// следим за build и перезапускаем браузер
function server() {
    browserSync.init({
        server: paths.root   
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// экспортируем функции для доступа из терминала (gulp clean)
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.templates = templates;
exports.images = images;
exports.watch = watch;
exports.server = server;
exports.fonts = fonts;
exports.libs = libs;

// сборка и слежка
gulp.task('default', gulp.series(
    gulp.parallel(styles, scripts, templates, images, fonts, libs),
    gulp.parallel(watch, server)
));

gulp.task('build', gulp.series(
    clean,
    gulp.parallel(styles, scripts, templates, images, fonts, libs)
));

gulp.task('sprite', function() {
    return gulp.src(paths.svg.src)
      .pipe(svgmin({
        js2svg: {
          pretty: true
        }
      }))
      // удалить все атрибуты в svg
      .pipe(cheerio({
        run: function($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {
          xmlMode: true
        }
      }))
      .pipe(replace('&gt;', '>'))
      // build svg sprite
      .pipe(svgSprite(config))
      .pipe(gulp.dest(paths.svg.dest));
  });