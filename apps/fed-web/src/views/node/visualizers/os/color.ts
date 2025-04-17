import json from "./colors.json";

const COLORS = json.colors;

function assignColor(os: string) {
	const color = COLORS[os];

	if (color) {
		document.documentElement.style.setProperty("--fg", color);
	}
}

export default assignColor;
