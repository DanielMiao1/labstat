interface Point {
	x: number;
	y: number;
}

function pointDifference(a: Point, b: Point): Point {
	return {
		x: a.x - b.x,
		y: a.y - b.y
	};
}

function normalizeAngle(angle: number): number {
	const revolutions = Math.floor(angle / (2 * Math.PI));
	const shift_amount = 2 * Math.PI * revolutions;
	const shifted = angle - shift_amount;
	return shifted;
}

export { normalizeAngle, pointDifference };
export { type Point };
