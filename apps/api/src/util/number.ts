import { stripTrailingZeros } from "./string";

function round(amount: number, precision: number): string {
	return stripTrailingZeros(amount.toFixed(precision));
}

export { round };
