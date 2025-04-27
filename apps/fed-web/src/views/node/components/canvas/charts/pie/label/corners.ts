import { distance, type Point } from "../../../../../../../util/math/geometry";
import { edgePositions, type Corner } from "../../../../../../../util/dom";
import json from "./corners.json";
import type { Area } from "./main";

const CORNERS = json.corners;

function cornerDistance(
	container: HTMLElement,
	corner_edges: Corner,
	tail_pos: Point
): number {
	const edges = edgePositions(container);
	const x = edges[corner_edges.x];
	const y = edges[corner_edges.y];

	const dist = distance({ x, y }, tail_pos);
	return dist;
}

function chooseCorner(area: Area, tail_pos: Point): Corner {
	let min_distance = Number.POSITIVE_INFINITY;
	let corner = 3;
	
	CORNERS.forEach((data, index) => {
		if (area.avoid?.includes(index)) return;

		const distance = cornerDistance(area.container, data.edges, tail_pos);
		if (distance < min_distance) {
			min_distance = distance;
			corner = index;
		}
	});

	return CORNERS[corner];
}

export default chooseCorner;
export type { Properties };
