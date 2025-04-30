import { pointSum, type Point } from "./math/geometry";

function absoluteWithOverflow(point: Point): Point {
	const scroll = { x: window.scrollX, y: scrollY };
	return pointSum(point, scroll);
}

function absolutePosition(element: HTMLElement): Point {
	const element_rect = element.getBoundingClientRect() as Point;
	return absoluteWithOverflow(element_rect);
}

function absoluteFromContext(point: Point, context: HTMLElement): Point {
	const context_pos = absolutePosition(context);
	return pointSum(point, context_pos);
}

export { absoluteFromContext, absolutePosition, absoluteWithOverflow };
