import { hideLabel, moveLabel, showLabel } from "../label";
import type { Stats } from "./stats";
import type { Point } from "../../../../../../util/math/geometry";
import type { PointData } from "./main";

import {
	absoluteWithOverflow,
	relativeInContext
} from "../../../../../../util/position";

function styleLabel(pos: Point, text: string) {
	const label = showLabel();
	moveLabel(label, pos);
	label.innerText = text;
}

function pointLabel(canvas: HTMLCanvasElement, pos: Point) {
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

	const { x } = relativeInContext(pos, canvas);

	points.some(point => {
		if (x * 2 > point.x && x * 2 < point.x + 30) {
			const absolute_pos = absoluteWithOverflow(pos);

			styleLabel(
				absolute_pos,
				`Core ${point.index.toString()}: ${point.value.toString()}`
			);

			return true;
		}
	}) || hideLabel();
}

function statLabel(canvas: HTMLCanvasElement, pos: Point) {
	const data = canvas.dataset.stats;
	if (!data) return;

	const { x } = relativeInContext(pos, canvas);

	const stats = JSON.parse(data) as Stats[];
	stats.some(stat => {
		const [start, end] = stat.range;
		if (x * 2 >= start && x * 2 <= end) {
			const absolute_pos = absoluteWithOverflow(pos);
			styleLabel(absolute_pos, `${stat.name}: ${stat.value}`);
			return true;
		}
	});
}

function attachListeners(canvas: HTMLCanvasElement) {
	canvas.addEventListener("mouseleave", () => {
		hideLabel();
	});

	canvas.addEventListener("mousemove", event => {
		const { y } = relativeInContext(event, canvas);

		if (y <= 40) {
			statLabel(canvas, event);
		} else {
			pointLabel(canvas, event);
		}
	});
}

export default attachListeners;
