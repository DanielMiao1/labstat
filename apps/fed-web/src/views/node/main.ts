import getHash from "../../util/hash";
import initLoadavg from "./initializers/loadavg/main";
import initMemory from "./initializers/memory/main";
import initOS from "./initializers/os";
import showData from "./visualizer";

import "./node.css";

let socket: WebSocket;
const collectors: string[] = [];

const INIT_COLLECTORS = ["!os", "loadavg", "memory", "!disks", "!net", "!graphics"];

function createContainer(id: string, parent: HTMLElement) {
	const container = document.createElement("div");
	parent.appendChild(container);
	container.classList.add("collector");
	container.id = "collector-" + id;
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
	document.body.dataset.view = "node";
	
	const node = getHash();
	const all_collectors = await getCollectors(node);

	await initializeSocket(node);
	refreshData(all_collectors);
	
	INIT_COLLECTORS.forEach(init_collector => {
		all_collectors.some(collector => {
			if (init_collector === collector) {
				createContainer(collector, content);
				return true;
			}
		});
	});

	initLoadavg();
	initMemory();
	initOS();

	all_collectors.forEach(id => {
		if (!id.startsWith("!")) {
			collectors.push(id);
		}
	});

	setInterval(refreshData, 1000);
}

export default nodeView;
