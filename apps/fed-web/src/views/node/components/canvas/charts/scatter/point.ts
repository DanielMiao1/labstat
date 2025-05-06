import Color from "../../../../../../util/color";
import { percentInRange } from "../../../../../../util/math/stats";

function pointPos(
	value: number,
	min: number,
	max: number,
	ctx: CanvasRenderingContext2D
): number {
	const { height } = ctx.canvas;
	const pixel_range = height - 100;

	const portion = percentInRange(value, min, max);
	const pixel_portion = portion * pixel_range;
	const pos = height - pixel_portion - 20;

	return pos;
}

function determineColor(fraction: number, colors: [string, string]): string {
	const color1 = new Color(colors[0]);
	const color2 = new Color(colors[1]);

	const mix = color1.mixWith(color2, fraction);
	return mix.toHTML();
}

function drawPoints(
	ctx: CanvasRenderingContext2D,
	x: number,
	min: number,
	max: number,
	values: number[],
	colors: [number, number] | undefined
): number[] {
	const first_value = values.at(0);
	if (!first_value) return [];

	const pos = pointPos(first_value, min, max, ctx);

	const fraction = percentInRange(first_value, min, max);

	if (colors) {
		const color = determineColor(fraction, colors);
		ctx.strokeStyle = color;
	}

	ctx.beginPath();
	ctx.moveTo(x, pos);
	ctx.lineTo(x + 10, pos);
	ctx.stroke();
	ctx.strokeStyle = "white";

	return [x, ...drawPoints(ctx, x + 30, min, max, values.slice(1), colors)];
}

export default drawPoints;
export { pointPos };
