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

function squaredDeviations(values: number[], mean_value: number): number[] {
	const first = values.at(0);
	if (!first) return [];

	return [
		(first - mean_value) ** 2,
		...squaredDeviations(values.slice(1), mean_value)
	];
}

function stddev(values: number[], mean_value?: number): number {
	const deviations = squaredDeviations(values, mean_value ?? mean(values));
	const variance = mean(deviations);
	return Math.sqrt(variance);
}

export { mean, percentInRange, stddev, sum };
