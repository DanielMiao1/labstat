/**
 * Core collectors - should work in all environments
 * 
 * Each collector class should contain a unique identifier (id), and a
 * getData() function that returns any string-representable value.
 * Classes with inactive = true are ignored by the data aggregator.
 * The frontend will not automatically refresh collectors whose id begins with
 * an exclamation mark.
 */

import { execSync } from "child_process";
import { diskLayout, graphics, mem } from "systeminformation";
import { networkInterfaces, uptime } from "os";
import Collector, { isWindows } from "./base";

class Memory implements Collector {
	id = "memory";

	getData() {
		return mem();
	}
}

class Disks implements Collector {
	id = "!disks";

	getData() {
		return diskLayout();
	}
}

class Graphics implements Collector {
	id = "!graphics";

	getData() {
		return graphics();
	}
}

class Network implements Collector {
	id = "!net";

	getData() {
		return networkInterfaces();
	}
}

class Uptime implements Collector {
	id = "uptime";

	getData() {
		return uptime() / 3600;
	}
}

class Hostname implements Collector {
	id = "!hostname";

	getData() {
		const command = isWindows() ? "hostname" : "uname -n";
		const hostname = execSync(command).toString().slice(0, -1);

		return { hostname }; 
	}
}

export { Disks, Graphics, Hostname, Memory, Network, Uptime };
