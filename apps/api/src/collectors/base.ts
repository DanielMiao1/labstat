function isWindows() {
	return process.platform === "win32";
}

class Collector {
	id: string;
	active = true;

	getData(): any;
}

export { isWindows };
export default Collector;
