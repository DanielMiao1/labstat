import { pieUpdate } from "../components/canvas/main";
import { readableBytes } from "../../../util/units";

const COLORS = {
	Active: "#444",
	Buffers: "#273",
	Cache: "#999",
	Slab: "#666",
	Free: "#6d8"
};

function formatTotal(total: number): string {
	const readable = readableBytes(total, 1);
	return readable;
}

function memory(data: unknown) {
	const canvas = document.getElementById("memory-canvas");

	pieUpdate(canvas, {
		colors: COLORS,
		total_callback: formatTotal,
		values: data
	});
}

export default memory;
