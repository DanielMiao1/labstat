import type Collector from "./base";
import { isWindows } from "./os";
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
