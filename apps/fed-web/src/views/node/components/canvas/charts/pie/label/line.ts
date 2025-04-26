function createLine(label: HTMLDivElement) {
	const svg = (() => {
		let element = label.getElementsByTagName("svg")[0];
		if (element) return element;

		element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		label.appendChild(element);
		return element;
	})();

	return svg;
}

export default createLine;
