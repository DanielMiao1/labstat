import type { Point } from "./math/geometry";

function absolutePosition(element: HTMLElement): Point {
	const element_rect = element.getBoundingClientRect();

	return {
		x: element_rect.x + window.scrollX,
		y: element_rect.y + window.scrollY
	}
}

export { absolutePosition };
