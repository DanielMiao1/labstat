import createCanvas, { type CanvasOptions } from "../../main";
import drawPoints from "./point";
import { drawYAxis } from "./axes";

type value_formatter = (value: number) => string;

interface ScatterUpdateOptions {
	values: number[];
	value_formatter?: value_formatter;
	y_increment: number;
}

function initCanvas(ctx: CanvasRenderingContext2D) {
	ctx.fillStyle = "white";
	ctx.font = "20px sans-serif";
	ctx.lineWidth = 3;
	ctx.strokeStyle = "white";
	ctx.textAlign = "right";
	ctx.textBaseline = "middle";
}

function scatterPlot(options: CanvasOptions): HTMLCanvasElement {
	return createCanvas(options);
}

function scatterPlotUpdate(
	canvas: HTMLCanvasElement,
	options: ScatterUpdateOptions
) {
	const ctx = canvas.getContext("2d");

	const width = options.values.length * 30 + 150;
	if (canvas.width !== width) {
		canvas.width = width;
		canvas.style.width = (width / 2).toString() + "px";
		initCanvas(ctx);
	}

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let min = Math.min(...options.values);
	let max = Math.max(...options.values);

	const old_min = parseFloat(canvas.dataset.min ?? Number.POSITIVE_INFINITY);
	const old_max = parseFloat(canvas.dataset.max ?? Number.NEGATIVE_INFINITY);

	if (min < old_min) {
		canvas.dataset.min = min;
	} else {
		min = old_min;
	}

	if (max > old_max) {
		canvas.dataset.max = max;
	} else {
		max = old_max;
	}

	drawYAxis(ctx, min, max, options);

	drawPoints(ctx, 150, min, max, options.values);
}

export { scatterPlot, scatterPlotUpdate };
export type { ScatterUpdateOptions };
