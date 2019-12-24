import {
	series,
	parallel
} from "gulp";

// Import tasks
import server from "./.tasks/server";
import {
	jsTask,
	jsTask2,
	jsTask3
} from "./.tasks/script";
import pugTask from "./.tasks/html";
import cssTask from "./.tasks/css";
import jsCore from "./.tasks/core-js";
import cssCore from "./.tasks/core-css";
import {
	cleanDist
} from "./.tasks/clean";
import {
	copyFonts,
	copyFavicon,
	copyAssets
} from "./.tasks/copy";


exports.default = series(
	cleanDist,
	parallel(
		copyFavicon,
		copyFonts,
		copyAssets
	),
	parallel(
		jsCore,
		cssCore
	),
	cssTask,
	jsTask,
	jsTask2,
	jsTask3,
	pugTask,
	server,
)