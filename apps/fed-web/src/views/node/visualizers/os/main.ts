import generateTitle from "./title";
import getLogo from "./logo";

import "./logo.css";

function os(data: any, container: HTMLElement) {
	const container = document.createElement("div");
	document.body.appendChild(container);

	const logo = document.createElement("p");
	logo.classList.add("ascii-logo");
	container.appendChild(logo);

	getLogo(data.os).then(text => {
		logo.innerText = text;
	});

	const title = document.createElement("p");
	container.appendChild(title);
	title.innerText = generateTitle(data.os);
}

export default os;
