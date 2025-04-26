import assignColor from "./color";
import getLogo from "./logo";

interface OSInfo {
	ascii: string;
	os: string;
	kernel?: string;
	version?: string;
}

function os(data: OSInfo) {
	void import("./title.css");

	assignColor(data.os);

	const logo = document.getElementById("title-logo");
	void getLogo(data.os).then(text => {
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
