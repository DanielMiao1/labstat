import type Collector from "./collectors/base";
import OS from "./collectors/os";

import {
	Disks, Graphics, Hostname, Memory, Network, Uptime
} from "./collectors/core";

import { LoadAvg } from "./collectors/cpu";

const all_collectors: Collector[] = [
	Disks, Graphics, Hostname, LoadAvg, Memory, Network, OS, Uptime
];

const active_collectors = {};

all_collectors.forEach(collector => {
	const instance = new collector();

	if (instance.active) {
		active_collectors[instance.id] = instance;
	}
});

function activeCollectors() {
	return Object.keys(active_collectors);
}

async function getData(id: string): any {
	const collector = active_collectors[id];

	if (collector) {
		return JSON.stringify(await collector.getData());
	}

	return 0;
}

export { activeCollectors, getData };
