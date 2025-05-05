import { scatterPlotUpdate } from "../components/canvas/charts/scatter/main";
import { readableHertz } from "../../../util/units";

function cpufreq(data: unknown) {
	const canvas = document.getElementById("cpufreq-canvas");

	scatterPlotUpdate(canvas, {
		values: data,
		value_formatter: readableHertz,
		y_increment: 500000000,
		colors: ["#c0eed2", "#d96862"]
	});
}

export default cpufreq;
