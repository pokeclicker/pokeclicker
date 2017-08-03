const gulp = require('gulp');
const file = require('gulp-file');
const tslint = require('gulp-tslint');
const changed = require('gulp-changed');
const minifyHtml = require('gulp-minify-html');
const concat = require('gulp-concat');
const autoprefix = require('gulp-autoprefixer');
const minifyCSS = require('gulp-minify-css');
const typescript = require('gulp-typescript');
const browserSync = require('browser-sync');
const del = require('del');
const runSequence = require('run-sequence');
const bsConfig = require("gulp-bootstrap-configurator");
const less = require('gulp-less');

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
    return gulp.src("./dist/**/*")
        .pipe(deploy())
});

const srcs = {
    buildArtefacts: 'build/**/*',
    scripts: 'src/scripts/**/*.ts',
    html: ['src/*.html', 'src/templates/*.html'],
    styles: 'src/styles/**/*.less',
    assets: 'src/assets/**/*',
    libs: [ 'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/tether/dist/js/tether.min.js',
            'node_modules/knockout/build/output/knockout-latest.js',
            'node_modules/bootstrap-notify/bootstrap-notify.min.js'
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

gulp.task('cname', function() {
    const str = "www.pokeclicker.com";
    return file('CNAME', str, { src: true })
        .pipe(gulp.dest('docs/'));
});

gulp.task('copy', function () {
    return gulp.src(srcs.libs)
        .pipe(gulp.dest(dests.libs))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('assets', function () {
    return gulp.src(srcs.assets)
        .pipe(changed(dests.assets))
        .pipe(gulp.dest(dests.assets))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: dests.base
        }
    });
});

gulp.task('html', function () {
    const htmlDest = './build';

    return gulp.src(srcs.html)
        .pipe(changed(dests.base))
        .pipe(minifyHtml())
        .pipe(gulp.dest(htmlDest))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function () {
    let tsProject = typescript.createProject('tsconfig.json');
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest(dests.scripts))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', function () {
    return gulp.src(srcs.styles)
        .pipe(less())
        .pipe(concat('styles.min.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(dests.styles))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('cleanWebsite', function () {
    return del([dests.githubPages]);
});

gulp.task('clean', function () {
    return del([dests.base]);
});

gulp.task('copyWebsite', function () {
    gulp.src(srcs.buildArtefacts).pipe(gulp.dest(dests.githubPages));
});

gulp.task('build', ['copy', 'assets', 'html', 'scripts', 'styles']);

gulp.task('website', done => {
    runSequence('clean', 'build', 'cleanWebsite', 'copyWebsite', 'cname', () => done());
});

gulp.task('default', function (done) {
    runSequence('clean', 'build', 'browserSync', function () {
        gulp.watch(srcs.html, ['html']);
        gulp.watch(srcs.assets, ['assets']);
        gulp.watch(srcs.scripts, ['scripts']);
        gulp.watch(srcs.styles, ['styles']);
        done();
    });
});
