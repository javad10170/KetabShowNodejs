var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var htmlreplace = require('gulp-html-replace');



gulp.task('lib-js', function () {
    return gulp.src(
        [
            'public/bower_components/angular/angular.min.js',
            'public/bower_components/angular-animate/angular-animate.min.js',
            'public/bower_components/angular-aria/angular-aria.min.js',
            'public/bower_components/angular-messages/angular-messages.min.js',
            'public/bower_components/angular-material/angular-material.min.js',
            'public/bower_components/material-steppers/dist/material-steppers.min.js',
            'public/bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'public/bower_components/ng-file-upload/ng-file-upload.min.js',
            'public/bower_components/ng-file-upload/ng-file-upload-shim.min.js',
            'public/bower_components/angular-cookies/angular-cookies.min.js',
            'public/bower_components/angular-unsavedChanges/dist/unsavedChanges.min.js',
            'public/bower_components/angular-translate/angular-translate.min.js',
            'public/bower_components/angular-translate-storage-local/angular-translate-storage-local.min.js',
            'public/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
            'public/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
            'public/bower_components/angular-translate-handler-log/angular-translate-handler-log.min.js',
            'public/bower_components/font-awesome/js/fontawesome.min.js',
            'public/bower_components/froala-wysiwyg-editor/js/froala_editor.min.js',
            'public/bower_components/ngstorage/ngStorage.min.js',
            'public/bower_components/froala-wysiwyg-editor/js/plugins/code_view.min.js',
            'public/bower_components/froala-wysiwyg-editor/js/plugins/code_beautifier.min.js',
            'public/js/angular-froala.js'
        ])
        .pipe(concat('lib.js'))
        .pipe(minify())
        .pipe(gulp.dest('public/build/js'));
});

gulp.task('pack-css', function () {
    return gulp.src([
        'public/bower_components/angular-material/angular-material.min.css',
        'public/bower_components/material-steppers/dist/material-steppers.css',
        'public/bower_components/font-awesome/css/fontawesome.min.css',
        'public/bower_components/font-awesome/css/all.min.css',
        'public/bower_components/froala-wysiwyg-editor/css/froala_editor.min.css',
        'public/bower_components/froala-wysiwyg-editor/css/froala_style.min.css',
        'public/bower_components/froala-wysiwyg-editor/css/froala_editor.pkgd.min.css',
        'public/bower_components/froala-wysiwyg-editor/css/plugins/code_view.min.css',
        'public/bower_components/froala-wysiwyg-editor/css/plugins/colors.css',
        'public/bower_components/froala-wysiwyg-editor/css/plugins/emoticons.css',
        'public/bower_components/froala-wysiwyg-editor/css/plugins/quick_insert.css',
        'public/css/rtl.css'
    ])
        .pipe(concat('stylesheet.css'))
        .pipe(cleanCss())
        .pipe(minify())
        .pipe(gulp.dest('public/build/css'));
});

gulp.task('core-js', function () {
    return gulp.src(
        [
            'public/js/*.js',
            'public/page/**/*.js'
        ])
        .pipe(concat('core.js'))
        .pipe(minify())
        .pipe(gulp.dest('public/build/js'));
});

gulp.task('copy', function () {
    gulp
        .src([
            'public/index.html'
        ])
        .pipe(htmlreplace({
            'libjs': 'js/lib.js?v=' + Date.now(),
            'corejs': 'js/core.js?v=' + Date.now(),
            'css': 'css/stylesheet.css?v=' + Date.now()
        }))
        .pipe(gulp.dest('public/build'));
});

gulp.task('copy1', function () {
    gulp.src([
        'public/img/*.svg'
    ])
        .pipe(gulp.dest('public/build/img'));
});
gulp.task('copy6', function () {
    gulp.src([
        'public/lang/*.json'
    ])
        .pipe(gulp.dest('public/build/lang'));
});
gulp.task('copy2', function () {
    gulp.src([
        'public/page/abxmultiple/abxmultiple.html'
    ])
        .pipe(gulp.dest('public/build/page/abxmultiple'));
});
gulp.task('copy3', function () {
    gulp.src([
        'public/page/abxwizard/abxwizard.html'
    ])
        .pipe(gulp.dest('public/build/page/abxwizard'));
});
gulp.task('copy4', function () {
    gulp.src([
        'public/page/header/header.html',
        'public/page/header/menu.html'
    ])
        .pipe(gulp.dest('public/build/page/header'));
});
gulp.task('copy5', function () {
    gulp.src([
        'public/page/home/home.html'
    ])
        .pipe(gulp.dest('public/build/page/home'));
});


gulp.task('default', ['lib-js', 'core-js', 'pack-css', 'copy', 'copy1', 'copy2', 'copy3', 'copy4', 'copy5', 'copy6']);