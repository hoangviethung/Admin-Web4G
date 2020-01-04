import {
	src,
	dest
} from "gulp";
// import babel from "gulp-babel";
import rename from "gulp-rename";
import plumber from "gulp-plumber";
import uglifyBabel from "gulp-terser";
import sourcemap from "gulp-sourcemaps";
import babelify from "babelify";
import browserify from "browserify";
import buffer from "vinyl-buffer";
import source from "vinyl-source-stream";
import babel from "gulp-babel";

export const jsTask = () => {
	return browserify({
			basedir: '.',
			entries: ['src/js/main.js'],
			debug: true,
			sourceMaps: true
		})
		.transform(babelify, {
			presets: ["@babel/preset-env"]
		})
		.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(plumber(function(err) {
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemap.init({
			loadMaps: true
		}))
		.pipe(uglifyBabel())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(sourcemap.write('.'))
		.pipe(dest('./dist/js'));
};

export const jsTask2 = () => {
	return src([
			'src/js/**.js',
			'!src/js/main.js',
			'!src/js/ckeditor.js',
			'!src/js/config.js',
			'!src/js/styles.js'
		])
		.pipe(plumber(function(err) {
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemap.init({
			loadMaps: true
		}))
		.pipe(babel())
		.pipe(uglifyBabel())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(sourcemap.write('.'))
		.pipe(dest('./dist/js'));
};

export const jsTask3 = (cb) => {
	src([
			'src/js/ckeditor.js',
			'src/js/config.js',
			'src/js/styles.js',
			'src/js/contents.css'
		])
		.pipe(dest('./dist/js'));
	src([
			'src/js/skins/**/**',
		])
		.pipe(dest('./dist/js/skins'));
	src([
			'src/js/lang/**/**',
		])
		.pipe(dest('./dist/js/lang'));
	src([
			'src/js/plugins/**/**',
		])
		.pipe(dest('./dist/js/plugins'));
	cb();
};

module.exports = {
	jsTask,
	jsTask2,
	jsTask3
};