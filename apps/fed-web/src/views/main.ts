import { getNodes, type NodeOptions } from "../api";

function displayNode(ip: string, data: NodeOptions, list: HTMLElement) {
	const container = document.createElement("div");
	container.addEventListener("click", () => {
		document.location.hash = ip;
	});
	list.appendChild(container);

	const title = document.createElement("p");
	title.innerText = ip;
	container.appendChild(title);
}

async function populateNodes(list: HTMLElement) {
	const nodes = await getNodes();

	Object.keys(nodes).forEach(ip => {
		const data = nodes[ip];
		displayNode(ip, data, list);
	});
}

function mainView(content: HTMLElement) {
	document.body.dataset.view = "main";
	
	const node_list = document.createElement("div");
	content.appendChild(node_list);
	
	void populateNodes(node_list);
}

export default mainView;
