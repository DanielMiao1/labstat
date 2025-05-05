import { absoluteWithOverflow } from "../../../../../../util/position";
import { hideLabel, moveLabel, showLabel } from "../label";
import type { PointData } from "./main";

function styleLabel(label: HTMLParagraphElement, point: PointData) {
	label.innerText = `Core ${point.index.toString()}: ${point.value.toString()}`;
}

function attachListeners(canvas: HTMLCanvasElement) {
	canvas.addEventListener("mouseleave", () => {
		hideLabel();
	});

	canvas.addEventListener("mousemove", event => {
		const points = (() => {
			try {
				return JSON.parse(canvas.dataset.points) as PointData[];
			} catch {
				console.warn(
					"[charts/scatter] failed to parse JSON points data. Chart hover"
					+ "effects may not work"
				);
			}
		})();

		if (!points) return;

		const canvas_rect = canvas.getBoundingClientRect();
		const mouse_pos = { x: event.x, y: event.y };

		const x = 2 * (mouse_pos.x - canvas_rect.left);

		points.some(point => {
			console.log(x, point.x);
			if (x > point.x && x < point.x + 30) {
				const absolute_pos = absoluteWithOverflow(mouse_pos);

				const label = showLabel();
				styleLabel(label, point);
				moveLabel(label, absolute_pos);

				return true;
			}
		}) || hideLabel();
	});
}

export default attachListeners;
