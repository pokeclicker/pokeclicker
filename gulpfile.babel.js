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
gulp.task('deploy', () => gulp.src("./dist/**/*")
    .pipe(deploy()));

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
    return gulp.src(srcs.libs)
        .pipe(gulp.dest(dests.libs))
        .pipe(browserSync.reload({stream: true}));
}

function assets() {
    return gulp.src(srcs.assets)
        .pipe(changed(dests.assets))
        .pipe(gulp.dest(dests.assets))
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
    let recentChangelogs = glob.sync('./src/assets/changelog/*.md').slice(-3).reverse();
    console.log(recentChangelogs);
    const htmlDest = './build';
    return gulp.src('./src/index.html')
        .pipe(plumber())
        .pipe(gulpImport('./src/components/'))
        .pipe(ejs())
        .pipe(inject(gulp.src(recentChangelogs)
            .pipe(markdown()), {
            starttag: '<!-- inject:head:html -->',
            transform: (filePath, file) => file.contents.toString('utf8')
        }))
        .pipe(gulp.dest(htmlDest))
        .pipe(browserSync.reload({stream: true}));
}

function fullChangelog() {
    let recentChangelogs = glob.sync('./src/assets/changelog/*.md').reverse();

    const htmlDest = './build';
    return gulp.src('./src/changelog.html')
        .pipe(inject(gulp.src(recentChangelogs)
            .pipe(markdown()), {
            starttag: '<!-- inject:head:html -->',
            transform: (filePath, file) => file.contents.toString('utf8')
        }))
        .pipe(gulp.dest(htmlDest));
}

function html() {
    const htmlDest = './build';

    return gulp.src(srcs.html)
        .pipe(changed(dests.base))
        .pipe(minifyHtml())
        .pipe(gulp.dest(htmlDcleanOutputFolderest))
        .pipe(browserSync.reload({stream: true}));
}

function scripts() {
    let tsProject = typescript.createProject('tsconfig.json');
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest(dests.scripts))
        .pipe(browserSync.reload({stream: true}));
}

function styles() {
    return gulp.src(srcs.styles)
        .pipe(less())
        .pipe(concat('styles.min.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(dests.styles))
        .pipe(browserSync.reload({stream: true}));
}

function cleanWebsite() {
    return del([dests.githubPages]);
}

function clean() {
    return del([dests.base]);
}

function copyWebsite(){
    return gulp.src(srcs.buildArtefacts).pipe(gulp.dest(dests.githubPages));
}

function build() {
    return gulp.series(copy(), assets(), compileHtml(), scripts(), styles(), fullChangelog());
}

function website(){
    return gulp.series(clean, build, cleanWebsite, copyWebsite, done);
}

// gulp.task('default', done => {
//     gulp.series('clean', 'build', 'sync', () => {
//         gulp.watch(srcs.html, ['compile-html']);
//         gulp.watch(srcs.ejsTemplates, ['compile-html']);
//         gulp.watch(srcs.assets, ['assets']);
//         gulp.watch(srcs.scripts, ['scripts']);
//         gulp.watch(srcs.styles, ['styles']);
//         done();
//     });
// });

exports.default = gulp.series(clean(), build(), sync());
