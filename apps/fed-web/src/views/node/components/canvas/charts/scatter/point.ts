function pointPos(
	value: number,
	min: number,
	max: number,
	ctx: CanvasRenderingContext2D
): number {
	const range = max - min;
	const { height } = ctx.canvas;
	const pixel_range = height - 40;

	const portion = (value - min) / range;
	const pixel_portion = portion * pixel_range;
	const pos = height - pixel_portion - 20;

	return pos;
}

function drawPoints(
	ctx: CanvasRenderingContext2D,
	x: number,
	min: number,
	max: number,
	values: number[]
) {
	const first_value = values.at(0);
	if (!first_value) return;

	const pos = pointPos(first_value, min, max, ctx);

	ctx.beginPath();
	ctx.moveTo(x, pos);
	ctx.lineTo(x + 10, pos);
	ctx.stroke();

	drawPoints(ctx, x + 30, min, max, values.slice(1));
}

export default drawPoints;
export { pointPos };
