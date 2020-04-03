import {
	src,
	dest,
} from 'gulp';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';
import {
	readFileSync,
} from 'graceful-fs';

export const pugTask = () => {
	const gulpConfig = JSON.parse(readFileSync('config.json'));
	let glob;
	if (gulpConfig.build) {
		glob = './src/**.pug';
	} else {
		glob = gulpConfig.filePath;
	}
	return src(glob)
		.pipe(plumber(function(err) {
			console.log(err);
			this.emit('end');
		}))
		.pipe(pug({
			pretty: '\t',
		}))
		.pipe(dest('dist'));
};

export const pugTask2 = () => {
	const gulpConfig = JSON.parse(readFileSync('config.json'));
	let glob;
	if (gulpConfig.build) {
		glob = './src/template-paper/**.pug';
	} else {
		glob = gulpConfig.filePath;
	}
	return src(glob)
		.pipe(plumber(function(err) {
			console.log(err);
			this.emit('end');
		}))
		.pipe(pug({
			pretty: '\t',
		}))
		.pipe(dest('dist/template-paper'));
};

module.exports = {
	pugTask,
	pugTask2
};