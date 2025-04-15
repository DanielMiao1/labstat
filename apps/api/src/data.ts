import { TestData } from "./collectors/core";

const all_collectors = [TestData];
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

function getData(id: string): number {
	const collector = active_collectors[id];

	if (collector) {
		return collector.getData();
	}
}

export {activeCollectors, getData};
