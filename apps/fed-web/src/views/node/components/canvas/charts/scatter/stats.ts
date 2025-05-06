import { mean as meanFn } from "../../../../../../util/math/stats";
import type { value_formatter } from "./main";

interface Stats {
	name: string;
	range: [number, number];
	value: string;
}

function drawStats(
	ctx: CanvasRenderingContext2D,
	values: number[],
	value_formatter?: value_formatter
) {
	let mean = meanFn(...values);
	let min = Math.min(...values);
	let max = Math.max(...values);

	if (value_formatter) {
		mean = value_formatter(mean, 1);
		min = value_formatter(min, 1);
		max = value_formatter(max, 1);
	}

	const { width } = ctx.canvas;
	const y = 19;

	ctx.textAlign = "left";
	ctx.textBaseline = "middle";
	ctx.font = "bold 24px sans-serif";

	const min_text = min.toString();
	const { width: min_width } = ctx.measureText(min_text);
	ctx.fillText(min_text, 32, y);

	ctx.textAlign = "right";

	const max_text = max.toString();
	const { width: max_width } = ctx.measureText(max_text);

	ctx.fillText(max_text, width, y);

	const left_line_start = min_width + 40;
	const right_line_end = width - max_width - 8;
	const midpoint = meanFn(left_line_start, right_line_end);

	ctx.textAlign = "center";

	const mean_text = mean.toString();
	const { width: mean_width } = ctx.measureText(mean_text);

	ctx.fillText(mean_text, midpoint, y);

	const left_line_end = midpoint - mean_width / 2 - 8;
	const right_line_start = midpoint + mean_width / 2 + 8;

	ctx.beginPath();
	ctx.moveTo(left_line_start, y);
	ctx.lineTo(left_line_end, y);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(right_line_start, y);
	ctx.lineTo(right_line_end, y);
	ctx.stroke();

	ctx.textAlign = "right";
	ctx.textBaseline = "middle";
	ctx.font = "20px sans-serif";

	const left_midpoint = meanFn(left_line_start, left_line_end);
	const right_midpoint = meanFn(right_line_start, right_line_end);

	ctx.canvas.dataset.stats = JSON.stringify([
		{
			name: "min",
			range: [0, left_midpoint],
			value: min_text
		},
		{
			name: "mean",
			range: [left_midpoint, right_midpoint],
			value: mean_text
		},
		{
			name: "max",
			range: [right_midpoint, width],
			value: max_text
		}
	]);
}

export default drawStats;
export type { Stats };
