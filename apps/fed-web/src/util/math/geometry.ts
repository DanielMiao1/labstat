interface Point {
	x: number;
	y: number;
}

function pointSum(a: Point, b: Point): Point {
	return {
		x: a.x + b.x,
		y: a.y + b.y
	};
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

function distance(a: Point, b: Point): number {
	const dx = Math.abs(a.x - b.x);
	const dy = Math.abs(a.y - b.y);

	const dist = Math.sqrt(dx ** 2 + dy ** 2);
	return dist;
}

export { distance, normalizeAngle, pointDifference, pointSum };
export { type Point };
