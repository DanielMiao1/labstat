import assignColor from "./color";
import getLogo from "./logo";

import "./title.css";

function os(data: any) {
	assignColor(data.os);

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
