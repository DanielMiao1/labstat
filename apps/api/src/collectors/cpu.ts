import Collector, { isWindows } from "./base";
import { loadavg } from "os";

class LoadAvg implements Collector {
	id = "loadavg";

	constructor() {
		if (isWindows()) {
			this.inactive = true;
		}
	}

	getData() {
		return loadavg();
	}
}

export { LoadAvg };
