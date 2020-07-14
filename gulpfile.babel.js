const gulp = require('gulp');
const changed = require('gulp-changed');
const minifyHtml = require('gulp-minify-html');
const concat = require('gulp-concat');
const autoprefix = require('gulp-autoprefixer');
const minifyCSS = require('gulp-minify-css');
const typescript = require('gulp-typescript');
const browserSync = require('browser-sync');
const del = require('del');
const less = require('gulp-less');
const gulpImport = require('gulp-html-import');
const ejs = require("gulp-ejs");
const plumber = require("gulp-plumber");
const replace = require('gulp-replace');
const connect = require('gulp-connect');
const version = process.env.npm_package_version || '0.0.0';

/**
 * Push build to gh-pages
 */
gulp.task('deploy', () => gulp.src('./dist/**/*')
    .pipe(deploy()));

const srcs = {
    buildArtefacts: 'build/**/*',
    scripts: 'src/scripts/**/*.ts',
    html: ['src/*.html', 'src/templates/*.html', 'src/components/*.html'],
    ejsTemplates: ['src/templates/*.ejs'],
    styles: 'src/styles/**/*.less',
    assets: 'src/assets/**/*',
    libs: [
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/knockout/build/output/knockout-latest.js',
        'node_modules/bootstrap-notify/bootstrap-notify.min.js',
        'src/libs/*.js'
    ]
};


const dests = {
    base: 'build',
    libs: 'build/libs/',
    assets: 'build/assets/',
    scripts: 'build/scripts/',
    styles: 'build/styles/',
    githubPages: 'docs/'
};

gulp.task('copy', () => gulp.src(srcs.libs)
    .pipe(gulp.dest(dests.libs))
    .pipe(browserSync.reload({stream: true})));

gulp.task('assets', () => gulp.src(srcs.assets)
    .pipe(changed(dests.assets))
    .pipe(gulp.dest(dests.assets))
    .pipe(browserSync.reload({stream: true})));

gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: dests.base
        }
    });
    gulp.watch(srcs.html, gulp.series('compile-html'));
    gulp.watch(srcs.ejsTemplates, gulp.series('compile-html'));
    gulp.watch(srcs.assets, gulp.series('assets'));
    gulp.watch(srcs.scripts, gulp.series('scripts'));
    gulp.watch(srcs.styles, gulp.series('styles'));
});

gulp.task('compile-html', (done) => {
    const htmlDest = './build';
    const stream = gulp.src('./src/index.html');
    if (process.env.HEROKU) {
        stream.pipe(replace('<!--$DEV_BANNER-->', '@import "developmentBanner.html"'))
    }
    stream.pipe(replace('$VERSION', version));
    stream.pipe(replace('$INIT_SENTRY', process.env.HEROKU !== undefined));
    stream.pipe(replace('$INIT_GOOGLE_ANALYTICS', process.env.HEROKU !== undefined));

    stream.pipe(plumber())
        .pipe(gulpImport('./src/components/'))
        .pipe(replace('$GIT_BRANCH', process.env.GIT_BRANCH))
        .pipe(replace('$DEV_DESCRIPTION', process.env.DEV_DESCRIPTION !== undefined ? process.env.DEV_DESCRIPTION : ''))
        .pipe(ejs())
        .pipe(gulp.dest(htmlDest))
        .pipe(browserSync.reload({stream: true}));
    done();
});

gulp.task('html', () => {
    const htmlDest = './build';

    return gulp.src(srcs.html)
        .pipe(changed(dests.base))
        .pipe(minifyHtml())
        .pipe(gulp.dest(htmlDest))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', () => {
    const tsProject = typescript.createProject('tsconfig.json');
    return tsProject.src()
        .pipe(replace('$VERSION', version))
        .pipe(tsProject())
        .pipe(gulp.dest(dests.scripts))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', () => gulp.src(srcs.styles)
    .pipe(less())
    .pipe(concat('styles.min.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(dests.styles))
    .pipe(browserSync.reload({stream: true})));

gulp.task('cleanWebsite', () => del([dests.githubPages]));

gulp.task('clean', () => del([dests.base]));

gulp.task('copyWebsite', () => {
    return gulp.src(srcs.buildArtefacts).pipe(gulp.dest(dests.githubPages));
});

gulp.task('build', done => {
    gulp.series('copy', 'assets', 'compile-html', 'scripts', 'styles')(done);
});

gulp.task('website', done => {
    gulp.series('clean', 'build', 'cleanWebsite', 'copyWebsite')(done);
});

gulp.task('serveProd', function () {
    connect.server({
        root: ['build'],
        port: process.env.PORT || 3000,
        host: '0.0.0.0',
        livereload: false
    });
});

gulp.task('heroku', done => {
    gulp.series('clean', 'build', 'serveProd')(done);
});

gulp.task('default', done => {
    gulp.series('clean', 'build', 'browserSync')(done);
});
