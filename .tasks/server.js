import {
	watch,
	series,
	parallel
} from "gulp"
import bSync from "browser-sync";
import jsCore from "./core-js"
import {
	jsTask,
	jsTask2,
	jsTask3
} from "./script"
import {
	pugTask,
	pugTask2
} from "./html"
import cssCore from "./core-css"
import cssTask from "./css"
import {
	copyAssets
} from "./copy";
import {
	cleanAssets
} from "./clean";
import {
	copyAPIs
} from "./api";

export const server = () => {
	bSync.init({
		notify: false,
		server: {
			baseDir: "dist",
		},
		port: 8000
	})

	watch([
		"src/js/main.js",
		"src/js/lib/**.js"
	], {
		delay: 750
	}, series(jsTask));

	watch([
		"src/api/**.json"
	], series(copyAPIs))

	watch([
		'src/js/**.js',
		'!src/js/main.js'
	], {
		delay: 750
	}, series(jsTask2));

	watch([
		'src/js/ckeditor.js',
		'src/js/plugins/**/**',
		'src/js/config.js',
		'src/js/build-config.js'
	], {
		delay: 750
	}, series(jsTask3));

	watch([
		"src/**.pug",
		"src/components/**/**.pug",
	], {
		delay: 750
	}, series(pugTask));

	watch([
		"src/template-paper/**.pug",
	], {
		delay: 750
	}, series(pugTask2));

	watch([
		"src/scss/**/**.scss"
	], {
		delay: 750
	}, series(cssTask));

	watch([
		"src/assets/**/**.{svg,png,jpg,speg,gif,mp4,flv,avi}"
	], {
		delay: 750
	}, series(cleanAssets, copyAssets));


	watch([
		".vendors/**/**.css",
		".vendors/**/**.js",
		"config.json"
	], {
		delay: 750
	}, parallel(jsCore, cssCore));

	watch([
		"dist"
	]).on("change", bSync.reload);
}

module.exports = server;