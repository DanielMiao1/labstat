import getLogo from "./logo";

import "./logo.css";

function os(data: any, container: HTMLElement) {
	const container = document.getElementById("collector-os");

	const logo = document.createElement("pre");
	container.appendChild(logo);
	logo.classList.add("ascii-logo");

	getLogo(data.os).then(text => {
		logo.innerText = text;
	});

	const title = document.createElement("pre");
	container.appendChild(title);
	title.innerText = data.ascii;
	title.classList.add("title");
}

export default os;
