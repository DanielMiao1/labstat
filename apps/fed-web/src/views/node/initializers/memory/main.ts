import createCollectorTitle from "../../components/title";
import { pieChart } from "../../components/canvas/main";

function initMemory() {
	void import("./memory.css");

	const container = document.getElementById("collector-memory");
	if (!container) return;

	container.classList.add("contains-piechart-label");
	createCollectorTitle(container, "Memory");

	const canvas = pieChart({
		size: 280
	});
	container.appendChild(canvas);
	canvas.id = "memory-canvas";
	canvas.classList.add("memory-canvas");
}

export default initMemory;
