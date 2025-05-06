import type { value_formatter } from "./main";

import {
	mean as meanFn,
	stddev as stddevFn
} from "../../../../../../util/math/stats";

function drawStats(
	ctx: CanvasRenderingContext2D,
	values: number[],
	value_formatter?: value_formatter
) {
	let mean = meanFn(values);
	let min = Math.min(...values);
	let max = Math.max(...values);
	let stddev = stddevFn(values, mean);

	if (value_formatter) {
		mean = value_formatter(mean, 1);
		min = value_formatter(min, 1);
		max = value_formatter(max, 1);
		stddev = value_formatter(stddev, 1);
	}

	const { width, height } = ctx.canvas;
	const mid_x = Math.floor((width + 150) / 2);
	const mid_y = Math.floor(height / 2);

	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	ctx.font = "bold 90px sans-serif";
	ctx.fillText(mean, mid_x, mid_y - 8);

	ctx.textBaseline = "top";
	ctx.font = "24px sans-serif";
	ctx.fillText(`${min.toString()}/${max.toString()}`, mid_x, mid_y + 8);

	ctx.textBaseline = "top";
	ctx.font = "24px sans-serif";
	ctx.fillText(`stddev: ${stddev.toString()}`, mid_x, mid_y + 50);

	ctx.textAlign = "right";
	ctx.textBaseline = "middle";
	ctx.font = "20px sans-serif";
}

export default drawStats;
