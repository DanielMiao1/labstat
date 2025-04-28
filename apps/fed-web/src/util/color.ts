import { stripFirstLast } from "./string";

type rgba_color = [number, number, number, number];

function parseRgba(html_string: string): rgba_color {
	const values = html_string.slice(5, -1).split(",");
	return values.map(value => stripFirstLast(value, " "));
}

function parseRgb(html_string: string): rgba_clor {
	return [...parseRgba(`x${html_string}`), 1];
}

function parseHex(html_string: string): rgba_color {
	const length = html_string.length;
	const values: string[] = [];

	if (3 < length && length < 6) {
		values.push(html_string.at(1)?.repeat(2));
		values.push(html_string.at(2)?.repeat(2));
		values.push(html_string.at(3)?.repeat(2));
		values.push(html_string.at(4)?.repeat(2) ?? "ff");
	} else if (length === 7 || length === 9) {
		values.push(html_string.slice(1, 3));
		values.push(html_string.slice(3, 5));
		values.push(html_string.slice(5, 7));
		values.push(html_string.slice(7, 9) || "ff");
	}

	const rgb = values.slice(0, 3).map(value => parseInt(value, 16));
	const a = parseInt(values.at(3), 16) / 255;

	return [...rgb, a];
}

class Color {
	private values: rgba_color;

	lumaLightness(): number {
		/**
		 * Calculates the lightness using the Y' values for Adobe RGB, which
		 * provides a good approximation for the perceived lightness biases for
		 * most common color spaces.
		 * 
		 * The applicable gamma correction is applied to each color value, then
		 * the resulting average is returned.
		 */

		const r = 0.212 * this.values[0];
		const g = 0.701 * this.values[1];
		const b = 0.087 * this.values[2];

		return r + g + b;
	}

	constructor(html_string: string) {
		if (html_string.startsWith("rgba")) {
			this.values = parseRgba(html_string);
		} else if (html_string.startsWith("rgb")) {
			this.values = parseRgb(html_string);
		} else if (html_string.startsWith("#")) {
			this.values = parseHex(html_string);
		} else {
			this.values = [0, 0, 0, 0];
		}
	}
}

export default Color;
