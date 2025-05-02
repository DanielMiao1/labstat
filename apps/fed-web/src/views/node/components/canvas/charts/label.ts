import { removeChildren } from "../../../../../util/dom";
import type { Point } from "../../../../../util/math/geometry";

function showLabel(): HTMLParagraphElement {
	void import("./label.css");

	const label = (() => {
		let element = document.getElementById("chart-label");
		if (element) return element;

		element = document.createElement("p");
		document.body.appendChild(element);
		element.id = "chart-label";
		element.classList.add("chart-label");

		return element;
	})();

	label.classList.add("active");

	return label;
}

function moveLabel(label: HTMLParagraphElement, position: Point) {
	const { width, height } = label.getBoundingClientRect();

	let x_offset = position.x - width - 10;
	let y_offset = position.y - height - 10;

	if (x_offset - 10 < window.scrollX) {
		x_offset = position.x;
	}

	if (y_offset - 10 < window.scrollY) {
		y_offset = position.y + 30;
	}

	label.style.top = y_offset.toString() + "px";
	label.style.left = x_offset.toString() + "px";
}

function hideLabel() {
	const label = document.getElementById("chart-label");
	if (!label) return;

	label.classList.remove("active");
	removeChildren(label);
}

export { hideLabel, moveLabel, showLabel };
