import getHash from "../../util/hash";
import initOS from "./initializers/os";
import showData from "./visualizer";

let socket: WebSocket;
const collectors: string[] = [];

function createContainer(id: string) {
	const container = document.createElement("div");
	container.id = "collector-" + id;
	document.body.appendChild(container);
}

async function getCollectors(node: string): Promise<string[]> {
	const url = `/api/${node}/collectors`;
	const request = await fetch(url);
	const data = await request.json();

	return data.collectors;
}

async function initializeSocket(node: string) {
	const url = `/api/${node}/data`;
	socket = new WebSocket(url);

	socket.addEventListener("message", message => {
		const data: string = message.data;
		const separator = data.indexOf(" ");

		const id = data.slice(0, separator);
		const data = data.slice(separator + 1);

		showData(id, data);
	});

	return new Promise(resolve => {
		socket.addEventListener("open", resolve);
	});
}

function refreshData(ids?: string[]) {
	(ids ?? collectors).forEach(id => {
		socket.send(id);
	});
}

async function nodeView(content: HTMLElement) {
	const node = getHash();
	const all_collectors = await getCollectors(node);

	await initializeSocket(node);
	refreshData(all_collectors);
	
	for (const id of ["os", "disks", "net"]) {
		createContainer(id);
	}

	initOS();

	all_collectors.forEach(id => {
		if (!id.startsWith("!")) {
			collectors.push(id);
		}
	});

	setInterval(refreshData, 1000);
}

export default nodeView;
