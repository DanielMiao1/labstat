import getHash from "../../../util/hash";

function hostname(data: { hostname: string }) {
	const subtitle = document.getElementById("subtitle-host");
	if (!subtitle) return;

	const text = `${data.hostname} - ${getHash()}`;
	subtitle.innerText = text;

	const title = document.getElementsByTagName("title").item(0);
	if (title) title.innerText = text;
}

export default hostname;
