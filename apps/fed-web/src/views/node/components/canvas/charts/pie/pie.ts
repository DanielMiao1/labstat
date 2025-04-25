import createCanvas, { type CanvasOptions } from "../../main";
import { hideLabel } from "../label";
import { normalizeAngle } from "../../../../../../util/math/geometry";
import styleLabel from "./label/main";

import {
	pointInSector,
	type Circle,
	type Sector
} from "../../../../../../util/math/circle";

interface StyledSector extends Sector {
	color: string;
	name: string;
}

interface PieOptions extends CanvasOptions { };
interface PieUpdateOptions {
	colors: Record<string, string>;
	values: Record<string, number>;
}

function pieChart(options: PieOptions) {
	import("./pie.css");

	const canvas = createCanvas({
		"size": options.size
	});

	const midpoint = Math.floor(options.size / 2);

	canvas.addEventListener("mouseleave", () => {
		hideLabel();
	});

	canvas.addEventListener("mousemove", event => {
		const canvas_rect = canvas.getBoundingClientRect();
		const x = event.clientX - canvas_rect.left;
		const y = event.clientY - canvas_rect.top;

		const sectors = (() => {
			try {
				return JSON.parse(canvas.dataset.sectors);
			} catch (error) {
				console.warn(
					"[canvas/pieChart] failed to parse JSON sectors data. Hover effects"
					+ "may not work"
				);
			}
		})();

		if (!sectors) return;

		const circle: Circle = {
			origin: {
				x: midpoint,
				y: midpoint
			},
			radius: midpoint - 10
		};
		
		sectors.some((sector: StyledSector) => {
			const included = pointInSector({ x, y }, circle, sector);

			if (included) {
				styleLabel({
					avoid: [0],
					container: canvas.parentNode
				}, canvas, circle, sector);

				return true;
			}
		}) || hideLabel(); // Hide label if no setor is found
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
	const sectors: StyledSector[] = [];

	sorted_keys.forEach(key => {
		const value = values[key];
		if (!value) return;

		const percent = value / sum;
		const delta = 2 * percent * Math.PI;
		const end_angle = current_angle + delta;

		const color = options.colors[key];
		
		ctx.fillStyle = color;
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
			name: key
		});

		current_angle = end_angle;
	});

	canvas.dataset.sectors = JSON.stringify(sectors);
}

export { pieChart, pieUpdate };
export type { StyledSector };
