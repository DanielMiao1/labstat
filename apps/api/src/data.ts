import type Collector from "./collectors/base";
import Memory from "./collectors/memory";
import OS from "./collectors/os";

import {
	Disks, Graphics, Hostname, Network, Uptime
} from "./collectors/core";

import { LoadAvg } from "./collectors/cpu";

const all_collectors: Collector[] = [
	Disks, Graphics, Hostname, LoadAvg, Memory, Network, OS, Uptime
];

const active_collectors: Record<string, Collector | null> = {};

all_collectors.forEach(collector => {
	const instance = new collector();

	if (!instance.inactive) {
		active_collectors[instance.id] = instance;
	}
});

function activeCollectors(): string[] {
	return Object.keys(active_collectors);
}

async function getData(id: string): Promise<string> {
	const collector = active_collectors[id];

	if (collector) {
		return JSON.stringify(await collector.getData());
	}

	return "";
}

export { activeCollectors, getData };
