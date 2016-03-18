'use strict';

/* Modules */
var gulp = require('gulp');
var watch = require('gulp-watch');
var prefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var sourcemaps = require('gulp-sourcemaps');
var rigger = require('gulp-rigger');	
var jade = require('gulp-jade');
var cssmin = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
//var rimraf = require('rimraf'); // deprecated, using del
//var concat = require('gulp-concat');
var browserSync = require("browser-sync");
var mainBowerFiles = require('main-bower-files');
var flatten = require('gulp-flatten');
var filter = require('gulp-filter');
var rename = require('gulp-rename');
var react = require('gulp-react');
var newer = require('gulp-newer');
var del = require('del');


/* Settings */
var	reload = browserSync.reload;
var serverConfig = {
	server: {
		baseDir: "./build"
	},
	tunnel: false,
	host: 'localhost',
	port: 9000,
	logPrefix: "Gulp WebServer",
	open: false	// Stop the browser from automatically opening
};

/* Paths */
var rootBuild = './build';
var rootSrc = './src';
var path = {
		build: {
	        html: rootBuild,
	        jade: rootBuild,
	        js: rootBuild + '/js',
	        css: rootBuild + '/css',
	        img: rootBuild + '/img',
	        fonts: rootBuild + '/vendor/fonts',
	        bower: rootBuild + '/vendor',
	        react: rootBuild + '/js'
	    },
	    src: {
	        html: rootSrc + '/*.html',
	        jade: [rootSrc + '/jade/*.jade', '!'+ rootSrc + '/jade/_*.jade'],
	        js: rootSrc + '/js/main.js',
	        style: [rootSrc + '/styles/*.scss', '!'+ rootSrc + '/styles/_*.scss'],
	        img: rootSrc + '/img/**/*.*',
	        fonts: rootSrc + '/fonts/**/*.*',
	        react: rootSrc + '/jsx/app.jsx'
	    },
	    watch: {
	        html: rootSrc + '/**/*.html',
	        jade: rootSrc + '/jade/**/*.jade',
	        js: rootSrc + '/js/**/*.js',
	        style: rootSrc + '/styles/**/*.scss',
	        img: rootSrc + '/img/**/*.*',
	        fonts: rootSrc + '/fonts/**/*.*',
	        react: rootSrc + '/jsx/*.jsx'
	    }
}


/* Gulp Tasks */

// clean
gulp.task( 'clean:old', function (cb) {
    rimraf( rootBuild, cb );
});
gulp.task('clean', function (cb) { del( rootBuild, cb ); });


// jade
gulp.task('jade', function() {
    gulp.src(path.src.jade)
        .pipe(jade({
            pretty: true
        }))  
        .on('error', console.log) 
    .pipe(gulp.dest(path.build.jade)) 
    .pipe(reload({stream: true}));
}); 

// images
/*
gulp.task('images:old', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({ 
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) 
        .pipe(reload({stream: true}));
});
*/
// Copy all static images
gulp.task('images', function() {
  return gulp.src(path.src.img)
  	//.pipe(newer(path.build.img))
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(path.build.img))
    //.pipe(reload({stream: true}));
});

// bower
gulp.task('bower', function() {
    var jsFilter = filter('*.js');
    var cssFilter = filter('*.css');
    var fontFilter = filter(['*.eot', '*.woff', '*.svg', '*.ttf']);
    return gulp.src(mainBowerFiles())
	    // grab vendor js files from bower_components
	    .pipe(jsFilter)
	    //.pipe(newer(path.build.bower + '/js/'))
	    .pipe(uglify())
	    .pipe(rename({
	        suffix: ".min"
	    }))
	    .pipe(gulp.dest(path.build.bower + '/js/'))
	    .pipe(jsFilter.restore())
	    // grab vendor css files from bower_components
	    .pipe(cssFilter)
	    //.pipe(newer(path.build.bower + '/css'))
	    .pipe(cssmin())
	    .pipe(rename({
	        suffix: ".min"
	    }))
	    .pipe(gulp.dest(path.build.bower + '/css'))
	    .pipe(cssFilter.restore())
	    // grab vendor font files from bower_components
	    .pipe(fontFilter)
	    //.pipe(newer(path.build.bower + '/fonts'))
	    .pipe(flatten())
	    .pipe(gulp.dest(path.build.bower + '/fonts'));
});

// sass
gulp.task('sass', function () {
    gulp.src(path.src.style)
    	//.pipe(newer(path.build.css))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        //.pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

// compass
gulp.task('compass', function() {
  gulp.src(path.src.style)
  	//.pipe(newer(path.build.css))
    .pipe(compass({
      project: __dirname,
      css: './build/styles',
      sass: './src/styles',
      comments: true,
      sourcemap: true,
      //environment: 'production'
    }))
    //.pipe(cssmin())
    .pipe(prefixer())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

// react
gulp.task('react', function () {
    return gulp.src(path.src.react)
    	//.pipe(newer(path.build.react))
        .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.react))
        .pipe(reload({stream: true}));
});

// fonts
gulp.task('fonts', function() {
    gulp.src(path.src.fonts)
    	.pipe(newer(path.build.fonts))
        .pipe(gulp.dest(path.build.fonts))
});

// pure js
gulp.task('js', function () {
    gulp.src(path.src.js)
    	//.pipe(newer(path.build.js))
        .pipe(rigger())
        .pipe(sourcemaps.init())
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});


// web server
gulp.task('webserver', function () {
    browserSync( serverConfig );
});




//// ? section
/*
// plain html --?
gulp.task('plainhtml', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});
*/


// BUILD
gulp.task('build', ['clean'], function () {
    gulp.start(['sass', 'jade', 'js', 'bower', 'images', 'fonts']);
});

gulp.task('build:old', [
    // 'compass',
    'sass',
    'jade',
    // 'react',
    'js',
    'bower',
    'images',
    'fonts'
]);

// WATCH
gulp.task('watch', function(){
	/*watch([path.watch.html], function(event, cb) {
        gulp.start('plainhtml');
    });
 	watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts');
    });*/
    // watch([path.watch.style], function() { gulp.start('compass'); });
    watch([path.watch.style], function() { gulp.start('sass'); });
    watch([path.watch.jade], function() { gulp.start('jade'); });
    // watch([path.watch.react], function() { gulp.start('react'); });
    watch([path.watch.js], function() { gulp.start('js'); });
    watch([path.watch.img], function() { gulp.start('images'); });
});

// MAIN TASK
gulp.task('default', ['build', 'webserver', 'watch']);
// gulp.task('default', ['clean'], function () {
//     gulp.start(['build', 'webserver', 'watch']);
// });

