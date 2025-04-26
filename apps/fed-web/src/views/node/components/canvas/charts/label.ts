function showLabel(container: HTMLElement = document.body): HTMLElement {
	const label = (() => {
		let element = container.getElementsByClassName("piechart-label").item(0);
		if (element) return element;

		element = document.createElement("div");
		container.appendChild(element);
		element.classList.add("piechart-label");

		const text = document.createElement("p");
		element.appendChild(text);

		return element;
	})();

	label.classList.add("active");
	return label;
}

function hideLabel(container: HTMLElement = document.body) {
	const label = container.getElementsByClassName("piechart-label").item(0);
	if (!label) return;

	label.classList.remove("active");
}

export { showLabel, hideLabel };
