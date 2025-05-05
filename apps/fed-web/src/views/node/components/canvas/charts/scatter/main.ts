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
	ctx.lineWidth = 2;
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

	const min = Math.min(...options.values);
	const max = Math.max(...options.values);
	drawYAxis(ctx, min, max, options);

	drawPoints(ctx, 150, min, max, options.values);
}

export { scatterPlot, scatterPlotUpdate };
export type { ScatterUpdateOptions };
