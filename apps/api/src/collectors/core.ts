/**
 * Core collectors - should work in all environments
 * 
 * Each collector class should contain a unique identifier (id), and a
 * getData() function that returns any string-representable value.
 * Classes with active = false are ignored by the data aggregator.
 * The frontend will not automatically refresh collectors whose id begins with
 * an exclamation mark.
 */

import { freemem, networkInterfaces, totalmem, uptime } from "os";
import Collector from "./base";

class TotalMem extends Collector {
	id = "!total-mem"

	getData() {
		return totalmem() / 1000000;
	}
}

class FreeMem extends Collector {
	id = "free-mem";

	getData() {
		return freemem() / 1000000;
	}
}

class Network extends Collector {
	id = "net";

	getData() {
		return JSON.stringify(networkInterfaces());
	}
}

class Uptime extends Collector {
	id = "uptime";

	getData() {
		return uptime() / 3600;
	}
}

export { FreeMem, Network, TotalMem, Uptime };
