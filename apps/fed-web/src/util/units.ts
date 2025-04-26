const SHIFT_UNITS = ["B", "kB", "MB", "GB", "TB", "PB", "EB"];

function readableBytes(amount: number): string {
	const shifts = Math.floor(Math.log10(amount) / 3);
	const shift_amount = 10 ** (3 * shifts);
	const shifted_amount = amount / shift_amount;
	const readable = Math.round((shifted_amount + Number.EPSILON) * 1000) / 1000;

	const unit = SHIFT_UNITS[shifts] ?? "NaN";

	return `${readable.toString()} ${unit}`;
}

export default readableBytes;
