import getHash from "../../../util/hash";

function hostname(data: any, container: HTMLElement) {
	const subtitle = document.getElementById("subtitle-host");
	const text = `${data.hostname} * ${getHash()}`;
	subtitle.innerText = text;
}

export default hostname;
