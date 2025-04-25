import type { Point } from "./math/geometry";

interface EdgePositions {
	top: number;
	bottom: number;
	left: number;
	right: number;
}

function absolutePosition(element: HTMLElement): Point {
	const element_rect = element.getBoundingClientRect();

	return {
		x: element_rect.x + window.scrollX,
		y: element_rect.y + window.scrollY
	}
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

export { absolutePosition, edgePositions };
