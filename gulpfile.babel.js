const {src, dest, parallel, series, watch} = require('gulp');const file = require('gulp-file');

const tslint = require('gulp-tslint');
const changed = require('gulp-changed');
const minifyHtml = require('gulp-minify-html');
const concat = require('gulp-concat');
const autoprefix = require('gulp-autoprefixer');
const minifyCSS = require('gulp-minify-css');
const typescript = require('gulp-typescript');
const browserSync = require('browser-sync');
const del = require('del');
const bsConfig = require("gulp-bootstrap-configurator");
const less = require('gulp-less');
const gulpImport = require('gulp-html-import');
const markdown = require('gulp-markdown');
const inject = require('gulp-inject');
const glob = require("glob");
const ejs = require("gulp-ejs");
const plumber = require("gulp-plumber");


/**
 * Push build to gh-pages
 */
// task('deploy', () => src("./dist/**/*")
//     .pipe(deploy()));

const srcs = {
    buildArtefacts: 'build/**/*',
    scripts: 'src/scripts/**/*.ts',
    html: ['src/*.html', 'src/templates/*.html', 'src/components/*.html'],
    ejsTemplates: ['src/templates/*.ejs'],
    styles: 'src/styles/**/*.less',
    assets: 'src/assets/**/*',
    libs: ['node_modules/bootstrap/dist/js/bootstrap.min.js',
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

function copy() {
    return src(srcs.libs)
        .pipe(dest(dests.libs))
        .pipe(browserSync.reload({stream: true}));
}

function assets() {
    return src(srcs.assets)
        .pipe(changed(dests.assets))
        .pipe(dest(dests.assets))
        .pipe(browserSync.reload({stream: true}));
}

function sync() {
    return browserSync({
        server: {
            baseDir: dests.base
        }
    });
}

function compileHtml() {
    const htmlDest = './build';
    return src('./src/index.html')
        .pipe(plumber())
        .pipe(gulpImport('./src/components/'))
        .pipe(ejs())
        .pipe(dest(htmlDest))
        .pipe(browserSync.reload({stream: true}));
}

function html() {
    const htmlDest = './build';

    return src(srcs.html)
        .pipe(changed(dests.base))
        .pipe(minifyHtml())
        .pipe(dest(htmlDest))
        .pipe(browserSync.reload({stream: true}));
}

function scripts() {
    let tsProject = typescript.createProject('tsconfig.json');
    return tsProject.src()
        .pipe(tsProject())
        .pipe(dest(dests.scripts))
        .pipe(browserSync.reload({stream: true}));
}

function styles() {
    return src(srcs.styles)
        .pipe(less())
        .pipe(concat('styles.min.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(dest(dests.styles))
        .pipe(browserSync.reload({stream: true}));
}

function cleanWebsite(done) {
    del([dests.githubPages]);
    done();
}

function clean(done) {
    del([dests.base]);
    done();
}

function copyWebsite(){
    return src(srcs.buildArtefacts).pipe(dest(dests.githubPages));
}

function build() {
    return series(copy, assets, compileHtml, scripts, styles);
}

function website(){
    return series(clean, build, cleanWebsite, copyWebsite, done);
}

// task('default', done => {
//     series('clean', 'build', 'sync', () => {
//         watch(srcs.html, ['compile-html']);
//         watch(srcs.ejsTemplates, ['compile-html']);
//         watch(srcs.assets, ['assets']);
//         watch(srcs.scripts, ['scripts']);
//         watch(srcs.styles, ['styles']);
//         done();
//     });
// });

exports.default = series(clean, build, sync);
