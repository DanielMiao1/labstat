import Collector, { isWindows } from "./base";
import { loadavg } from "os";

class LoadAvg extends Collector {
	id = "loadavg";

	constructor() {
		super();

		if (isWindows()) {
			this.active = false;
		}
	}

	getData() {
		return loadavg();
	}
}

export { LoadAvg };
