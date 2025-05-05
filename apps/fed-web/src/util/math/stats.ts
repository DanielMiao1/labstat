function sum(values: number[]): number {
	const first = values.at(0);
	if (!first) return 0;

	return first + sum(values.slice(1));
}

function percentInRange(value: number, min: number, max: number): number {
	/**
	 * Percent position of a value in a range
	 */

	const range = max - min;
	const clamped_value = value - min;

	return clamped_value / range;
}

function mean(values: number[]): number {
	return sum(values) / values.length;
}

export { mean, percentInRange, sum };
