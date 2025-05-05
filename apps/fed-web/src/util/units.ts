import { stripTrailingZeros } from "./string";

interface ShiftData {
	shift_amount: number;
	value: number;
}

const BYTE_UNITS = ["B", "kB", "MB", "GB", "TB", "PB", "EB"];
const HERTZ_UNITS = ["Hz", "kHz", "MHz", "GHz", "THz"];

function metricShift(value: number): ShiftData {
	const shifts = Math.floor(Math.log10(value) / 3);
	const shift_by = 10 ** (3 * shifts);
	const shifted_value = value / shift_by;

	return {
		shift_amount: shifts,
		value: shifted_value
	};
}

function readable(value: number, units: string[], precision: number): string {
	const { shift_amount, value: shifted_value } = metricShift(value);
	const rounded = stripTrailingZeros(shifted_value.toFixed(precision));

	const unit = units[shift_amount] ?? "NaN";

	return `${rounded.toString()} ${unit}`;
}

function readableBytes(value: number, precision = 2): string {
	return readable(value, BYTE_UNITS, precision);
}

function readableHertz(value: number, precision = 2): string {
	return readable(value, HERTZ_UNITS, precision);
}

export { readableBytes, readableHertz };
