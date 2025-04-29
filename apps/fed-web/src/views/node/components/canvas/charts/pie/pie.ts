import { absoluteWithOverflow } from "../../../../../../util/dom";
import createCanvas, { type CanvasOptions } from "../../main";
import Color from "../../../../../../util/color";
import { hideLabel, moveLabel, showLabel } from "../label";
import { normalizeAngle } from "../../../../../../util/math/geometry";

import {
	pointInSector,
	type Circle,
	type Sector
} from "../../../../../../util/math/circle";

type value_formatter = (value: number) => string;

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

function styleLabel(
	label: HTMLParagraphElement,
	sector: StyledSector,
	value_formatter?: value_formatter
) {
	const text = (() => {
		const { name } = sector;

		if (value_formatter) {
			return `${name} (${value_formatter(sector.value)})`;
		}

		return name;
	})();

	label.innerText = text;
	label.style.setProperty("--label-fg", sector.color);

	// If the sector color is too dark, make the label background lighter.
	const sector_color = new Color(sector.color);
	const lightness = sector_color.lumaLightness();

	if (lightness < 127) {
		label.classList.add("light");
	} else {
		label.classList.remove("light");
	}
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
				return JSON.parse(canvas.dataset.sectors) as StyledSector[];
			} catch {
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
				const mouse_pos = { x: event.x, y: event.y };
				const absolute_pos = absoluteWithOverflow(mouse_pos);

				const label = showLabel();
				styleLabel(label, sector, options.value_formatter);
				moveLabel(label, absolute_pos);

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

export { pieChart, pieUpdate };
export type { StyledSector };
