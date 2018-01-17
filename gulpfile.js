var gulp = require('gulp');
var file = require('gulp-file');
var tslint = require('gulp-tslint');
var changed = require('gulp-changed');
var minifyHtml = require('gulp-minify-html');
var concat = require('gulp-concat');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var typescript = require('gulp-typescript');
var browserSync = require('browser-sync');
var del = require('del');
var runSequence = require('run-sequence');
var bsConfig = require("gulp-bootstrap-configurator");
var less = require('gulp-less');
var gulpImport = require('gulp-html-import');
var markdown = require('gulp-markdown');
var inject = require('gulp-inject');
var glob = require("glob");


/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
    return gulp.src("./dist/**/*")
        .pipe(deploy())
});

var srcs = {
    buildArtefacts: 'build/**/*',
    scripts: 'src/scripts/**/*.ts',
    html: ['src/*.html', 'src/templates/*.html', 'src/components/*.html'],
    styles: 'src/styles/**/*.less',
    assets: 'src/assets/**/*',
    libs: [ 'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/tether/dist/js/tether.min.js',
            'node_modules/knockout/build/output/knockout-latest.js',
            'node_modules/bootstrap-notify/bootstrap-notify.min.js',
            'src/libs/*.js'
    ]
};


var dests = {
    base: 'build',
    libs: 'build/libs/',
    assets: 'build/assets/',
    scripts: 'build/scripts/',
    styles: 'build/styles/',
    githubPages: 'docs/'
};

gulp.task('cname', function() {
    var str = "www.pokeclicker.com";
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

gulp.task('import', function () {
    var recentChangelogs = glob.sync('./src/assets/changelog/*.md').slice(-3).reverse();

    var htmlDest = './build';
    gulp.src('./src/index.html')
        .pipe(gulpImport('./src/components/'))
        .pipe(inject(gulp.src(recentChangelogs)
        .pipe(markdown()), {
          starttag: '<!-- inject:head:html -->',
          transform: function (filePath, file) {
            return file.contents.toString('utf8')
          }
        }))
        .pipe(gulp.dest(htmlDest)); 
})


gulp.task('full-changelog', function () {
    var recentChangelogs = glob.sync('./src/assets/changelog/*.md').reverse();

    var htmlDest = './build';
    gulp.src('./src/changelog.html')
        .pipe(inject(gulp.src(recentChangelogs)
        .pipe(markdown()), {
          starttag: '<!-- inject:head:html -->',
          transform: function (filePath, file) {
            return file.contents.toString('utf8')
          }
        }))
        .pipe(gulp.dest(htmlDest)); 
})

gulp.task('html', function () {
    var htmlDest = './build';

    return gulp.src(srcs.html)
        .pipe(changed(dests.base))
        .pipe(minifyHtml())
        .pipe(gulp.dest(htmlDest))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function () {
    var tsProject = typescript.createProject('tsconfig.json');
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

gulp.task('build', ['copy', 'assets', 'import', 'scripts', 'styles','full-changelog']);

gulp.task('website', function (done) {
    runSequence('clean', 'build', 'cleanWebsite', 'copyWebsite', 'cname', function () {
        return done();
    });
});

gulp.task('default', function (done) {
    runSequence('clean', 'build', 'browserSync', function () {
        gulp.watch(srcs.html, ['import', 'html']);
        gulp.watch(srcs.assets, ['assets']);
        gulp.watch(srcs.scripts, ['scripts']);
        gulp.watch(srcs.styles, ['styles']);
        done();
    });
});
