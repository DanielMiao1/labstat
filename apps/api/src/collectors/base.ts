function isWindows() {
	return process.platform === "win32";
}

interface Collector {
	id: string;
	inactive?: true;
	getData: () => unknown;
	new(): this;
}

export { isWindows };
export default Collector;
