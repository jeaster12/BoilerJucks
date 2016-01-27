//
// GULPFILE
//

// TASKS
// 1. `gulp` - Default task to build and run server
// 2. `gulp prod` - Minify everything to get ready for deploy
// 3. `gulp deploy` - Deploy to gh-pages

// -------------------------------------------------------------
// # Import plugins
// -------------------------------------------------------------

var gulp            = require('gulp'),
    nunjucks        = require('gulp-nunjucks-html'),
    minifyHTML      = require('gulp-minify-html'),
    sass            = require('gulp-sass'),
    less            = require('gulp-less'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifyCSS       = require('gulp-minify-css'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat');
    jshint          = require('gulp-jshint'),
    cache           = require('gulp-cache'),
    browserSync     = require('browser-sync'),
    gutil           = require("gulp-util"),
    notify          = require("gulp-notify"),
    del             = require('del'),
    sizereport      = require('gulp-sizereport'),
    runSequence     = require('run-sequence'),
    ghPages         = require('gulp-gh-pages');
    sourcemaps      = require('gulp-sourcemaps');
    notify          = require("gulp-notify");

// -------------------------------------------------------------
// # Config
// -------------------------------------------------------------

var basePath = {
    src:    './src/',
    dev:   './dev/',
    prod:   './prod/'
};

var src = {
    html:   [basePath.src + 'html/**/*.html', '!' + basePath.src + 'html/layout.html'],
    sass:   basePath.src + 'assets/scss/',
    less:   basePath.src + 'less/',
    js:     basePath.src + 'assets/js/',
    img:    basePath.src + 'assets/img/*',
    bower:  './bower_components/'
};

var dev = {
    html:   basePath.dev,
    sass:   basePath.dev + 'css/',
    less:   basePath.dev + 'css/',
    js:     basePath.dev + 'js/',
    img:    basePath.dev + 'img/'
};

var prod = {
    html:   basePath.prod,
    sass:   basePath.prod + 'css/',
    less:   basePath.prod + 'css/',
    js:     basePath.prod + 'js/',
    img:    basePath.prod + 'img/'
};

// Deploy
var deploy = {
    path: basePath.prod + '**/*.*',
    branch: "gh-pages"
};

// Error handling
var handleError = function(err) {
    gutil.log(gutil.colors.red.bold(
        '\n\n\n' + err + '\n\n'
    ));
    return notify().write('BUILD FAILED!\nCheck terminal for error message.');
};


// -------------------------------------------------------------
// # HTML
// -------------------------------------------------------------

gulp.task('html', function() {
    return gulp.src(src.html)
        .pipe(nunjucks({
            searchPaths: ['./src/html']
        }))
        .pipe(gulp.dest(dev.html))
        .pipe(notify({ message: 'Templates Nujucked!', onLast: true }))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('htmlProd', ['html'], function() {
    return gulp.src(dev.html + '*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest(prod.html));
});


// -------------------------------------------------------------
// # SASS
// -------------------------------------------------------------

// gulp.task('sass', function() {
//     return gulp.src(src.sass + '**/*.scss')
//         .pipe(sourcemaps.init())
//         .pipe(sass({
//             outputStyle: 'expanded',
//             errLogToConsole: true,
//             // onError: handleError // Broken in latest gulp-sass
//         }))
//         .pipe(autoprefixer('last 2 version'))
//         .pipe(sourcemaps.write('./maps'))
//         .pipe(gulp.dest(dev.sass))
//         .pipe(notify({ message: 'Sass got sassy!', onLast: true }))
//         .pipe(browserSync.reload({stream:true}));
// });
//
// gulp.task('sassProd', ['sass'], function() {
//     return gulp.src(dev.sass + '**/*.css')
//         .pipe(minifyCSS())
//         .pipe(gulp.dest(prod.sass));
// });


// -------------------------------------------------------------
// # less
// -------------------------------------------------------------

gulp.task('less', function() {
    return gulp.src(src.less + '*.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(dev.less))
        .pipe(notify({ message: 'Lessified!', onLast: true }))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('lessProd', ['less'], function() {
    return gulp.src(dev.less + '**/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest(prod.less));
});




gulp.task('move', [], function() {
  console.log("Moving all files in assets folder");
  gulp.src("src/assets/**")
      .pipe(gulp.dest('dev/assets'));
});

// -------------------------------------------------------------
// # JS
// -------------------------------------------------------------

gulp.task('jshint', function () {
    gulp.src([src.js + '*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .on('error', handleError);

});

gulp.task('js', function() {
    return gulp.src([
            src.bower + 'jquery/dist/jquery.min.js',
            src.js + 'app.js',
            src.js + 'lib.js'
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dev.js))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('jsProd', ['js'], function() {
    return gulp.src(dev.js + '*.js')
        .pipe(uglify())
        .pipe(gulp.dest(prod.js));
});



// -------------------------------------------------------------
// # BrowserSync
// -------------------------------------------------------------

gulp.task('browserSync', ['less'], function() {
    browserSync({
        server: {
            baseDir: basePath.dev,
        },
        port: 4000,
        browser: "google chrome",
        reloadDelay: 1000,
        notify: false,
        open: true
    });
});

gulp.task('browserSyncProd', function() {
    browserSync({
        server: {
            baseDir: basePath.prod,
        },
        notify: false
    });
});


// -------------------------------------------------------------
// # Watch
// -------------------------------------------------------------

gulp.task('watch', ['browserSync'], function(callback) {
    // gulp.watch(src.sass + '**/*.scss', ['sass']);
    gulp.watch(src.less + '**/*.less', ['less']);
    gulp.watch(src.js + '*.js', ['jshint' ,'js']);
    gulp.watch(src.html, ['html']);
});


// -------------------------------------------------------------
// # Clean
// -------------------------------------------------------------

gulp.task('clean', function () {
    return del(basePath.dev + '**');
});

gulp.task('cleanProd', function () {
    return del(basePath.prod + '**');
});


// -------------------------------------------------------------
// # Report
// -------------------------------------------------------------

gulp.task('report', function () {
    return gulp.src(basePath.prod + '**/*')
        .pipe(sizereport());
});

// -------------------------------------------------------------
// # Default task - run `gulp`
// -------------------------------------------------------------

gulp.task('default', ['clean'], function (cb) {
    runSequence([
        'html',
        'move',
        // 'sass',
        'less',
        // 'jshint',
        // 'js',
        'browserSync',
        'watch'
    ], cb);
});


// -------------------------------------------------------------
// # Production task - run `gulp prod`
// -------------------------------------------------------------

gulp.task('prod', ['cleanProd'], function (cb) {
    runSequence([
        'htmlProd',
        // 'sassProd',
        'lessProd',
        'jsProd',
        'browserSyncProd',
    ], function() {
        console.log(cb);
    });
});


// -------------------------------------------------------------
// # Deploy task - run `gulp deploy`
// -------------------------------------------------------------

gulp.task('deploy', function () {
    return gulp.src(deploy.path)
        .pipe(ghPages(deploy.branch));
    gulp.src(deploy.path)
});
