import createCollectorTitle from "../../components/title";
import { pieChart } from "../../components/canvas/main";

function initMemory() {
	import("./memory.css");

	const container = document.getElementById("collector-memory");
	if (!container) return;

	createCollectorTitle(container, "Memory");

	const canvas = pieChart({
		size: 260
	});
	container.appendChild(canvas);
	canvas.id = "memory-canvas";
	canvas.classList.add("memory-canvas");
}

export default initMemory;
