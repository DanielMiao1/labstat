import type Collector from "./collectors/base";
import {
	Disks, Graphics, Network, Memory, Uptime
} from "./collectors/core";

const all_collectors: Collector[] = [
  Disks, Graphics, Network, Memory, Uptime
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

function getData(id: string): any {
	const collector = active_collectors[id];

	if (collector) {
		return collector.getData();
	}

	return 0;
}

export { activeCollectors, getData };
