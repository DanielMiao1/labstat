function showLabel(container?: HTMLElement): HTMLElement {
	const label = (() => {
		let element = document.getElementById("chart-label");
		if (element) return element;

		element = document.createElement("p");
		(container ?? document.body).appendChild(element);
		element.id = "chart-label";
		element.classList.add("chart-label");
		return element;
	})();

	label.classList.add("active");
	return label;
}

function hideLabel() {
	const label = document.getElementById("chart-label");
	if (!label) return;

	label.classList.remove("active");
}

export { showLabel, hideLabel };
