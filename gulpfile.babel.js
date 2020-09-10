/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const changed = require('gulp-changed');
const minifyHtml = require('gulp-minify-html');
const concat = require('gulp-concat');
const autoprefix = require('gulp-autoprefixer');
const minifyCSS = require('gulp-minify-css');
const typescript = require('gulp-typescript');
const browserSync = require('browser-sync');
const less = require('gulp-less');
const gulpImport = require('gulp-html-import');
const ejs = require('gulp-ejs');
const plumber = require('gulp-plumber');
const replace = require('gulp-replace');
const del = require('del');
const fs = require('fs');
const version = process.env.npm_package_version || '0.0.0';

// Import our config, or log a warning if hasn't been created
let config = {};
try {
    config = require('./config.js');
} catch (err) {
    console.warn('\n[WARNING] No config file exist, this will still run fine without it, but it is recommended.\n');
}
// use our config settings or default values if the key doesn't exist
config = Object.assign({
    CNAME: false,
    GOOGLE_ANALYTICS_INIT: false,
    GOOGLE_ANALYTICS_ID: false,
    DEV_BANNER: false,
    DISCORD_CLIENT_ID: false,
    DISCORD_LOGIN_URI: false,
}, config);

const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

const htmlImportIf = (html_str, is_true) => {
    // Allow import if
    if (is_true) {
        // replace with standard import
        return replace(`@importif ${html_str}`, '@import');
    } else {
        // remove the line
        const replaceRegex = new RegExp(`\\s*@importif ${escapeRegExp(html_str)}.*\\n?`, 'g');
        return replace(replaceRegex, '');
    }
};

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
        'node_modules/sortablejs/Sortable.min.js',
        'src/libs/*.js',
    ],
};


const dests = {
    base: 'build',
    libs: 'build/libs/',
    assets: 'build/assets/',
    scripts: 'build/scripts/',
    styles: 'build/styles/',
    githubPages: 'docs/',
};

gulp.task('copy', (done) => {
    // Copy package.json to our base directory
    gulp.src('./package.json').pipe(gulp.dest(`${dests.base}/`));

    gulp.src(srcs.libs)
        .pipe(gulp.dest(dests.libs))
        .pipe(browserSync.reload({stream: true}));

    done();
});

gulp.task('assets', () => gulp.src(srcs.assets)
    .pipe(changed(dests.assets))
    .pipe(gulp.dest(dests.assets))
    .pipe(browserSync.reload({stream: true})));

gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: dests.base,
        },
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
    // If we want the development banner displayed
    stream.pipe(htmlImportIf('$DEV_BANNER', config.DEV_BANNER));
    stream.pipe(htmlImportIf('$GOOGLE_ANALYTICS_ID', config.GOOGLE_ANALYTICS_ID));

    stream.pipe(plumber())
        .pipe(gulpImport('./src/components/'))
        .pipe(replace('$VERSION', version))
        .pipe(replace('$GOOGLE_ANALYTICS_INIT', !!config.GOOGLE_ANALYTICS_INIT))
        .pipe(replace('$GOOGLE_ANALYTICS_ID', config.GOOGLE_ANALYTICS_ID))
        .pipe(replace('$GIT_BRANCH', process.env.GIT_BRANCH))
        .pipe(replace('$DEV_DESCRIPTION', process.env.DEV_DESCRIPTION !== undefined ? process.env.DEV_DESCRIPTION : ''))
        .pipe(ejs())
        .pipe(gulp.dest(htmlDest))
        .pipe(browserSync.reload({stream: true}));
    done();
});

gulp.task('scripts', () => {
    const tsProject = typescript.createProject('tsconfig.json');
    return tsProject.src()
        .pipe(replace('$VERSION', version))
        .pipe(replace('$DISCORD_ENABLED', !!(config.DISCORD_CLIENT_ID && config.DISCORD_LOGIN_URI)))
        .pipe(replace('$DISCORD_CLIENT_ID', config.DISCORD_CLIENT_ID))
        .pipe(replace('$DISCORD_LOGIN_URI', config.DISCORD_LOGIN_URI))
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

gulp.task('cname', (done) => {
    if (!config.CNAME) {
        console.warn('[warning] No CNAME set in config!');
        return;
    }
    fs.writeFile(`${dests.githubPages}CNAME`, config.CNAME, done);
});

gulp.task('build', done => {
    gulp.series('copy', 'assets', 'compile-html', 'scripts', 'styles')(done);
});

gulp.task('website', done => {
    gulp.series('clean', 'build', 'cleanWebsite', 'copyWebsite', 'cname')(done);
});

gulp.task('default', done => {
    gulp.series('clean', 'build', 'browserSync')(done);
});
