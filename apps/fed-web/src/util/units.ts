const SHIFT_UNITS = ["B", "kB", "MB", "GB", "TB", "PB", "EB"];

function roundTo(amount: number, decimals: number): number {
	const shifted = (amount + Number.EPSILON) * 10 ** decimals;
	return Math.round(shifted) * 10 ** -decimals;
}

function readableBytes(amount: number, precision = 3): string {
	const shifts = Math.floor(Math.log10(amount) / 3);
	const shift_amount = 10 ** (3 * shifts);
	const shifted_amount = amount / shift_amount;
	const readable = roundTo(shifted_amount, precision);

	const unit = SHIFT_UNITS[shifts] ?? "NaN";

	return `${readable.toString()} ${unit}`;
}

export { readableBytes, roundTo };
