const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");
const through = require('gulp-through');

const onError = function (err) {
    notify({
         title: 'Gulp Task Error',
         message: 'Check the console.'
     }).write(err);

     console.log(err.toString());
     
     this.emit('end');
}
// connect
const connect = require('gulp-connect-multi')();

gulp.task('connect', connect.server({
	host: '127.0.0.1',
	port: 8091,
	root: ['site'],
	livereload: true,
	open: {
		browser: 'Google Chrome'
	}
}));

// template
const htmlmin = require('gulp-htmlmin');

gulp.task('template', () => {
	gulp.src('./src/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./site/'))
		.pipe(connect.reload());
});

// style
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('style', () => {
	var onError = function(err) {
        notify.onError({
                    title:    "Gulp",
                    subtitle: "Failure!",
                    message:  "Error: <%= error.message %>",
                    sound:    "Beep"
                })(err);
        this.emit('end');
    };

	gulp.src('./src/styles/style.css')
	.pipe(plumber({ errorHandle: onError }))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./site/'))
		.pipe(connect.reload());
});

// script 
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default; 

gulp.task('script', () => {
	var onError = function(err) {
        notify.onError({
                    title:    "Gulp",
                    subtitle: "Failure!",
                    message:  "Error: <%= error.message %>",
                    sound:    "Beep"
                })(err);

        this.emit('end');
    };
	gulp.src('./src/scripts/*.js')
	.pipe(plumber({ errorHandle: onError }))
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./site/'))
		.pipe(connect.reload());
});


// image
const imagemin = require('gulp-imagemin');

gulp.task('image', () => {
	gulp.src('./src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./site/img/'))
		.pipe(connect.reload());
});

// watch
gulp.task('watch', () => {
	gulp.watch('./src/*.html', ['template']);
	gulp.watch('./src/styles/*.scss', ['style']);
	gulp.watch('./src/scripts/*.js', ['script']);
	gulp.watch('img/*.{png,jpg,jpeg,gif,svg}', {cwd: './dev/'}, ['image']);
});

gulp.task('default', ['template', 'style', 'script', 'image']);
gulp.task('dev', ['default', 'connect', 'watch']);