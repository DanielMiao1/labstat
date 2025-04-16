import getHash from "../../../util/hash";

function hostname(data: any, container: HTMLElement) {
	const subtitle = document.getElementById("subtitle-host");
	const text = `${getHash()} • ${data.hostname}`;
	subtitle.innerText = text;
}

export default hostname;
