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
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const streamToPromise = require('gulp-stream-to-promise');
const gulpWebpack = require('webpack-stream');
const webpack = require('webpack');
const del = require('del');
const fs = require('fs');
const path = require('path');
const version = process.env.npm_package_version || '0.0.0';

const webpackConfig = require('./webpack.config');

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
    DEVELOPMENT: (() => process.env.NODE_ENV != 'production')(),
    GOOGLE_ANALYTICS_INIT: false,
    GOOGLE_ANALYTICS_ID: false,
    DEV_BANNER: false,
    DISCORD_LOGIN_PROXY: false,
    FEATURE_FLAGS: {
        preloadUnreleasedTowns: false,
    },
    TRANSLATIONS_URL: 'https://translations.pokeclicker.com',
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
    scripts: ['src/scripts/**/*.ts', 'src/modules/**/*.ts'],
    html: ['src/*.html', 'src/templates/*.html', 'src/components/*.html'],
    ejsTemplates: ['src/templates/*.ejs'],
    styles: 'src/styles/**/*.less',
    assets: 'src/assets/**/*',
    locales: 'src/translations/locales/**/*',
    libs: [
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/intro.js/minified/intro.min.js',
        'node_modules/intro.js/introjs.css',
        'node_modules/intro.js/themes/introjs-modern.css',
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
    declarations: 'src/declarations/',
    styles: 'build/styles/',
    locales: 'build/locales/',
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

gulp.task('locales', () => gulp.src(srcs.locales)
    .pipe(changed(dests.locales))
    .pipe(gulp.dest(dests.locales))
    .pipe(browserSync.reload({stream: true})));

gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: dests.base,
        },
        ghostMode: false,
    });
    gulp.watch(srcs.html, gulp.series('compile-html'));
    gulp.watch(srcs.ejsTemplates, gulp.series('compile-html'));
    gulp.watch(srcs.assets, gulp.series('assets'));
    gulp.watch(srcs.locales, gulp.series('locales'));
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
        .pipe(replace('$DEVELOPMENT', !!config.DEVELOPMENT))
        .pipe(replace('$GOOGLE_ANALYTICS_INIT', !!config.GOOGLE_ANALYTICS_INIT))
        .pipe(replace('$GOOGLE_ANALYTICS_ID', config.GOOGLE_ANALYTICS_ID))
        .pipe(replace('$FEATURE_FLAGS', process.env.NODE_ENV === 'production' ? '{}' : JSON.stringify(config.FEATURE_FLAGS)))
        .pipe(ejs())
        .pipe(gulp.dest(htmlDest))
        .pipe(browserSync.reload({stream: true}));
    done();
});

gulp.task('scripts', () => {
    const base = gulp.src('src/modules/index.ts')
        .pipe(gulpWebpack(webpackConfig, webpack));

    // Convert the posix path to a path that matches the current OS
    const osPathPrefix = '../src'.split(path.posix.sep).join(path.sep);
    const osPathModulePrefix = '../src/declarations'.split(path.posix.sep).join(path.sep);

    const generateDeclarations = base
        .pipe(filter((vinylPath) => {
            return (
                vinylPath.relative.startsWith(osPathModulePrefix) &&
                // Exclude GameConstants, as we generate those manually
                !vinylPath.relative.includes('GameConstants.d.ts')
            );
        }))
        .pipe(rename((vinylPath) => Object.assign(
            {},
            vinylPath,
            // Strip '../src/modules' from the start of declaration vinylPaths
            { dirname: vinylPath.dirname.replace(osPathModulePrefix, '.') }
        )))
        // Remove default exports
        .pipe(replace(/(^|\n)export default \w+;/g, ''))
        // Replace imports with references
        .pipe(replace(/(^|\n)import (.* from )?'(.*)((.d)?.ts)?';/g, '$1/// <reference path="$3.d.ts"/>'))
        // Convert exports to declarations so that ./src/scripts can use them
        .pipe(replace(/(^|\n)export (?!declare)(?!.*from)(default )?/, '$1declare '))
        // Remove any remaining 'export'
        .pipe(replace(/(^|\n)export(?!.*from)( default)?/g, '\n'))
        // Fix broken declarations for things like temporaryWindowInjection
        .pipe(replace('declare {};', ''))
        .pipe(gulp.dest(dests.declarations));

    const compileModules = base
        // Exclude declaration files
        .pipe(filter((vinylPath) => !vinylPath.relative.startsWith(osPathPrefix)))
        .pipe(replace('$DEVELOPMENT', !!config.DEVELOPMENT))
        .pipe(replace('$TRANSLATIONS_URL', config.TRANSLATIONS_URL))
        .pipe(gulp.dest(dests.scripts));

    // Run the tasks for the new modules

    return del([dests.declarations])
        .then(() => Promise.all([
            streamToPromise(generateDeclarations),
            streamToPromise(compileModules),
        ]))
        .then(() => {
            // Compile the old scripts
            const tsProject = typescript.createProject('tsconfig.json', { typescript: require('typescript') });
            const compileScripts = tsProject.src()
                .pipe(replace('$VERSION', version))
                .pipe(replace('$DISCORD_ENABLED', !!config.DISCORD_LOGIN_PROXY))
                .pipe(replace('$DISCORD_LOGIN_PROXY', config.DISCORD_LOGIN_PROXY))
                .pipe(tsProject())
                .pipe(gulp.dest(dests.scripts))
                .pipe(browserSync.reload({stream: true}));
            return streamToPromise(compileScripts);
        });
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
        return done();
    }
    fs.writeFile(`${dests.githubPages}CNAME`, config.CNAME, done);
});

gulp.task('build', done => {
    gulp.series('copy', 'assets', 'locales', 'compile-html', 'scripts', 'styles')(done);
});

gulp.task('website', done => {
    gulp.series('clean', 'build', 'cleanWebsite', 'copyWebsite', 'cname')(done);
});

gulp.task('default', done => {
    gulp.series('clean', 'build', 'browserSync')(done);
});
