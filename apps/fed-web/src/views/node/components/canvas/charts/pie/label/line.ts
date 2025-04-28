import createSVGElement from "../../../../../../../util/svg";

import {
	absoluteFromContext,
	edgePositions,
	oppositeCorner,
	type Corner
} from "../../../../../../../util/dom";

import {
	distance,
	pointDifference,
	type Point
} from "../../../../../../../util/math/geometry";

import {
	pointOnCircle,
	type Circle,
	type Sector
} from "../../../../../../../util/math/circle";

function labelCornerPos(label: HTMLDivElement, label_corner: Corner): Point {
	const { x: opp_x, y: opp_y } = oppositeCorner(label_corner);
	const label_edges = edgePositions(label);

	const x = label_edges[opp_x];
	const y = label_edges[opp_y];

	return { x, y };
}

function closestRadius(
	canvas: HTMLCanvasElement,
	label: HTMLDivElement,
	label_corner: Corner,
	circle: Circle,
	sector: Sector
): Point {
	const sector_start = pointOnCircle(circle, sector.start + 0.02);
	const sector_end = pointOnCircle(circle, sector.end - 0.02);

	const label_pos = labelCornerPos(label, label_corner);

	const start_dist = distance(
		absoluteFromContext(sector_start, canvas),
		label_pos
	);

	const end_dist = distance(
		absoluteFromContext(sector_end, canvas),
		label_pos
	);

	const closest = start_dist > end_dist ? sector_end : sector_start;
	return closest;
}

function createLine(
	canvas: HTMLCanvasElement,
	label: HTMLDivElement,
	label_corner: Corner,
	circle: Circle,
	sector: Sector
) {
	const svg = (() => {
		let element = label.getElementsByTagName("svg").item(0);
		if (element) return element;

		element = createSVGElement("svg") as SVGSVGElement;
		label.appendChild(element);

		const line = createSVGElement("path");
		element.appendChild(line);
		line.id = "piechart-svg-line";

		return element;
	})();

	const closest_radius = closestRadius(
		canvas, label, label_corner, circle, sector
	);

	const start = absoluteFromContext(closest_radius, canvas);

	const label_pos = labelCornerPos(label, label_corner);
	const { x: dx, y: dy } = pointDifference(start, label_pos);

	let shift_x = 0, shift_y = 0;
	if (dx < 0) {
		shift_x = Math.abs(dx);
	}

	if (dy < 0) {
		shift_y = Math.abs(dy);
	}

	const text = label.children.item(0);
	if (!text) return;
	const { width, height } = text.getBoundingClientRect();

	const line = document.getElementById("piechart-svg-line");

	svg.setAttribute("width", Math.abs(dx).toString() + "px");
	svg.setAttribute("height", Math.abs(dy).toString() + "px");

	const { x: opp_x, y: opp_y } = oppositeCorner(label_corner);

	svg.style[label_corner.x] = width.toString() + "px";
	svg.style[label_corner.y] = height.toString() + "px";

	svg.style[opp_x] = "unset";
	svg.style[opp_y] = "unset";

	const start_pos = `M${shift_x.toString()} ${shift_y.toString()}`;
	const line_pos = `l${dx.toString()} ${dy.toString()}`;

	line?.setAttribute("d", `${start_pos} ${line_pos}`);
}

export default createLine;
