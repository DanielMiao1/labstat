import { edgePositions } from "../../../../../../../util/dom";
import type { Area } from "./main";
import type { Point } from "../../../../../../../util/math/geometry";

interface Properties {
	x: string;
	y: string;
}

const CORNERS = [
	{
		"x": "left",
		"y": "top",
	},
	{
		"x": "right",
		"y": "top",
	},
	{
		"x": "left",
		"y": "bottom"
	},
	{
		"x": "right",
		"y": "bottom"
	}
];

function cornerDistance(
	container: HTMLElement,
	properties: Properties,
	tail_pos: Point
): number {
	const edges = edgePositions(container);
	const x = edges[properties.x];
	const y = edges[properties.y];

	const dx = Math.abs(x - tail_pos.x);
	const dy = Math.abs(y - tail_pos.y);

	const distance = Math.sqrt(dx ** 2 + dy ** 2);
	return distance;
}

function chooseCorner(area: Area, tail_pos: Point): Properties {
	let min_distance = Number.POSITIVE_INFINITY;
	let corner: Properties;

	CORNERS.forEach((properties, index) => {
		if (area.avoid?.includes(index)) return;

		const distance = cornerDistance(area.container, properties, tail_pos);
		if (distance < min_distance) {
			min_distance = distance;
			corner = properties;
		}
	});

	return corner ?? CORNERS[3];
}

export default chooseCorner;
