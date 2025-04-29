import createCollectorTitle from "../components/title";
import { pieChart } from "../components/canvas/main";
import { readableBytes } from "../../../util/units";

function initMemory() {
	const container = document.getElementById("collector-memory");
	if (!container) return;

	container.classList.add("contains-piechart-label");
	createCollectorTitle(container, "Memory");

	const canvas = pieChart({
		size: 280,
		value_formatter: readableBytes
	});
	container.appendChild(canvas);
	canvas.id = "memory-canvas";
	canvas.classList.add("memory-canvas");
}

export default initMemory;
