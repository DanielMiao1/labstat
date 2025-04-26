function isWindows() {
	return process.platform === "win32";
}

class Collector {
	id: string;
	active = true;

	getData(): unknown;
}

export { isWindows };
export default Collector;
