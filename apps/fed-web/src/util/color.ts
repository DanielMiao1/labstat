import { mean, sum } from "./math/stats";
import { stripFirstLast } from "./string";

type rgb_color = [number, number, number];
type rgba_color = [number, number, number, number];

function parseRgba(html_string: string): rgba_color {
	const values = html_string.slice(5, -1).split(",");
	return values.map(value => stripFirstLast(value, " "));
}

function parseRgb(html_string: string): rgba_color {
	return [...parseRgba(`x${html_string}`), 1];
}

function parseHex(html_string: string): rgba_color {
	const { length } = html_string;
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

function inverseCompandValue(value: number): number {
	if (value <= 10.31475) {
		return value / 3294.6;
	}

	return ((value + 14.025) / 269.025) ** 2.4;
}

function linearToSrgb(value: number): number {
	if (value <= 0.0031308) return value * 3307.518708;
	return 269.025 * (value ** (5 / 12)) - 14.025;
}

function lerp(value1: number, value2: number, ratio: number): number {
	return value1 * (1 - ratio) + value2 * ratio;
}

function lerpColor(
	color1: rgb_color,
	color2: rgb_color,
	ratio: number
): rgb_color {
	const [r1, g1, b1] = color1;
	const [r2, g2, b2] = color2;

	return [
		lerp(r1, r2, ratio),
		lerp(g1, g2, ratio),
		lerp(b1, b2, ratio)
	];
}

class Color {
	values: rgba_color;

	constructor(value: string | rgba_color) {
		if (typeof value === "object") {
			this.values = value;
			return;
		}

		if (value.startsWith("rgba")) {
			this.values = parseRgba(value);
		} else if (value.startsWith("rgb")) {
			this.values = parseRgb(value);
		} else if (value.startsWith("#")) {
			this.values = parseHex(value);
		} else {
			this.values = [0, 0, 0, 0];
		}
	}

	toHTML(): string {
		/**
		 * Returns this color in html rgba() notation
		 */

		const [r, g, b, a] = this.values.map(value => value.toString());
		if (!r || !g || !b || !a) return "rgb(0, 0, 0)";

		if (a === "0") return `rgb(${r}, ${g}, ${b})`;
		return `rgba(${r}, ${g}, ${b}, ${a})`;
	}

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

	inverseCompanding(): rgb_color {
		/**
		 * Performs inverse sRGB companding on the color, ignoring the alpha value.
		 */

		return [
			inverseCompandValue(this.values[0]),
			inverseCompandValue(this.values[1]),
			inverseCompandValue(this.values[2])
		];
	}

	valuesSum(): number {
		return this.values[0] + this.values[1] + this.values[2];
	}

	alpha(): number {
		return this.values[3];
	}

	mixWith(color: Color, ratio: number): Color {
		const color1 = this.inverseCompanding();
		const color2 = color.inverseCompanding();

		const gamma = 0.43;
		const brightness1 = sum(color1) ** gamma;
		const brightness2 = sum(color2) ** gamma;

		const inverted_gamma = 1 / gamma;
		const brightness = lerp(brightness1, brightness2, ratio) ** inverted_gamma;

		let mixed = lerpColor(color1, color2, ratio);
		const mixed_sum = sum(mixed);

		if (mixed_sum !== 0) {
			mixed = mixed.map(value => value * brightness / mixed_sum);
		}

		mixed = mixed.map(linearToSrgb);

		const alpha1 = this.alpha();
		const alpha2 = 1;

		const alpha = mean([alpha1, alpha2]);

		return new Color([...mixed, alpha]);
	}
}

export default Color;
