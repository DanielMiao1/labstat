interface Collector {
	id: string;
	inactive?: true;
	getData: () => unknown;
	new(): this;
}

export default Collector;
