import attachListeners, { type value_formatter } from "./label";
import createCanvas, { type CanvasOptions } from "../../main";
import { normalizeAngle } from "../../../../../../util/math/geometry";
import type { Sector } from "../../../../../../util/math/circle";

interface StyledSector extends Sector {
	color: string;
	name: string;
	value: number;
}

interface PieInitOptions extends CanvasOptions {
	value_formatter?: value_formatter;
}

interface PieUpdateOptions {
	colors: Record<string, string>;
	total?: string;
	values: Record<string, number>;
}

function pieChart(options: PieInitOptions) {
	void import("./pie.css");

	const canvas = createCanvas({
		size: options.size
	});

	const ctx = canvas.getContext("2d");

	ctx.font = "bold 80px sans-serif";
	ctx.shadowColor = "black";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	attachListeners(canvas, options.value_formatter);

	return canvas;
}

function pieChartUpdate(canvas: HTMLCanvasElement, options: PieUpdateOptions) {
	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	const size = canvas.width;
	if (!size) return;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const { values } = options;
	const sum = Object.values(values).reduce((partial, n) => partial + n, 0);
	const sorted_keys = Object.keys(values).sort((a, b) => values[a] - values[b]);
	const midpoint = Math.floor(size / 2);

	let current_angle = -Math.PI / 2;
	const sectors: StyledSector[] = [];

	sorted_keys.forEach(key => {
		const value = values[key];
		if (!value) return;

		const percent = value / sum;
		const delta = 2 * percent * Math.PI;
		const end_angle = current_angle + delta;

		const color = options.colors[key];

		ctx.fillStyle = color;
		ctx.shadowBlur = 0;
		ctx.beginPath();
		ctx.moveTo(midpoint, midpoint);
		ctx.arc(midpoint, midpoint, midpoint - 10, current_angle, end_angle);
		ctx.lineTo(midpoint, midpoint);
		ctx.closePath();
		ctx.fill();

		sectors.push({
			start: normalizeAngle(current_angle),
			end: normalizeAngle(end_angle),
			color,
			name: key,
			value
		});

		current_angle = end_angle;
	});

	if (options.total) {
		ctx.fillStyle = "white";
		ctx.shadowBlur = 80;

		ctx.fillText(options.total, midpoint, midpoint);
	}

	canvas.dataset.sectors = JSON.stringify(sectors);
}

export { pieChart, pieChartUpdate };
export { type StyledSector };
