const SHIFT_UNITS = ["B", "kB", "MB", "GB", "TB", "PB", "EB"];

function readableBytes(amount: number, precision = 3): string {
	const shifts = Math.floor(Math.log10(amount) / 3);
	const shift_amount = 10 ** (3 * shifts);
	const shifted_amount = amount / shift_amount;
	const readable = shifted_amount.toFixed(precision);

	const unit = SHIFT_UNITS[shifts] ?? "NaN";

	return `${readable.toString()} ${unit}`;
}

export { readableBytes };
