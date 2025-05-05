import createCollectorTitle from "../../components/title";
import { scatterPlot } from "../../components/canvas/charts/scatter/main";

function initCpufreq() {
	void import("./cpufreq.css");

	const container = document.getElementById("collector-cpufreq");
	if (!container) return;

	createCollectorTitle(container, "CPU Frequency");

	const canvas = scatterPlot({
		size: 280
	});

	container.appendChild(canvas);
	canvas.id = "cpufreq-canvas";
	canvas.classList.add("cpufreq-canvas");
}

export default initCpufreq;
