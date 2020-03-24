import {
	src,
	dest
} from "gulp";

export const copyAPIs = () => {
	return src([
		"./src/api/**.json",
		"./src/api/**.html"
	])
		.pipe(dest("./dist/api"))
};