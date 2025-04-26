import { pieUpdate } from "../components/canvas/main";

const PIE_COLORS = {
	total: "#aaaaaa",
	free: "#f00",
	used: "#00f",
	active: "#f0f",
	available: "#ff0",
	buffers: "#0ff",
	cached: "#555",
	slab: "#0f0",
	buffcache: "#006",
	swaptotal: "#800",
	swapused: "#070",
	swapfree: "#880",
	dirty: "#08a"
};

function memory(data: unknown) {
	const canvas = document.getElementById("memory-canvas");

	pieUpdate(canvas, {
		colors: PIE_COLORS,
		values: data
	});
}

export default memory;
