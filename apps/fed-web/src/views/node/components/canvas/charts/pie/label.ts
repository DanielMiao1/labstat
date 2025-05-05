import { absoluteWithOverflow } from "../../../../../../util/position";
import Color from "../../../../../../util/color";
import { hideLabel, moveLabel, showLabel } from "../label";
import { pointInSector, type Circle } from "../../../../../../util/math/circle";
import type { StyledSector } from "./main";

type value_formatter = (value: number) => string;

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
	label.dataset.chart = "pie";

	// If the sector color is too dark, make the label background lighter.
	const sector_color = new Color(sector.color);
	const lightness = sector_color.lumaLightness();

	if (lightness < 127) {
		label.dataset.modifiers = "light";
	} else {
		delete label.dataset.modifiers;
	}
}

function attachListeners(
	canvas: HTMLCanvasElement,
	value_formatter?: value_formatter
) {
	const midpoint = Math.floor(canvas.width / 4);

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
					"[charts/pie] failed to parse JSON sectors data. Chart hover effects "
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
				styleLabel(label, sector, value_formatter);
				moveLabel(label, absolute_pos);

				return true;
			}
		}) || hideLabel(); // Hide label if no setor is found
	});
}

export default attachListeners;
export type { value_formatter };
