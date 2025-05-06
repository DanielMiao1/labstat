import { pointPos } from "./point";
import type { ScatterUpdateOptions } from "./main";

function calculateTicks(
	min: number,
	max: number,
	increment: number
): number[] {
	const first = Math.ceil(min / increment) * increment;
	if (first > max) return [];

	return [first, ...calculateTicks(first + increment, max, increment)];
}

function drawYAxis(
	ctx: CanvasRenderingContext2D,
	min: number,
	max: number,
	options: ScatterUpdateOptions
) {
	const { height } = ctx.canvas;

	ctx.beginPath();
	ctx.moveTo(130, 80);
	ctx.lineTo(130, height - 20);
	ctx.stroke();

	const ticks = calculateTicks(min, max, options.y_increment);

	ticks.forEach(tick => {
		const pos = pointPos(tick, min, max, ctx);

		ctx.beginPath();
		ctx.moveTo(120, pos);
		ctx.lineTo(130, pos);
		ctx.stroke();

		const text = options.value_formatter ? options.value_formatter(tick) : tick;
		ctx.fillText(text, 110, pos);
	});
}

export { drawYAxis };
