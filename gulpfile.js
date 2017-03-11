// --- DEPENDENCIES ------------------------------------------------------------

  var autoprefixer = require('gulp-autoprefixer');
  var chalk        = require('chalk');
  var concat       = require('gulp-concat');
  var debug        = require('gulp-debug');
  var gulp         = require('gulp');
  var gutil        = require('gulp-util');
  var imagemin     = require('gulp-imagemin');
  var jshint       = require('gulp-jshint');
  var cleancss     = require('gulp-clean-css');
  var phpcs        = require('gulp-phpcs');
  var plumber      = require('gulp-plumber');
  var rename       = require("gulp-rename");
  var sass         = require('gulp-sass');
  var scsslint     = require('gulp-scss-lint');
  var sourcemaps   = require('gulp-sourcemaps');
  var uglify       = require('gulp-uglify');


// --- PLUGIN PATHS ------------------------------------------------------------

  var paths = {
    fonts: {
      bootstrap: './bower_components/bootstrap-sass/assets/fonts/bootstrap/*',
      input: [
        './bower_components/font-awesome/fonts/*',
        './assets/fonts/*'
      ],
      output: './dist/fonts'
    },
    images: {
      input: './assets/img/*',
      output: './dist/img'
    },
    js: {
      input: [
        './assets/js/scripts.js',
      ],
      vendor: [
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        './bower_components/waypoints/lib/jquery.waypoints.min.js'
      ],
      output: './dist/js'
    },
    phpcs: {
      input: [
        './**/*.html',
        './**/*.inc',
        './**/*.php',
        '!./bower_components/**/*.*',
        '!./node_modules/**/*.*',
        '!./vendor/**/*.*'
      ],
      log: './phpcs_errors.log'
    },
    scss: {
      input: [
        './assets/scss/**/*.scss'
      ],
      ignore: [],
      output: './dist/css',
      vendor: [
        './bower_components/bootstrap-sass/assets/stylesheets',
        './bower_components/font-awesome/scss',
        './bower_components/open-color',
        './bower_components/animate.css/'
      ]
    }
  };


// --- PLUGIN OPTIONS ----------------------------------------------------------

  var options = {
    phpcs: {
      bin: './vendor/bin/phpcs',
      standard: 'PSR2',
      errorSeverity: 1,
      warningSeverity: 1
    },
    sass: {
      outputStyle: 'expanded',
      includePaths: paths.scss.vendor
    }
  };


// --- ERROR REPORTING ---------------------------------------------------------

  // General Error Reporting
  var reportError = function(error) {
    // console.error(error);
    var report     = '';
    var chalk      = gutil.colors.bold.red;
    var longpath   = error.file;
    var shortpath  = longpath.split('themes').slice(-1);
    var longerror  = error.message;
    var shorterror = longerror.split('  ').pop();

    report += '\n';
    report += chalk('--- GULP ERROR -----------------------------------------------------------------') + '\n';
    report += chalk('Task: ') + error.plugin + '\n';
    report += chalk('File: ') + shortpath + '\n';
    report += chalk(error.line + '/' + error.column + ': ') + shorterror + '\n';
    report += chalk('--------------------------------------------------------------------------------') + '\n';
    console.error(report);

    this.emit('end');
  };

  // Lint Error Reporting
  var reportLintError = function(file) {
    if (!file.scsslint.success) {
      var report    = '';
      var chalk     = gutil.colors.bold.yellow;
      var longpath  = file.path;
      var shortpath = longpath.split('themes').slice(-1);

      report += '\n';
      report += chalk('--- LINT WARNING ---------------------------------------------------------------') + '\n';
      report += chalk('File: ') + shortpath + '\n';
      for (var i = 0; i < file.scsslint.issues.length; i++) {
        report += chalk(file.scsslint.issues[i].line + '/' + file.scsslint.issues[0].column + ': ') + file.scsslint.issues[i].reason + '\n';
      }
      report += chalk('--------------------------------------------------------------------------------') + '\n';
      console.error(report);
    }
  };


// --- TASKS -------------------------------------------------------------------

  // Task: Fonts
  gulp.task('fonts', function() {
    gulp.src(paths.fonts.input)
      .pipe(debug({title: 'fonts:'}))
      .pipe(gulp.dest(paths.fonts.output));
    gulp.src(paths.fonts.bootstrap)
      .pipe(gulp.dest((paths.fonts.output + '/bootstrap')));
  });

  // Task: Images
  gulp.task('img', function() {
    gulp.src(paths.images.input)
      .pipe(imagemin())
      .pipe(gulp.dest(paths.images.output))
  });

  // Task: JSHint
  gulp.task('jshint', function() {
    gulp.src(paths.js.input)
      .pipe(debug({title: 'jshint:'}))
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });

  // Task: JavaScript
  gulp.task('js', ['jshint'], function() {
    // Vendor files
    gulp.src(paths.js.vendor)
      .pipe(debug({title: 'js-vendor:'}))
      .pipe(sourcemaps.init())
      .pipe(plumber({
        'errorHandler': reportError
      }))
      .pipe(concat('vendor.js'))
      .pipe(rename(function(path) {
        path.basename += '.min';
        path.extname   = '.js';
      }))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest( paths.js.output));
    // Main files
    gulp.src(paths.js.input)
      .pipe(debug({title: 'js-main:'}))
      .pipe(sourcemaps.init())
      .pipe(plumber({
        'errorHandler': reportError
      }))
      .pipe(uglify({output: {comments: /^!|@preserve|@license|@cc_on/i}}))
      .pipe(rename(function(path) {
        path.basename += '.min';
        path.extname   = '.js';
      }))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest(paths.js.output));
  });

  // Task: PHPCS
  gulp.task('phpcs', function() {
    gulp.src(paths.phpcs.input)
      .pipe(debug({title: 'phpcs:'}))
      .pipe(plumber({
        'errorHandler': reportError
      }))
      .pipe(phpcs(options.phpcs))
      .pipe(phpcs.reporter('file', { path: paths.phpcs.log }))
      .pipe(phpcs.reporter('log'));
  });

  // Task: SCSS Lint
  gulp.task('scsslint', function () {
    gulp.src(paths.scss.input)
      .pipe(debug({title: 'scsslint:'}))
      .pipe(scsslint({
        config: './.scss-lint.yml',
        customReport: reportLintError
      }));
  });

  // Task: SCSS
  gulp.task('scss', ['scsslint'], function() {
    gulp.src(paths.scss.input)
      .pipe(plumber({
        'errorHandler': reportError
      }))
      .pipe(sourcemaps.init())
      .pipe(sass(options.sass))
      .pipe(autoprefixer())
      .pipe(rename(function (path) {
        path.basename += '.min';
        path.extname   = '.css';
      }))
      .pipe(cleancss())
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest(paths.scss.output));
  });

  // Task: Watch
  gulp.task('watch', ['img', 'js', 'scss'], function() {
    gulp.watch(paths.images.input, ['img']);
    gulp.watch(paths.js.input, ['js']);
    gulp.watch(paths.phpcs.input, ['phpcs']);
    gulp.watch(paths.scss.input, ['scss']);
  });

  // Task: Default
  gulp.task('default', ['fonts', 'img', 'js', 'phpcs', 'scss']);
