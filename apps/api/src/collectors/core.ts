/**
 * Core collectors - should work in all environments
 * 
 * Each collector class should contain a unique identifier (id), and a
 * getData() function that returns any string-representable value.
 * Classes with active = false are ignored by the data aggregator.
 * The frontend will not automatically refresh collectors whose id begins with
 * an exclamation mark.
 */

import { networkInterfaces, uptime } from "os";
import { diskLayout, graphics, mem } from "systeminformation";
import Collector from "./base";

class Memory extends Collector {
	id = "memory"

	async getData() {
		return JSON.stringify(await mem());
	}
}

class Disks extends Collector {
	id = "!disks";

	async getData() {
		return JSON.stringify(await diskLayout());
	}
}

class Graphics extends Collector {
	id = "!graphics";

	async getData() {
		return JSON.stringify(await graphics());
	}
}

class Network extends Collector {
	id = "!net";

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

export { Disks, Graphics, Network, Memory, Uptime };
