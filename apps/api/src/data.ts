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

function aggregate(ids: string[]) {
	const data = {};

	ids.forEach(id => {
		const collector = active_collectors[id];

		if (collector) {
			data[id] = collector.getData();
		}
	});
	
	return data;
}

export {activeCollectors, aggregate};
