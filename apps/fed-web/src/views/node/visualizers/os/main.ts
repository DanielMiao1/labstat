import getLogo from "./logo";

import "./logo.css";

function os(data: any, container: HTMLElement) {
	const logo = document.getElementById("title-logo");
	getLogo(data.os).then(text => {
		logo.innerText = text;
	});

	const text = document.getElementById("title-text");
	text.innerText = data.ascii;

	if (data.kernel) {
		const subtitle = document.getElementById("subtitle-kernel");
		subtitle.innerText = "kernel: " + data.kernel;
	}
}

export default os;
