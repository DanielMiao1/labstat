import getHash from "../util/hash";

let socket: WebSocket;

async function getCollectors(node: string): Promise<string[]> {
	const url = `/api/${node}/collectors`;
	const request = await fetch(url);
	const data = await request.json();

	return data.collectors;
}

async function showCollector(
	content: HTMLElement,
	node: string,
	id: string
) {
	const container = document.createElement("div");
	container.id = "collector-" + id;
	content.appendChild(container);

	const title = document.createElement("p");
	title.innerText = id;
	container.appendChild(title);

	const data = document.createElement("p");
	container.appendChild(data);
}

function updateData(id: string, data: string) {
	const container = document.getElementById(`collector-${id}`);
	const data_element = container.children[1];

	data_element.innerHTML = data;
}

async function initializeSocket(node: string) {
	const url = `/api/${node}/data`;
	socket = new WebSocket(url);

	socket.addEventListener("message", message => {
		const data: string = message.data;
		const separator = data.indexOf(" ");

		const id = data.slice(0, separator);
		const data = data.slice(separator + 1);

		updateData(id, data);
	});

	return new Promise(resolve => {
		socket.addEventListener("open", resolve);
	});
}

async function nodeView(content: HTMLElement) {
	const node = getHash();
	const collectors = await getCollectors(node);

	await initializeSocket(node);
	
	collectors.forEach(id => {
		showCollector(content, node, id);
		socket.send(id);
	});
}

export default nodeView;
