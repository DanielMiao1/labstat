import type Collector from "./base";
import { isWindows } from "./os";
import { loadavg } from "os";
import { round } from "../util/number";

class LoadAvg implements Collector {
	id = "loadavg";

	constructor() {
		if (isWindows()) {
			this.inactive = true;
		}
	}

	getData() {
		/**
		 * Retrieve loadavg triplet using the os module.
		 *
		 * Many BSD systems return results with over 10 decimal places, so re-round
		 * each value to 2 decimals.
		 */

		const [avg_1, avg_5, avg_15] = loadavg();

		return [
			round(avg_1, 2),
			round(avg_5, 2),
			round(avg_15, 2)
		];
	}
}

export { LoadAvg };
