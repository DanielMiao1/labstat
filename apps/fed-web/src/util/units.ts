import { stripGreedy } from "./string";

const SHIFT_UNITS = ["B", "kB", "MB", "GB", "TB", "PB", "EB"];

function readableBytes(amount: number, precision = 2): string {
	const shifts = Math.floor(Math.log10(amount) / 3);
	const shift_amount = 10 ** (3 * shifts);
	const shifted_amount = amount / shift_amount;
	const readable = stripGreedy(shifted_amount.toFixed(precision), "0", -1);

	const unit = SHIFT_UNITS[shifts] ?? "NaN";

	return `${readable.toString()} ${unit}`;
}

export { readableBytes };
