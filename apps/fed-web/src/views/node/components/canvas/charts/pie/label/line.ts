import createSVGElement from "../../../../../../../util/svg";
import { distance } from "../../../../../../../util/math/geometry";

import {
	absoluteFromContext,
	edgePositions,
	oppositeCorner,
	type Corner
} from "../../../../../../../util/dom";

import {
	pointOnCircle,
	type Circle,
	type Sector
} from "../../../../../../../util/math/circle";

function determineAxis(
	canvas: HTMLCanvasElement,
	label: HTMLDivElement,
	label_corner,
	circle: Circle,
	sector: Sector
) {
	const sector_start = pointOnCircle(circle, sector.start);
	const sector_end = pointOnCircle(circle, sector.end);

	const { x: opp_x, y: opp_y } = oppositeCorner(label_corner.edges);
	const label_edges = edgePositions(label);

	const x = label_edges[opp_x];
	const y = label_edges[opp_y];

	const start_dist = distance(
		absoluteFromContext(sector_start, canvas),
		{ x, y }
	);

	const end_dist = distance(
		absoluteFromContext(sector_end, canvas),
		{ x, y }
	);

	console.log(start_dist, end_dist);
}

function drawSlant(angle: number): SVGPathElement {
	const slant_element = document.getElementById("piechart-svg-slant");
	if (!slant_element) return;
	
	const { x: dx, y: dy } = pointOnCircle({
		origin: { x: 0, y: 0 },
		radius: 20
	}, angle);

	slant_element.setAttribute("d", `M40 40 l${dx} ${dy}`);
}

function createLine(
	canvas: HTMLCanvasElement,
	label: HTMLDivElement,
	label_corner,
	circle: Circle,
	sector: Sector
) {
	const svg = (() => {
		let element = label.getElementsByTagName("svg").item(0);
		if (element) return element;

		element = createSVGElement("svg") as SVGSVGElement;
		label.appendChild(element);

		const slant = createSVGElement("path");
		element.appendChild(slant);
		slant.id = "piechart-svg-slant";

		return element;
	})();

	const axis = determineAxis(canvas, label, label_corner, circle, sector);

	// const slant = drawSlant(label_pos.angle);
}

export default createLine;
