import { pointSum, type Point } from "./math/geometry";

interface EdgePositions {
	[key: string]: number;
	top: number;
	bottom: number;
	left: number;
	right: number;
}

interface Corner {
	x: string;
	y: string;
}

const OPPOSITE_CORNERS = {
	"top": "bottom",
	"bottom": "top",
	"left": "right",
	"right": "left"
};

function oppositeCorner(corner: Corner): Corner {
	return {
		x: OPPOSITE_CORNERS[corner.x],
		y: OPPOSITE_CORNERS[corner.y]
	};
}

function absolutePosition(element: HTMLElement): Point {
	const element_rect = element.getBoundingClientRect();

	return {
		x: element_rect.x + window.scrollX,
		y: element_rect.y + window.scrollY
	};
}

function absoluteFromContext(point: Point, context: HTMLElement): Point {
	const context_pos = absolutePosition(context);

	return pointSum(point, context_pos);
}

function edgePositions(element: HTMLElement): EdgePositions {
	const { x, y } = absolutePosition(element);
	const { width, height } = element.getBoundingClientRect();

	return {
		top: y,
		bottom: y + height,
		left: x,
		right: x + width
	};
}

export { absoluteFromContext, absolutePosition, edgePositions, oppositeCorner };
export type { Corner };
