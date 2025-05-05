import { scatterPlotUpdate } from "../components/canvas/charts/scatter/main";
import { readableHertz } from "../../../util/units";

function cpufreq(data: unknown) {
	// [todo] retrieve min/max at start
	const canvas = document.getElementById("cpufreq-canvas");

	scatterPlotUpdate(canvas, {
		values: data,
		value_formatter: readableHertz,
		y_increment: 500000000
	});
}

export default cpufreq;
