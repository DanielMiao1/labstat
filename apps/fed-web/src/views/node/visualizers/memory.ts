import { pieUpdate } from "../components/canvas/main";
import { readableBytes } from "../../../util/units";

const COLORS = {
	"Free": "#5bbd78",
	"Used - Active": "#444",
	"Used - Buffers": "#303e36",
	"Used - Cache": "#3d5145"
};

function memory(data: Record<string, number>) {
	const canvas = document.getElementById("memory-canvas");
	const total = readableBytes(data.total, 1);

	pieUpdate(canvas, {
		colors: COLORS,
		total_callback: () => total,
		values: {
			"Free": data.free,
			"Used - Buffers": data.buffers,
			"Used - Cache": data.cache,
			"Used - Active": data.active
		}
	});
}

export default memory;
