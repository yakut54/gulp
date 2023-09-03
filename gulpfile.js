const namePage = 'site';
const dist = 'frontend_site';

const del = require('del');
const gulp = require('gulp');
const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const month = new Date().getMonth();

let currentDirect = months[month];

gulp.task('clean', () => del(`${currentDirect}/${namePage}`));

gulp.task('assets', function () {
    return gulp.src(`./${dist}/**`, {since: gulp.lastRun('assets')})
            .pipe(newer(`./${currentDirect}/${namePage}`))
            .pipe(gulp.dest(`./${currentDirect}/${namePage}`));
});

gulp.task('build', gulp.series('clean', gulp.parallel('assets')));

gulp.task('serve', function () {
    browserSync.init({
        server: `./${currentDirect}/${namePage}`,
        port: 3000
    });

    browserSync.watch(`./${currentDirect}/${namePage}/**/*.*`).on(`change`, browserSync.reload);
});

gulp.task('watch', function () {

    gulp.watch(`${dist}/**/*.*`, gulp.series('assets'));
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));

