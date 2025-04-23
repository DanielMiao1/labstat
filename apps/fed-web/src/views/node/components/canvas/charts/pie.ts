import createCanvas, { type CanvasOptions } from "../main";

interface PieOptions extends CanvasOptions { };
interface PieUpdateOptions {
	colors: Record<string, string>;
	values: Record<string, number>;
}

function pieChart(options: PieOptions) {
	const canvas = createCanvas({
		"size": options.size
	});

	return canvas;
}

function pieUpdate(canvas: HTMLCanvasElement, options: PieUpdateOptions) {
	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	const size = canvas.width;
	if (!size) return;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const values = options.values;
	const sum = Object.values(values).reduce((partial, n) => partial + n, 0);
	const sorted_keys = Object.keys(values).sort((a, b) => values[a] - values[b])
	const midpoint = Math.floor(size / 2);

	let current_angle = -Math.PI / 2;

	sorted_keys.forEach(key => {
		const value = values[key];
		const percent = value / sum;
		const delta = 2 * percent * Math.PI;
		const end_angle = current_angle + delta;
		
		ctx.fillStyle = options.colors[key];
		ctx.beginPath();
		ctx.moveTo(midpoint, midpoint);
		ctx.arc(midpoint, midpoint, midpoint, current_angle, end_angle);
		ctx.lineTo(midpoint, midpoint);
		ctx.closePath();
		ctx.fill();

		current_angle = end_angle;
	});
}

export { pieChart, pieUpdate };
